import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import ImageWithBasePath from "../../components/image-with-base-path";
import { all_routes } from "../../routes/all_routes";
import { Suspense, lazy } from "react";

const VisitsModal = lazy(() => import("./modal/visitsModal"));

const Visits = () => {
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
              <h4 className="mb-1">Visits</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Visits</li>
                </ol>
              </div>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              <Link
                to="#"
                className="btn btn-icon btn-white"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Refresh visits list"
                data-bs-original-title="Refresh"
              >
                <i className="ti ti-refresh" aria-hidden="true" />
              </Link>
              <Link
                to="#"
                className="btn btn-icon btn-white"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Print visits list"
                data-bs-original-title="Print"
              >
                <i className="ti ti-printer" aria-hidden="true" />
              </Link>
              <Link
                to="#"
                className="btn btn-icon btn-white"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Download visits data"
                data-bs-original-title="Download"
              >
                <i className="ti ti-cloud-download" aria-hidden="true" />
              </Link>
              <Link
                to="#"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#add_visit"
                aria-label="Add new visit"
              >
                <i className="ti ti-square-rounded-plus me-1" aria-hidden="true" />
                New Visit
              </Link>
            </div>
          </div>
          {/* End Page Header */}
          {/* card start */}
          <div className="card mb-0">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h5 className="d-inline-flex align-items-center mb-0">
                Total Visits<span className="badge bg-danger ms-2">658</span>
              </h5>
              <div className="d-flex align-items-center">
                {/* sort by */}
                <div className="dropdown">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-md btn-outline-light d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-label="Sort visits by"
                  >
                    <i className="ti ti-sort-descending-2 me-1" aria-hidden="true" />
                    <span className="me-1">Sort By : </span> Newest
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-2" role="menu">
                    <li>
                      <button type="button" className="dropdown-item rounded-1" role="menuitem">
                        Newest
                      </button>
                    </li>
                    <li>
                      <button type="button" className="dropdown-item rounded-1" role="menuitem">
                        Oldest
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive table-nowrap">
                <table className="table mb-0 border">
                  <thead className="table-light">
                    <tr>
                      <th>Visit ID</th>
                      <th>Patient Name</th>
                      <th className="no-sort">Department</th>
                      <th>Doctor Name</th>
                      <th className="no-sort">Visit Date</th>
                      <th>Status</th>
                      <th className="no-sort" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link to={all_routes.startVisits} aria-label="Start visit for patient James Carter">#VS0025</Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-31.jpg"
                              alt="Patient James Carter avatar"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.patientDetails}>
                                James Carter
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Anaesthesiology</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/doctors/doctor-01.jpg"
                              alt="Doctor Andrew Clark avatar"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.doctorDetails}>
                                Dr. Andrew Clark
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>17 Jun 2025</td>
                      <td>
                        <span className="badge badge-soft-info">
                          Inprogress
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Visit actions menu"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </button>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to={all_routes.startVisits}
                              className="dropdown-item d-flex align-items-center"
                              role="menuitem">
                              <i className="ti ti-gradienter me-1" aria-hidden="true" />
                              Start Visit
                            </Link>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_visit"
                              role="menuitem">
                              <i className="ti ti-edit me-1" aria-hidden="true" />
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                              role="menuitem">
                              <i className="ti ti-trash me-1" aria-hidden="true" />
                              Delete
                            </button>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.startVisits} aria-label="Start visit for patient Emily Davis">#VS0024</Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-29.jpg"
                              alt="patient"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.patientDetails}>
                                Emily Davis
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Dental Surgery</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/doctors/doctor-02.jpg"
                              alt="doctor"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.doctorDetails}>
                                Dr. Katherine Brooks
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>10 Jun 2025</td>
                      <td>
                        <span className="badge badge-soft-success">
                          Completed
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Visit actions menu"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to={all_routes.startVisits}
                              className="dropdown-item d-flex align-items-center"
                              role="menuitem"
                             >
                              <i className="ti ti-gradienter me-1" aria-hidden="true" />
                              Start Visit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_visit"
                              role="menuitem"
                            >
                              <i className="ti ti-edit me-1" aria-hidden="true" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                              role="menuitem"
                            >
                              <i className="ti ti-trash me-1" aria-hidden="true" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.startVisits} aria-label="Start visit for patient Olivia Miller">#VS0023</Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-30.jpg"
                              alt="patient"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.patientDetails}>
                                Michael Johnson
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Dermatology</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/doctors/doctor-03.jpg"
                              alt="doctor"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.doctorDetails}>
                                Dr. Benjamin Harris
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>22 May 2025</td>
                      <td>
                        <span className="badge badge-soft-warning">
                          Pending
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Visit actions menu"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to={all_routes.startVisits}
                              className="dropdown-item d-flex align-items-center"
                              role="menuitem"
                            >
                              <i className="ti ti-gradienter me-1" aria-hidden="true" />
                              Start Visit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_visit"
                              role="menuitem"
                            >
                              <i className="ti ti-edit me-1" aria-hidden="true" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                              role="menuitem"
                             >
                              <i className="ti ti-trash me-1" aria-hidden="true" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.startVisits} aria-label="Start visit for patient David Smith">#VS0022</Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-33.jpg"
                              alt="patient"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.patientDetails}>
                                Olivia Miller
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>ENT Surgery</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/doctors/doctor-04.jpg"
                              alt="doctor"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.doctorDetails}>
                                Dr. Laura Mitchell
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>15 May 2025</td>
                      <td>
                        <span className="badge badge-soft-info">
                          Inprogress
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Visit actions menu"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to={all_routes.startVisits}
                              className="dropdown-item d-flex align-items-center"
                              role="menuitem"
                             >
                              <i className="ti ti-gradienter me-1" aria-hidden="true" />
                              Start Visit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_visit"
                              role="menuitem"
                             >
                              <i className="ti ti-edit me-1" aria-hidden="true" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                              role="menuitem"
                            >
                              <i className="ti ti-trash me-1" aria-hidden="true" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.startVisits} aria-label="Start visit for patient Sophia Wilson">#VS0021</Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-34.jpg"
                              alt="patient"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.patientDetails}>
                                David Smith
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>General Medicine</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/doctors/doctor-05.jpg"
                              alt="doctor"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.doctorDetails}>
                                Dr. Christopher Lewis
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>30 Apr 2025</td>
                      <td>
                        <span className="badge badge-soft-success">
                          Completed
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Visit actions menu"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to={all_routes.startVisits}
                              className="dropdown-item d-flex align-items-center"
                             role="menuitem">
                              <i className="ti ti-gradienter me-1" aria-hidden="true" />
                              Start Visit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_visit"
                             role="menuitem">
                              <i className="ti ti-edit me-1" aria-hidden="true" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" aria-hidden="true" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.startVisits} aria-label="Start visit for patient Daniel Williams">#VS0020</Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-43.jpg"
                              alt="patient"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.patientDetails}>
                                Sophia Wilson
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Ophthalmology</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/doctors/doctor-06.jpg"
                              alt="doctor"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.doctorDetails}>
                                Dr. Natalie Foster
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>25 Apr 2025</td>
                      <td>
                        <span className="badge badge-soft-warning">
                          Pending
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Visit actions menu"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to={all_routes.startVisits}
                              className="dropdown-item d-flex align-items-center"
                             role="menuitem">
                              <i className="ti ti-gradienter me-1" aria-hidden="true" />
                              Start Visit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_visit"
                             role="menuitem">
                              <i className="ti ti-edit me-1" aria-hidden="true" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" aria-hidden="true" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.startVisits} aria-label="Start visit for patient Isabella Anderson">#VS0019</Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-36.jpg"
                              alt="patient"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.patientDetails}>
                                Daniel Williams
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Orthopaedics</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/doctors/doctor-07.jpg"
                              alt="doctor"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.doctorDetails}>
                                Dr. Jonathan Adams
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>13 Mar 2025</td>
                      <td>
                        <span className="badge badge-soft-info">
                          Inprogress
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Visit actions menu"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to={all_routes.startVisits}
                              className="dropdown-item d-flex align-items-center"
                             role="menuitem">
                              <i className="ti ti-gradienter me-1" aria-hidden="true" />
                              Start Visit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_visit"
                             role="menuitem">
                              <i className="ti ti-edit me-1" aria-hidden="true" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" aria-hidden="true" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.startVisits} aria-label="Start visit for patient William Brown">#VS0018</Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-48.jpg"
                              alt="patient"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.patientDetails}>
                                Isabella Anderson
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Paediatrics</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/doctors/doctor-08.jpg"
                              alt="doctor"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.doctorDetails}>
                                Dr. Rebecca Scott
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>16 Feb 2025</td>
                      <td>
                        <span className="badge badge-soft-success">
                          Completed
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Visit actions menu"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to={all_routes.startVisits}
                              className="dropdown-item d-flex align-items-center"
                             role="menuitem">
                              <i className="ti ti-gradienter me-1" aria-hidden="true" />
                              Start Visit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_visit"
                             role="menuitem">
                              <i className="ti ti-edit me-1" aria-hidden="true" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" aria-hidden="true" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.startVisits} aria-label="Start visit for patient Charlotte Taylor">#VS0017</Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-38.jpg"
                              alt="patient"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.patientDetails}>
                                William Brown
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Radiology</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/doctors/doctor-09.jpg"
                              alt="doctor"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.doctorDetails}>
                                Dr. Samuel Turner
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>20 Jan 2025</td>
                      <td>
                        <span className="badge badge-soft-warning">
                          Pending
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Visit actions menu"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to={all_routes.startVisits}
                              className="dropdown-item d-flex align-items-center"
                             role="menuitem">
                              <i className="ti ti-gradienter me-1" aria-hidden="true" />
                              Start Visit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_visit"
                             role="menuitem">
                              <i className="ti ti-edit me-1" aria-hidden="true" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" aria-hidden="true" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.startVisits} aria-label="Start visit for patient Michael Johnson">#VS0016</Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-52.jpg"
                              alt="patient"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.patientDetails}>
                                Charlotte Taylor
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Cardiology</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/doctors/doctor-10.jpg"
                              alt="doctor"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-0 fw-medium">
                              <Link to={all_routes.doctorDetails}>
                                Dr. Victoria Evans
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>15 Jan 2025</td>
                      <td>
                        <span className="badge badge-soft-info">
                          Inprogress
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Visit actions menu"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to={all_routes.startVisits}
                              className="dropdown-item d-flex align-items-center"
                             role="menuitem">
                              <i className="ti ti-gradienter me-1" aria-hidden="true" />
                              Start Visit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_visit"
                             role="menuitem">
                              <i className="ti ti-edit me-1" aria-hidden="true" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" aria-hidden="true" />
                              Delete
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
          {/* card start */}
        </div>
        {/* End Content */}
        {/* Start Footer */}
        <CommonFooter />
        {/* End Footer */}
      </div>
      {/* ========================
              End Page Content
          ========================= */}
          <Suspense fallback={<div />}><VisitsModal/></Suspense>
    </>
  );
};

export default Visits;
