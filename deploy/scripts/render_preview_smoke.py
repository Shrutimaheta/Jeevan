"""Exercise the Linux Render preview startup with synthetic HTTP proxy headers."""
import base64
import os
from pathlib import Path
import time
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


base = 'http://127.0.0.1:' + os.environ.get('PORT', '10000')
token = base64.b64encode(('preview:' + os.environ['PREVIEW_ACCESS_TOKEN']).encode()).decode()


def request(path, authorized=False):
    headers = {'X-Forwarded-Proto': 'https'}
    if authorized:
        headers['Authorization'] = 'Basic ' + token
    try:
        response = urlopen(Request(base + path, headers=headers), timeout=5)
    except HTTPError as error:
        response = error
    with response:
        return response.status, response.headers, response.read()


for attempt in range(60):
    try:
        if request('/health/ready/')[0] == 200:
            break
    except (URLError, TimeoutError):
        pass
    time.sleep(0.5)
else:
    raise SystemExit('Preview did not become ready.')

assert request('/')[0] == 401
status, headers, content = request('/', authorized=True)
assert status == 200 and b'Fictional-data preview only' in content
assert headers['X-Robots-Tag'] == 'noindex, nofollow, noarchive'
assert 'no-store' in headers['Cache-Control']
assert request('/login/', authorized=True)[0] == 200
assert request('/patient/forgot-password/', authorized=True)[0] == 503

image = Path(os.environ['MEDIA_ROOT']) / 'render-ci-preview.png'
private = Path(os.environ['PRIVATE_MEDIA_ROOT']) / 'render-ci-private.png'
image.parent.mkdir(parents=True, exist_ok=True)
private.parent.mkdir(parents=True, exist_ok=True)
try:
    image.write_bytes(b'fictional-public-image')
    private.write_bytes(b'fictional-private-image')
    assert request('/media/render-ci-preview.png', authorized=True)[2] == b'fictional-public-image'
    assert request('/media/../private-media/render-ci-private.png', authorized=True)[0] == 404
    assert request('/private_media/render-ci-private.png', authorized=True)[0] == 404
finally:
    image.unlink(missing_ok=True)
    private.unlink(missing_ok=True)
print('Render preview gate, visible notice, health, recovery restriction and public/private file checks passed.')
