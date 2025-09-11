import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "./breadcrumb";
import { all_routes } from "../../routes/all_routes";
import { SidebarData } from "../sidebar/sidebarData";

// Optional: Map route segments to custom labels
const LABELS: Record<string, string> = {
  "": "Home",
  "base-ui": "Base UI",
  "accordions": "Accordions",
  // Add more mappings as needed
};

// Recursively find the full path (section → submodule → page) for the current pathname
function findSidebarPath(pathname: string) {
  let result: { label: string; href?: string }[] = [];

  function recurse(items: any[], path: { label: string; href?: string }[]): boolean {
    for (const item of items) {
      const newPath = [...path, { label: item.label, href: item.link !== "#" ? item.link : undefined }];
      if (item.link && item.link !== "#" && item.link === pathname) {
        result = newPath;
        return true;
      }
      if (item.submenuItems && item.submenuItems.length > 0) {
        if (recurse(item.submenuItems, newPath)) {
          return true;
        }
      }
    }
    return false;
  }

  for (const section of SidebarData) {
    if (recurse(section.submenuItems, [{ label: section.tittle, href: undefined }])) {
      break;
    }
  }
  return result;
}

const AutoBreadcrumb: React.FC<{ title?: string; onlyHomeAndTitle?: boolean }> = ({ title, onlyHomeAndTitle }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const sidebarPath = findSidebarPath(pathname);

  let breadcrumbItems;
  if (onlyHomeAndTitle) {
    breadcrumbItems = [
      {
        label: LABELS[""] || "Home",
        href: pathname !== all_routes.dashboard ? all_routes.dashboard : undefined,
      },
      ...(title ? [{ label: title }] : []),
    ];
  } else {
    // Home always first
    breadcrumbItems = [
      {
        label: LABELS[""] || "Home",
        href: pathname !== all_routes.dashboard ? all_routes.dashboard : undefined,
      },
      ...sidebarPath.slice(1).map((item, idx) => ({
        label: item.label,
        href: idx < sidebarPath.length - 2 ? item.href : undefined,
      })),
    ];
  }

  return <Breadcrumb title={title} items={breadcrumbItems} />;
};

export default AutoBreadcrumb; 