const { TextEncoder, TextDecoder } = require('node:util');
Object.assign(globalThis, { TextEncoder, TextDecoder });
Object.defineProperty(window, 'matchMedia', { writable: true, value: query => ({
  matches: false, media: query, onchange: null,
  addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() {return false;}
}) });
globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
