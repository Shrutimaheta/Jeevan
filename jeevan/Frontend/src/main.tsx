import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DynamicTitle from "./routes/dynamicTitle";
import { Provider } from "react-redux";
import store from "./core/redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { base_path } from "./environment.js";
import ALLRoutes from "./routes/router.js";
import "./i18n";
import ErrorBoundary from "./components/common-error-boundary/ErrorBoundary";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Essential CSS imports only
import "bootstrap/dist/css/bootstrap.min.css";
import "@tabler/icons-webfont/dist/tabler-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "../src/assets/scss/custom.scss";

// Initialize Bootstrap globally
// @ts-ignore
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
(window as any).bootstrap = bootstrap;

function GlobalTooltipInit() {
  const location = useLocation();
  useEffect(() => {
    if ((window as any).bootstrap) {
      // Clean up any existing tooltips
      const oldTooltips = document.querySelectorAll(".tooltip");
      oldTooltips.forEach(
        (el) => el.parentNode && el.parentNode.removeChild(el)
      );
      // Initialize new tooltips
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new (window as any).bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }, [location]);
  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={base_path}>
        <GlobalTooltipInit />
        <ErrorBoundary>
          <ALLRoutes />
          <DynamicTitle />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
