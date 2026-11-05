/// <reference types="vite/client" />
interface Window {
  bootstrap: typeof import('bootstrap');
  __PATIENT__?: { name: string };
}
declare module 'bootstrap/dist/js/bootstrap.bundle.min.js' {
  export * from 'bootstrap';
}
