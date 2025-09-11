import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import ImageWithBasePath from "../../components/image-with-base-path";
import { Suspense, lazy } from "react";
import { all_routes } from "../../routes/all_routes";

const AppointmentModal = lazy(() => import("./modal/appointmentModal"));

const Appointment = () => {
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
              <h4 className="mb-1">Appointments</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Appointments</li>
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
                            <Link
                                to="#"
                                className="btn btn-primary d-inline-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#add_modal"
                                >
                                <i className="ti ti-square-rounded-plus me-1" />
                                New Appointment
                            </Link>
                        </div>
                    </div>
                    {/* End Page Header */}

                    {/* card start */}
                    <div className="card mb-0">
                        <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
                            <h5 className="d-inline-flex align-items-center mb-0">
                Total Appointments
                <span className="badge bg-danger ms-2">950</span>
                            </h5>
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
                                            <th>Patient ID</th>
                                            <th>Patient Name</th>
                                            <th>Doctor Name</th>
                                            <th className="no-sort">Department</th>
                                            <th className="no-sort">Appointment Date</th>
                                            <th className="no-sort">Status</th>
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
                                                    #PT0025
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
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        to={all_routes.doctorDetails}
                                                        className="avatar avatar-xs me-2"
                                                    >
                                                        <ImageWithBasePath
                                                            src="assets/img/doctors/doctor-01.jpg"
                                                            alt="doctor"
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
                                            <td>Anaesthesiology</td>
                                            <td>17 Jun 2025, 09:00 AM to 10:00 AM</td>
                                            <td>
                        <span className="badge badge-soft-purple">
                          Upcoming
                        </span>
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    to="#"
                                                    className="btn btn-icon btn-sm btn-outline-light"
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
                                                            data-bs-target="#edit_modal"
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
                                            <td>
                                                <Link
                                                    to="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#view_modal"
                                                >
                                                    #PT0024
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
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        to={all_routes.doctorDetails}
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
                                Dr. Katherine Brooks
                              </Link>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Dental Surgery</td>
                                            <td>10 Jun 2025, 10:30 AM to 11:30 AM</td>
                                            <td>
                        <span className="badge badge-soft-purple">
                          Upcoming
                        </span>
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    to="#"
                                                    className="btn btn-icon btn-sm btn-outline-light"
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
                                                            data-bs-target="#edit_modal"
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
                                            <td>
                                                <Link
                                                    to="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#view_modal"
                                                >
                                                    #PT0023
                                                </Link>
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
                                Michael Johnson
                              </Link>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        to={all_routes.doctorDetails}
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
                                Dr. Benjamin Harris
                              </Link>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Dermatology</td>
                                            <td>22 May 2025, 01:15 PM to 02:15 PM</td>
                                            <td>
                        <span className="badge badge-soft-purple">
                          Upcoming
                        </span>
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    to="#"
                                                    className="btn btn-icon btn-sm btn-outline-light"
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
                                                            data-bs-target="#edit_modal"
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
                                            <td>
                                                <Link
                                                    to="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#view_modal"
                                                >
                                                    #PT0022
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
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        to={all_routes.doctorDetails}
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
                                Dr. Laura Mitchell
                              </Link>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>ENT Surgery</td>
                                            <td>15 May 2025, 11:30 AM to 12:30 PM</td>
                                            <td>
                        <span className="badge badge-soft-info">
                          Inprogress
                        </span>
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    to="#"
                                                    className="btn btn-icon btn-sm btn-outline-light"
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
                                                            data-bs-target="#edit_modal"
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
                                            <td>
                                                <Link
                                                    to="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#view_modal"
                                                >
                                                    #PT0021
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
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        to={all_routes.doctorDetails}
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
                                                                Dr. Christopher Lewis
                                                            </Link>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>General Medicine</td>
                                            <td>30 Apr 2025, 12:20 PM to 01:20 PM</td>
                                            <td>
                        <span className="badge badge-soft-success">
                          Completed
                        </span>
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    to="#"
                                                    className="btn btn-icon btn-sm btn-outline-light"
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
                                                            data-bs-target="#edit_modal"
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
                                            <td>
                                                <Link
                                                    to="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#view_modal"
                                                >
                                                    #PT0020
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
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        to={all_routes.doctorDetails}
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
                                Dr. Natalie Foster
                              </Link>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Ophthalmology</td>
                                            <td>25 Apr 2025, 03:15 PM to 04:15 PM</td>
                                            <td>
                        <span className="badge badge-soft-success">
                          Completed
                        </span>
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    to="#"
                                                    className="btn btn-icon btn-sm btn-outline-light"
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
                                                            data-bs-target="#edit_modal"
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
                                            <td>
                                                <Link
                                                    to="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#view_modal"
                                                >
                                                    #PT0019
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
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        to={all_routes.doctorDetails}
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
                                Dr. Jonathan Adams
                              </Link>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Orthopaedics</td>
                                            <td>13 Mar 2025, 02:40 PM to 03:40 PM</td>
                                            <td>
                        <span className="badge badge-soft-success">
                          Completed
                        </span>
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    to="#"
                                                    className="btn btn-icon btn-sm btn-outline-light"
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
                                                            data-bs-target="#edit_modal"
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
                                            <td>
                                                <Link
                                                    to="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#view_modal"
                                                >
                                                    #PT0018
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
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        to={all_routes.doctorDetails}
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
                                            <td>Paediatrics</td>
                                            <td>16 Feb 2025, 03:00 PM to 04:00 PM</td>
                                            <td>
                        <span className="badge badge-soft-success">
                          Completed
                        </span>
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    to="#"
                                                    className="btn btn-icon btn-sm btn-outline-light"
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
                                                            data-bs-target="#edit_modal"
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
                                            <td>
                                                <Link
                                                    to="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#view_modal"
                                                >
                                                    #PT0017
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
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        to={all_routes.doctorDetails}
                                                        className="avatar avatar-xs me-2"
                                                    >
                                                        <ImageWithBasePath
                                                            src="assets/img/doctors/doctor-12.jpg"
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
                                            <td>Radiology</td>
                                            <td>20 Jan 2025, 04:45 PM to 05:45 PM</td>
                                            <td>
                        <span className="badge badge-soft-success">
                          Completed
                        </span>
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    to="#"
                                                    className="btn btn-icon btn-sm btn-outline-light"
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
                                                            data-bs-target="#edit_modal"
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
                                            <td>
                                                <Link
                                                    to="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#view_modal"
                                                >
                                                    #PT0016
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
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Link
                                                        to={all_routes.doctorDetails}
                                                        className="avatar avatar-xs me-2"
                                                    >
                                                        <ImageWithBasePath
                                                            src="assets/img/doctors/doctor-11.jpg"
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
                                            <td>Cardiology</td>
                                            <td>15 Jan 2025, 05:30 PM to 06:30 PM</td>
                                            <td>
                        <span className="badge badge-soft-success">
                          Completed
                        </span>
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    to="#"
                                                    className="btn btn-icon btn-sm btn-outline-light"
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
                                                            data-bs-target="#edit_modal"
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
      <Suspense fallback={<div />}>
            <AppointmentModal />
      </Suspense>
        </>
  );
};

export default Appointment;
