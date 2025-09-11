import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import ImageWithBasePath from "../../components/image-with-base-path";
import PatientDetailsHeader from "./PatientDetailsHeader";
import { all_routes } from "../../routes/all_routes";


const PatientDetailsPrescription = () => {


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
                Total Prescriptions
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
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Date</th>
                      <th>Prescribed By</th>
                      <th className="no-sort">Amount</th>
                      <th className="no-sort">Payment Method</th>
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
                          #PE0457
                        </Link>
                      </td>
                      <td>10</td>
                      <td>17 Jun 2025</td>
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
                      <td>$500</td>
                      <td>Cash</td>
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
                          aria-label="Prescription actions menu"
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
                          #PE0456
                        </Link>
                      </td>
                      <td>15</td>
                      <td>10 Jun 2025</td>
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
                      <td>$500</td>
                      <td>Paytm</td>
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
                          aria-label="Prescription actions menu"
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
                          #PE0455
                        </Link>
                      </td>
                      <td>20</td>
                      <td>22 May 2025</td>
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
                      <td>$300</td>
                      <td>Paytm</td>
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
                          aria-label="Prescription actions menu"
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
                          #PE0454
                        </Link>
                      </td>
                      <td>12</td>
                      <td>15 May 2025</td>
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
                      <td>$200</td>
                      <td>Paytm</td>
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
                          aria-label="Prescription actions menu"
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
                          #PE0453
                        </Link>
                      </td>
                      <td>18</td>
                      <td>30 Apr 2025</td>
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
                      <td>$100</td>
                      <td>Cash</td>
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
                          aria-label="Prescription actions menu"
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
                          #PE0452
                        </Link>
                      </td>
                      <td>25</td>
                      <td>25 Apr 2025</td>
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
                      <td>$600</td>
                      <td>Paytm</td>
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
                          aria-label="Prescription actions menu"
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
                          #PE0451
                        </Link>
                      </td>
                      <td>40</td>
                      <td>13 Mar 2025</td>
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
                      <td>$700</td>
                      <td>Cash</td>
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
                          aria-label="Prescription actions menu"
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
                          #PE0450
                        </Link>
                      </td>
                      <td>35</td>
                      <td>16 Feb 2025</td>
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
                      <td>$800</td>
                      <td>Paytm</td>
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
                          aria-label="Prescription actions menu"
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
                          #PE0449
                        </Link>
                      </td>
                      <td>42</td>
                      <td>20 Jan 2025</td>
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
                      <td>$900</td>
                      <td>Cash</td>
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
                          aria-label="Prescription actions menu"
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
                          #PE0448
                        </Link>
                      </td>
                      <td>17</td>
                      <td>15 Jan 2025</td>
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
                      <td>$500</td>
                      <td>Paytm</td>
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
                          aria-label="Prescription actions menu"
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
                  className="btn btn-white w-100 position-relative z-1"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Link>
                <Link
                  to="#"
                  className="btn btn-danger w-100 position-relative z-1"
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
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header justify-content-between">
              <h5 className="text-dark modal-title fw-bold text-truncate">
                View Report
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
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
                <ImageWithBasePath
                  src="assets/img/logo-dark.svg"
                  alt="logo-dark"
                  className="invoice-logo"
                />
                <ImageWithBasePath
                  src="assets/img/logo.svg"
                  className="invoice-logo-white"
                  alt="logo"
                />
              </div>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <h6 className="mb-2">Dream’s Medical Center</h6>
                    <p className="mb-1 text-dark fw-medium">Dr. Sandy Maria</p>
                    <p className="fs-13 mb-0">MD Aerologist. MBBS,MS</p>
                  </div>
                </div>
                <div className="text-lg-end">
                  <p className="mb-1">
                    <span className="text-dark fw-medium">Test Type : </span>CBC
                  </p>
                  <p className="mb-1">
                    <span className="text-dark fw-medium">Collected On: </span>
                    25 Jan 2024, 10:00 AM
                  </p>
                  <p className="mb-0">
                    <span className="text-dark fw-medium">Reported On: </span>25
                    Jan 2024, 11:00 AM
                  </p>
                </div>
              </div>
              <h6 className="mb-1">Patient Details</h6>
              <div className="mb-4 bg-light rounded p-2 d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h6 className="fs-14 fw-medium mb-0">M. Reyan Verol</h6>
                <div className="d-flex align-items-center gap-3">
                  <p className="mb-0">28Y / Male</p>
                  <p className="mb-0">Blood : O+ve</p>
                  <p className="mb-0">Type : Outpatient</p>
                </div>
              </div>
              <h5 className="mb-3">Complete Blood Count(CBC)</h5>
              <div className="table-responsive table-nowrap rounded border border-bottom-0">
                <table className="table mb-0 rounded">
                  <thead className="table-dark">
                    <tr>
                      <th className="text-white">Investigation</th>
                      <th className="text-white">Result</th>
                      <th className="text-white">Reference Value</th>
                      <th className="text-white">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h6 className="mb-0 fs-14 fw-semibold">
                          Differntial WBC Count
                        </h6>
                      </td>
                      <td />
                      <td />
                      <td />
                    </tr>
                    <tr>
                      <td className="fw-medium text-dark">Neutrophils</td>
                      <td>75</td>
                      <td>50 - 62</td>
                      <td>%</td>
                    </tr>
                    <tr>
                      <td className="fw-medium text-dark">Lymphocytes</td>
                      <td>90</td>
                      <td>20 - 40</td>
                      <td>%</td>
                    </tr>
                    <tr>
                      <td className="fw-medium text-dark">Eosinophils</td>
                      <td>60</td>
                      <td>00 - 06</td>
                      <td>%</td>
                    </tr>
                    <tr>
                      <td className="fw-medium text-dark">Monocytes</td>
                      <td>60</td>
                      <td>00 - 10</td>
                      <td>%</td>
                    </tr>
                    <tr>
                      <td className="fw-medium text-dark">Basophils</td>
                      <td>95</td>
                      <td>00 - 02</td>
                      <td>%</td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="mb-0 fw-semibold fs-14">
                          Platelet Count
                        </h6>
                      </td>
                      <td />
                      <td />
                      <td />
                    </tr>
                    <tr>
                      <td className="fw-medium text-dark">Platelet Count</td>
                      <td>150000</td>
                      <td>150000 - 410000</td>
                      <td>cumm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className=" mt-3 d-flex justify-content-between align-items-center gap-3 flex-wrap">
                <div>
                  <ImageWithBasePath
                    src="assets/img/icons/qr-code.svg"
                    alt="img"
                  />
                </div>
                <div className="text-center">
                  <ImageWithBasePath
                    src="assets/img/icons/signature.svg"
                    alt="img"
                    className="signature mb-1"
                  />
                  <p className="mb-0">Authorized Sign</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End view Modal */}
    </>
  );
};

export default PatientDetailsPrescription;
