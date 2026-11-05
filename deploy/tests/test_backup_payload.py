import importlib.util
import io
from pathlib import Path
import tarfile
from tempfile import TemporaryDirectory
import unittest

source = Path(__file__).resolve().parents[1] / 'scripts' / 'backup_payload.py'
spec = importlib.util.spec_from_file_location('backup_payload', source)
payload = importlib.util.module_from_spec(spec)
spec.loader.exec_module(payload)
TEMP_ROOT = Path(__file__).resolve().parents[2] / '.qa'
TEMP_ROOT.mkdir(exist_ok=True)


class UploadRecoveryTests(unittest.TestCase):
    def test_database_companion_uploads_restore_with_identical_bytes(self):
        with TemporaryDirectory(dir=TEMP_ROOT) as directory:
            root = Path(directory)
            sources = {label: root / 'source' / label for label in payload.ROOTS}
            targets = {label: root / 'target' / label for label in payload.ROOTS}
            for folder in [*sources.values(), *targets.values()]:
                folder.mkdir(parents=True)
            (sources['private_media'] / 'reports').mkdir()
            (sources['private_media'] / 'reports' / 'fictional.pdf').write_bytes(b'%PDF-1.4 fictional QA')
            (sources['media'] / 'avatar.bin').write_bytes(bytes(range(256)))
            archive = io.BytesIO()
            payload.capture(sources, archive)
            archive.seek(0)
            payload.restore(archive, targets)
            self.assertEqual((targets['private_media'] / 'reports' / 'fictional.pdf').read_bytes(), b'%PDF-1.4 fictional QA')
            self.assertEqual((targets['media'] / 'avatar.bin').read_bytes(), bytes(range(256)))
            archive.seek(0)
            with self.assertRaises(ValueError):
                payload.restore(archive, targets)

    def test_unsafe_archive_cannot_escape_or_write_before_validation(self):
        for name, kind in (('../escape', tarfile.REGTYPE), ('private_media/link', tarfile.SYMTYPE)):
            with self.subTest(name=name), TemporaryDirectory(dir=TEMP_ROOT) as directory:
                targets = {label: Path(directory) / label for label in payload.ROOTS}
                for folder in targets.values():
                    folder.mkdir()
                archive = io.BytesIO()
                with tarfile.open(fileobj=archive, mode='w') as tar:
                    member = tarfile.TarInfo(name)
                    member.type = kind
                    member.linkname = '/etc/passwd' if kind == tarfile.SYMTYPE else ''
                    tar.addfile(member, io.BytesIO())
                archive.seek(0)
                with self.assertRaises(ValueError):
                    payload.restore(archive, targets)
                self.assertTrue(all(not list(folder.iterdir()) for folder in targets.values()))

    def test_corrupt_upload_checksum_is_rejected(self):
        archive = io.BytesIO()
        with tarfile.open(fileobj=archive, mode='w') as tar:
            for name, content in [('private_media/report.pdf', b'changed'), ('uploads-manifest.json', b'{"private_media/report.pdf":"wrong"}')]:
                member = tarfile.TarInfo(name)
                member.size = len(content)
                tar.addfile(member, io.BytesIO(content))
        archive.seek(0)
        with tarfile.open(fileobj=archive, mode='r:') as tar, self.assertRaises(ValueError):
            payload.validate(tar)


if __name__ == '__main__':
    unittest.main()
