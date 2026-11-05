# Jeevan React entry and design preview

The clinic application runs in Django. This React project opens that clinic; authentication, registration, appointments and records use the Django interface.

Install Node.js 22, run `npm ci`, then run `npm run lint -- --max-warnings=0`, `npm test -- --runInBand` and `npm run build`. Build output is `dist/`.

For development, `npm run dev` opens an entry page linked to http://localhost:8000. Set `VITE_CLINIC_ORIGIN` for a different clinic origin. A separately hosted production entry page requires an HTTPS clinic origin.

Set `VITE_ENABLE_TEMPLATE_PREVIEW=true` during local development only to view the supplied design template. It is labelled as fictional data and cannot be enabled in a production build. Mock login, registration, ABHA and booking success paths have been removed; these actions link to the actual clinic or report that the external service is unavailable.
