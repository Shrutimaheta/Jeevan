import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {JSDOM} from 'jsdom';

const source = readFileSync(resolve(process.cwd(), '../static/js/clinic-ui.js'), 'utf8');
const navigation = '<nav class="navbar navbar-expand-lg"><button class="navbar-toggler" aria-controls="menu">Menu</button><div id="menu" class="collapse navbar-collapse"><a href="/">Home</a></div></nav>';

function fixture(html, width = 390) {
  const dom = new JSDOM(html, {runScripts: 'outside-only'});
  dom.window.matchMedia = query => ({matches: width <= Number(query.match(/max-width: (-?[\d.]+)px/)[1])});
  dom.window.eval(source);
  dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  return dom;
}

test('Bootstrap desktop navigation remains usable between 992px and 1024px', () => {
  const dom = fixture(navigation, 1000);
  const menu = dom.window.document.getElementById('menu');
  expect(menu.inert).toBe(false);
  expect(menu.hasAttribute('aria-hidden')).toBe(false);
  expect(dom.window.document.querySelector('button').getAttribute('aria-expanded')).toBe('true');
  dom.window.close();
});

test('closed phone navigation is unfocusable and Escape returns focus to the toggle', async () => {
  const dom = fixture(navigation);
  const {document, KeyboardEvent} = dom.window;
  const menu = document.getElementById('menu');
  const toggle = document.querySelector('button');
  expect(menu.inert).toBe(true);
  menu.classList.add('show');
  await Promise.resolve();
  expect(menu.inert).toBe(false);
  document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
  expect(menu.classList.contains('show')).toBe(false);
  expect(document.activeElement).toBe(toggle);
  expect(toggle.getAttribute('aria-expanded')).toBe('false');
  dom.window.close();
});

test('small tables stay compact and duplicate helper includes do not duplicate wrappers or hints', () => {
  const dom = fixture('<main><table id="small"><tr><th>Name</th><th>Status</th></tr></table><table id="wide"><tr><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr></table></main>');
  dom.window.eval(source);
  dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  const {document} = dom.window;
  expect(document.querySelectorAll('.clinic-table-scroll')).toHaveLength(2);
  expect(document.querySelectorAll('.clinic-table-hint')).toHaveLength(1);
  expect(document.getElementById('small').classList.contains('clinic-wide-table')).toBe(false);
  expect(document.getElementById('wide').classList.contains('clinic-wide-table')).toBe(true);
  expect(document.querySelectorAll('.clinic-skip-link')).toHaveLength(1);
  dom.window.close();
});

test('collapsed sidebar actions retain text names and preserve explicit accessible labels', () => {
  const dom = fixture('<aside class="healthcare-sidebar collapsed"><a id="patients" href="/patients/"><i>⚕</i><span style="display:none">View Patients</span></a><a id="custom" href="/appointments/" aria-label="Appointments desk" title="Existing hint"><span style="display:none">Appointments</span></a></aside>');
  const {document} = dom.window;
  expect(document.getElementById('patients').getAttribute('aria-label')).toBe('View Patients');
  expect(document.getElementById('patients').getAttribute('title')).toBe('View Patients');
  expect(document.getElementById('custom').getAttribute('aria-label')).toBe('Appointments desk');
  expect(document.getElementById('custom').getAttribute('title')).toBe('Existing hint');
  dom.window.close();
});
