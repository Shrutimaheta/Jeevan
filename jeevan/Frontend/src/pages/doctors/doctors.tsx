import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import { all_routes } from "../../routes/all_routes";
import ImageWithBasePath from "../../components/image-with-base-path";

const Doctors = () => {
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
                className="btn btn-icon btn-white active"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Grid"
                data-bs-original-title="Grid View"
              >
                <i className="ti ti-layout-grid" />
              </Link>
              <Link
                to={all_routes.allDoctorsList}
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
              <Link to={all_routes.addDoctors} className="btn btn-primary">
                <i className="ti ti-square-rounded-plus me-1" />
                New Doctor
              </Link>
            </div>
          </div>
          {/* End Page Header */}
          {/* row start */}
          <div className="row row-gap-4 justify-content-center">
            {/* col start */}
            <div className="col-xxl-3 col-xl-4 col-lg-6 d-flex">
              <div className="card shadow flex-fill w-100 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge badge-soft-primary">#DR0025</span>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light border-0"
                      data-bs-toggle="dropdown"
                      aria-label="Doctor actions menu"
                      aria-haspopup="true"
                      aria-expanded="false"
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
                  </div>
                  <div className="text-center mb-3">
                    <span className="avatar avatar-xl online avatar-rounded">
                      <Link to={all_routes.doctorDetails}>
                        <ImageWithBasePath
                          src="assets/img/doctors/doctor-01.jpg"
                          alt="doctor"
                        />
                      </Link>
                    </span>
                    <h6 className="mt-2 mb-1">
                      <Link to={all_routes.doctorDetails}>
                        Dr. Andrew Clark
                      </Link>
                    </h6>
                    <span className="fs-14">Anesthesiologist</span>
                  </div>
                  <div className="border p-1 px-2 rounded mb-3">
                    <div className="row">
                      <div className="col-6 text-center py-2 border-end px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Experience
                        </h6>
                        <p className="fs-13 mb-0">4+ Years</p>
                      </div>
                      <div className="col-6 text-center py-2 px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Appointments
                        </h6>
                        <p className="fs-13 mb-0">200</p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-2 text-dark d-flex align-items-center">
                    <i className="ti ti-mail me-1 text-body" />
                    andrew@example.com
                  </p>
                  <p className="mb-0 text-dark d-flex align-items-center">
                    <i className="ti ti-phone me-1 text-body" />
                    +1 75964 25493
                  </p>
                </div>
              </div>
            </div>
            {/* col end */}
            {/* col start */}
            <div className="col-xxl-3 col-xl-4 col-lg-6 d-flex">
              <div className="card shadow flex-fill w-100 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge badge-soft-primary">#DR0024</span>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light border-0"
                      data-bs-toggle="dropdown"
                      aria-label="Doctor actions menu"
                      aria-haspopup="true"
                      aria-expanded="false"
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
                  </div>
                  <div className="text-center mb-3">
                    <span className="avatar avatar-xl online avatar-rounded">
                      <Link to={all_routes.doctorDetails}>
                        <ImageWithBasePath
                          src="assets/img/doctors/doctor-03.jpg"
                          alt="doctor"
                        />
                      </Link>
                    </span>
                    <h6 className="mt-2 mb-1">
                      <Link to={all_routes.doctorDetails}>
                        Dr. Katherine Brooks
                      </Link>
                    </h6>
                    <span className="fs-14">Periodontist</span>
                  </div>
                  <div className="border p-1 px-2 rounded mb-3">
                    <div className="row">
                      <div className="col-6 text-center py-2 border-end px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Experience
                        </h6>
                        <p className="fs-13 mb-0">3+ Years</p>
                      </div>
                      <div className="col-6 text-center py-2 px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Appointments
                        </h6>
                        <p className="fs-13 mb-0">350</p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-2 text-dark d-flex align-items-center">
                    <i className="ti ti-mail me-1 text-body" />
                    katherine@example.com
                  </p>
                  <p className="mb-0 text-dark d-flex align-items-center">
                    <i className="ti ti-phone me-1 text-body" />
                    +1 75964 25493
                  </p>
                </div>
              </div>
            </div>
            {/* col end */}
            {/* col start */}
            <div className="col-xxl-3 col-xl-4 col-lg-6 d-flex">
              <div className="card shadow flex-fill w-100 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge badge-soft-primary">#DR0023</span>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light border-0"
                      data-bs-toggle="dropdown"
                      aria-label="Doctor actions menu"
                      aria-haspopup="true"
                      aria-expanded="false"
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
                  </div>
                  <div className="text-center mb-3">
                    <span className="avatar avatar-xl online avatar-rounded">
                      <Link to={all_routes.doctorDetails}>
                        <ImageWithBasePath
                          src="assets/img/doctors/doctor-04.jpg"
                          alt="doctor"
                        />
                      </Link>
                    </span>
                    <h6 className="mt-2 mb-1">
                      <Link to={all_routes.doctorDetails}>
                        Dr. Benjamin Harris
                      </Link>
                    </h6>
                    <span className="fs-14">Dermatopathologist</span>
                  </div>
                  <div className="border p-1 px-2 rounded mb-3">
                    <div className="row">
                      <div className="col-6 text-center py-2 border-end px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Experience
                        </h6>
                        <p className="fs-13 mb-0">6+ Years</p>
                      </div>
                      <div className="col-6 text-center py-2 px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Appointments
                        </h6>
                        <p className="fs-13 mb-0">400</p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-2 text-dark d-flex align-items-center">
                    <i className="ti ti-mail me-1 text-body" />
                    benjamin@example.com
                  </p>
                  <p className="mb-0 text-dark d-flex align-items-center">
                    <i className="ti ti-phone me-1 text-body" />
                    +1 83217 65984
                  </p>
                </div>
              </div>
            </div>
            {/* col end */}
            {/* col start */}
            <div className="col-xxl-3 col-xl-4 col-lg-6 d-flex">
              <div className="card shadow flex-fill w-100 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge badge-soft-primary">#DR0022</span>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light border-0"
                      data-bs-toggle="dropdown"
                      aria-label="Doctor actions menu"
                      aria-haspopup="true"
                      aria-expanded="false"
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
                  </div>
                  <div className="text-center mb-3">
                    <span className="avatar avatar-xl online avatar-rounded">
                      <Link to={all_routes.doctorDetails}>
                        <ImageWithBasePath
                          src="assets/img/doctors/doctor-05.jpg"
                          alt="doctor"
                        />
                      </Link>
                    </span>
                    <h6 className="mt-2 mb-1">
                      <Link to={all_routes.doctorDetails}>
                        Dr. Laura Mitchell
                      </Link>
                    </h6>
                    <span className="fs-14">ENT Surgeon</span>
                  </div>
                  <div className="border p-1 px-2 rounded mb-3">
                    <div className="row">
                      <div className="col-6 text-center py-2 border-end px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Experience
                        </h6>
                        <p className="fs-13 mb-0">2+ Years</p>
                      </div>
                      <div className="col-6 text-center py-2 px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Appointments
                        </h6>
                        <p className="fs-13 mb-0">150</p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-2 text-dark d-flex align-items-center">
                    <i className="ti ti-mail me-1 text-body" />
                    laura@example.com
                  </p>
                  <p className="mb-0 text-dark d-flex align-items-center">
                    <i className="ti ti-phone me-1 text-body" />
                    +1 91745 36289
                  </p>
                </div>
              </div>
            </div>
            {/* col end */}
            {/* col start */}
            <div className="col-xxl-3 col-xl-4 col-lg-6 d-flex">
              <div className="card shadow flex-fill w-100 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge badge-soft-primary">#DR0021</span>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light border-0"
                      data-bs-toggle="dropdown"
                      aria-label="Doctor actions menu"
                      aria-haspopup="true"
                      aria-expanded="false"
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
                  </div>
                  <div className="text-center mb-3">
                    <span className="avatar avatar-xl online avatar-rounded">
                      <Link to={all_routes.doctorDetails}>
                        <ImageWithBasePath
                          src="assets/img/doctors/doctor-06.jpg"
                          alt="doctor"
                        />
                      </Link>
                    </span>
                    <h6 className="mt-2 mb-1">
                      <Link to={all_routes.doctorDetails}>
                        Dr. Christopher Lewis
                      </Link>
                    </h6>
                    <span className="fs-14">Medicine Physician</span>
                  </div>
                  <div className="border p-1 px-2 rounded mb-3">
                    <div className="row">
                      <div className="col-6 text-center py-2 border-end px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Experience
                        </h6>
                        <p className="fs-13 mb-0">3+ Years</p>
                      </div>
                      <div className="col-6 text-center py-2 px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Appointments
                        </h6>
                        <p className="fs-13 mb-0">380</p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-2 text-dark d-flex align-items-center">
                    <i className="ti ti-mail me-1 text-body" />
                    christopher@example.com
                  </p>
                  <p className="mb-0 text-dark d-flex align-items-center">
                    <i className="ti ti-phone me-1 text-body" />
                    +1 68429 15736
                  </p>
                </div>
              </div>
            </div>
            {/* col end */}
            {/* col start */}
            <div className="col-xxl-3 col-xl-4 col-lg-6 d-flex">
              <div className="card shadow flex-fill w-100 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge badge-soft-primary">#DR0020</span>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light border-0"
                      data-bs-toggle="dropdown"
                      aria-label="Doctor actions menu"
                      aria-haspopup="true"
                      aria-expanded="false"
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
                  </div>
                  <div className="text-center mb-3">
                    <span className="avatar avatar-xl online avatar-rounded">
                      <Link to={all_routes.doctorDetails}>
                        <ImageWithBasePath
                          src="assets/img/doctors/doctor-07.jpg"
                          alt="doctor"
                        />
                      </Link>
                    </span>
                    <h6 className="mt-2 mb-1">
                      <Link to={all_routes.doctorDetails}>
                        Dr. Natalie Foster
                      </Link>
                    </h6>
                    <span className="fs-14">Ophthalmologist</span>
                  </div>
                  <div className="border p-1 px-2 rounded mb-3">
                    <div className="row">
                      <div className="col-6 text-center py-2 border-end px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Experience
                        </h6>
                        <p className="fs-13 mb-0">2+ Years</p>
                      </div>
                      <div className="col-6 text-center py-2 px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Appointments
                        </h6>
                        <p className="fs-13 mb-0">450</p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-2 text-dark d-flex align-items-center">
                    <i className="ti ti-mail me-1 text-body" />
                    natalie@example.com
                  </p>
                  <p className="mb-0 text-dark d-flex align-items-center">
                    <i className="ti ti-phone me-1 text-body" />
                    +1 52637 94820
                  </p>
                </div>
              </div>
            </div>
            {/* col end */}
            {/* col start */}
            <div className="col-xxl-3 col-xl-4 col-lg-6 d-flex">
              <div className="card shadow flex-fill w-100 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge badge-soft-primary">#DR0019</span>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light border-0"
                      data-bs-toggle="dropdown"
                      aria-label="Doctor actions menu"
                      aria-haspopup="true"
                      aria-expanded="false"
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
                  </div>
                  <div className="text-center mb-3">
                    <span className="avatar avatar-xl online avatar-rounded">
                      <Link to={all_routes.doctorDetails}>
                        <ImageWithBasePath
                          src="assets/img/doctors/doctor-10.jpg"
                          alt="doctor"
                        />
                      </Link>
                    </span>
                    <h6 className="mt-2 mb-1">
                      <Link to={all_routes.doctorDetails}>
                        Dr. Jonathan Adams
                      </Link>
                    </h6>
                    <span className="fs-14">Orthopedic Surgeon</span>
                  </div>
                  <div className="border p-1 px-2 rounded mb-3">
                    <div className="row">
                      <div className="col-6 text-center py-2 border-end px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Experience
                        </h6>
                        <p className="fs-13 mb-0">3+ Years</p>
                      </div>
                      <div className="col-6 text-center py-2 px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Appointments
                        </h6>
                        <p className="fs-13 mb-0">330</p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-2 text-dark d-flex align-items-center">
                    <i className="ti ti-mail me-1 text-body" />
                    jonathan@example.com
                  </p>
                  <p className="mb-0 text-dark d-flex align-items-center">
                    <i className="ti ti-phone me-1 text-body" />
                    +1 39842 76521
                  </p>
                </div>
              </div>
            </div>
            {/* col end */}
            {/* col start */}
            <div className="col-xxl-3 col-xl-4 col-lg-6 d-flex">
              <div className="card shadow flex-fill w-100 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge badge-soft-primary">#DR0018</span>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light border-0"
                      data-bs-toggle="dropdown"
                      aria-label="Doctor actions menu"
                      aria-haspopup="true"
                      aria-expanded="false"
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
                  </div>
                  <div className="text-center mb-3">
                    <span className="avatar avatar-xl online avatar-rounded">
                      <Link to={all_routes.doctorDetails}>
                        <ImageWithBasePath
                          src="assets/img/doctors/doctor-08.jpg"
                          alt="doctor"
                        />
                      </Link>
                    </span>
                    <h6 className="mt-2 mb-1">
                      <Link to={all_routes.doctorDetails}>
                        Dr. Rebecca Scott
                      </Link>
                    </h6>
                    <span className="fs-14">Pediatrics</span>
                  </div>
                  <div className="border p-1 px-2 rounded mb-3">
                    <div className="row">
                      <div className="col-6 text-center py-2 border-end px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Experience
                        </h6>
                        <p className="fs-13 mb-0">2+ Years</p>
                      </div>
                      <div className="col-6 text-center py-2 px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Appointments
                        </h6>
                        <p className="fs-13 mb-0">270</p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-2 text-dark d-flex align-items-center">
                    <i className="ti ti-mail me-1 text-body" />
                    rebecca@example.com
                  </p>
                  <p className="mb-0 text-dark d-flex align-items-center">
                    <i className="ti ti-phone me-1 text-body" />
                    +1 27590 31468
                  </p>
                </div>
              </div>
            </div>
            {/* col end */}
            {/* col start */}
            <div className="col-xxl-3 col-xl-4 col-lg-6 d-flex">
              <div className="card shadow flex-fill w-100 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge badge-soft-primary">#DR0017</span>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light border-0"
                      data-bs-toggle="dropdown"
                      aria-label="Doctor actions menu"
                      aria-haspopup="true"
                      aria-expanded="false"
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
                  </div>
                  <div className="text-center mb-3">
                    <span className="avatar avatar-xl online avatar-rounded">
                      <Link to={all_routes.doctorDetails}>
                        <ImageWithBasePath
                          src="assets/img/doctors/doctor-12.jpg"
                          alt="doctor"
                        />
                      </Link>
                    </span>
                    <h6 className="mt-2 mb-1">
                      <Link to={all_routes.doctorDetails}>
                        Dr. Samuel Turner
                      </Link>
                    </h6>
                    <span className="fs-14">Radiologist</span>
                  </div>
                  <div className="border p-1 px-2 rounded mb-3">
                    <div className="row">
                      <div className="col-6 text-center py-2 border-end px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Experience
                        </h6>
                        <p className="fs-13 mb-0">4+ Years</p>
                      </div>
                      <div className="col-6 text-center py-2 px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Appointments
                        </h6>
                        <p className="fs-13 mb-0">510</p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-2 text-dark d-flex align-items-center">
                    <i className="ti ti-mail me-1 text-body" />
                    samuel@example.com
                  </p>
                  <p className="mb-0 text-dark d-flex align-items-center">
                    <i className="ti ti-phone me-1 text-body" />
                    +1 61957 84230
                  </p>
                </div>
              </div>
            </div>
            {/* col end */}
            {/* col start */}
            <div className="col-xxl-3 col-xl-4 col-lg-6 d-flex">
              <div className="card shadow flex-fill w-100 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge badge-soft-primary">#DR0016</span>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light border-0"
                      data-bs-toggle="dropdown"
                      aria-label="Doctor actions menu"
                      aria-haspopup="true"
                      aria-expanded="false"
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
                  </div>
                  <div className="text-center mb-3">
                    <span className="avatar avatar-xl online avatar-rounded">
                      <Link to={all_routes.doctorDetails}>
                        <ImageWithBasePath
                          src="assets/img/doctors/doctor-11.jpg"
                          alt="doctor"
                        />
                      </Link>
                    </span>
                    <h6 className="mt-2 mb-1">
                      <Link to={all_routes.doctorDetails}>
                        Dr. Victoria Evans
                      </Link>
                    </h6>
                    <span className="fs-14">Cardiologist</span>
                  </div>
                  <div className="border p-1 px-2 rounded mb-3">
                    <div className="row">
                      <div className="col-6 text-center py-2 border-end px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Experience
                        </h6>
                        <p className="fs-13 mb-0">3+ Years</p>
                      </div>
                      <div className="col-6 text-center py-2 px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Appointments
                        </h6>
                        <p className="fs-13 mb-0">480</p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-2 text-dark d-flex align-items-center">
                    <i className="ti ti-mail me-1 text-body" />
                    victoria@example.com
                  </p>
                  <p className="mb-0 text-dark d-flex align-items-center">
                    <i className="ti ti-phone me-1 text-body" />
                    +1 84736 50912
                  </p>
                </div>
              </div>
            </div>
            {/* col end */}
            {/* col start */}
            <div className="col-xxl-3 col-xl-4 col-lg-6 d-flex">
              <div className="card shadow flex-fill w-100 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge badge-soft-primary">#DR0015</span>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light border-0"
                      data-bs-toggle="dropdown"
                      aria-label="Doctor actions menu"
                      aria-haspopup="true"
                      aria-expanded="false"
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
                  </div>
                  <div className="text-center mb-3">
                    <span className="avatar avatar-xl online avatar-rounded">
                      <Link to={all_routes.doctorDetails}>
                        <ImageWithBasePath
                          src="assets/img/doctors/doctor-12.jpg"
                          alt="doctor"
                        />
                      </Link>
                    </span>
                    <h6 className="mt-2 mb-1">
                      <Link to={all_routes.doctorDetails}>
                        Dr. Daniel Foster
                      </Link>
                    </h6>
                    <span className="fs-14">Ophthalmologist</span>
                  </div>
                  <div className="border p-1 px-2 rounded mb-3">
                    <div className="row">
                      <div className="col-6 text-center py-2 border-end px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Experience
                        </h6>
                        <p className="fs-13 mb-0">5+ Years</p>
                      </div>
                      <div className="col-6 text-center py-2 px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Appointments
                        </h6>
                        <p className="fs-13 mb-0">460</p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-2 text-dark d-flex align-items-center">
                    <i className="ti ti-mail me-1 text-body" />
                    daniel@example.com
                  </p>
                  <p className="mb-0 text-dark d-flex align-items-center">
                    <i className="ti ti-phone me-1 text-body" />
                    +1 70325 67849
                  </p>
                </div>
              </div>
            </div>
            {/* col end */}
            {/* col start */}
            <div className="col-xxl-3 col-xl-4 col-lg-6 d-flex">
              <div className="card shadow flex-fill w-100 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge badge-soft-primary">#DR0014</span>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light border-0"
                      data-bs-toggle="dropdown"
                      aria-label="Doctor actions menu"
                      aria-haspopup="true"
                      aria-expanded="false"
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
                  </div>
                  <div className="text-center mb-3">
                    <span className="avatar avatar-xl online avatar-rounded">
                      <Link to={all_routes.doctorDetails}>
                        <ImageWithBasePath
                          src="assets/img/doctors/doctor-03.jpg"
                          alt="doctor"
                        />
                      </Link>
                    </span>
                    <h6 className="mt-2 mb-1">
                      <Link to={all_routes.doctorDetails}>
                        Dr. Amelia Scott
                      </Link>
                    </h6>
                    <span className="fs-14">Nephrologist</span>
                  </div>
                  <div className="border p-1 px-2 rounded mb-3">
                    <div className="row">
                      <div className="col-6 text-center py-2 border-end px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Experience
                        </h6>
                        <p className="fs-13 mb-0">3+ Years</p>
                      </div>
                      <div className="col-6 text-center py-2 px-1">
                        <h6 className="fw-semibold fs-14 text-truncate">
                          Appointments
                        </h6>
                        <p className="fs-13 mb-0">220</p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-2 text-dark d-flex align-items-center">
                    <i className="ti ti-mail me-1 text-body" />
                    amelia@example.com
                  </p>
                  <p className="mb-0 text-dark d-flex align-items-center">
                    <i className="ti ti-phone me-1 text-body" />
                    +1 56214 89375
                  </p>
                </div>
              </div>
            </div>
            {/* col end */}
          </div>
          {/* row start */}
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
                    to={all_routes.doctors}
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
    </>
  );
};

export default Doctors;
