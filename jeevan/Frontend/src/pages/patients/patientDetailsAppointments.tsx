import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import ImageWithBasePath from "../../components/image-with-base-path";
import { all_routes } from "../../routes/all_routes";
import PatientDetailsHeader from "./PatientDetailsHeader";
import {
  Department,
  Doctor,
  ModePayment,
  Patient,
  PatientType,
  PrefferedMode,
} from "../../core/json/selectOption";
import CommonSelect from "../../components/common-select/commonSelect";
import CommonDatePicker from "../../components/common-date-picker/commonDatePicker";
import CommonTimePicker from "../../components/common-time-pickers/CommonTimePicker";


const PatientDetailsAppointments = () => {


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
              <h4 className="mb-1">Patient Details</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Patient Details</li>
                </ol>
              </div>
            </div>
            <Link
              to={all_routes.patients}
              className="fw-medium d-flex align-items-center"
            >
              <i className="ti ti-arrow-left me-1" />
              Back to Patient
            </Link>
          </div>
          {/* End Page Header */}
          {/* tabs start */}
          <PatientDetailsHeader />
          {/* tabs end */}
          {/* card start */}
          <div className="card mb-0">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h5 className="d-inline-flex align-items-center mb-0">
                Total Appointments
                <span className="badge bg-danger ms-2">658</span>
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
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Appointment actions menu"
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
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Appointment actions menu"
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
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Appointment actions menu"
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
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Appointment actions menu"
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
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Appointment actions menu"
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
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Appointment actions menu"
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
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Appointment actions menu"
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
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Appointment actions menu"
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
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Appointment actions menu"
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
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Appointment actions menu"
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
              {/* table end */}
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
        {/* Start edit Modal */}
        <div id="edit_modal" className="modal fade">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h5 className="text-dark modal-title fw-bold text-truncate">
                  Edit Appointment
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
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Select Patient</label>
                        <CommonSelect
                          options={Patient}
                          className="select"
                          defaultValue={Patient[1]}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Patient Type</label>
                        <CommonSelect
                          options={PatientType}
                          className="select"
                          defaultValue={PatientType[1]}
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
                          defaultValue={Department[1]}
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
                          defaultValue={Doctor[1]}
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
                          options={PrefferedMode}
                          className="select"
                          defaultValue={PrefferedMode[1]}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">Date</label>
                        <div className=" w-auto input-group-flat">
                          <CommonDatePicker placeholder="dd/mm/yyyy" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">Start Time</label>
                        <div className="input-icon-end position-relative">
                          <CommonTimePicker />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">End Time</label>
                        <div className="input-icon-end position-relative">
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
                          rows={4}
                          defaultValue={
                            "Provide detailed instructions on how to use prescribed medications. Include dosage, frequency, and any specific application guidelines."
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">Mode of Payment</label>
                        <CommonSelect
                          options={ModePayment}
                          className="select"
                          defaultValue={ModePayment[1]}
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
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* End edit Modal */}
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
                    className="btn btn-white position-relative z-1 me-2 w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link
                    to="#"
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
        {/* Start view Modal */}
        <div id="view_modal" className="modal fade">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h5 className="modal-title text-truncate">
                  Appointment Details
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
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <Link to="#" className="avatar flex-shrink-0">
                      <ImageWithBasePath
                        src="assets/img/users/user-04.jpg"
                        className="rounded"
                        alt="patient"
                      />
                    </Link>
                    <div className="ms-2">
                      <div>
                        <h6 className="fw-semibold fs-14 text-truncate mb-1">
                          <Link to="#">Gifford</Link>
                        </h6>
                        <p className="fs-13 mb-0">Patient</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="badge badge-soft-purple">Upcoming</span>
                  </div>
                </div>
                <div className="row mb-3 row-gap-3">
                  <div className="col-sm-12">
                    <h6 className="mb-1">Date &amp; Time</h6>
                    <p className="text-dark mb-1">$500 / 1 Hr</p>
                    <p className="fs-13 mb-0">
                      24 Jan 2024, 09:00 AM to 10:00 PM
                    </p>
                  </div>
                  <div className="col-sm-12">
                    <h6 className="mb-1">Consultation With</h6>
                    <p className="text-dark mb-1">Dr. Laird</p>
                    <p className="fs-13 mb-0">Dermatologist</p>
                  </div>
                </div>
                <h6 className="mb-1">Reason</h6>
                <p className="mb-3">Fever, Stomach pain, Drowsiness</p>
                <h6 className="mb-1">Notes</h6>
                <p className="mb-0">
                  Provide detailed instructions on how to use prescribed
                  medications. Include dosage, frequency, and any specific
                  application guidelines.
                </p>
              </div>
              <div className="modal-footer d-flex align-items-center gap-1">
                <button
                  type="button"
                  className="btn btn-white"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <Link
                  to={all_routes.appointmentConsultation}
                  className="btn btn-primary"
                >
                  Start Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* End view Modal */}
      </>
    </>
  );
};

export default PatientDetailsAppointments;
