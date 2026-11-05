import { StrictMode } from "react";

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

import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
window.bootstrap = bootstrap;

function GlobalTooltipInit() {
  const location = useLocation();
  useEffect(() => {
    if (window.bootstrap) {
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
        new window.bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }, [location]);
  return null;
}

export default function TemplateApp() { return (
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={base_path}>
        <GlobalTooltipInit />
        <ErrorBoundary>
          <aside className="alert alert-warning" role="status">Design preview with fictional template data. Use the clinic for real appointments and records.</aside><ALLRoutes />
          <DynamicTitle />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </StrictMode>
); }
