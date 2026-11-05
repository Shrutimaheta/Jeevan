import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {JSDOM} from 'jsdom';

const template = readFileSync(resolve(process.cwd(), '../templates/universal_auth/home.html'), 'utf8');
const scripts = [...template.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
function page() {
  const dom = new JSDOM('<form id="hospital-search-form"><input id="hospital-location" name="location"><button type="button" id="use-location-btn">Locate</button></form><p id="hospital-search-status"></p><button id="clear-filters">Clear</button><span id="result-count"></span><div id="hospital-list"><div class="hospital-card">Result</div></div>', {runScripts: 'outside-only'});
  dom.window.matchMedia = () => ({matches: false});
  const errors = [];
  dom.window.addEventListener('error', event => errors.push(event.error));
  scripts.forEach(script => dom.window.eval(script));
  dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  return {dom, errors};
}

test('search loading and completion work without optional spinner or empty-state nodes', () => {
  const {dom, errors} = page();
  const form = dom.window.document.getElementById('hospital-search-form');
  form.dispatchEvent(new dom.window.Event('htmx:beforeRequest'));
  expect(form.getAttribute('aria-busy')).toBe('true');
  form.dispatchEvent(new dom.window.CustomEvent('htmx:afterRequest', {detail: {successful: false}}));
  expect(form.hasAttribute('aria-busy')).toBe(false);
  expect(dom.window.document.getElementById('hospital-search-status').textContent).toContain('retry');
  expect(errors).toEqual([]);
  dom.window.close();
});

test('location lookup uses just the returned city and actually triggers the hospital search', async () => {
  const {dom} = page();
  dom.window.confirm = () => true;
  dom.window.AbortController = AbortController;
  let locationDone;
  const position = jest.fn(success => { locationDone = success({coords: {latitude: 1, longitude: 2}}); });
  Object.defineProperty(dom.window.navigator, 'geolocation', {value: {getCurrentPosition: position}});
  dom.window.fetch = jest.fn().mockResolvedValue({ok: true, json: async () => ({city: 'Ahmedabad', principalSubdivision: 'Gujarat', countryName: 'India'})});
  const form = dom.window.document.getElementById('hospital-search-form');
  const changed = jest.fn();
  form.addEventListener('change', changed);
  dom.window.document.getElementById('use-location-btn').click();
  await locationDone;
  expect(dom.window.document.getElementById('hospital-location').value).toBe('Ahmedabad');
  expect(changed).toHaveBeenCalledTimes(1);
  expect(dom.window.document.getElementById('use-location-btn').disabled).toBe(false);
  dom.window.close();
});

test('declining location sharing does not request coordinates or call a third party', () => {
  const {dom} = page();
  dom.window.confirm = () => false;
  const position = jest.fn();
  Object.defineProperty(dom.window.navigator, 'geolocation', {value: {getCurrentPosition: position}});
  dom.window.fetch = jest.fn();
  dom.window.document.getElementById('use-location-btn').click();
  expect(position).not.toHaveBeenCalled();
  expect(dom.window.fetch).not.toHaveBeenCalled();
  dom.window.close();
});
