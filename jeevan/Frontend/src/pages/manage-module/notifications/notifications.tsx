import { Link } from "react-router-dom";
import CommonFooter from "../../../components/common-footer/commonFooter";
import { all_routes } from "../../../routes/all_routes";
import ImageWithBasePath from "../../../components/image-with-base-path";

const Notifications = () => {
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
              <h4 className="mb-1">Notifications</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Notifications</li>
                </ol>
              </div>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              <Link
                to="#"
                className="btn btn-icon btn-white"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Refresh"
                data-bs-original-title="Refresh"
              >
                <i className="ti ti-refresh" />
              </Link>
            </div>
          </div>
          {/* End Page Header */}
          <div className="card mb-0">
            <div className="card-header d-flex align-items-center flex-wrap gap-3 justify-content-between">
              <h5 className="d-inline-flex align-items-center mb-0">
                Notifications<span className="badge bg-danger ms-2">04</span>
              </h5>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <Link to="#" className="btn btn-outline-light">
                  <i className="ti ti-checks me-1" />
                  Mark all as read
                </Link>
                <Link
                  to="#"
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_modal"
                >
                  <i className="ti ti-trash me-1" />
                  Delete All
                </Link>
              </div>
            </div>
            <div className="card-body">
              {/* Item - 1 */}
              <div className="card notication-card mb-3">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      <Link
                        to={all_routes.patientDetails}
                        className="avatar flex-shrink-0"
                      >
                        <ImageWithBasePath
                          src="./assets/img/avatars/avatar-28.jpg"
                          alt="patient"
                          className="rounded-circle"
                        />
                      </Link>
                      <div className="ms-2">
                        <div>
                          <p className="mb-1">
                            <Link
                              to={all_routes.patientDetails}
                              className="fw-medium"
                            >
                              John Doe
                            </Link>{" "}
                            added new patient{" "}
                            <Link
                              to={all_routes.appointments}
                              className="fw-medium"
                            >
                              appointment booking
                            </Link>
                          </p>
                          <p className="fs-12 mb-0 d-inline-flex align-items-center">
                            <i className="ti ti-clock me-1" /> 4 min ago
                            <span className="ms-2">
                              <i className="ti ti-point-filled text-danger fs-16 lh-sm" />
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="noti-btn">
                      <Link
                        to="#"
                        className="btn btn-danger d-inline-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="ti ti-trash me-1" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Item - 2 */}
              <div className="card notication-card mb-3">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      <Link
                        to={all_routes.patientDetails}
                        className="avatar flex-shrink-0"
                      >
                        <ImageWithBasePath
                          src="./assets/img/avatars/avatar-30.jpg"
                          alt="patient"
                          className="rounded-circle"
                        />
                      </Link>
                      <div className="ms-2">
                        <div>
                          <p className="mb-1">
                            <Link
                              to={all_routes.patientDetails}
                              className="fw-medium"
                            >
                              Thomas William
                            </Link>{" "}
                            booked a new appointment.
                          </p>
                          <p className="fs-12 mb-0 d-inline-flex align-items-center">
                            <i className="ti ti-clock me-1" /> 15 min ago
                            <span className="ms-2">
                              <i className="ti ti-point-filled text-danger fs-16 lh-sm" />
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="noti-btn">
                      <Link
                        to="#"
                        className="btn btn-danger d-inline-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="ti ti-trash me-1" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Item - 3 */}
              <div className="card notication-card mb-3">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      <Link
                        to={all_routes.patientDetails}
                        className="avatar flex-shrink-0"
                      >
                        <ImageWithBasePath
                          src="./assets/img/avatars/avatar-29.jpg"
                          alt="patient"
                          className="rounded-circle"
                        />
                      </Link>
                      <div className="ms-2">
                        <div>
                          <p className="mb-1">
                            <Link
                              to={all_routes.patientDetails}
                              className="fw-medium"
                            >
                              Sarah Anderson
                            </Link>{" "}
                            has been successfully booked for{" "}
                            <span className="text-dark fw-medium">
                              April 5 at 10:00 AM.
                            </span>
                          </p>
                          <p className="fs-12 mb-0 d-inline-flex align-items-center">
                            <i className="ti ti-clock me-1" /> 45 Min Ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="noti-btn">
                      <Link
                        to="#"
                        className="btn btn-danger d-inline-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="ti ti-trash me-1" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Item - 4 */}
              <div className="card notication-card mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      <Link
                        to={all_routes.patientDetails}
                        className="avatar flex-shrink-0"
                      >
                        <ImageWithBasePath
                          src="./assets/img/avatars/avatar-31.jpg"
                          alt="patient"
                          className="rounded-circle"
                        />
                      </Link>
                      <div className="ms-2">
                        <div>
                          <p className="mb-1">
                            <Link
                              to={all_routes.patientDetails}
                              className="fw-medium"
                            >
                              Ann McClure
                            </Link>{" "}
                            cancelled her appointment scheduled for{" "}
                            <span className="text-dark fw-medium">
                              February 5, 2024
                            </span>
                          </p>
                          <p className="fs-12 mb-0 d-inline-flex align-items-center">
                            <i className="ti ti-clock me-1" /> 58 Min Ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="noti-btn">
                      <Link
                        to="#"
                        className="btn btn-danger d-inline-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="ti ti-trash me-1" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
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

export default Notifications;
