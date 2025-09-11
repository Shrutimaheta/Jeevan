import React from "react";
import { Link, useLocation } from "react-router-dom";
import ImageWithBasePath from "../image-with-base-path";
import { all_routes } from "../../routes/all_routes";
import { useDispatch, useSelector } from "react-redux";
import { setMobileSidebar, toggleHiddenLayout } from "../../core/redux/sidebarSlice";
import { useEffect, useState, useRef, useCallback } from "react";
import { updateTheme } from "../../core/redux/themeSlice";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

// Function to load/unload RTL CSS
const loadRTLStylesheet = () => {
  const existingLink = document.getElementById('rtl-stylesheet');
  if (!existingLink) {
    const link = document.createElement('link');
    link.id = 'rtl-stylesheet';
    link.rel = 'stylesheet';
    link.href = '/src/assets/css/bootstrap.rtl.min.css';
    document.head.appendChild(link);
  }
};

const unloadRTLStylesheet = () => {
  const existingLink = document.getElementById('rtl-stylesheet');
  if (existingLink) {
    existingLink.remove();
  }
};

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const themeSettings = useSelector((state: any) => state.theme.themeSettings);
  const hiddenLayout = useSelector((state: any) => state.sidebarSlice.hiddenLayout);

  const mobileSidebar = useSelector(
    (state: any) => state.sidebarSlice.mobileSidebar
  );

  // Check if current page is a layout page
  const isLayoutPage = () => {
    const layoutPaths = [
      all_routes.layoutMini,
      all_routes.layoutHoverview,
      all_routes.layoutHidden,
      all_routes.layoutFullwidth,
      all_routes.layoutRtl,
      all_routes.layoutDark
    ];
    return layoutPaths.includes(location.pathname);
  };
  const toggleMobileSidebar = useCallback(() => {
    dispatch(setMobileSidebar(!mobileSidebar));
  }, [dispatch, mobileSidebar]);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        setIsFullscreen(false);
      }
    }
  }, [isFullscreen]);

  const handleUpdateTheme = useCallback(
    (key: string, value: string) => {
      if (themeSettings["dir"] === "rtl" && key !== "dir") {
        dispatch(updateTheme({ dir: "ltr" }));
      }
      dispatch(updateTheme({ [key]: value }));
    },
    [dispatch, themeSettings]
  );

  // Extract themeSettings dependencies for useEffect
  const themeDeps = [
    themeSettings["data-bs-theme"],
    themeSettings["dir"],
    themeSettings["data-layout"],
    themeSettings["data-sidebar"],
    themeSettings["data-color"],
    themeSettings["data-topbar"],
    themeSettings["data-size"],
    themeSettings["data-width"],
    themeSettings["data-sidebarbg"],
  ];
  useEffect(() => {
    const htmlElement = document.documentElement as HTMLElement;
    Object.entries(themeSettings).forEach(([key, value]) => {
      htmlElement.setAttribute(key as string, String(value));
    });
  }, themeDeps);

  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  // Move inline event handlers to named functions
  const handleToggleBtn2Click = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (themeSettings["data-layout"] === "hidden") {
      // In hidden mode, just toggle the hidden layout state
      dispatch(toggleHiddenLayout());
    } else {
      // In other modes, use mobile sidebar toggle
      toggleMobileSidebar();
    }
  }, [dispatch, toggleMobileSidebar, themeSettings, hiddenLayout]);
  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  const handleDarkModeClick = useCallback(() => {
    handleUpdateTheme("data-bs-theme", "light");
  }, [handleUpdateTheme]);
  const handleLightModeClick = useCallback(() => {
    handleUpdateTheme("data-bs-theme", "dark");
  }, [handleUpdateTheme]);

  // Language change handler
  const handleLanguageChange = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
      if (lng === "ar") {
        handleUpdateTheme("dir", "rtl");
        loadRTLStylesheet();
      } else {
        handleUpdateTheme("dir", "ltr");
        unloadRTLStylesheet();
      }
    },
    [handleUpdateTheme]
  );

  const languageOptions = [
    { code: "en", label: t("header.english"), flag: "assets/img/flags/us.svg" },
    { code: "de", label: t("header.german"), flag: "assets/img/flags/de.svg" },
    { code: "fr", label: t("header.french"), flag: "assets/img/flags/fr.svg" },
    { code: "ar", label: t("header.arabic"), flag: "assets/img/flags/ae.svg" },
  ];
  const currentLang =
    languageOptions.find((l) => l.code === i18n.language) || languageOptions[0];

  // Load RTL stylesheet on mount if current language is Arabic
  useEffect(() => {
    if (i18n.language === "ar") {
      loadRTLStylesheet();
    }
  }, []);

  return (
    <>
      {/* Topbar Start */}
      <header className="navbar-header">
        <div className="page-container topbar-menu">
          <div className="d-flex align-items-center gap-sm-2 gap-1">
            {/* Sidebar Mobile Button */}
            <Link
              id="mobile_btn"
              className="mobile-btn"
              to="#sidebar"
              onClick={toggleMobileSidebar}
              aria-label="Toggle mobile sidebar"
            >
              <i className="ti ti-menu-deep fs-24" aria-hidden="true" />
            </Link>
            {/* Logo */}
            <Link to={all_routes.dashboard} className="logo">
              {/* Logo Normal */}
              <span className="logo-light">
                <span className="logo-lg">
                  <ImageWithBasePath src="assets/img/logo.svg" alt="logo" />
                </span>
              </span>
              {/* Logo Dark */}
              <span className="logo-dark">
                <span className="logo-lg">
                  <ImageWithBasePath
                    src="assets/img/logo-dark.svg"
                    alt="dark logo"
                  />
                </span>
              </span>

              {/* Logo sm */}
              <span className="logo-small">
                <span className="logo-lg">
                  <ImageWithBasePath
                    src="assets/img/logo-small.svg"
                    alt="small logo"
                  />
                </span>
              </span>
            </Link>
            <button
              className="sidenav-toggle-btn btn border-0 p-0 active"
              id="toggle_btn2"
              onClick={handleToggleBtn2Click}
              aria-label="Toggle sidebar"
              type="button"
            >
              <i className="ti ti-arrow-bar-to-right" aria-hidden="true" />
            </button>
            {/* Search */}
            <div className="me-auto d-flex align-items-center header-search d-lg-flex d-none">
              {/* Search */}
              <div className="input-icon position-relative me-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t("header.searchPlaceholder")}
                  value={searchValue}
                  onChange={handleSearchInputChange}
                  ref={searchInputRef}
                  data-bs-toggle="modal"
                  data-bs-target="#searchModal"
                  aria-label="Search"
                />
                <span className="input-icon-addon d-inline-flex p-0 header-search-icon">
                  <i className="ti ti-command" aria-hidden="true" />
                </span>
              </div>
              {/* /Search */}
            </div>
          </div>
          <div className="d-flex align-items-center">
            {/* Search for Mobile */}
            <div className="me-auto d-flex align-items-center header-search d-lg-none d-sm-flex d-none">
              {/* Search */}
              <div className="input-icon position-relative me-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t("header.searchPlaceholder")}
                  value={searchValue}
                  onChange={handleSearchInputChange}
                  ref={searchInputRef}
                  data-bs-toggle="modal"
                  data-bs-target="#searchModal"
                  aria-label="Search"
                />
                <span className="input-icon-addon d-inline-flex p-0 header-search-icon">
                  <i className="ti ti-command" aria-hidden="true" />
                </span>
              </div>
              {/* /Search */}
            </div>
            {/* Minimize */}
            <div className="header-item">
              <div className="dropdown me-2">
                <Link
                  to="#"
                  className="btn topbar-link btnFullscreen"
                  onClick={toggleFullscreen}
                  aria-label="Toggle fullscreen"
                >
                  <i className="ti ti-minimize" aria-hidden="true" />
                </Link>
              </div>
            </div>
            {/* Minimize */}
            {/* Language Dropdown */}
            <div className="header-item">
              <div className="dropdown me-2">
                <button
                  className="topbar-link btn"
                  data-bs-toggle="dropdown"
                  data-bs-offset="0,24"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-label={`Current language: ${currentLang.label}`}
                >
                  <ImageWithBasePath
                    src={currentLang.flag}
                    alt={currentLang.label}
                    height={16}
                  />
                </button>
                <div className="dropdown-menu dropdown-menu-end p-2">
                  {languageOptions.map((lang) => (
                    <button
                      className="dropdown-item"
                      onClick={() => handleLanguageChange(lang.code)}
                      key={lang.code}
                      type="button"
                      aria-label={`Switch to ${lang.label}`}
                    >
                      <ImageWithBasePath
                        src={lang.flag}
                        alt=""
                        className="me-1"
                        height={16}
                      />{" "}
                      <span className="align-middle">{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Notification Dropdown */}
            <div className="header-item">
              <div className="dropdown me-2">
                <button
                  className="topbar-link btn topbar-link dropdown-toggle drop-arrow-none"
                  data-bs-toggle="dropdown"
                  data-bs-offset="0,24"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-label="Notifications"
                >
                  <i className="ti ti-bell-check fs-16 animate-ring" aria-hidden="true" />
                  <span className="notification-badge" aria-label="Unread notifications" />
                </button>
                <div
                  className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-lg"
                  style={{ minHeight: 300 }}
                >
                  <div className="p-2 border-bottom">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="m-0 fs-16 fw-semibold">
                          {" "}
                          {t("header.notifications")}
                        </h6>
                      </div>
                    </div>
                  </div>
                  {/* Notification Body */}
                  <div
                    className="notification-body position-relative z-2 rounded-0"
                    data-simplebar=""
                  >
                    <OverlayScrollbarsComponent style={{ height: "280px" }}>
                      {/* Item*/}
                      <div
                        className="dropdown-item notification-item py-3 text-wrap border-bottom"
                        id="notification-1"
                      >
                        <div className="d-flex">
                          <div className="me-2 position-relative flex-shrink-0">
                            <ImageWithBasePath
                              src="assets/img/users/user-01.jpg"
                              className="avatar-md rounded-circle"
                              alt=""
                            />
                          </div>
                          <div className="flex-grow-1">
                            <p className="mb-0 fw-medium text-dark">
                              {t("header.notificationUserJohn")}
                            </p>
                            <p className="mb-1 text-wrap">
                              {t("header.notificationMessageJohn")}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fs-12">
                                <i className="ti ti-clock me-1" />
                                {t("header.timeAgo", { time: "4 min ago" })}
                              </span>
                              <div className="notification-action d-flex align-items-center float-end gap-2">
                                <Link
                                  to="#"
                                  className="notification-read rounded-circle bg-danger"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-bs-original-title="Make as Read"
                                  aria-label="Mark notification as read"
                                />
                                <button
                                  className="btn rounded-circle p-0"
                                  data-dismissible="#notification-1"
                                  type="button"
                                  aria-label="Dismiss notification"
                                >
                                  <i className="ti ti-x" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Item*/}
                      <div
                        className="dropdown-item notification-item py-3 text-wrap border-bottom"
                        id="notification-2"
                      >
                        <div className="d-flex">
                          <div className="me-2 position-relative flex-shrink-0">
                            <ImageWithBasePath
                              src="assets/img/users/user-12.jpg"
                              className="avatar-md rounded-circle"
                              alt=""
                            />
                          </div>
                          <div className="flex-grow-1">
                            <p className="mb-0 fw-medium text-dark">
                              {t("header.notificationUserThomas")}
                            </p>
                            <p className="mb-1 text-wrap">
                              {t("header.notificationMessageThomas")}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fs-12">
                                <i className="ti ti-clock me-1" />
                                {t("header.timeAgo", { time: "8 min ago" })}
                              </span>
                              <div className="notification-action d-flex align-items-center float-end gap-2">
                                <Link
                                  to="#"
                                  className="notification-read rounded-circle bg-danger"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-bs-original-title="Make as Read"
                                  aria-label="Mark notification as read"
                                />
                                <button
                                  className="btn rounded-circle p-0"
                                  data-dismissible="#notification-2"
                                  type="button"
                                  aria-label="Dismiss notification"
                                >
                                  <i className="ti ti-x" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Item*/}
                      <div
                        className="dropdown-item notification-item py-3 text-wrap border-bottom"
                        id="notification-3"
                      >
                        <div className="d-flex">
                          <div className="me-2 position-relative flex-shrink-0">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-12.jpg"
                              className="avatar-md rounded-circle"
                              alt=""
                            />
                          </div>
                          <div className="flex-grow-1">
                            <p className="mb-0 fw-medium text-dark">
                              {t("header.notificationUserSarah")}
                            </p>
                            <p className="mb-1 text-wrap">
                              {t("header.notificationMessageSarah")}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fs-12">
                                <i className="ti ti-clock me-1" />
                                {t("header.timeAgo", { time: "15 min ago" })}
                              </span>
                              <div className="notification-action d-flex align-items-center float-end gap-2">
                                <Link
                                  to="#"
                                  className="notification-read rounded-circle bg-danger"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-bs-original-title="Make as Read"
                                  aria-label="Mark notification as read"
                                />
                                <button
                                  className="btn rounded-circle p-0"
                                  data-dismissible="#notification-3"
                                  type="button"
                                  aria-label="Dismiss notification"
                                >
                                  <i className="ti ti-x" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Item*/}
                      <div
                        className="dropdown-item notification-item py-3 text-wrap"
                        id="notification-4"
                      >
                        <div className="d-flex">
                          <div className="me-2 position-relative flex-shrink-0">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-08.jpg"
                              className="avatar-md rounded-circle"
                              alt=""
                            />
                          </div>
                          <div className="flex-grow-1">
                            <p className="mb-0 fw-medium text-dark">
                              {t("header.notificationUserAnn")}
                            </p>
                            <p className="mb-1 text-wrap">
                              {t("header.notificationMessageAnn")}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fs-12">
                                <i className="ti ti-clock me-1" />
                                {t("header.timeAgo", { time: "20 min ago" })}
                              </span>
                              <div className="notification-action d-flex align-items-center float-end gap-2">
                                <Link
                                  to="#"
                                  className="notification-read rounded-circle bg-danger"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-bs-original-title="Make as Read"
                                  aria-label="Mark notification as read"
                                />
                                <button
                                  className="btn rounded-circle p-0"
                                  data-dismissible="#notification-4"
                                  type="button"
                                  aria-label="Dismiss notification"
                                >
                                  <i className="ti ti-x" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </OverlayScrollbarsComponent>
                  </div>
                  {/* View All*/}
                  <div className="p-2 rounded-bottom border-top text-center">
                    <Link
                      to={all_routes.notifications}
                      className="text-center text-decoration-underline fs-14 mb-0"
                    >
                      {t("header.viewAllNotifications")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Light/Dark Mode Button */}
            {!isLayoutPage() && (
              <div className="header-item d-flex me-2">
                <button
                  className={`topbar-link btn topbar-link ${
                    themeSettings["mode"] === "dark" ? "active" : ""
                  }`}
                  id="dark-mode-toggle"
                  type="button"
                  onClick={handleDarkModeClick}
                  aria-label="Switch to light mode"
                >
                  <i className="ti ti-sun fs-16" aria-hidden="true" />
                </button>
                <button
                  className={`topbar-link btn topbar-link ${
                    themeSettings["mode"] === "light" ? "active" : ""
                  }`}
                  id="light-mode-toggle"
                  type="button"
                  onClick={handleLightModeClick}
                  aria-label="Switch to dark mode"
                >
                  <i className="ti ti-moon fs-16" aria-hidden="true" />
                </button>
              </div>
            )}
            {/* User Dropdown */}
            <div className="dropdown profile-dropdown d-flex align-items-center justify-content-center">
              <Link
                to="#"
                className="topbar-link dropdown-toggle drop-arrow-none position-relative"
                data-bs-toggle="dropdown"
                data-bs-offset="0,22"
                aria-haspopup="true"
                aria-expanded="false"
                aria-label="User menu"
              >
                <ImageWithBasePath
                  src="assets/img/avatars/avatar-31.jpg"
                  width={32}
                  className="rounded-2 d-flex"
                  alt="User avatar"
                />
                <span className="online text-success">
                  <i className="ti ti-circle-filled d-flex bg-white rounded-circle border border-1 border-white" aria-hidden="true" />
                </span>
              </Link>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-md p-2">
                <div className="d-flex align-items-center bg-light rounded-3 p-2 mb-2">
                  <ImageWithBasePath
                    src="assets/img/avatars/avatar-31.jpg"
                    className="rounded-circle"
                    width={42}
                    height={42}
                    alt="User avatar"
                  />
                  <div className="ms-2">
                    <p className="fw-medium text-dark mb-0">Jimmy Anderson</p>
                    <span className="d-block fs-13">Administrator</span>
                  </div>
                </div>
                {/* Item*/}
                <Link to={all_routes.generalSettings} className="dropdown-item">
                  <i className="ti ti-user-circle me-2 align-middle" aria-hidden="true" />
                  <span className="align-middle">Profile Settings</span>
                </Link>
                {/* item */}
                <Link to={all_routes.notifications} className="dropdown-item">
                  <i className="ti ti-bell me-2 align-middle" aria-hidden="true" />
                  <span className="align-middle">Notifications</span>
                </Link>
                {/* Item*/}
                <Link to="#" className="dropdown-item">
                  <i className="ti ti-help-circle me-2 align-middle" aria-hidden="true" />
                  <span className="align-middle">Help &amp; Support</span>
                </Link>
                {/* Item*/}
                <Link to={all_routes.generalSettings} className="dropdown-item">
                  <i className="ti ti-settings me-2 align-middle" aria-hidden="true" />
                  <span className="align-middle">Settings</span>
                </Link>
                {/* Item*/}
                <div className="pt-2 mt-2 border-top">
                  <Link to={all_routes.login} className="dropdown-item text-danger">
                    <i className="ti ti-logout me-2 fs-17 align-middle" aria-hidden="true" />
                    <span className="align-middle">Sign Out</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Topbar End */}
    
    </>
  );
};

export default React.memo(Header);
