import { Link } from "react-router-dom";
import ImageWithBasePath from "../../components/image-with-base-path";
import { all_routes } from "../../routes/all_routes";
import { Suspense, lazy } from "react";

const MedicalResultsModal = lazy(() => import("./modal/medicalResultsModal"));

const MedicalResults = () => {
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
              <h4 className="mb-1">Medical Results</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Medical Results</li>
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
          {/* card start */}
          <div className="card mb-0">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h6 className="d-inline-flex align-items-center mb-0">
                Total Medical Results
                <span className="badge bg-danger ms-2">658</span>
              </h6>
              <div className="d-flex align-items-center flex-wrap gap-2">
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
            <div className="card-body">
              {/* table start */}
              <div className="table-responsive table-nowrap">
                <table className="table mb-0 border">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Patient Name</th>
                      <th className="no-sort">Gender</th>
                      <th>Record</th>
                      <th className="no-sort">Appointment Date</th>
                      <th className="no-sort" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_modal"
                        >
                          #MR0025
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-31.jpg"
                              alt="patient"
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
                      <td>Male</td>
                      <td>Blood Report</td>
                      <td>17 Jun 2025</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="more options"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
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
                      <td>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_modal"
                        >
                          #MR0024
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-54.jpg"
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
                      <td>Female</td>
                      <td>X-ray</td>
                      <td>10 Jun 2025</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="more options"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
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
                      <td>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_modal"
                        >
                          #MR0023
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-45.jpg"
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
                      <td>Male</td>
                      <td>Glucose Report</td>
                      <td>22 May 2025</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="more options"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
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
                      <td>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_modal"
                        >
                          #MR0022
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-51.jpg"
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
                      <td>Female</td>
                      <td>CT Scan</td>
                      <td>15 May 2025</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="more options"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
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
                      <td>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_modal"
                        >
                          #MR0021
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-41.jpg"
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
                      <td>Male</td>
                      <td>Angiogram Record</td>
                      <td>30 Apr 2025</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="more options"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
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
                      <td>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_modal"
                        >
                          #MR0020
                        </Link>
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
                                Sophia Wilson
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Female</td>
                      <td>MRI Scan</td>
                      <td>25 Apr 2025</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="more options"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
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
                      <td>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_modal"
                        >
                          #MR0019
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-53.jpg"
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
                      <td>Male</td>
                      <td>PET Scan</td>
                      <td>13 Mar 2025</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="more options"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
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
                      <td>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_modal"
                        >
                          #MR0018
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-50.jpg"
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
                      <td>Female</td>
                      <td>Doppler Report</td>
                      <td>16 Feb 2025</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="more options"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
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
                      <td>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_modal"
                        >
                          #MR0017
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-42.jpg"
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
                      <td>Male</td>
                      <td>MRA Scan</td>
                      <td>20 Jan 2025</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="more options"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
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
                      <td>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_modal"
                        >
                          #MR0016
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar avatar-xs me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/avatars/avatar-56.jpg"
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
                      <td>Female</td>
                      <td>Echocardiogram Report</td>
                      <td>15 Jan 2025</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="more options"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
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
              {/* table end */}
            </div>
          </div>
          {/* card start */}
        </div>
        {/* End Content */}
        {/* Start Footer */}
        <footer className="footer text-center">
          <p className="mb-0 text-dark">
            2025 ©{" "}
            <Link to="#" className="link-primary">
              Dreams EMR
            </Link>{" "}
            - All Rights Reserved.
          </p>
        </footer>
        {/* End Footer */}
      </div>
      {/* ========================
              End Page Content
          ========================= */}
      <Suspense fallback={<div />}><MedicalResultsModal /></Suspense>
    </>
  );
};

export default MedicalResults;
