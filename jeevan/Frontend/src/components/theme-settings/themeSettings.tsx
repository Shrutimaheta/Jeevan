import React, { useEffect } from "react";
import ImageWithBasePath from "../image-with-base-path";
import { useThemeSettings } from '../../hooks/useThemeSettings';

const ThemeSettings = () => {
  const { themeSettings, handleUpdateTheme, handleResetTheme } = useThemeSettings();

  useEffect(() => {
    const htmlElement: any = document.documentElement;
    Object.entries(themeSettings).forEach(([key, value]) => {
      htmlElement.setAttribute(key, value);
    });
    
    // Force a re-render of CSS variables when theme color changes
    if (themeSettings["data-color"]) {
      const event = new CustomEvent('themeColorChanged', { 
        detail: { color: themeSettings["data-color"] } 
      });
      document.dispatchEvent(event);
    }
  }, [themeSettings]);
  return (
    <>
      <div className="sidebar-contact">
        <div
          className="toggle-theme"
          data-bs-toggle="offcanvas"
          data-bs-target="#theme-settings-offcanvas"
          role="button"
          tabIndex={0}
          aria-label="Open theme settings"
        >
          <i className="ti ti-settings" aria-hidden="true" />
        </div>
      </div>
      <div
        className="sidebar-themesettings offcanvas offcanvas-end"
        tabIndex={-1}
        id="theme-settings-offcanvas"
      >
        <div className="d-flex align-items-center gap-2 px-3 py-3 offcanvas-header border-bottom bg-primary">
          <h5 className="flex-grow-1 mb-0">Theme Customizer</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body h-100" data-simplebar="">
          <div className="accordion accordion-bordered">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button fw-semibold fs-16"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#modesetting"
                  aria-expanded="true"
                >
                  Color Mode
                </button>
              </h2>
              <div
                id="modesetting"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="form-check card-radio" 
                      onClick={() => handleUpdateTheme("data-bs-theme", "light")}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="data-bs-theme"
                          id="layout-color-light"
                          defaultValue="light"
                          checked={
                            themeSettings["data-bs-theme"] === "light"
                          }
                          readOnly
                        />
                        <label
                          className="form-check-label p-2 w-100 d-flex justify-content-center align-items-center"
                          htmlFor="layout-color-light"
                        >
                          <i className="ti ti-sun me-1" aria-hidden="true" />
                          Light
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check card-radio"
                       onClick={() => handleUpdateTheme("data-bs-theme", "dark")}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="data-bs-theme"
                          id="layout-color-dark"
                          defaultValue="dark"
                           checked={
                            themeSettings["data-bs-theme"] === "dark"
                          }
                           readOnly
                        />
                        <label
                          className="form-check-label p-2 w-100 d-flex justify-content-center align-items-center"
                          htmlFor="layout-color-dark"
                        >
                          <i className="ti ti-moon me-1" aria-hidden="true" />
                          Dark
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button fw-semibold fs-16"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#layoutsetting"
                  aria-expanded="true"
                  aria-controls="layoutsetting"
                >
                  Select Layouts
                </button>
              </h2>
              <div
                id="layoutsetting"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  <div className="theme-content" >
                    <div className="row g-3">
                      <div className="col-4">
                        <div className="theme-layout"  onClick={() => handleUpdateTheme("data-layout", "default")}>
                          <input
                            type="radio"
                            name="data-layout"
                            id="defaultLayout"
                            defaultValue="default"
                            checked={
                            themeSettings["data-layout"] === "default"
                          }
                           readOnly
                          />
                          <label htmlFor="defaultLayout">
                            <span className="d-block mb-2 layout-img">
                              <span className="theme-check rounded-circle">
                                <i className="ti ti-check" />
                              </span>
                              <ImageWithBasePath
                                src="assets/img/theme/default.svg"
                                alt="img"
                              />
                            </span>
                            <span className="layout-type">Default</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="theme-layout"  onClick={() => handleUpdateTheme("data-layout", "mini")}>
                          <input
                            type="radio"
                            name="data-layout"
                            id="miniLayout"
                            defaultValue="mini"
                              checked={
                            themeSettings["data-layout"] === "mini"
                          }
                           readOnly
                          />
                          <label htmlFor="miniLayout">
                            <span className="d-block mb-2 layout-img">
                              <span className="theme-check rounded-circle">
                                <i className="ti ti-check" />
                              </span>
                              <ImageWithBasePath src="assets/img/theme/mini.svg" alt="img" />
                            </span>
                            <span className="layout-type">Mini</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="theme-layout"  onClick={() => handleUpdateTheme("data-layout", "hoverview")}>
                          <input
                            type="radio"
                            name="data-layout"
                            id="hoverviewLayout"
                            defaultValue="hoverview"
                             checked={
                            themeSettings["data-layout"] === "hoverview"
                          }
                           readOnly
                          />
                          <label htmlFor="hoverviewLayout">
                            <span className="d-block mb-2 layout-img">
                              <span className="theme-check rounded-circle">
                                <i className="ti ti-check" />
                              </span>
                              <ImageWithBasePath src="assets/img/theme/mini.svg" alt="img" />
                            </span>
                            <span className="layout-type">Hover View</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="theme-layout" onClick={() => handleUpdateTheme("data-layout", "hidden")}>
                          <input
                            type="radio"
                            name="data-layout"
                            id="hiddenLayout"
                            defaultValue="hidden"
                              checked={
                            themeSettings["data-layout"] === "hidden"
                          }
                          readOnly
                          />
                          <label htmlFor="hiddenLayout">
                            <span className="d-block mb-2 layout-img">
                              <span className="theme-check rounded-circle">
                                <i className="ti ti-check" />
                              </span>
                              <ImageWithBasePath
                                src="assets/img/theme/full-width.svg"
                                alt="img"
                              />
                            </span>
                            <span className="layout-type">Hidden</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="theme-layout" onClick={() => handleUpdateTheme("data-layout", "full-width")}>
                          <input
                            type="radio"
                            name="data-layout"
                            id="full-widthLayout"
                            defaultValue="full-width"
                             checked={
                            themeSettings["data-layout"] === "full-width"
                          }
                          readOnly
                          />
                          <label htmlFor="full-widthLayout">
                            <span className="d-block mb-2 layout-img">
                              <span className="theme-check rounded-circle">
                                <i className="ti ti-check" />
                              </span>
                              <ImageWithBasePath
                                src="assets/img/theme/full-width.svg"
                                alt="img"
                              />
                            </span>
                            <span className="layout-type">Full Width</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button fw-semibold fs-16"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#sidebarcolorsetting"
                  aria-expanded="true"
                >
                  Sidebar Color
                </button>
              </h2>
              <div
                id="sidebarcolorsetting"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  <div className="theme-content">
                    <h6 className="fs-14 fw-medium mb-2">Solid Colors</h6>
                    <div className="d-flex align-items-center flex-wrap mb-1">
                      <div className="theme-colorselect m-1 me-2"  onClick={() => handleUpdateTheme("data-sidebar", "light")}>
                        <input
                          type="radio"
                          name="data-sidebar"
                          id="lightSidebar"
                          defaultValue="light"
                          checked={
                            themeSettings["data-sidebar"] === "light"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="lightSidebar"
                          className="d-block rounded bg-dark mb-2"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect m-1 me-2"  onClick={() => handleUpdateTheme("data-sidebar", "sidebar2")}>
                        <input
                          type="radio"
                          name="data-sidebar"
                          id="sidebar2Sidebar"
                          defaultValue="sidebar2"
                           checked={
                            themeSettings["data-sidebar"] === "sidebar2"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="sidebar2Sidebar"
                          className="d-block rounded bg-light mb-2"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect m-1 me-2"  onClick={() => handleUpdateTheme("data-sidebar", "sidebar3")}>
                        <input
                          type="radio"
                          name="data-sidebar"
                          id="sidebar3Sidebar"
                          defaultValue="sidebar3"
                           checked={
                            themeSettings["data-sidebar"] === "sidebar3"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="sidebar3Sidebar"
                          className="d-block rounded bg-white mb-2"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect m-1 me-2"  onClick={() => handleUpdateTheme("data-sidebar", "sidebar4")}>
                        <input
                          type="radio"
                          name="data-sidebar"
                          id="sidebar4Sidebar"
                          defaultValue="sidebar4"
                           checked={
                            themeSettings["data-sidebar"] === "sidebar4"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="sidebar4Sidebar"
                          className="d-block rounded bg-primary mb-2"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect m-1 me-2"  onClick={() => handleUpdateTheme("data-sidebar", "sidebar5")}>
                        <input
                          type="radio"
                          name="data-sidebar"
                          id="sidebar5Sidebar"
                          defaultValue="sidebar5"
                           checked={
                            themeSettings["data-sidebar"] === "sidebar5"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="sidebar5Sidebar"
                          className="d-block rounded bg-secondary mb-2"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect m-1 me-2" onClick={() => handleUpdateTheme("data-sidebar", "sidebar6")}>
                        <input
                          type="radio"
                          name="data-sidebar"
                          id="sidebar6Sidebar"
                          defaultValue="sidebar6"
                           checked={
                            themeSettings["data-sidebar"] === "sidebar6"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="sidebar6Sidebar"
                          className="d-block rounded bg-info mb-2"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect m-1 me-2" onClick={() => handleUpdateTheme("data-sidebar", "sidebar7")}>
                        <input
                          type="radio"
                          name="data-sidebar"
                          id="sidebar7Sidebar"
                          defaultValue="sidebar7"
                           checked={
                            themeSettings["data-sidebar"] === "sidebar7"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="sidebar7Sidebar"
                          className="d-block rounded bg-indigo mb-2"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                    </div>
                    <h6 className="fs-14 fw-medium mb-2">Gradient Colors</h6>
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="theme-colorselect m-1 me-2" onClick={() => handleUpdateTheme("data-sidebar", "gradientsidebar1")}>
                        <input
                          type="radio"
                          name="data-sidebar"
                          id="gradientsidebar1Sidebar"
                          defaultValue="gradientsidebar1"
                           checked={
                            themeSettings["data-sidebar"] === "gradientsidebar1"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="gradientsidebar1Sidebar"
                          className="d-block rounded bg-indigo-gradient"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect m-1 me-2" onClick={() => handleUpdateTheme("data-sidebar", "gradientsidebar2")}>
                        <input
                          type="radio"
                          name="data-sidebar"
                          id="gradientsidebar2Sidebar"
                          defaultValue="gradientsidebar2"
                           checked={
                            themeSettings["data-sidebar"] === "gradientsidebar2"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="gradientsidebar2Sidebar"
                          className="d-block rounded bg-primary-gradient"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect m-1 me-2" onClick={() => handleUpdateTheme("data-sidebar", "gradientsidebar3")}>
                        <input
                          type="radio"
                          name="data-sidebar"
                          id="gradientsidebar3Sidebar"
                          defaultValue="gradientsidebar3"
                           checked={
                            themeSettings["data-sidebar"] === "gradientsidebar3"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="gradientsidebar3Sidebar"
                          className="d-block rounded bg-secondary-gradient"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect m-1 me-2"  onClick={() => handleUpdateTheme("data-sidebar", "gradientsidebar4")}>
                        <input
                          type="radio"
                          name="data-sidebar"
                          id="gradientsidebar4Sidebar"
                          defaultValue="gradientsidebar4"
                            checked={
                            themeSettings["data-sidebar"] === "gradientsidebar4"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="gradientsidebar4Sidebar"
                          className="d-block rounded bg-dark-gradient"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect m-1 me-2" onClick={() => handleUpdateTheme("data-sidebar", "gradientsidebar5")}>
                        <input
                          type="radio"
                          name="data-sidebar"
                          id="gradientsidebar5Sidebar"
                          defaultValue="gradientsidebar5"
                           checked={
                            themeSettings["data-sidebar"] === "gradientsidebar5"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="gradientsidebar5Sidebar"
                          className="d-block rounded bg-purple-gradient"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect m-1 me-2" onClick={() => handleUpdateTheme("data-sidebar", "gradientsidebar6")}>
                        <input
                          type="radio"
                          name="data-sidebar"
                          id="gradientsidebar6Sidebar"
                          defaultValue="gradientsidebar6"
                           checked={
                            themeSettings["data-sidebar"] === "gradientsidebar6"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="gradientsidebar6Sidebar"
                          className="d-block rounded bg-orange-gradient"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect m-1" onClick={() => handleUpdateTheme("data-sidebar", "gradientsidebar7")}>
                        <input
                          type="radio"
                          name="data-sidebar"
                          id="gradientsidebar7Sidebar"
                          defaultValue="gradientsidebar7"
                          checked={
                            themeSettings["data-sidebar"] === "gradientsidebar7"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="gradientsidebar7Sidebar"
                          className="d-block rounded bg-info-gradient"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button fw-semibold fs-16"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#colorsetting"
                  aria-expanded="true"
                >
                  Top Bar Color
                </button>
              </h2>
              <div
                id="colorsetting"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body pb-1">
                  <div className="theme-content">
                    <h6 className="fs-14 fw-medium mb-2">Solid Colors</h6>
                    <div className="d-flex align-items-center flex-wrap topbar-background mb-1">
                      <div className="theme-colorselect mb-3 me-3"  onClick={() => handleUpdateTheme("data-topbar", "white")}>
                        <input
                          type="radio"
                          name="data-topbar"
                          id="whiteTopbar"
                          defaultValue="white"
                          checked={
                            themeSettings["data-topbar"] === "white"
                          }
                          readOnly
                        />
                        <label htmlFor="whiteTopbar" className="white-topbar">
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect mb-3 me-3" onClick={() => handleUpdateTheme("data-topbar", "topbar1")}>
                        <input
                          type="radio"
                          name="data-topbar"
                          id="topbar1Topbar"
                          defaultValue="topbar1"
                           checked={
                            themeSettings["data-topbar"] === "topbar1"
                          }
                          readOnly
                        />
                        <label htmlFor="topbar1Topbar" className="bg-light">
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect mb-3 me-3" onClick={() => handleUpdateTheme("data-topbar", "topbar2")}>
                        <input
                          type="radio"
                          name="data-topbar"
                          id="topbar2Topbar"
                          defaultValue="topbar2"
                           checked={
                            themeSettings["data-topbar"] === "topbar2"
                          }
                          readOnly
                        />
                        <label htmlFor="topbar2Topbar" className="bg-dark">
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect mb-3 me-3" onClick={() => handleUpdateTheme("data-topbar", "topbar3")}>
                        <input
                          type="radio"
                          name="data-topbar"
                          id="topbar3Topbar"
                          defaultValue="topbar3"
                           checked={
                            themeSettings["data-topbar"] === "topbar3"
                          }
                          readOnly
                        />
                        <label htmlFor="topbar3Topbar" className="bg-primary">
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect mb-3 me-3" onClick={() => handleUpdateTheme("data-topbar", "topbar4")}>
                        <input
                          type="radio"
                          name="data-topbar"
                          id="topbar4Topbar"
                          defaultValue="topbar4"
                           checked={
                            themeSettings["data-topbar"] === "topbar4"
                          }
                          readOnly
                        />
                        <label htmlFor="topbar4Topbar" className="bg-secondary">
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect mb-3 me-3" onClick={() => handleUpdateTheme("data-topbar", "topbar5")}>
                        <input
                          type="radio"
                          name="data-topbar"
                          id="topbar5Topbar"
                          defaultValue=""
                          checked={
                            themeSettings["data-topbar"] === "topbar5"
                          }
                          readOnly
                        />
                        <label htmlFor="topbar5Topbar" className="bg-info">
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect mb-3" onClick={() => handleUpdateTheme("data-topbar", "topbar6")}>
                        <input
                          type="radio"
                          name="data-topbar"
                          id="topbar6Topbar"
                          defaultValue="topbar6"
                           checked={
                            themeSettings["data-topbar"] === "topbar6"
                          }
                          readOnly
                        />
                        <label htmlFor="topbar6Topbar" className="bg-indigo">
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                    </div>
                    <h6 className="fs-14 fw-medium mb-2">Gradient Colors</h6>
                    <div className="d-flex align-items-center flex-wrap topbar-background">
                      <div className="theme-colorselect mb-3 me-3" onClick={() => handleUpdateTheme("data-topbar", "gradienttopbar1")}>
                        <input
                          type="radio"
                          name="data-topbar"
                          id="gradienttopbar1Topbar"
                          defaultValue="gradienttopbar1"
                            checked={
                            themeSettings["data-topbar"] === "gradienttopbar1"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="gradienttopbar1Topbar"
                          className="bg-indigo-gradient"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect mb-3 me-3"  onClick={() => handleUpdateTheme("data-topbar", "gradienttopbar2")}>
                        <input
                          type="radio"
                          name="data-topbar"
                          id="gradienttopbar2Topbar"
                          defaultValue="gradienttopbar2"
                            checked={
                            themeSettings["data-topbar"] === "gradienttopbar2"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="gradienttopbar2Topbar"
                          className="bg-primary-gradient"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect mb-3 me-3" onClick={() => handleUpdateTheme("data-topbar", "gradienttopbar3")}>
                        <input
                          type="radio"
                          name="data-topbar"
                          id="gradienttopbar3Topbar"
                          defaultValue="gradienttopbar3"
                          checked={
                            themeSettings["data-topbar"] === "gradienttopbar3"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="gradienttopbar3Topbar"
                          className="bg-secondary-gradient"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect mb-3 me-3" onClick={() => handleUpdateTheme("data-topbar", "gradienttopbar4")}>
                        <input
                          type="radio"
                          name="data-topbar"
                          id="gradienttopbar4Topbar"
                          defaultValue="gradienttopbar4"
                          checked={
                            themeSettings["data-topbar"] === "gradienttopbar4"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="gradienttopbar4Topbar"
                          className="bg-dark-gradient"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect mb-3 me-3" onClick={() => handleUpdateTheme("data-topbar", "gradienttopbar5")}>
                        <input
                          type="radio"
                          name="data-topbar"
                          id="gradienttopbar5Topbar"
                          defaultValue="gradienttopbar5"
                           checked={
                            themeSettings["data-topbar"] === "gradienttopbar5"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="gradienttopbar5Topbar"
                          className="bg-purple-gradient"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect mb-3 me-3" onClick={() => handleUpdateTheme("data-topbar", "gradienttopbar6")}>
                        <input
                          type="radio"
                          name="data-topbar"
                          id="gradienttopbar6Topbar"
                          defaultValue="gradienttopbar6"
                          checked={
                            themeSettings["data-topbar"] === "gradienttopbar6"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="gradienttopbar6Topbar"
                          className="bg-orange-gradient"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                      <div className="theme-colorselect mb-3 me-0" onClick={() => handleUpdateTheme("data-topbar", "gradienttopbar7")}>
                        <input
                          type="radio"
                          name="data-topbar"
                          id="gradienttopbar7Topbar"
                          defaultValue="gradienttopbar7"
                          checked={
                            themeSettings["data-topbar"] === "gradienttopbar7"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="gradienttopbar7Topbar"
                          className="bg-info-gradient"
                        >
                          <span className="theme-check rounded-circle">
                            <i className="ti ti-check" />
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button fw-semibold fs-16"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#sidebarcolor"
                  aria-expanded="true"
                >
                  Theme Colors
                </button>
              </h2>
              <div
                id="sidebarcolor"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body pb-2">
                  <div className="theme-content">
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="theme-colorsset me-2 mb-2" onClick={() => handleUpdateTheme("data-color", "primary")}>
                        <input
                          type="radio"
                          name="data-color"
                          id="primaryColor"
                          defaultValue="primary"
                          checked={
                            themeSettings["data-color"] === "primary"
                          }
                          readOnly
                        />
                        <label htmlFor="primaryColor" className="primary-clr" />
                      </div>
                      <div className="theme-colorsset me-2 mb-2" onClick={() => handleUpdateTheme("data-color", "secondary")}>
                        <input
                          type="radio"
                          name="data-color"
                          id="secondaryColor"
                          defaultValue="secondary"
                           checked={
                            themeSettings["data-color"] === "secondary"
                          }
                          readOnly
                        />
                        <label
                          htmlFor="secondaryColor"
                          className="secondary-clr"
                        />
                      </div>
                      <div className="theme-colorsset me-2 mb-2" onClick={() => handleUpdateTheme("data-color", "orange")}>
                        <input
                          type="radio"
                          name="data-color"
                          id="orangeColor"
                          defaultValue="orange"
                          checked={
                            themeSettings["data-color"] === "orange"
                          }
                          readOnly
                        />
                        <label htmlFor="orangeColor" className="orange-clr" />
                      </div>
                      <div className="theme-colorsset me-2 mb-2" onClick={() => handleUpdateTheme("data-color", "teal")}>
                        <input
                          type="radio"
                          name="data-color"
                          id="tealColor"
                          defaultValue="teal"
                          checked={
                            themeSettings["data-color"] === "teal"
                          }
                          readOnly
                        />
                        <label htmlFor="tealColor" className="teal-clr" />
                      </div>
                      <div className="theme-colorsset me-2 mb-2" onClick={() => handleUpdateTheme("data-color", "purple")}>
                        <input
                          type="radio"
                          name="data-color"
                          id="purpleColor"
                          defaultValue="purple"
                          checked={
                            themeSettings["data-color"] === "purple"
                          }
                          readOnly
                        />
                        <label htmlFor="purpleColor" className="purple-clr" />
                      </div>
                      <div className="theme-colorsset me-2 mb-2" onClick={() => handleUpdateTheme("data-color", "indigo")}>
                        <input
                          type="radio"
                          name="data-color"
                          id="indigoColor"
                          defaultValue="indigo"
                          checked={
                            themeSettings["data-color"] === "indigo"
                          }
                          readOnly
                        />
                        <label htmlFor="indigoColor" className="indigo-clr" />
                      </div>
                      <div className="theme-colorsset mb-2" onClick={() => handleUpdateTheme("data-color", "info")}>
                        <input
                          type="radio"
                          name="data-color"
                          id="infoColor"
                          defaultValue="info"
                           checked={
                            themeSettings["data-color"] === "info"
                          }
                          readOnly
                        />
                        <label htmlFor="infoColor" className="info-clr" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2 px-3 py-2 offcanvas-header border-top">
          <button
            type="button"
            className="btn w-50 btn-light"
            id="reset-layout"
             onClick={handleResetTheme}
          >
            <i className="ti ti-restore me-1" />
            Reset
          </button>
          <button type="button" className="btn w-50 btn-primary">
            Buy Product
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(ThemeSettings);