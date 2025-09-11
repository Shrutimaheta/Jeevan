import { Link } from "react-router-dom";
import CommonFooter from "../../../components/common-footer/commonFooter";
import { all_routes } from "../../../routes/all_routes";
import SettingsTabs from "./SettingsTabs";
import {
  FontFamily,
  LanguageSettings,
  SidebarSize,
  Timezone,
} from "../../../core/json/selectOption";
import CommonSelect from "../../../components/common-select/commonSelect";
import ImageWithBasePath from "../../../components/image-with-base-path";

const AppearanceSettings = () => {
  return (
    <>
      {/* ========================
              Start Page Content
          ========================= */}
      <div className="page-wrapper">
        {/* Start Content */}
        <div className="content">
          {/* Page Header */}
          <div className="d-flex align-items-center justify-content-between gap-2 mb-4 flex-wrap">
            <div className="breadcrumb-arrow">
              <h4 className="mb-1">Settings</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={all_routes.generalSettings}>Settings</Link>
                  </li>
                  <li className="breadcrumb-item active">Appearence</li>
                </ol>
              </div>
            </div>
          </div>
          {/* End Page Header */}
          {/* Start Tabs */}
          <SettingsTabs />
          {/* End Tabs */}
          {/* Start form */}
          <form>
            <div className="card mb-0">
              <div className="card-header border-0 pb-1">
                <h5 className="mb-0 pt-2">Appearance</h5>
              </div>
              <div className="card-body">
                {/* start row */}
                <div className="row align-items-center mb-4">
                  <div className="col-xl-7 col-md-4">
                    <div className="mb-3 ">
                      <h6 className="mb-1 fs-14 fw-medium">Select Theme</h6>
                      <span className="fs-13">Choose theme of website</span>
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="col-xl-5 col-md-8">
                    {/* start row */}
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <div className="card theme-image mb-lg-0">
                          <div className="card-body p-2">
                            <Link to="#">
                              <div className="border rounded border-gray mb-2">
                                <ImageWithBasePath
                                  src="assets/img/theme/light.jpg"
                                  className="img-fluid rounded w-100"
                                  alt="theme"
                                />
                              </div>
                              <p className="text-center fw-medium mb-0 fs-13 text-primary">
                                Light
                              </p>
                            </Link>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                      <div className="col-md-4">
                        <div className="card theme-image  mb-lg-0">
                          <div className="card-body p-2">
                            <Link to="#">
                              <div className="border rounded border-gray mb-2">
                                <ImageWithBasePath
                                  src="assets/img/theme/dark.jpg"
                                  className="img-fluid rounded w-100"
                                  alt="theme"
                                />
                              </div>
                              <p className="text-center fw-medium mb-0 fs-13 text-primary">
                                Dark
                              </p>
                            </Link>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                      <div className="col-md-4">
                        <div className="card theme-image  mb-lg-0">
                          <div className="card-body p-2">
                            <Link to="#">
                              <div className="border rounded border-gray mb-2">
                                <ImageWithBasePath
                                  src="assets/img/theme/automatic.jpg"
                                  className="img-fluid rounded w-100"
                                  alt="theme"
                                />
                              </div>
                              <p className="text-center fw-medium mb-0 fs-13 text-primary">
                                Automatic
                              </p>
                            </Link>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                    </div>
                    {/* end row */}
                  </div>{" "}
                  {/* end col */}
                </div>
                {/* end row */}
                {/* start row */}
                <div className="row align-items-center">
                  <div className="col-xl-7 col-md-4">
                    <div className="mb-4">
                      <h6 className="mb-1 fs-14 fw-medium">Accent Color</h6>
                      <span className="fs-13">
                        Choose accent colour of website
                      </span>
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="col-xl-5 col-md-8">
                    <div className="d-flex align-items-center justify-content-xl-end justify-content-start flex-wrap mb-4 gap-2">
                      <div className="theme-colorsset">
                        <input
                          type="radio"
                          name="color"
                          id="primarycolor"
                          defaultChecked
                        />
                        <label htmlFor="primarycolor" className="primary-clr" />
                      </div>
                      <div className="theme-colorsset">
                        <input type="radio" name="color" id="secondarycolor" />
                        <label
                          htmlFor="secondarycolor"
                          className="secondary-clr"
                        />
                      </div>
                      <div className="theme-colorsset">
                        <input type="radio" name="color" id="successcolor" />
                        <label htmlFor="successcolor" className="success-clr" />
                      </div>
                      <div className="theme-colorsset">
                        <input type="radio" name="color" id="dangercolor" />
                        <label htmlFor="dangercolor" className="danger-clr" />
                      </div>
                      <div className="theme-colorsset">
                        <input type="radio" name="color" id="infocolor" />
                        <label htmlFor="infocolor" className="info-clr" />
                      </div>
                      <div className="theme-colorsset">
                        <input type="radio" name="color" id="warningcolor" />
                        <label htmlFor="warningcolor" className="warning-clr" />
                      </div>
                    </div>
                  </div>{" "}
                  {/* end col */}
                </div>
                {/* end row */}
                {/* start row */}
                <div className="row align-items-centergap-lg-0 gap-md-0 gap-2 mb-4">
                  <div className="col-xl-9 col-md-4">
                    <div>
                      <h6 className="mb-1 fs-14 fw-medium">Expand Sidebar</h6>
                      <span className="fs-13">Choose expand sidebar</span>
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="col-xl-3 col-md-4 d-flex align-items-center justify-content-xl-end">
                    <label className="d-flex align-items-center justify-content-xl-end form-switch ps-2">
                      <input
                        className="form-check-input m-0 me-2"
                        type="checkbox"
                        defaultChecked
                      />
                    </label>
                  </div>{" "}
                  {/* end col */}
                </div>
                {/* end row */}
                {/* start row */}
                <div className="row align-items-centergap-lg-0 gap-md-0 gap-2 mb-4">
                  <div className="col-xl-9 col-md-4">
                    <div>
                      <h6 className="mb-1 fs-14 fw-medium">Timezone</h6>
                      <span className="fs-13">Select timezone to display</span>
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="col-xl-3 col-md-4">
                    <div>
                      <CommonSelect
                        options={Timezone}
                        className="select"
                        defaultValue={Timezone[0]}
                      />
                    </div>
                  </div>{" "}
                  {/* end col */}
                </div>
                {/* end row */}
                {/* start row */}
                <div className="row align-items-centergap-lg-0 gap-md-0 gap-2 mb-4">
                  <div className="col-xl-9 col-md-4">
                    <div>
                      <h6 className="mb-1 fs-14 fw-medium">Language</h6>
                      <span className="fs-13">Select language to display</span>
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="col-xl-3 col-md-4">
                    <div>
                      <CommonSelect
                        options={LanguageSettings}
                        className="select"
                        defaultValue={LanguageSettings[0]}
                      />
                    </div>
                  </div>{" "}
                  {/* end col */}
                </div>
                {/* end row */}
                {/* start row */}
                <div className="row align-items-centergap-lg-0 gap-md-0 gap-2 mb-4">
                  <div className="col-xl-9 col-md-4">
                    <div>
                      <h6 className="mb-1 fs-14 fw-medium">Sidebar Size</h6>
                      <span className="fs-13">Choose expand sidebary</span>
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="col-xl-3 col-md-4">
                    <CommonSelect
                      options={SidebarSize}
                      className="select"
                      defaultValue={SidebarSize[0]}
                    />
                  </div>{" "}
                  {/* end col */}
                </div>
                {/* end row */}
                {/* start row */}
                <div className="row align-items-centergap-lg-0 gap-md-0 gap-2 mb-0">
                  <div className="col-xl-9 col-md-4">
                    <div>
                      <h6 className="mb-1 fs-14 fw-medium">Font Family</h6>
                      <span className="fs-13">
                        Select font family of website
                      </span>
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="col-xl-3 col-md-4">
                    <CommonSelect
                      options={FontFamily}
                      className="select"
                      defaultValue={FontFamily[0]}
                    />
                  </div>{" "}
                  {/* end col */}
                </div>
                {/* end row */}
                <div className="d-flex align-items-center justify-content-end gap-2 border-top mt-4 pt-3">
                  <button
                    type="button"
                    className="btn btn-outline-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
          {/* End form */}
        </div>
        {/* End Content */}
        {/* Start Footer */}
        <CommonFooter />
        {/* End Footer */}
      </div>
      {/* ========================
              End Page Content
          ========================= */}
    </>
  );
};

export default AppearanceSettings;
