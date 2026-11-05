import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {JSDOM} from 'jsdom';

const source = readFileSync(resolve(process.cwd(), '../static/js/clinic-auth.js'), 'utf8');
function login() {
  const dom = new JSDOM('<form id="loginForm"><input id="password" type="password"><button id="passwordToggle" type="button" aria-label="Show password">Show</button><button id="loginButton">Sign In</button><p id="loginStatus"></p></form>', {runScripts: 'outside-only'});
  dom.window.eval(source);
  return dom;
}

test('returning to a restored login page hides a previously revealed password', () => {
  const dom = login();
  const {document} = dom.window;
  const toggle = document.getElementById('passwordToggle');
  toggle.click();
  expect(document.getElementById('password').type).toBe('text');
  dom.window.dispatchEvent(new dom.window.Event('pageshow'));
  expect(document.getElementById('password').type).toBe('password');
  expect(toggle.textContent).toBe('Show');
  expect(toggle.getAttribute('aria-pressed')).toBe('false');
  dom.window.close();
});

test('a slow sign-in request restores its submit control and announces recovery guidance', () => {
  const dom = login();
  const {document} = dom.window;
  let retry;
  dom.window.setTimeout = callback => { retry = callback; return 1; };
  document.getElementById('loginForm').dispatchEvent(new dom.window.Event('submit'));
  expect(document.getElementById('loginButton').disabled).toBe(true);
  retry();
  expect(document.getElementById('loginButton').disabled).toBe(false);
  expect(document.getElementById('loginForm').hasAttribute('aria-busy')).toBe(false);
  expect(document.getElementById('loginStatus').textContent).toContain('Check your connection');
  dom.window.close();
});
