import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import ClinicLink from './components/ClinicLink';
import 'bootstrap/dist/css/bootstrap.min.css';
const preview = import.meta.env.DEV && import.meta.env.VITE_ENABLE_TEMPLATE_PREVIEW === 'true';
const App = preview ? lazy(() => import('./templateApp')) : ClinicLink;
createRoot(document.getElementById('root')!).render(<StrictMode>
  <Suspense fallback={<p>Loading…</p>}><App /></Suspense>
</StrictMode>);
