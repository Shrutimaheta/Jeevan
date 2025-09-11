import { Link } from "react-router-dom";
import CommonFooter from "../../../components/common-footer/commonFooter";
import { all_routes } from "../../../routes/all_routes";
import SettingsTabs from "./SettingsTabs";

const UserPermissionsSettings = () => {
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
                  <li className="breadcrumb-item active">Permissions</li>
                </ol>
              </div>
            </div>
          </div>
          {/* End Page Header */}
          {/* Start Tabs */}
          <SettingsTabs />
          {/* End Tabs */}
          {/* card start */}
          <div className="card mb-0">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h5 className="d-inline-flex align-items-center mb-0">
                Total Roles<span className="badge bg-danger ms-2">6</span>
              </h5>
              <div>
                <Link
                  to="#"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#add_role"
                >
                  <i className="ti ti-square-rounded-plus me-1" />
                  New Role
                </Link>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive table-nowrap">
                <table className="table border mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Role</th>
                      <th>Created Date</th>
                      <th>Status</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Owner</td>
                      <td>22 Jun 2025</td>
                      <td>
                        <span className="badge badge-soft-success">Active</span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Permission actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_role"
                            >
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-1" />
                              Delete
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.permissionSettings}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-shield me-1" />
                              Permissions
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Admin</td>
                      <td>17 Jun 2025</td>
                      <td>
                        <span className="badge badge-soft-success">Active</span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Permission actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_role"
                            >
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-1" />
                              Delete
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.permissionSettings}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-shield me-1" />
                              Permissions
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Patient</td>
                      <td>10 Jun 2025</td>
                      <td>
                        <span className="badge badge-soft-danger">
                          Inactive
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Permission actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_role"
                            >
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-1" />
                              Delete
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.permissionSettings}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-shield me-1" />
                              Permissions
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Doctor</td>
                      <td>22 May 2025</td>
                      <td>
                        <span className="badge badge-soft-success">Active</span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Permission actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_role"
                            >
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-1" />
                              Delete
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.permissionSettings}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-shield me-1" />
                              Permissions
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Nurse</td>
                      <td>15 May 2025</td>
                      <td>
                        <span className="badge badge-soft-danger">
                          Inactive
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Permission actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_role"
                            >
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-1" />
                              Delete
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.permissionSettings}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-shield me-1" />
                              Permissions
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Supervisor</td>
                      <td>30 Apr 2025</td>
                      <td>
                        <span className="badge badge-soft-success">Active</span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Permission actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_role"
                            >
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-1" />
                              Delete
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.permissionSettings}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-shield me-1" />
                              Permissions
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Pharmasist</td>
                      <td>15 Jan 2025</td>
                      <td>
                        <span className="badge badge-soft-danger">
                          Inactive
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Permission actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_role"
                            >
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-1" />
                              Delete
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.permissionSettings}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-shield me-1" />
                              Permissions
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* card end */}
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
        {/* Start Add Modal */}
        <div className="modal fade" id="add_role">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="text-dark modal-title fw-bold text-truncate">
                  Add New Role
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
                  <div>
                    <label className="form-label">Rols</label>
                    <input type="text" className="form-control" />
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
                    Add Role
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* End Add Modal */}
        {/* Start Edit Modal */}
        <div className="modal fade" id="edit_role">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="text-dark modal-title fw-bold text-truncate">
                  Edit Role
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
                    <label className="form-label">Rols</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Doctor"
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <label className="form-label mb-0">Status</label>
                    <label className="d-flex align-items-center form-switch ps-2">
                      <input
                        className="form-check-input m-0 me-2"
                        type="checkbox"
                        defaultChecked
                      />
                    </label>
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
        {/* End Role Modal */}
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
      </>
    </>
  );
};

export default UserPermissionsSettings;
