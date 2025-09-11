import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import { all_routes } from "../../routes/all_routes";
import ImageWithBasePath from "../../components/image-with-base-path";
import { useCallback } from "react";
import CommonSelect from "../../components/common-select/commonSelect";
import {
  Consultation,
  Department,
  Doctor,
  ModePayment,
  Patient,
  PatientType,
} from "../../core/json/selectOption";
import CommonDatePicker from "../../components/common-date-picker/commonDatePicker";
import CommonTimePicker from "../../components/common-time-pickers/CommonTimePicker";


const Patients = () => {
  // Memoized handlers for dropdown actions
  const handleViewDetails = useCallback(() => {}, []); // Navigation handled by Link
  const handleEdit = useCallback(() => {}, []); // Navigation handled by Link
  const handleDelete = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Modal trigger handled by data attributes
    e.preventDefault();
  }, []);
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
          <h4 className="mb-1">Patients</h4>
          <div className="text-end">
            <ol className="breadcrumb m-0 py-0">
              <li className="breadcrumb-item">
                <Link to={all_routes.dashboard}>Home</Link>
              </li>
              <li className="breadcrumb-item active">Patients</li>
            </ol>
          </div>
        </div>
        <div className="gap-2 d-flex align-items-center flex-wrap">
          <Link
            to={all_routes.patients}
            className="btn btn-icon btn-white active"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            aria-label="Grid"
            data-bs-original-title="Grid View"
          >
            <i className="ti ti-layout-grid" />
          </Link>
          <Link
            to={all_routes.allPatientsList}
            className="btn btn-icon btn-white"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            aria-label="List"
            data-bs-original-title="List View"
          >
            <i className="ti ti-layout-list" />
          </Link>
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
          <Link to={all_routes.addPatient} className="btn btn-primary">
            <i className="ti ti-square-rounded-plus me-1" />
            Add New Patient
          </Link>
        </div>
      </div>
      {/* End Page Header */}
      {/* row start */}
      <div className="row justify-content-center">
        {/* col start */}
        <div className="col-xl-4 col-md-6 d-flex">
          <div className="card shadow flex-fill w-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="badge badge-soft-orange">Out Patient</span>
                <Link
                  to="#"
                  className="btn btn-icon btn-outline-light border-0"
                  data-bs-toggle="dropdown"
                  aria-label="Patient actions menu"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                </Link>
                <ul className="dropdown-menu p-2">
                  <li>
                    <Link
                      to={all_routes.patientDetails}
                      className="dropdown-item d-flex align-items-center"
                          onClick={handleViewDetails}
                    >
                      <i className="ti ti-eye me-1" />
                      View Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={all_routes.editPatient}
                      className="dropdown-item d-flex align-items-center"
                          onClick={handleEdit}
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
                          onClick={handleDelete}
                    >
                      <i className="ti ti-trash me-1" />
                      Delete
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="text-center mb-3">
                <span className="avatar avatar-xl avatar-rounded d-block mx-auto mb-2">
                      <Link
                        to={all_routes.patientDetails}
                        className="d-inline-block"
                      >
                        <ImageWithBasePath
                          src="assets/img/users/user-04.jpg"
                          alt="img"
                        />
                  </Link>
                </span>
                    <Link
                      to={all_routes.patientDetails}
                      className="d-inline-block mb-1"
                    >
                  #PT0025
                </Link>
                <h6 className="mb-0">
                  <Link to={all_routes.patientDetails}>James Carter</Link>
                </h6>
              </div>
              <div className="border p-1 rounded mb-3">
                <div className="row g-0">
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Last Visit
                    </h6>
                    <p className="fs-13 mb-0">17 Jun 2025</p>
                  </div>
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Gender
                    </h6>
                    <p className="fs-13 mb-0">Male</p>
                  </div>
                  <div className="col-4 text-center p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Location
                    </h6>
                    <p className="fs-13 mb-0">California</p>
                  </div>
                </div>
              </div>
              <Link
                to="#"
                className="btn btn-dark w-100"
                data-bs-toggle="modal"
                data-bs-target="#add_modal"
              >
                Add Appointment
              </Link>
            </div>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-4 col-md-6 d-flex">
          <div className="card shadow flex-fill w-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="badge badge-soft-purple">In Patient</span>
                <Link
                  to="#"
                  className="btn btn-icon  btn-outline-light border-0"
                  data-bs-toggle="dropdown"
                  aria-label="Patient actions menu"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                </Link>
                <ul className="dropdown-menu p-2">
                  <li>
                    <Link
                      to={all_routes.patientDetails}
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="ti ti-eye me-1" />
                      View Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={all_routes.editPatient}
                      className="dropdown-item d-flex align-items-center"
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
              </div>
              <div className="text-center mb-3">
                <span className="avatar avatar-xl avatar-rounded d-block mx-auto mb-2">
                      <Link
                        to={all_routes.patientDetails}
                        className="d-inline-block"
                      >
                        <ImageWithBasePath
                          src="assets/img/users/user-34.jpg"
                          alt="img"
                        />
                  </Link>
                </span>
                    <Link
                      to={all_routes.patientDetails}
                      className="d-inline-block mb-1"
                    >
                  #PT0024
                </Link>
                <h6 className="mb-0">
                  <Link to={all_routes.patientDetails}>Emily Davis</Link>
                </h6>
              </div>
              <div className="border p-1 rounded mb-3">
                <div className="row g-0">
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Last Visit
                    </h6>
                    <p className="fs-13 mb-0">10 Jun 2025</p>
                  </div>
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Gender
                    </h6>
                    <p className="fs-13 mb-0">Female</p>
                  </div>
                  <div className="col-4 text-center p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Location
                    </h6>
                    <p className="fs-13 mb-0">Texas</p>
                  </div>
                </div>
              </div>
              <Link
                to="#"
                className="btn btn-dark w-100"
                data-bs-toggle="modal"
                data-bs-target="#add_modal"
              >
                Add Appointment
              </Link>
            </div>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-4 col-md-6 d-flex">
          <div className="card shadow flex-fill w-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="badge badge-soft-orange">Out Patient</span>
                <Link
                  to="#"
                  className="btn btn-icon  btn-outline-light border-0"
                  data-bs-toggle="dropdown"
                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                </Link>
                <ul className="dropdown-menu p-2">
                  <li>
                    <Link
                      to={all_routes.patientDetails}
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="ti ti-eye me-1" />
                      View Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={all_routes.editPatient}
                      className="dropdown-item d-flex align-items-center"
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
              </div>
              <div className="text-center mb-3">
                <span className="avatar avatar-xl avatar-rounded d-block mx-auto mb-2">
                      <Link
                        to={all_routes.patientDetails}
                        className="d-inline-block"
                      >
                        <ImageWithBasePath
                          src="assets/img/users/user-15.jpg"
                          alt="img"
                        />
                  </Link>
                </span>
                    <Link
                      to={all_routes.patientDetails}
                      className="d-inline-block mb-1"
                    >
                  #PT023
                </Link>
                <h6 className="mb-0">
                      <Link to={all_routes.patientDetails}>
                        Michael Johnson
                      </Link>
                </h6>
              </div>
              <div className="border p-1 rounded mb-3">
                <div className="row g-0">
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Last Visit
                    </h6>
                    <p className="fs-13 mb-0">22 May 2025</p>
                  </div>
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Gender
                    </h6>
                    <p className="fs-13 mb-0">Male</p>
                  </div>
                  <div className="col-4 text-center p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Location
                    </h6>
                    <p className="fs-13 mb-0">Florida</p>
                  </div>
                </div>
              </div>
              <Link
                to="#"
                className="btn btn-dark w-100"
                data-bs-toggle="modal"
                data-bs-target="#add_modal"
              >
                Add Appointment
              </Link>
            </div>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-4 col-md-6 d-flex">
          <div className="card shadow flex-fill w-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="badge badge-soft-purple">In Patient</span>
                <Link
                  to="#"
                  className="btn btn-icon  btn-outline-light border-0"
                  data-bs-toggle="dropdown"
                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                </Link>
                <ul className="dropdown-menu p-2">
                  <li>
                    <Link
                      to={all_routes.patientDetails}
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="ti ti-eye me-1" />
                      View Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={all_routes.editPatient}
                      className="dropdown-item d-flex align-items-center"
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
              </div>
              <div className="text-center mb-3">
                <span className="avatar avatar-xl avatar-rounded d-block mx-auto mb-2">
                      <Link
                        to={all_routes.patientDetails}
                        className="d-inline-block"
                      >
                        <ImageWithBasePath
                          src="assets/img/users/user-16.jpg"
                          alt="img"
                        />
                  </Link>
                </span>
                    <Link
                      to={all_routes.patientDetails}
                      className="d-inline-block mb-1"
                    >
                  #PT0022
                </Link>
                <h6 className="mb-0">
                  <Link to={all_routes.patientDetails}>Olivia Miller</Link>
                </h6>
              </div>
              <div className="border p-1 rounded mb-3">
                <div className="row g-0">
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Last Visit
                    </h6>
                    <p className="fs-13 mb-0">15 May 2025</p>
                  </div>
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Gender
                    </h6>
                    <p className="fs-13 mb-0">Female</p>
                  </div>
                  <div className="col-4 text-center p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Location
                    </h6>
                    <p className="fs-13 mb-0">New York</p>
                  </div>
                </div>
              </div>
              <Link
                to="#"
                className="btn btn-dark w-100"
                data-bs-toggle="modal"
                data-bs-target="#add_modal"
              >
                Add Appointment
              </Link>
            </div>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-4 col-md-6 d-flex">
          <div className="card shadow flex-fill w-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="badge badge-soft-orange">Out Patient</span>
                <Link
                  to="#"
                  className="btn btn-icon btn-outline-light border-0"
                  data-bs-toggle="dropdown"
                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                </Link>
                <ul className="dropdown-menu p-2">
                  <li>
                    <Link
                      to={all_routes.patientDetails}
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="ti ti-eye me-1" />
                      View Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={all_routes.editPatient}
                      className="dropdown-item d-flex align-items-center"
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
              </div>
              <div className="text-center mb-3">
                <span className="avatar avatar-xl avatar-rounded d-block mx-auto mb-2">
                      <Link
                        to={all_routes.patientDetails}
                        className="d-inline-block"
                      >
                        <ImageWithBasePath
                          src="assets/img/users/user-14.jpg"
                          alt="img"
                        />
                  </Link>
                </span>
                    <Link
                      to={all_routes.patientDetails}
                      className="d-inline-block mb-1"
                    >
                  #PT021
                </Link>
                <h6 className="mb-0">
                  <Link to={all_routes.patientDetails}>David Smith</Link>
                </h6>
              </div>
              <div className="border p-1 rounded mb-3">
                <div className="row g-0">
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Last Visit
                    </h6>
                    <p className="fs-13 mb-0">30 Apr 2025</p>
                  </div>
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Gender
                    </h6>
                    <p className="fs-13 mb-0">Male</p>
                  </div>
                  <div className="col-4 text-center p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Location
                    </h6>
                    <p className="fs-13 mb-0">Illinois</p>
                  </div>
                </div>
              </div>
              <Link
                to="#"
                className="btn btn-dark w-100"
                data-bs-toggle="modal"
                data-bs-target="#add_modal"
              >
                Add Appointment
              </Link>
            </div>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-4 col-md-6 d-flex">
          <div className="card shadow flex-fill w-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="badge badge-soft-purple">In Patient</span>
                <Link
                  to="#"
                  className="btn btn-icon  btn-outline-light border-0"
                  data-bs-toggle="dropdown"
                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                </Link>
                <ul className="dropdown-menu p-2">
                  <li>
                    <Link
                      to={all_routes.patientDetails}
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="ti ti-eye me-1" />
                      View Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={all_routes.editPatient}
                      className="dropdown-item d-flex align-items-center"
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
              </div>
              <div className="text-center mb-3">
                <span className="avatar avatar-xl avatar-rounded d-block mx-auto mb-2">
                      <Link
                        to={all_routes.patientDetails}
                        className="d-inline-block"
                      >
                        <ImageWithBasePath
                          src="assets/img/users/user-25.jpg"
                          alt="img"
                        />
                  </Link>
                </span>
                    <Link
                      to={all_routes.patientDetails}
                      className="d-inline-block mb-1"
                    >
                  #PT0020
                </Link>
                <h6 className="mb-0">
                  <Link to={all_routes.patientDetails}>Sophia Wilson</Link>
                </h6>
              </div>
              <div className="border p-1 rounded mb-3">
                <div className="row g-0">
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Last Visit
                    </h6>
                    <p className="fs-13 mb-0">25 Apr 2024</p>
                  </div>
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Gender
                    </h6>
                    <p className="fs-13 mb-0">Female</p>
                  </div>
                  <div className="col-4 text-center p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Location
                    </h6>
                    <p className="fs-13 mb-0">Georgia</p>
                  </div>
                </div>
              </div>
              <Link
                to="#"
                className="btn btn-dark w-100"
                data-bs-toggle="modal"
                data-bs-target="#add_modal"
              >
                Add Appointment
              </Link>
            </div>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-4 col-md-6 d-flex">
          <div className="card shadow flex-fill w-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="badge badge-soft-orange">Out Patient</span>
                <Link
                  to="#"
                  className="btn btn-icon  btn-outline-light border-0"
                  data-bs-toggle="dropdown"
                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                </Link>
                <ul className="dropdown-menu p-2">
                  <li>
                    <Link
                      to={all_routes.patientDetails}
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="ti ti-eye me-1" />
                      View Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={all_routes.editPatient}
                      className="dropdown-item d-flex align-items-center"
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
              </div>
              <div className="text-center mb-3">
                <span className="avatar avatar-xl avatar-rounded d-block mx-auto mb-2">
                      <Link
                        to={all_routes.patientDetails}
                        className="d-inline-block"
                      >
                        <ImageWithBasePath
                          src="assets/img/users/user-30.jpg"
                          alt="img"
                        />
                  </Link>
                </span>
                    <Link
                      to={all_routes.patientDetails}
                      className="d-inline-block mb-1"
                    >
                  #PT019
                </Link>
                <h6 className="mb-0">
                      <Link to={all_routes.patientDetails}>
                        Daniel Williams
                      </Link>
                </h6>
              </div>
              <div className="border p-1 rounded mb-3">
                <div className="row g-0">
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Last Visit
                    </h6>
                    <p className="fs-13 mb-0">13 Mar 2024</p>
                  </div>
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Gender
                    </h6>
                    <p className="fs-13 mb-0">Male</p>
                  </div>
                  <div className="col-4 text-center p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Location
                    </h6>
                    <p className="fs-13 mb-0">Texas</p>
                  </div>
                </div>
              </div>
              <Link
                to="#"
                className="btn btn-dark w-100"
                data-bs-toggle="modal"
                data-bs-target="#add_modal"
              >
                Add Appointment
              </Link>
            </div>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-4 col-md-6 d-flex">
          <div className="card shadow flex-fill w-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="badge badge-soft-purple">In Patient</span>
                <Link
                  to="#"
                  className="btn btn-icon  btn-outline-light border-0"
                  data-bs-toggle="dropdown"
                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                </Link>
                <ul className="dropdown-menu p-2">
                  <li>
                    <Link
                      to={all_routes.patientDetails}
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="ti ti-eye me-1" />
                      View Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={all_routes.editPatient}
                      className="dropdown-item d-flex align-items-center"
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
              </div>
              <div className="text-center mb-3">
                <span className="avatar avatar-xl avatar-rounded d-block mx-auto mb-2">
                      <Link
                        to={all_routes.patientDetails}
                        className="d-inline-block"
                      >
                        <ImageWithBasePath
                          src="assets/img/users/user-24.jpg"
                          alt="img"
                        />
                  </Link>
                </span>
                    <Link
                      to={all_routes.patientDetails}
                      className="d-inline-block mb-1"
                    >
                  #PT0018
                </Link>
                <h6 className="mb-0">
                      <Link to={all_routes.patientDetails}>
                        Isabella Anderson
                      </Link>
                </h6>
              </div>
              <div className="border p-1 rounded mb-3">
                <div className="row g-0">
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Last Visit
                    </h6>
                    <p className="fs-13 mb-0">16 Feb 2024</p>
                  </div>
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Gender
                    </h6>
                    <p className="fs-13 mb-0">Female</p>
                  </div>
                  <div className="col-4 text-center p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Location
                    </h6>
                    <p className="fs-13 mb-0">Ohio</p>
                  </div>
                </div>
              </div>
              <Link
                to="#"
                className="btn btn-dark w-100"
                data-bs-toggle="modal"
                data-bs-target="#add_modal"
              >
                Add Appointment
              </Link>
            </div>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-4 col-md-6 d-flex">
          <div className="card shadow flex-fill w-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="badge badge-soft-orange">Out Patient</span>
                <Link
                  to="#"
                  className="btn btn-icon  btn-outline-light border-0"
                  data-bs-toggle="dropdown"
                 aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                  <i className="ti ti-dots-vertical" aria-hidden="true" />
                </Link>
                <ul className="dropdown-menu p-2">
                  <li>
                    <Link
                      to={all_routes.patientDetails}
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="ti ti-eye me-1" />
                      View Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={all_routes.editPatient}
                      className="dropdown-item d-flex align-items-center"
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
              </div>
              <div className="text-center mb-3">
                <span className="avatar avatar-xl avatar-rounded d-block mx-auto mb-2">
                      <Link
                        to={all_routes.patientDetails}
                        className="d-inline-block"
                      >
                        <ImageWithBasePath
                          src="assets/img/users/user-17.jpg"
                          alt="img"
                        />
                  </Link>
                </span>
                    <Link
                      to={all_routes.patientDetails}
                      className="d-inline-block mb-1"
                    >
                  #PT017
                </Link>
                <h6 className="mb-0">
                  <Link to={all_routes.patientDetails}>William Brown</Link>
                </h6>
              </div>
              <div className="border p-1 rounded mb-3">
                <div className="row g-0">
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Last Visit
                    </h6>
                    <p className="fs-13 mb-0">20 Jan 2024</p>
                  </div>
                  <div className="col-4 text-center border-end p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Gender
                    </h6>
                    <p className="fs-13 mb-0">Male</p>
                  </div>
                  <div className="col-4 text-center p-1">
                    <h6 className="fw-semibold fs-14 text-truncate mb-1">
                      Location
                    </h6>
                    <p className="fs-13 mb-0">Michigan</p>
                  </div>
                </div>
              </div>
              <Link
                to="#"
                className="btn btn-dark w-100"
                data-bs-toggle="modal"
                data-bs-target="#add_modal"
              >
                Add Appointment
              </Link>
            </div>
          </div>
        </div>
        {/* col end */}
      </div>
      {/* row start */}
      <div className="text-center">
        <Link
          to="#"
          className="btn btn-primary d-inline-flex align-items-center"
        >
          <i className="ti ti-loader-2 me-1" />
          Load More
        </Link>
      </div>
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
        {/* Start add Modal */}
        <div id="add_modal" className="modal fade">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h4 className="text-dark modal-title fw-bold text-truncate">
                  New Appointment
                </h4>
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
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Select Patient</label>
                        <CommonSelect
                          options={Patient}
                          className="select"
                          defaultValue={Patient[0]}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Patient Type</label>
                        <CommonSelect
                          options={PatientType}
                          className="select"
                          defaultValue={PatientType[0]}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Select Department
                          <span className="text-danger ms-1">*</span>
                        </label>
                        <CommonSelect
                          options={Department}
                          className="select"
                          defaultValue={Department[0]}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Select Doctor
                          <span className="text-danger ms-1">*</span>
                        </label>
                        <CommonSelect
                          options={Doctor}
                          className="select"
                          defaultValue={Doctor[0]}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">
                          Preffered Mode of Consultation
                          <span className="text-danger ms-1">*</span>
                        </label>
                        <CommonSelect
                          options={Consultation}
                          className="select"
                          defaultValue={Consultation[0]}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">Date</label>
                        <div className="input-group w-auto input-group-flat">
                          <CommonDatePicker placeholder="dd/mm/yyyy" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">Start Time</label>
                        <div className=" position-relative">
                          <CommonTimePicker />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">End Time</label>
                        <div className=" position-relative">
                          <CommonTimePicker />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">Reason</label>
 <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">Quick Notes</label>
                        <textarea
                          className="form-control"
                          placeholder="Additional Information"
                          rows={4}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">Mode of Payment</label>
                         <CommonSelect
                            options={ModePayment}
                            className="select"
                            defaultValue={ModePayment[0]}
                          />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer d-flex align-items-center gap-1">
                  <button
                    type="button"
                    className="btn btn-white"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* End add Modal */}
        {/* Start Delete Modal  */}
        <div className="modal fade" id="delete_modal">
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-body text-center position-relative">
                <div className="mb-2 position-relative z-1">
                  <span className="avatar avatar-md bg-danger rounded-circle">
                    <i className="ti ti-trash fs-24" />
                  </span>
                </div>
                <h5 className="mb-1">Delete Confirmation</h5>
                <p className="mb-3">Are you sure you want to delete?</p>
                <div className="d-flex justify-content-center gap-2">
                  <Link
                    to="#"
                    className="btn btn-white position-relative z-1 w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link
                    to={all_routes.patientDetails}
                    className="btn btn-danger position-relative z-1 w-100"
                    data-bs-dismiss="modal"
                  >
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

export default Patients;
