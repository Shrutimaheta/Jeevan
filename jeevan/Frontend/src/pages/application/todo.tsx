import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import { all_routes } from "../../routes/all_routes";
import Texteditor from "../../components/text-editor/texteditor";
import CommonDatePicker from "../../components/common-date-picker/commonDatePicker";
import {
  Assignee,
  Priority,
  StatusInprogress,
} from "../../core/json/selectOption";
import CommonSelect from "../../components/common-select/commonSelect";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

// SVG-based CircleProgress component
const CircleProgress = ({
  value = 0,
  color = "#ffb300",
  size = 25,
  stroke = 5,
}) => {
  // Clamp value
  const val = Math.max(0, Math.min(100, value));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - val / 100);

  return (
    <svg width={size} height={size} style={{ display: "block" }}>
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#f5f5f5"
        strokeWidth={stroke}
        fill="none"
      />
      {/* Progress arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s" } as React.CSSProperties}
      />
    </svg>
  );
};

const Todo = () => {
 
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
              <h4 className="mb-1">To Do</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Applications</Link>
                  </li>
                  <li className="breadcrumb-item active">To Do</li>
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
            </div>
          </div>
          {/* End Page Header */}
          <div className="card shadow-none mb-0">
            <div className="card-body p-0">
              <div className="row g-0">
                <div className="col-lg-3 col-md-4">
                  <OverlayScrollbarsComponent style={{ overflow: "auto"}}
                    className=" p-4 pb-0 pb-sm-4 mail-sidebar border-end h-100"
                    data-simplebar=""
                  >
                    <div>
                      <div className="mb-3">
                        <Link
                          to="#"
                          className="btn btn-primary btn-lg w-100"
                          data-bs-toggle="modal"
                          data-bs-target="#add_todo"
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
                            All Tasks{" "}
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
                        </div>
                      </div>
                      <div
                        className="accordion accordion-flush custom-accordion"
                        id="accordionFlushExample"
                      >
                        {/* item */}
                        <div className="accordion-item mb-3 pb-3">
                          <h2 className="accordion-header mb-0">
                            <button
                              className="accordion-button fw-semibold p-0 bg-transparent"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="true"
                              aria-controls="flush-collapseOne"
                            >
                              Priority
                            </button>
                          </h2>
                          <div
                            id="flush-collapseOne"
                            className="accordion-collapse collapse show"
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
                        {/* item */}
                        <div className="accordion-item border-0">
                          <h2 className="accordion-header mb-0">
                            <button
                              className="accordion-button fw-semibold p-0 bg-transparent collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseTwo"
                              aria-expanded="false"
                              aria-controls="flush-collapseTwo"
                            >
                              Categories
                            </button>
                          </h2>
                          <div
                            id="flush-collapseTwo"
                            className="accordion-collapse collapse"
                          >
                            <div className="d-flex flex-column mt-3">
                              <Link
                                to="#"
                                className="d-flex align-items-center fw-medium mb-2"
                              >
                                <i className="ti ti-point-filled text-purple me-1 fs-18" />
                                Social
                              </Link>
                              <Link
                                to="#"
                                className="d-flex align-items-center fw-medium mb-2"
                              >
                                <i className="ti ti-point-filled text-info me-1 fs-18" />
                                Research
                              </Link>
                              <Link
                                to="#"
                                className="d-flex align-items-center fw-medium mb-2"
                              >
                                <i className="ti ti-point-filled text-pink me-1 fs-18" />
                                Web Design
                              </Link>
                              <Link
                                to="#"
                                className="d-flex align-items-center fw-medium"
                              >
                                <i className="ti ti-point-filled text-danger me-1 fs-18" />
                                Reminder
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end card body */}
                  </OverlayScrollbarsComponent>
                  {/* end card */}
                </div>
                <div className="col-lg-9 col-md-8 d-flex">
                  {/* card start */}
                  <div className="card m-sm-4 mx-4 w-100">
                    <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
                      <h5 className="d-inline-flex align-items-center mb-0">
                        Todo<span className="badge bg-danger ms-2">565</span>
                      </h5>
                      <div className="d-flex align-items-center">
                        {/* sort by */}
                        <div className="dropdown">
                          <Link
                            to="#"
                            className="dropdown-toggle btn btn-md btn-outline-light d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                           aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                            <i className="ti ti-sort-descending-2 me-1" />
                            <span className="me-1">Sort By : </span> Newest
                          </Link>
                          <ul className="dropdown-menu  dropdown-menu-end p-2">
                            <li>
                              <Link to="#" className="dropdown-item rounded-1">
                                Newest
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item rounded-1">
                                Oldest
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-body table-custom p-0">
                      {/* table start */}
                      <div className="table-responsive table-nowrap">
                        <table className="table border-0 datatable">
                          <thead className="table-light">
                            <tr>
                              <th>Task Title</th>
                              <th className="no-sort">Created Date</th>
                              <th>Status</th>
                              <th>Due Date</th>
                              <th>Progress</th>
                              <th className="no-sort" />
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Update calendar and schedule</td>
                              <td>20 Jun 2025</td>
                              <td>
                                <span className="badge bg-success">Completed</span>
                              </td>
                              <td>25 Jun 2025</td>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <CircleProgress
                                    value={80}
                                    color="#ffb300"
                                    size={25}
                                    stroke={5}
                                  />
                                  <span
                                    style={{ fontWeight: 500, color: "#444" }}
                                  >
                                    80%
                                  </span>
                                </div>
                              </td>
                              <td className="text-end">
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
                                      data-bs-target="#edit_todo"
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
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td>Finalize project proposal</td>
                              
                              <td>15 Jun 2025</td>
                              <td>
                                <span className="badge bg-pink">On Hold</span>
                              </td>
                              <td>20 Jun 2025</td>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <CircleProgress
                                    value={60}
                                    color="#ffb300"
                                    size={25}
                                    stroke={5}
                                  />
                                  <span
                                    style={{ fontWeight: 500, color: "#444" }}
                                  >
                                    60%
                                  </span>
                                </div>
                              </td>
                              <td className="text-end">
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
                                      data-bs-target="#edit_todo"
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
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td>Submit to supervisor by EOD</td>
                              
                              <td>02 Jun 2025</td>
                              <td>
                                <span className="badge bg-purple">Pending</span>
                              </td>
                              <td>07 Jun 2025</td>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <CircleProgress
                                    value={50}
                                    color="#ffb300"
                                    size={25}
                                    stroke={5}
                                  />
                                  <span
                                    style={{ fontWeight: 500, color: "#444" }}
                                  >
                                    50%
                                  </span>
                                </div>
                              </td>
                              <td className="text-end">
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
                                      data-bs-target="#edit_todo"
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
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td>Prepare presentation slides</td>
                              
                              <td>24 May 2025</td>
                              <td>
                                <span className="badge bg-success">
                                  Completed
                                </span>
                              </td>
                              <td>30 May 2025</td>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <CircleProgress
                                    value={100}
                                    color="#ffb300"
                                    size={25}
                                    stroke={5}
                                  />
                                  <span
                                    style={{ fontWeight: 500, color: "#444" }}
                                  >
                                    100%
                                  </span>
                                </div>
                              </td>
                              <td className="text-end">
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
                                      data-bs-target="#edit_todo"
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
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td>Check and respond to emails</td>
                             
                              <td>18 May 2025</td>
                              <td>
                                <span className="badge bg-purple">Pending</span>
                              </td>
                              <td>07 Jun 2025</td>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <CircleProgress
                                    value={55}
                                    color="#ffb300"
                                    size={25}
                                    stroke={5}
                                  />
                                  <span
                                    style={{ fontWeight: 500, color: "#444" }}
                                  >
                                    55%
                                  </span>
                                </div>
                              </td>
                              <td className="text-end">
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
                                      data-bs-target="#edit_todo"
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
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td>Daily admin tasks organized</td>
                              
                              <td>13 May 2025</td>
                              <td>
                                <span className="badge bg-info">
                                  Inprogress
                                </span>
                              </td>
                              <td>18 May 2025</td>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <CircleProgress
                                    value={80}
                                    color="#ffb300"
                                    size={25}
                                    stroke={5}
                                  />
                                  <span
                                    style={{ fontWeight: 500, color: "#444" }}
                                  >
                                    80%
                                  </span>
                                </div>
                              </td>
                              <td className="text-end">
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
                                      data-bs-target="#edit_todo"
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
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td>Verify insurance eligibility</td>
                             
                              <td>25 Apr 2025</td>
                              <td>
                                <span className="badge bg-success">
                                  Completed
                                </span>
                              </td>
                              <td>27 Apr 2025</td>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <CircleProgress
                                    value={70}
                                    color="#ffb300"
                                    size={25}
                                    stroke={5}
                                  />
                                  <span
                                    style={{ fontWeight: 500, color: "#444" }}
                                  >
                                    70%
                                  </span>
                                </div>
                              </td>
                              <td className="text-end">
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
                                      data-bs-target="#edit_todo"
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
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td>Send lab results to patient portal</td>
                             
                              <td>17 Apr 2025</td>
                              <td>
                                <span className="badge bg-purple">Pending</span>
                              </td>
                              <td>27 Apr 2025</td>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <CircleProgress
                                    value={50}
                                    color="#ffb300"
                                    size={25}
                                    stroke={5}
                                  />
                                  <span
                                    style={{ fontWeight: 500, color: "#444" }}
                                  >
                                    50%
                                  </span>
                                </div>
                              </td>
                              <td className="text-end">
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
                                      data-bs-target="#edit_todo"
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
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td>Keep tasks clear and specific</td>
                              
                              <td>01 Mar 2025</td>
                              <td>
                                <span className="badge bg-success">
                                  Completed
                                </span>
                              </td>
                              <td>05 Mar 2025</td>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <CircleProgress
                                    value={100}
                                    color="#ffb300"
                                    size={25}
                                    stroke={5}
                                  />
                                  <span
                                    style={{ fontWeight: 500, color: "#444" }}
                                  >
                                    100%
                                  </span>
                                </div>
                              </td>
                              <td className="text-end">
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
                                      data-bs-target="#edit_todo"
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
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td>Use reminders for anything time</td>
                              
                              <td>21 Mar 2025</td>
                              <td>
                                <span className="badge bg-info">
                                  Inprogress
                                </span>
                              </td>
                              <td>25 Mar 2025</td>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <CircleProgress
                                    value={40}
                                    color="#ffb300"
                                    size={25}
                                    stroke={5}
                                  />
                                  <span
                                    style={{ fontWeight: 500, color: "#444" }}
                                  >
                                    40%
                                  </span>
                                </div>
                              </td>
                              <td className="text-end">
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
                                      data-bs-target="#edit_todo"
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
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* table start */}
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
        <div className="modal fade" id="add_todo">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add To Do</h5>
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
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <CommonSelect
                          options={StatusInprogress}
                          className="select"
                          defaultValue={StatusInprogress[0]}
                        />
                      </div>
                    </div>
                    <div className="col-6">
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
                        <div className="snow-editor" >
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
                    Add To Do
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Add Todo end */}
        {/* Edit Todo */}
        <div className="modal fade" id="edit_todo">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit To Do</h5>
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
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Update calendar and schedule"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <CommonSelect
                          options={StatusInprogress}
                          className="select"
                          defaultValue={StatusInprogress[1]}
                        />
                      </div>
                    </div>
                    <div className="col-6">
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
                          defaultValue={Assignee[1]}
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
                    Save Changes
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
                  Are you sure you want to delete this to do?
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <Link
                    to="#"
                    className="btn btn-outline-light w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link to={all_routes.todo} className="btn btn-danger w-100">
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

export default Todo;
