
import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import { all_routes } from "../../routes/all_routes";
import ImageWithBasePath from "../../components/image-with-base-path";

const AllDoctorsList = () => {

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
              <h4 className="mb-1">Doctors</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Doctors</li>
                </ol>
              </div>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              <Link
                to={all_routes.doctors}
                className="btn btn-icon btn-white"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Grid"
                data-bs-original-title="Grid View"
              >
                <i className="ti ti-layout-grid" />
              </Link>
              <Link
                to={all_routes.allDoctorsList}
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
              <Link to={all_routes.addDoctors} className="btn btn-primary">
                <i className="ti ti-square-rounded-plus me-1" />
                New Doctor
              </Link>
            </div>
          </div>
          {/* End Page Header */}
          {/* card start */}
          <div className="card mb-0">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h5 className="d-inline-flex align-items-center mb-0">
                Total Doctors<span className="badge bg-danger ms-2">600</span>
              </h5>
              <div className="d-flex align-items-center">
                {/* sort by */}
                <div className="dropdown">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-md btn-outline-light d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                   aria-label="Doctor actions menu" aria-haspopup="true" aria-expanded="false">
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
              <div className="table-responsive table-nowrap">
                <table className="table mb-0 border">
                  <thead className="table-light">
                    <tr>
                      <th>Doctor ID</th>
                      <th>Doctor Name</th>
                      <th>Department</th>
                      <th>Qualification</th>
                      <th>Experience</th>
                      <th>Total Appointments</th>
                      <th>Status</th>
                      <th className="no-sort" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#DR0025</td>
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
                      <td>MBBS</td>
                      <td>4+ years</td>
                      <td>200</td>
                      <td>
                        <span className="badge badge-soft-success">Active</span>
                      </td>
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
                              to={all_routes.doctorDetails}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.editDoctors}
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
                      <td>#DR0024</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.doctorDetails}
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
                      <td>Dental Surgery</td>
                      <td>MDS</td>
                      <td>3+ years</td>
                      <td>350</td>
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
                          aria-label="more options"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to={all_routes.doctorDetails}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.editDoctors}
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
                      <td>#DR0023</td>
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
                                Dr. Benjamin Harris
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Dermatology</td>
                      <td>MS</td>
                      <td>6+ years</td>
                      <td>400</td>
                      <td>
                        <span className="badge badge-soft-success">Active</span>
                      </td>
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
                              to={all_routes.doctorDetails}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.editDoctors}
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
                      <td>#DR0022</td>
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
                                Dr. Laura Mitchell
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>ENT Surgery</td>
                      <td>MBBS</td>
                      <td>2+ years</td>
                      <td>150</td>
                      <td>
                        <span className="badge badge-soft-success">Active</span>
                      </td>
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
                              to={all_routes.doctorDetails}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.editDoctors}
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
                      <td>#DR0021</td>
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
                                Dr. Christopher Lewis
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>General Medicine</td>
                      <td>MS</td>
                      <td>3+ years</td>
                      <td>380</td>
                      <td>
                        <span className="badge badge-soft-success">Active</span>
                      </td>
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
                              to={all_routes.doctorDetails}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.editDoctors}
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
                      <td>#DR0020</td>
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
                                Dr. Natalie Foster
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Ophthalmology</td>
                      <td>MBBS</td>
                      <td>2+ years</td>
                      <td>450</td>
                      <td>
                        <span className="badge badge-soft-success">Active</span>
                      </td>
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
                              to={all_routes.doctorDetails}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.editDoctors}
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
                      <td>#DR0019</td>
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
                                Dr. Jonathan Adams
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Orthopaedics</td>
                      <td>MS</td>
                      <td>3+ years</td>
                      <td>330</td>
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
                          aria-label="more options"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to={all_routes.doctorDetails}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.editDoctors}
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
                      <td>#DR0018</td>
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
                      <td>Pediatrics</td>
                      <td>MBBS</td>
                      <td>4+ years</td>
                      <td>270</td>
                      <td>
                        <span className="badge badge-soft-success">Active</span>
                      </td>
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
                              to={all_routes.doctorDetails}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.editDoctors}
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
                      <td>#DR0017</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.doctorDetails}
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
                      <td>Radiology</td>
                      <td>MS</td>
                      <td>4+ years</td>
                      <td>510</td>
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
                          aria-label="more options"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2">
                          <li>
                            <Link
                              to={all_routes.doctorDetails}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.editDoctors}
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
                      <td>#DR0016</td>
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
                                Dr. Victoria Evans
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Cardiology</td>
                      <td>MBBS</td>
                      <td>3+ years</td>
                      <td>480</td>
                      <td>
                        <span className="badge badge-soft-success">Active</span>
                      </td>
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
                              to={all_routes.doctorDetails}
                              className="dropdown-item d-flex align-items-center"
                            >
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={all_routes.editDoctors}
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
                  className="btn btn-outline-light w-100"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Link>
                <Link
                  to="#"
                  className="btn btn-danger w-100"
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
  );
};

export default AllDoctorsList;
