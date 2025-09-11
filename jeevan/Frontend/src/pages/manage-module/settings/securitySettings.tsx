import { Link } from "react-router-dom";
import CommonFooter from "../../../components/common-footer/commonFooter";
import { all_routes } from "../../../routes/all_routes";
import SettingsTabs from "./SettingsTabs";
import  { useState } from "react";

const SecuritySettings = () => {
  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPhonePassword, setShowPhonePassword] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);

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
                  <li className="breadcrumb-item active">Security</li>
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
                <h5 className="mb-0 pt-2">Security</h5>
              </div>
              <div className="card-body">
                {/* Items */}
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-4 pb-4">
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <span className="avatar avatar-lg border bg-light flex-shrink-0">
                      <i className="ti ti-lock-check text-dark fs-24" />
                    </span>
                    <div>
                      <h6 className="fw-semibold fs-14 mb-1">Password</h6>
                      <p className="mb-0">
                        Set a unique password to secure the account
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="badge badge-soft-purple me-2">
                      Last Changed, Mar 18, 2025
                    </span>
                    <Link
                      to="#"
                      className="btn btn-outline-light"
                      data-bs-toggle="modal"
                      data-bs-target="#change_password"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
                {/* Items */}
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-4 pb-4">
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <span className="avatar avatar-lg border bg-light">
                      <i className="ti ti-shield-half text-dark fs-24" />
                    </span>
                    <div>
                      <h6 className="fw-semibold fs-14 mb-1">
                        Two Factor authentication
                      </h6>
                      <p className="mb-0">
                        Use your mobile phone to receive security PIN.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    <span className="badge badge-soft-purple">
                      Enabled, Mar 18, 2025
                    </span>
                    <label className="d-flex align-items-center form-switch ps-2">
                      <input
                        className="form-check-input m-0 me-2"
                        type="checkbox"
                        defaultChecked
                      />
                    </label>
                    <Link
                      to="#"
                      className="btn btn-outline-light"
                      data-bs-toggle="modal"
                      data-bs-target="#two-factor"
                    >
                      Configure
                    </Link>
                  </div>
                </div>
                {/* Items */}
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-4 pb-4">
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <span className="avatar avatar-lg border bg-light">
                      <i className="ti ti-brand-google-filled text-dark fs-24" />
                    </span>
                    <div>
                      <h6 className="fw-semibold fs-14 mb-1">
                        Google Authentication
                      </h6>
                      <p className="mb-0">Connect to Google</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    <span className="badge badge-soft-success">Connected</span>
                    <label className="d-flex align-items-center form-switch ps-2">
                      <input
                        className="form-check-input m-0 me-2"
                        type="checkbox"
                        defaultChecked
                      />
                    </label>
                  </div>
                </div>
                {/* Items */}
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-4 pb-4">
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <span className="avatar avatar-lg border bg-light">
                      <i className="ti ti-phone text-dark fs-24" />
                    </span>
                    <div>
                      <h6 className="fw-semibold fs-14 mb-1">Phone Number</h6>
                      <p className="mb-0">
                        Phone Number associated with the account
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <span className="badge badge-soft-success">Verified</span>
                    <Link
                      to="#"
                      className="btn btn-outline-light"
                      data-bs-toggle="modal"
                      data-bs-target="#change_phonenumber"
                    >
                      Edit
                    </Link>
                    <Link
                      to="#"
                      className="btn btn-outline-light"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
                {/* Items */}
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-4 pb-4">
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <span className="avatar avatar-lg border bg-light">
                      <i className="ti ti-mail text-dark fs-24" />
                    </span>
                    <div>
                      <h6 className="fw-semibold fs-14 mb-1">Email Address</h6>
                      <p className="mb-0">
                        Email Address associated with the account
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <span className="badge badge-soft-success">Verified</span>
                    <Link
                      to="#"
                      className="btn btn-outline-light"
                      data-bs-toggle="modal"
                      data-bs-target="#change_email"
                    >
                      Edit
                    </Link>
                    <Link
                      to="#"
                      className="btn btn-outline-light"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
                {/* Items */}
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-4 pb-4">
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <span className="avatar avatar-lg border bg-light">
                      <i className="ti ti-device-laptop text-dark fs-24" />
                    </span>
                    <div>
                      <h6 className="fw-semibold fs-14 mb-1">
                        Browsers &amp; Devices
                      </h6>
                      <p className="mb-0">
                        The browsers &amp; devices associated with the account
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <Link
                      to="#"
                      className="btn btn-outline-light"
                      data-bs-toggle="modal"
                      data-bs-target="#browse_device"
                    >
                      Edit
                    </Link>
                    <Link
                      to="#"
                      className="btn btn-outline-light"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
                {/* Items */}
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-4 pb-4">
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <span className="avatar avatar-lg border bg-light">
                      <i className="ti ti-xbox-x text-dark fs-24" />
                    </span>
                    <div>
                      <h6 className="fw-semibold fs-14 mb-1">
                        Deactivate Account
                      </h6>
                      <p className="mb-0">
                        This will shutdown your account. Your account will be
                        reactive when you sign in again
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <Link
                      to="#"
                      className="btn btn-outline-light"
                      data-bs-toggle="modal"
                      data-bs-target="#deactivate_account"
                    >
                      Deactivate
                    </Link>
                  </div>
                </div>
                {/* Items */}
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <span className="avatar avatar-lg border bg-light">
                      <i className="ti ti-trash text-dark fs-24" />
                    </span>
                    <div>
                      <h6 className="fw-semibold fs-14 mb-1">Delete Account</h6>
                      <p className="mb-0">
                        Your account will be permanently deleted
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <Link
                      to="#"
                      className="btn btn-outline-light"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_account"
                    >
                      Delete
                    </Link>
                  </div>
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
      <>
        {/* Start Password Modal */}
        <div className="modal fade" id="change_password">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="text-dark modal-title fw-bold text-truncate">
                  Change Password
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-modal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-circle-x-filled" />
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">
                      Current Password <span className="text-danger">*</span>
                    </label>
                    <div className="input-group input-group-flat pass-group">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        className="form-control pass-input"
                      />
                      <span className="input-group-text toggle-password " style={{ cursor: 'pointer' }} onClick={() => setShowCurrentPassword((v) => !v)}>
                        <i className={`ti ${showCurrentPassword ? "ti-eye" : "ti-eye-off"}`} />
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      New Password <span className="text-danger">*</span>
                    </label>
                    <div className="input-group input-group-flat pass-group">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="form-control pass-input"
                      />
                      <span className="input-group-text toggle-password " style={{ cursor: 'pointer' }} onClick={() => setShowNewPassword((v) => !v)}>
                        <i className={`ti ${showNewPassword ? "ti-eye" : "ti-eye-off"}`} />
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <div className="input-group input-group-flat pass-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control pass-input"
                      />
                      <span className="input-group-text toggle-password " style={{ cursor: 'pointer' }} onClick={() => setShowConfirmPassword((v) => !v)}>
                        <i className={`ti ${showConfirmPassword ? "ti-eye" : "ti-eye-off"}`} />
                      </span>
                    </div>
                  </div>
                  
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-white me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* End Password Modal */}
        {/* Start Change Phone Number Modal */}
        <div className="modal fade" id="change_phonenumber">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="text-dark modal-title fw-bold text-truncate">
                  Change Phone Number
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-modal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-circle-x-filled" />
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">
                      Current Phone Number{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control w-100"
                      name="phone"
                      placeholder="123-456-7890"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      New Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control w-100"
                      name="phone"
                      placeholder="987-654-3218"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">
                      Current Password <span className="text-danger">*</span>
                    </label>
                    <div className="input-group input-group-flat pass-group">
                      <input
                        type={showPhonePassword ? "text" : "password"}
                        className="form-control pass-input"
                      />
                      <span className="input-group-text toggle-password " style={{ cursor: 'pointer' }} onClick={() => setShowPhonePassword((v) => !v)}>
                        <i className={`ti ${showPhonePassword ? "ti-eye" : "ti-eye-off"}`} />
                      </span>
                    </div>
                  </div>
                 
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-white me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* End Change Phone Number Modal */}
        {/* Start Mail Modal */}
        <div className="modal fade" id="change_email">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="text-dark modal-title fw-bold text-truncate">
                  Change Email
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-modal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-circle-x-filled" />
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">
                      Current Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="john@example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      New Email<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="baskar@example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Current Password <span className="text-danger">*</span>
                    </label>
                    <div className="input-group input-group-flat pass-group">
                      <input
                        type={showEmailPassword ? "text" : "password"}
                        className="form-control pass-input"
                      />
                      <span className="input-group-text toggle-password " style={{ cursor: 'pointer' }} onClick={() => setShowEmailPassword((v) => !v)}>
                        <i className={`ti ${showEmailPassword ? "ti-eye" : "ti-eye-off"}`} />
                      </span>
                    </div>
                  </div>
                  
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-white me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* End Mail Modal */}
        {/* Start Browse Modal */}
        <div className="modal fade" id="browse_device">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="text-dark modal-title fw-bold text-truncate">
                  Browsers &amp; Devices
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-modal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-circle-x-filled" />
                </button>
              </div>
              <div className="modal-body">
                <div className="table-responsive table-nowrap">
                  <table className="table border mb-0">
                    <thead>
                      <tr>
                        <th>Device</th>
                        <th>Date</th>
                        <th>IP Address</th>
                        <th>Location</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Chrome - Windows</td>
                        <td>17 Jun 2025</td>
                        <td>232.222.12.72</td>
                        <td>New York / USA</td>
                        <td className="text-end">
                          <Link
                            to="#"
                            className="btn btn-icon btn-outline-light me-1"
                          >
                            <i className="ti ti-logout" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Safari Macos</td>
                        <td>10 Jun 2025</td>
                        <td>224.111.12.75</td>
                        <td>New York / USA</td>
                        <td className="text-end">
                          <Link
                            to="#"
                            className="btn btn-icon btn-outline-light me-1"
                          >
                            <i className="ti ti-logout" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Firefox Windows</td>
                        <td>22 May 2025</td>
                        <td>111.222.13.28</td>
                        <td>New York / USA</td>
                        <td className="text-end">
                          <Link
                            to="#"
                            className="btn btn-icon btn-outline-light me-1"
                          >
                            <i className="ti ti-logout" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Safari Macos</td>
                        <td>15 Jan 2025</td>
                        <td>333.555.10.54</td>
                        <td>New York / USA</td>
                        <td className="text-end">
                          <Link
                            to="#"
                            className="btn btn-icon btn-outline-light me-1"
                          >
                            <i className="ti ti-logout" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>{" "}
                {/* end table */}
              </div>
            </div>
          </div>
        </div>
        {/* End Browse Modal */}
        {/* Start Deactive Modal */}
        <div id="deactivate_account" className="modal fade">
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-body p-4 text-center">
                <div className="mb-2">
                  <span className="avatar avatar-md rounded-circle bg-danger">
                    <i className="ti ti-trash fs-24" />
                  </span>
                </div>
                <div className="mb-4">
                  <h5 className="mb-1"> Deactivate Account </h5>
                  <p className="mb-0">Are you sure you want to deactivate ? </p>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <Link
                    to="#"
                    className="btn btn-white w-100"
                    data-bs-dismiss="modal"
                  >
                    Keep Active
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-danger w-100"
                    data-bs-dismiss="modal"
                  >
                    Yes, Deactivate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Deactive Modal */}
        {/* Start Delete Modal  */}
        <div className="modal fade" id="delete_modal">
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-body text-center">
                <div className="mb-2">
                  <span className="avatar avatar-md rounded-circle bg-danger">
                    <i className="ti ti-trash fs-24" />
                  </span>
                </div>
                <h6 className="fs-16 mb-1">Confirm Deletion</h6>
                <p className="mb-3">Are you sure you want to delete this?</p>
                <div className="d-flex justify-content-center gap-2">
                  <Link
                    to="#"
                    className="btn btn-white w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link to="#" className="btn btn-danger w-100">
                    Yes, Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Delete Modal  */}
        {/* Start Delete Account */}
        <div className="modal fade" id="delete_account">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="text-dark modal-title fw-bold text-truncate">
                  Delete Account
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-modal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-circle-x-filled" />
                </button>
              </div>
              <form >
                <div className="modal-body">
                  <div className="mb-3">
                    <h6 className="fs-14 fw-semibold mb-2">
                      {" "}
                      Why Are You Deleting Your Account?{" "}
                    </h6>
                    <p className="fs-13 mb-0">
                      {" "}
                      We're sorry to see you go! To help us improve, please let
                      us know your reason for deleting your account
                    </p>
                  </div>
                  <div className="mb-3 d-flex align-items-center gap-2">
                    <div className="form-check mb-1">
                      <input
                        type="radio"
                        name="customRadio"
                        className="form-check-input"
                      />
                    </div>
                    <div>
                      <h6 className="mb-1 fs-14 fw-medium">
                        No longer using the service{" "}
                      </h6>
                      <p className="fs-13 mb-0">
                        I no longer need this service and won’t be using it in
                        the future.
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 d-flex align-items-center gap-2">
                    <div className="form-check mb-1">
                      <input
                        type="radio"
                        name="customRadio"
                        className="form-check-input"
                      />
                    </div>
                    <div>
                      <h6 className="mb-1 fs-14 fw-medium">Privacy concerns</h6>
                      <p className="fs-13 mb-0">
                        I am concerned about how my data is handled and want to
                        remove
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 d-flex align-items-center gap-2">
                    <div className="form-check mb-1">
                      <input
                        type="radio"
                        name="customRadio"
                        className="form-check-input"
                      />
                    </div>
                    <div>
                      <h6 className="mb-1 fs-14 fw-medium">
                        Too many notifications/emails{" "}
                      </h6>
                      <p className="fs-13 mb-0">
                        I’m overwhelmed by the volume of notifications or emails
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 d-flex align-items-center gap-2">
                    <div className="form-check mb-1">
                      <input
                        type="radio"
                        name="customRadio"
                        className="form-check-input"
                      />
                    </div>
                    <div>
                      <h6 className="mb-1 fs-14 fw-medium">
                        Poor user experience
                      </h6>
                      <p className="fs-13 mb-0">
                        I’ve had difficulty using the platform, and it didn’t
                        meet my expectations
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 d-flex align-items-center gap-2">
                    <div className="form-check mb-1">
                      <input
                        type="radio"
                        name="customRadio"
                        className="form-check-input"
                      />
                    </div>
                    <div>
                      <h6 className="mb-0 fs-14 fw-medium">
                        Other (Please specify)
                      </h6>
                    </div>
                  </div>
                  <div className="">
                    <label className="form-label mb-1">Reason</label>
                    <textarea
                      rows={4}
                      placeholder="Reason"
                      className="form-control "
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-white me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-danger">
                  Delete Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* End Delete Modal */}
      </>
    </>
  );
};

export default SecuritySettings;
