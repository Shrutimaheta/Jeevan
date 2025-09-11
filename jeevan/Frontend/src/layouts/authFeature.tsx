
import { Outlet } from "react-router";
import { useEffect } from "react";

const AuthFeature = () => {
  useEffect(() => {
    // Force light mode for auth routes
    const htmlElement = document.documentElement;
    
    // Store original theme settings
    const originalThemeSettings = {
      "data-bs-theme": htmlElement.getAttribute("data-bs-theme"),
      "data-sidebar": htmlElement.getAttribute("data-sidebar"),
      "data-topbar": htmlElement.getAttribute("data-topbar"),
    };

    // Apply light theme for auth routes
    htmlElement.setAttribute("data-bs-theme", "light");
    htmlElement.setAttribute("data-sidebar", "light");
    htmlElement.setAttribute("data-topbar", "white");

    // Cleanup function to restore original theme when component unmounts
    return () => {
      // Restore original theme settings if they existed
      if (originalThemeSettings["data-bs-theme"]) {
        htmlElement.setAttribute("data-bs-theme", originalThemeSettings["data-bs-theme"]);
      }
      if (originalThemeSettings["data-sidebar"]) {
        htmlElement.setAttribute("data-sidebar", originalThemeSettings["data-sidebar"]);
      }
      if (originalThemeSettings["data-topbar"]) {
        htmlElement.setAttribute("data-topbar", originalThemeSettings["data-topbar"]);
      }
    };
  }, []);

  return (
    <Outlet/>
  );
};

export default AuthFeature;
