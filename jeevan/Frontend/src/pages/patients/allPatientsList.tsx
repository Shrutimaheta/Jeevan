import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import { all_routes } from "../../routes/all_routes";
import ImageWithBasePath from "../../components/image-with-base-path";


const AllPatientsList = () => {


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
                className="btn btn-icon btn-white"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Grid"
                data-bs-original-title="Grid View"
              >
                <i className="ti ti-layout-grid" />
              </Link>
              <Link
                to={all_routes.allPatientsList}
                className="btn btn-icon btn-white active"
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
          {/* card start */}
          <div className="card mb-0">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h6 className="d-inline-flex align-items-center mb-0">
                Total Patients <span className="badge bg-danger ms-2">658</span>
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
                      <th>Patient ID</th>
                      <th>Patient Name</th>
                      <th className="no-sort">Gender</th>
                      <th className="no-sort">Department</th>
                      <th>Doctor Name</th>
                      <th>Last Visit</th>
                      <th className="no-sort">Status</th>
                      <th className="no-sort" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link to={all_routes.patientDetails}>#PT0025</Link>
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
                      <td>Anaesthesiology</td>
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
                      <td>17 Jun 2025</td>
                      <td>
                        <span className="badge badge-soft-orange">
                          Out Patient
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Patient actions menu"
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
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.patientDetails}>#PT0024</Link>
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
                              <Link to={all_routes.patientDetails}>Emily Davis</Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Female</td>
                      <td>Dental Surgery</td>
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
                      <td>10 Jun 2025</td>
                      <td>
                        <span className="badge badge-soft-purple">
                          In Patient
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Patient actions menu"
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
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.patientDetails}>#PT0023</Link>
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
                      <td>Dermatology</td>
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
                      <td>22 May 2025</td>
                      <td>
                        <span className="badge badge-soft-orange">
                          Out Patient
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Patient actions menu"
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
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.patientDetails}>#PT0022</Link>
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
                      <td>ENT Surgery</td>
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
                      <td>15 May 2025</td>
                      <td>
                        <span className="badge badge-soft-purple">
                          In Patient
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Patient actions menu"
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
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.patientDetails}>#PT0021</Link>
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
                              <Link to={all_routes.patientDetails}>David Smith</Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Male</td>
                      <td>General Medicine</td>
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
                      <td>30 Apr 2025</td>
                      <td>
                        <span className="badge badge-soft-orange">
                          Out Patient
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Patient actions menu"
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
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.patientDetails}>#PT0020</Link>
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
                      <td>Ophthalmology</td>
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
                      <td>25 Apr 2025</td>
                      <td>
                        <span className="badge badge-soft-purple">
                          In Patient
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Patient actions menu"
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
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.patientDetails}>#PT0019</Link>
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
                      <td>Orthopaedics</td>
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
                      <td>13 Mar 2025</td>
                      <td>
                        <span className="badge badge-soft-orange">
                          Out Patient
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Patient actions menu"
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
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.patientDetails}>#PT0018</Link>
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
                      <td>Pediatrics</td>
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
                      <td>16 Feb 2025</td>
                      <td>
                        <span className="badge badge-soft-purple">
                          In Patient
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Patient actions menu"
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
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.patientDetails}>#PT0017</Link>
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
                      <td>Radiology</td>
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
                      <td>20 Jan 2025</td>
                      <td>
                        <span className="badge badge-soft-orange">
                          Out Patient
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Patient actions menu"
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
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={all_routes.patientDetails}>#PT0016</Link>
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
                      <td>Cardiology</td>
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
                      <td>15 Jan 2025</td>
                      <td>
                        <span className="badge badge-soft-purple">
                          In Patient
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Patient actions menu"
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

export default AllPatientsList;
