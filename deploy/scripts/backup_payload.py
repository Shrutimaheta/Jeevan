"""Read/copy upload archives without trusting tar paths or links (stdlib only)."""
import hashlib
import io
import json
import os
from pathlib import Path, PurePosixPath
import shutil
import sys
import tarfile
import tempfile


ROOTS = {'media': Path('/app/media'), 'private_media': Path('/app/private_media')}


def digest(stream):
    result = hashlib.sha256()
    for chunk in iter(lambda: stream.read(1024 * 1024), b''):
        result.update(chunk)
    return result.hexdigest()


def capture(roots, output):
    manifest = {}
    with tarfile.open(fileobj=output, mode='w|') as archive:
        for label, root in roots.items():
            if not root.is_dir() or root.is_symlink():
                raise ValueError(f'Upload root {label} must be a real mounted directory.')
            for path in sorted(root.rglob('*')):
                if path.is_symlink() or not (path.is_file() or path.is_dir()):
                    raise ValueError('Upload roots contain an unsupported link or special file.')
                relative = label + '/' + path.relative_to(root).as_posix()
                if path.is_file():
                    with path.open('rb') as source:
                        manifest[relative] = digest(source)
                archive.add(path, arcname=relative, recursive=False)
        payload = json.dumps(manifest, sort_keys=True).encode()
        info = tarfile.TarInfo('uploads-manifest.json')
        info.size = len(payload)
        info.mode = 0o600
        archive.addfile(info, io.BytesIO(payload))


def validate(archive):
    files, paths, manifests = {}, set(), []
    for member in archive.getmembers():
        name = PurePosixPath(member.name)
        if member.name in paths:
            raise ValueError('Archive contains duplicate paths.')
        paths.add(member.name)
        if member.name == 'uploads-manifest.json':
            if not member.isfile() or member.size > 64 * 1024 * 1024:
                raise ValueError('Invalid upload manifest.')
            manifests.append(member)
            continue
        if (name.is_absolute() or '..' in name.parts or not name.parts
                or name.parts[0] not in ROOTS or not (member.isdir() or member.isfile())):
            raise ValueError('Archive contains an unsafe path, link or special file.')
        if member.isfile():
            with archive.extractfile(member) as source:
                files[member.name] = digest(source)
    if len(manifests) != 1:
        raise ValueError('Exactly one upload manifest is required.')
    with archive.extractfile(manifests[0]) as source:
        expected = json.load(source)
    if files != expected:
        raise ValueError('Upload checksum verification failed.')
    return files


def restore(source, roots):
    for root in roots.values():
        if not root.is_dir() or root.is_symlink() or any(root.iterdir()):
            raise ValueError('Restore requires empty, real upload volumes.')
    with tarfile.open(fileobj=source, mode='r:') as archive:
        files = validate(archive)  # Validate the entire recovery set before writing.
        for member in archive.getmembers():
            if member.name == 'uploads-manifest.json':
                continue
            name = PurePosixPath(member.name)
            root = roots[name.parts[0]]
            owner = root.stat()
            destination = root.joinpath(*name.parts[1:])
            destination.parent.mkdir(parents=True, exist_ok=True)
            if member.isdir():
                destination.mkdir(exist_ok=True)
            else:
                with archive.extractfile(member) as incoming, destination.open('xb') as outgoing:
                    shutil.copyfileobj(incoming, outgoing, length=1024 * 1024)
                destination.chmod(0o640)
                with destination.open('rb') as saved:
                    if digest(saved) != files[member.name]:
                        raise ValueError('Restored upload checksum mismatch.')
            if hasattr(os, 'chown'):
                os.chown(destination, owner.st_uid, owner.st_gid)
        # Newly created parent folders also need the existing volume owner's access.
        if hasattr(os, 'chown'):
            for root in roots.values():
                owner = root.stat()
                for directory in (path for path in root.rglob('*') if path.is_dir()):
                    os.chown(directory, owner.st_uid, owner.st_gid)
                    directory.chmod(0o750)


def main():
    os.umask(0o077)
    command = sys.argv[1]
    if command == 'capture':
        capture(ROOTS, sys.stdout.buffer)
    elif command == 'restore':
        with tempfile.TemporaryFile() as staged:
            shutil.copyfileobj(sys.stdin.buffer, staged)
            staged.seek(0)
            restore(staged, ROOTS)
    elif command == 'verify':
        with tarfile.open(sys.argv[2], 'r:') as archive:
            files = validate(archive)
        print(f'Upload manifest verified: {len(files)} files.')
    else:
        raise ValueError('Unknown payload command.')


if __name__ == '__main__':
    main()
