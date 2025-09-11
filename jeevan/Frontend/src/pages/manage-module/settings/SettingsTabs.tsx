import React from "react";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../../../routes/all_routes";

const SettingsTabs: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const tabs = [
    { label: "General", route: all_routes.generalSettings },
    { label: "Security", route: all_routes.securitySettings }, 
    { label: "Preferences", route: all_routes.preferencesSettings },
    { label: "Appearance", route: all_routes.appearanceSettings },
    { label: "Notifications", route: all_routes.notificationsSettings },
    { label: "User Permissions", route: all_routes.userPermissionsSettings },
    { label: "Plans & Billing", route: all_routes.plansBillingsSettings },
  ];

  return (
    <ul className="nav nav-tabs nav-solid-primary mb-3 border-bottom pb-4 mb-4 d-flex align-items-center gap-2">
      {tabs.map((tab) => (
        <li className="nav-item" key={tab.route}>
          <Link
            to={tab.route}
            className={`nav-link border rounded fw-semibold${pathname === tab.route ? " active" : ""}`}
          >
            {tab.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SettingsTabs; 