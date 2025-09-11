import { Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../components/sidebar/sidebar";
import ThemeSettings from "../components/theme-settings/themeSettings";
import { useEffect, useState, useRef } from "react";
import { resetMobileSidebar, setHiddenLayout, setMobileSidebar } from "../core/redux/sidebarSlice";
import { updateTheme } from "../core/redux/themeSlice";
import Header from "../components/header/header";

// TODO: For better type safety, define RootState and use it in useSelector

const Feature = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const themeSettings = useSelector((state: any) => state.theme.themeSettings);
  const { miniSidebar, mobileSidebar, expandMenu, hiddenLayout } = useSelector(
    (state: any) => state.sidebarSlice
  );
  
  // Ref for the main wrapper to detect clicks outside sidebar
  const mainWrapperRef = useRef<HTMLDivElement>(null);

  const dataLayout = themeSettings["data-layout"];
  const dataWidth = themeSettings["data-width"];
  const dataSize = themeSettings["data-size"];
  const dir = themeSettings["dir"];

  // Track previous path to detect navigation away from layout pages
  const [previousPath, setPreviousPath] = useState(location.pathname);

  useEffect(() => {
    dispatch(resetMobileSidebar());
  }, [location.pathname, dispatch]);

  // Handle route-based layout initialization
  useEffect(() => {
    const layoutPaths = [
      "/layout-mini",
      "/layout-hoverview", 
      "/layout-hidden",
      "/layout-fullwidth",
      "/layout-rtl",
      "/layout-dark"
    ];

    const isCurrentLayoutPage = layoutPaths.includes(location.pathname);
    const wasPreviousLayoutPage = layoutPaths.includes(previousPath);

    // Set specific theme for layout pages
    if (location.pathname === "/layout-hidden") {
      dispatch(updateTheme({ "data-layout": "hidden" }));
      dispatch(setHiddenLayout(false));
    } else if (location.pathname === "/layout-mini") {
      dispatch(updateTheme({ "data-layout": "mini" }));
    } else if (location.pathname === "/layout-hoverview") {
      dispatch(updateTheme({ "data-layout": "hover" }));
    } else if (location.pathname === "/layout-fullwidth") {
      dispatch(updateTheme({ "data-width": "box" }));
    } else if (location.pathname === "/layout-rtl") {
      dispatch(updateTheme({ dir: "rtl" }));
    } else if (location.pathname === "/layout-dark") {
      dispatch(updateTheme({ 
        "data-bs-theme": "dark", 
        "data-sidebar": "dark", 
        "data-topbar": "dark" 
      }));
    } else if (wasPreviousLayoutPage && !isCurrentLayoutPage) {
      // Reset to default theme when navigating away from layout pages
      dispatch(updateTheme({
        "data-bs-theme": "light",
        "data-sidebar": "light", 
        "data-color": "primary",
        "data-topbar": "white",
        "data-layout": "default",
        "data-size": "default",
        "data-width": "fluid",
        "data-sidebarbg": "none",
        "dir": "ltr"
      }));
    }

    // Update previous path
    setPreviousPath(location.pathname);
  }, [location.pathname, dispatch, previousPath]);

  // Add hidden-layout class to body when hidden layout is active
  useEffect(() => {
    if (dataLayout === "hidden") {
      if (hiddenLayout) {
        document.body.classList.add("hidden-layout");
      } else {
        document.body.classList.remove("hidden-layout");
      }
    } else {
      // Remove hidden-layout class when not in hidden mode
      document.body.classList.remove("hidden-layout");
    }
  }, [hiddenLayout, dataLayout]);

  // Handle menu-opened class on HTML tag for mobile sidebar
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (mobileSidebar) {
      htmlElement.classList.add("menu-opened");
    } else {
      htmlElement.classList.remove("menu-opened");
    }
  }, [mobileSidebar]);

  // Handle click outside sidebar to close mobile sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileSidebar && mainWrapperRef.current && !mainWrapperRef.current.contains(event.target as Node)) {
        // Check if click is not on the sidebar itself
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          dispatch(setMobileSidebar(false));
        }
      }
    };

    const handleTouchOutside = (event: TouchEvent) => {
      if (mobileSidebar && mainWrapperRef.current && !mainWrapperRef.current.contains(event.target as Node)) {
        // Check if touch is not on the sidebar itself
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          dispatch(setMobileSidebar(false));
        }
      }
    };

    // Add event listeners for clicks and touches outside
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleTouchOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleTouchOutside);
    };
  }, [mobileSidebar, dispatch]);

  useEffect(() => {
    // @ts-ignore
    if (window.bootstrap) {
      // Clean up any existing tooltips
      const oldTooltips = document.querySelectorAll('.tooltip');
      oldTooltips.forEach((el) => el.parentNode && el.parentNode.removeChild(el));
      // Initialize new tooltips
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      const tooltipInstances = tooltipTriggerList.map(function (tooltipTriggerEl) {
        // @ts-ignore
        return new window.bootstrap.Tooltip(tooltipTriggerEl);
      });
      // Cleanup on unmount
      return () => {
        tooltipInstances.forEach(instance => instance.dispose && instance.dispose());
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach((el) => el.parentNode && el.parentNode.removeChild(el));
      };
    }
  });

  // Consider using a classnames utility like 'clsx' for cleaner class logic
  return (
    <>
      <div
        className={`
        ${
          miniSidebar || dataLayout === "mini" || dataSize === "compact"
            ? "mini-sidebar"
            : ""
        }
        ${
          (expandMenu && miniSidebar) || (expandMenu && dataLayout === "mini")
            ? "expand-menu"
            : ""
        }
        ${mobileSidebar ? "menu-opened slide-nav" : ""}
        ${dataWidth === "box" ? "layout-box-mode" : ""}
        ${dir === "rtl" ? "layout-mode-rtl" : ""}
      `}
      >
        <div className="main-wrapper" ref={mainWrapperRef}>
          <Header />
          <Sidebar />
          <Outlet />
          {location.pathname !== "/layout-rtl" && <ThemeSettings />}
        </div>
        <div
          className={`sidebar-overlay${mobileSidebar ? " opened" : ""}`}
          onClick={() => mobileSidebar && dispatch(setMobileSidebar(false))}
        ></div>
      </div>
    </>
  );
};

export default Feature;
