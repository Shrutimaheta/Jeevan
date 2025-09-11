import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import { all_routes } from "../../routes/all_routes";
import ImageWithBasePath from "../../components/image-with-base-path";
import CommonSelect from "../../components/common-select/commonSelect";
import { Assignee, Priority } from "../../core/json/selectOption";
import CommonDatePicker from "../../components/common-date-picker/commonDatePicker";
import Texteditor from "../../components/text-editor/texteditor";

const Notes = () => {
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
              <h4 className="mb-1">Notes</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Applications</Link>
                  </li>
                  <li className="breadcrumb-item active">Notes</li>
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
              <Link
                to="#"
                className="btn btn-icon btn-white"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Print"
                data-bs-original-title="Print"
              >
                <i className="ti ti-printer" />
              </Link>
              <Link
                to="#"
                className="btn btn-icon btn-white"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Download"
                data-bs-original-title="Download"
              >
                <i className="ti ti-cloud-download" />
              </Link>
            </div>
          </div>
          {/* End Page Header */}
          <div className="card shadow-none mb-0">
            <div className="card-body p-0">
              <div className="row g-0">
                <div className="col-lg-3 col-md-4 d-flex">
                  <div className="border-end p-4 flex-fill">
                    <div>
                      <div className="mb-3">
                        <Link
                          to="#"
                          className="btn btn-primary btn-lg w-100"
                          data-bs-toggle="modal"
                          data-bs-target="#add_note"
                        >
                          <i className="ti ti-square-rounded-plus me-1" />
                          Add Task
                        </Link>
                      </div>
                      <div className="border-bottom pb-3 mb-3">
                        <div className="nav flex-column nav-pills">
                          <Link
                            to="#"
                            className="d-flex text-start align-items-center fw-medium fs-14 bg-light rounded p-2 mb-1"
                          >
                            <i className="ti ti-inbox me-2" />
                            All Notes{" "}
                            <span className="avatar avatar-xs ms-auto bg-danger rounded-circle">
                              6
                            </span>
                          </Link>
                          <Link
                            to="#"
                            className="d-flex text-start align-items-center fw-medium fs-14 rounded p-2 mb-1"
                          >
                            <i className="ti ti-star me-2" />
                            Starred
                          </Link>
                          <Link
                            to="#"
                            className="d-flex text-start align-items-center fw-medium fs-14 rounded p-2 mb-0"
                          >
                            <i className="ti ti-trash me-2" />
                            Trash
                          </Link>
                          <Link
                            to="#"
                            className="d-flex text-start align-items-center fw-medium fs-14 rounded p-2 mb-0"
                          >
                            <i className="ti ti-files me-2" />
                            Draft
                          </Link>
                        </div>
                      </div>
                      <div
                        className="accordion accordion-flush custom-accordion"
                        id="accordionFlushExample"
                      >
                        {/* item */}
                        <div className="accordion-item">
                          <h2 className="accordion-header mb-0">
                            <button
                              className="accordion-button fw-semibold p-0 bg-transparent"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                            >
                              Labels
                            </button>
                          </h2>
                          <div
                            id="flush-collapseOne"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="d-flex flex-column mt-3">
                              <Link
                                to="#"
                                className="d-flex align-items-center fw-medium mb-2"
                              >
                                <i className="ti ti-point-filled text-success me-1 fs-18" />
                                Low
                              </Link>
                              <Link
                                to="#"
                                className="d-flex align-items-center fw-medium mb-2"
                              >
                                <i className="ti ti-point-filled text-warning me-1 fs-18" />
                                Medium
                              </Link>
                              <Link
                                to="#"
                                className="d-flex align-items-center fw-medium"
                              >
                                <i className="ti ti-point-filled text-danger fs-18 me-1" />
                                High
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end card body */}
                  </div>
                  {/* end card */}
                </div>
                <div className="col-lg-9 col-md-8 d-flex">
                  <div className="p-4 pt-0 pt-sm-4 pb-0 flex-fill">
                    <div className="row">
                      <div className="col-xl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="badge bg-success">Low</span>
                              <div>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-outline-light"
                                  data-bs-toggle="dropdown"
                                  
                                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                                </Link>
                                <ul className="dropdown-menu p-2">
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit_note"
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
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-star me-1" />
                                      Not Important
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-eye me-1" />
                                      View
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="my-3">
                              <h6 className="fs-16 text-truncate mb-1">
                                <Link to="#">Meeting with Product Team</Link>
                              </h6>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                  Discuss dashboard revamp and analytics tracking.
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-2">
                                <Link to="#" className="btn btn-icon btn-light">
                                  <i className="ti ti-star" />
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </div>
                              <Link to="#" className="avatar avatar-sm">
                                <ImageWithBasePath
                                  src="./assets/img/profiles/avatar-01.jpg"
                                  alt="Profile"
                                  className="img-fluid"
                                />
                              </Link>
                            </div>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                      <div className="col-xl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="badge bg-success">Low</span>
                              <div>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-outline-light"
                                  data-bs-toggle="dropdown"
                                  
                                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                                </Link>
                                <ul className="dropdown-menu p-2">
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit_note"
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
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-star me-1" />
                                      Not Important
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-eye me-1" />
                                      View
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="my-3">
                              <h6 className="fs-16 text-truncate mb-1">
                                <Link to="#">Submit Quarterly Report</Link>
                              </h6>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                  Compile a comprehensive report for covering sales performance.
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-2">
                                <Link to="#" className="btn btn-icon btn-light">
                                  <i className="ti ti-star-filled text-warning" />
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </div>
                              <Link to="#" className="avatar avatar-sm">
                                <ImageWithBasePath
                                  src="./assets/img/profiles/avatar-02.jpg"
                                  alt="Profile"
                                  className="img-fluid"
                                />
                              </Link>
                            </div>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                      <div className="col-xl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="badge bg-purple">Medium</span>
                              <div>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-outline-light"
                                  data-bs-toggle="dropdown"
                                  
                                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                                </Link>
                                <ul className="dropdown-menu p-2">
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit_note"
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
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-star me-1" />
                                      Not Important
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-eye me-1" />
                                      View
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="my-3">
                              <h6 className="fs-16 text-truncate mb-1">
                                <Link to="#">Follow-up with HR</Link>
                              </h6>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                  Review and verify the current onboarding status of all hires.
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-2">
                                <Link to="#" className="btn btn-icon btn-light">
                                  <i className="ti ti-star-filled text-warning" />
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </div>
                              <Link to="#" className="avatar avatar-sm">
                                <ImageWithBasePath
                                  src="./assets/img/profiles/avatar-03.jpg"
                                  alt="Profile"
                                  className="img-fluid"
                                />
                              </Link>
                            </div>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                      <div className="col-xl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="badge bg-purple">Medium</span>
                              <div>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-outline-light"
                                  data-bs-toggle="dropdown"
                                  
                                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                                </Link>
                                <ul className="dropdown-menu p-2">
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit_note"
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
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-star me-1" />
                                      Not Important
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-eye me-1" />
                                      View
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="my-3">
                              <h6 className="fs-16 text-truncate mb-1">
                                <Link to="#">Design Feedback Notes</Link>
                              </h6>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                  Adjust the form layout to reduce vertical and horizontal spacing
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-2">
                                <Link to="#" className="btn btn-icon btn-light">
                                  <i className="ti ti-star-filled text-warning" />
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </div>
                              <Link to="#" className="avatar avatar-sm">
                                <ImageWithBasePath
                                  src="./assets/img/profiles/avatar-04.jpg"
                                  alt="Profile"
                                  className="img-fluid"
                                />
                              </Link>
                            </div>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                      <div className="col-xl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="badge bg-danger">High</span>
                              <div>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-outline-light"
                                  data-bs-toggle="dropdown"
                                  
                                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                                </Link>
                                <ul className="dropdown-menu p-2">
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit_note"
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
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-star me-1" />
                                      Not Important
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-eye me-1" />
                                      View
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="my-3">
                              <h6 className="fs-16 text-truncate mb-1">
                                <Link to="#">Call Vendor Support</Link>
                              </h6>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                  The printer maintenance issue is still pending requires attention.
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-2">
                                <Link to="#" className="btn btn-icon btn-light">
                                  <i className="ti ti-star" />
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </div>
                              <Link to="#" className="avatar avatar-sm">
                                <ImageWithBasePath
                                  src="./assets/img/profiles/avatar-05.jpg"
                                  alt="Profile"
                                  className="img-fluid"
                                />
                              </Link>
                            </div>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                      <div className="col-xl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="badge bg-success">Low</span>
                              <div>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-outline-light"
                                  data-bs-toggle="dropdown"
                                  
                                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                                </Link>
                                <ul className="dropdown-menu p-2">
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit_note"
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
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-star me-1" />
                                      Not Important
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-eye me-1" />
                                      View
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="my-3">
                              <h6 className="fs-16 text-truncate mb-1">
                                <Link to="#">Give me the staff guide</Link>
                              </h6>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                  The patient contacted us to request a rescheduling.
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-2">
                                <Link to="#" className="btn btn-icon btn-light">
                                  <i className="ti ti-star" />
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </div>
                              <Link to="#" className="avatar avatar-sm">
                                <ImageWithBasePath
                                  src="./assets/img/profiles/avatar-06.jpg"
                                  alt="Profile"
                                  className="img-fluid"
                                />
                              </Link>
                            </div>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                      <div className="col-xl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="badge bg-danger">High</span>
                              <div>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-outline-light"
                                  data-bs-toggle="dropdown"
                                  
                                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                                </Link>
                                <ul className="dropdown-menu p-2">
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit_note"
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
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-star me-1" />
                                      Not Important
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-eye me-1" />
                                      View
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="my-3">
                              <h6 className="fs-16 text-truncate mb-1">
                                <Link to="#">Insurance Update</Link>
                              </h6>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                  We have received the updated insurance card from the patient.
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-2">
                                <Link to="#" className="btn btn-icon btn-light">
                                  <i className="ti ti-star-filled text-warning" />
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </div>
                              <Link to="#" className="avatar avatar-sm">
                                <ImageWithBasePath
                                  src="./assets/img/profiles/avatar-07.jpg"
                                  alt="Profile"
                                  className="img-fluid"
                                />
                              </Link>
                            </div>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                      <div className="col-xl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="badge bg-purple">Medium</span>
                              <div>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-outline-light"
                                  data-bs-toggle="dropdown"
                                  
                                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                                </Link>
                                <ul className="dropdown-menu p-2">
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit_note"
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
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-star me-1" />
                                      Not Important
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-eye me-1" />
                                      View
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="my-3">
                              <h6 className="fs-16 text-truncate mb-1">
                                <Link to="#">Staff Reminder</Link>
                              </h6>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                  A reminder was sent to the team regarding the scheduled meeting
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-2">
                                <Link to="#" className="btn btn-icon btn-light">
                                  <i className="ti ti-star-filled text-warning" />
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </div>
                              <Link to="#" className="avatar avatar-sm">
                                <ImageWithBasePath
                                  src="./assets/img/profiles/avatar-08.jpg"
                                  alt="Profile"
                                  className="img-fluid"
                                />
                              </Link>
                            </div>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                      <div className="col-xl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="badge bg-danger">High</span>
                              <div>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-outline-light"
                                  data-bs-toggle="dropdown"
                                  
                                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                                </Link>
                                <ul className="dropdown-menu p-2">
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit_note"
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
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-star me-1" />
                                      Not Important
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-eye me-1" />
                                      View
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="my-3">
                              <h6 className="fs-16 text-truncate mb-1">
                                <Link to="#">General Task Tracking</Link>
                              </h6>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                  Printer cartridges and paper stock have been ordered.
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-2">
                                <Link to="#" className="btn btn-icon btn-light">
                                  <i className="ti ti-star" />
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </div>
                              <Link to="#" className="avatar avatar-sm">
                                <ImageWithBasePath
                                  src="./assets/img/profiles/avatar-09.jpg"
                                  alt="Profile"
                                  className="img-fluid"
                                />
                              </Link>
                            </div>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                      <div className="col-xl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="badge bg-success">Low</span>
                              <div>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-outline-light"
                                  data-bs-toggle="dropdown"
                                  
                                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                                </Link>
                                <ul className="dropdown-menu p-2">
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit_note"
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
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-star me-1" />
                                      Not Important
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-eye me-1" />
                                      View
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="my-3">
                              <h6 className="fs-16 text-truncate mb-1">
                                <Link to="#">Insurance Inquiry</Link>
                              </h6>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                  Patient called to check status of last insurance claim for lab tests.
                                  Patient called to check status of last insurance claim for lab tests.
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-2">
                                <Link to="#" className="btn btn-icon btn-light">
                                  <i className="ti ti-star" />
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </div>
                              <Link to="#" className="avatar avatar-sm">
                                <ImageWithBasePath
                                  src="./assets/img/profiles/avatar-10.jpg"
                                  alt="Profile"
                                  className="img-fluid"
                                />
                              </Link>
                            </div>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                      <div className="col-xl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="badge bg-danger">High</span>
                              <div>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-outline-light"
                                  data-bs-toggle="dropdown"
                                  
                                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                                </Link>
                                <ul className="dropdown-menu p-2">
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit_note"
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
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-star me-1" />
                                      Not Important
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-eye me-1" />
                                      View
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="my-3">
                              <h6 className="fs-16 text-truncate mb-1">
                                <Link to="#">Maintenance Request</Link>
                              </h6>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                  Noted recurring jam in front desk printer. Called vendor support.
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-2">
                                <Link to="#" className="btn btn-icon btn-light">
                                  <i className="ti ti-star" />
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </div>
                              <Link to="#" className="avatar avatar-sm">
                                <ImageWithBasePath
                                  src="./assets/img/profiles/avatar-11.jpg"
                                  alt="Profile"
                                  className="img-fluid"
                                />
                              </Link>
                            </div>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                      <div className="col-xl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="badge bg-purple">Medium</span>
                              <div>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-outline-light"
                                  data-bs-toggle="dropdown"
                                  
                                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                                </Link>
                                <ul className="dropdown-menu p-2">
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit_note"
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
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-star me-1" />
                                      Not Important
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="dropdown-item d-flex align-items-center"
                                    >
                                      <i className="ti ti-eye me-1" />
                                      View
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="my-3">
                              <h6 className="fs-16 text-truncate mb-1">
                                <Link to="#">Internal Task</Link>
                              </h6>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                  Ordered toner, copy paper, and cleaning supplies.
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-2">
                                <Link to="#" className="btn btn-icon btn-light">
                                  <i className="ti ti-star" />
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-icon btn-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </div>
                              <Link to="#" className="avatar avatar-sm">
                                <ImageWithBasePath
                                  src="./assets/img/profiles/avatar-12.jpg"
                                  alt="Profile"
                                  className="img-fluid"
                                />
                              </Link>
                            </div>
                          </div>{" "}
                          {/* end card body */}
                        </div>{" "}
                        {/* end card */}
                      </div>{" "}
                      {/* end col */}
                    </div>
                  </div>
                  {/* card start */}
                </div>
              </div>
            </div>
            {/* end card body */}
          </div>
          {/* end card */}
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
        {/* Add Todo */}
        <div className="modal fade" id="add_note">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Note</h5>
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
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Priority</label>
                        <CommonSelect
                          options={Priority}
                          className="select"
                          defaultValue={Priority[0]}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Created Date</label>
                        <div className=" w-auto input-group-flat">
                          <CommonDatePicker placeholder="dd/mm/yyyy" />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Due Date</label>
                        <div className=" w-auto input-group-flat">
                          <CommonDatePicker placeholder="dd/mm/yyyy" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">Descriptions</label>
                        <div className="snow-editor">
                          <Texteditor />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div>
                        <label className="form-label">Select Assignee</label>
                        <CommonSelect
                          options={Assignee}
                          className="select"
                          defaultValue={Assignee[0]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add New To Do
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Add Todo end */}
        {/* Edit Todo */}
        <div className="modal fade" id="edit_note">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Note</h5>
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
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Meeting with Product Team"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Priority</label>
                        <CommonSelect
                          options={Priority}
                          className="select"
                          defaultValue={Priority[0]}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Created Date</label>
                        <div className=" w-auto input-group-flat">
                          <CommonDatePicker placeholder="dd/mm/yyyy" />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Due Date</label>
                        <div className=" w-auto input-group-flat">
                          <CommonDatePicker placeholder="dd/mm/yyyy" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">Descriptions</label>
                        <div className="snow-editor">
                            <Texteditor/>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div>
                        <label className="form-label">Select Assignee</label>
                        <CommonSelect
                          options={Assignee}
                          className="select"
                          defaultValue={Assignee[0]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Edit Todo end */}
        {/* Start Modal  */}
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
                <p className="mb-3">
                  Are you sure you want to delete this note?
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <Link
                    to="#"
                    className="btn btn-outline-light me-3 w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link to={all_routes.notes} className="btn btn-danger w-100 ">
                    Yes, Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Modal  */}
      </>
    </>
  );
};

export default Notes;
