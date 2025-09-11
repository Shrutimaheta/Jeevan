import { Link } from "react-router-dom"
import CommonFooter from "../../components/common-footer/commonFooter"
import { all_routes } from "../../routes/all_routes"
import ImageWithBasePath from "../../components/image-with-base-path"
import PatientDetailsHeader from "./PatientDetailsHeader";

const PatientDetails = () => {
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
          <Link to={all_routes.patients} className="fw-medium d-flex align-items-center">
            <i className="ti ti-arrow-left me-1" />
            Back to Patient
          </Link>
        </div>
        {/* End Page Header */}
        {/* tabs start */}
        <PatientDetailsHeader />
        {/* tabs end */}
        {/* row start */}
        <div className="row">
          {/* col start */}
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-body">
                <div className="d-flex align-items-center pb-3 mb-3 border-bottom">
                  <Link
                    to="#"
                    className="avatar avatar-xxl me-3"
                  >
                    <ImageWithBasePath
                      src="assets/img/profiles/avatar-03.jpg"
                      alt="patient"
                      className="rounded"
                    />
                  </Link>
                  <div>
                    <span className="badge badge-soft-primary">#PT001</span>
                    <h5 className="mb-1 mt-2">
                      <Link to="#">Reyan Verol</Link>
                    </h5>
                    <p className="fs-13 mb-0">Last Visited : 24 Jan 2025</p>
                  </div>
                </div>
                <h6 className="mb-2">Basic Information</h6>
                <p className="mb-3">
                  Added On{" "}
                  <span className="float-end text-dark">24 May 2024</span>
                </p>
                <p className="mb-3">
                  DOB <span className="float-end text-dark">10 Jan 1991</span>
                </p>
                <p className="mb-3">
                  Gender <span className="float-end text-dark">Male</span>
                </p>
                <p className="mb-3">
                  Martial Status{" "}
                  <span className="float-end text-dark">Married</span>
                </p>
                <p className="mb-3">
                  Blood Group <span className="float-end text-dark">O+ve</span>
                </p>
                <p className="mb-3">
                  Phone Number{" "}
                  <span className="float-end text-dark">+1 75964 25493</span>
                </p>
                <p className="mb-3">
                  Email{" "}
                  <span className="float-end text-dark">
                  reyan@example.com
                  </span>
                </p>
                <p className="mb-3">
                  Referred By{" "}
                  <Link
                    to={all_routes.doctorDetails}
                    className="float-end text-decoration-underline link-primary"
                  >
                    Dr Antonio
                  </Link>
                </p>
                <p className="mb-4">
                  Total No of Bookings{" "}
                  <span className="float-end text-dark">12</span>
                </p>
                <h6 className="mb-2 mt-3 mb-2 pt-3 border-top">
                  Address Information
                </h6>
                <p className="mb-0">2557 Tanglewood Road, Jackson, MS 39213</p>
              </div>
            </div>
          </div>
          {/* col end */}
          {/* col start */}
          <div className="col-xl-8">
            
            {/* card start */}
            <div className="card shadow flex-fill w-100">
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h5 className="mb-0 d-inline-flex align-items-center">
                  Appointments
                </h5>
                <Link
                  to={all_routes.appointments}
                  className="btn btn-sm btn-white flex-shrink-0"
                >
                  View All
                </Link>
              </div>
              <div className="card-body">
                <div className="row row-gap-3">
                  <div className="col-xl-6 d-flex">
                    <div className="p-3 border rounded flex-fill">
                      <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3">
                        <span className="badge badge-soft-purple">Upcoming</span>
                        <Link
                          to="#"
                          className="btn btn-icon btn-secondary"
                        >
                          <i className="ti ti-video" />
                        </Link>
                      </div>
                      <div className="row row-gap-3">
                        <div className="col-sm-6">
                          <h6 className="fs-14 fw-semibold mb-1">Department</h6>
                          <p className="fs-13 mb-0">Cardiology</p>
                        </div>
                        <div className="col-sm-6">
                          <h6 className="fs-14 fw-semibold mb-1">Doctor</h6>
                          <p className="fs-13 mb-0 text-truncate">
                            Dr. Andrew Clark
                          </p>
                        </div>
                        <div className="col-sm-6">
                          <h6 className="fs-14 fw-semibold mb-1">
                            Date &amp; Time
                          </h6>
                          <p className="fs-13 mb-0">21 Dec 2024, 07:00 AM</p>
                        </div>
                        <div className="col-sm-6">
                          <h6 className="fs-14 fw-semibold mb-1">Booked On</h6>
                          <p className="fs-13 mb-0">20 Dec 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 d-flex">
                    <div className="p-3 border rounded flex-fill">
                      <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3">
                        <span className="badge badge-soft-success">
                          Completed
                        </span>
                        <Link
                          to="#"
                          className="btn btn-icon btn-primary"
                        >
                          <i className="ti ti-phone" />
                        </Link>
                      </div>
                      <div className="row row-gap-3">
                        <div className="col-sm-6">
                          <h6 className="fs-14 fw-semibold mb-1">Department</h6>
                          <p className="fs-13 mb-0">Radiology</p>
                        </div>
                        <div className="col-sm-6">
                          <h6 className="fs-14 fw-semibold mb-1">Doctor</h6>
                          <p className="fs-13 mb-0 text-truncate">
                            Dr. Laura Mitchell
                          </p>
                        </div>
                        <div className="col-sm-6">
                          <h6 className="fs-14 fw-semibold mb-1">
                            Date &amp; Time
                          </h6>
                          <p className="fs-13 mb-0">15 Jan 2025, 10:35 AM</p>
                        </div>
                        <div className="col-sm-6">
                          <h6 className="fs-14 fw-semibold mb-1">Booked On</h6>
                          <p className="fs-13 mb-0">13 Jan 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* card end */}
            {/* card start */}
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h5 className="mb-0 d-inline-flex align-items-center">
                  Vital Signs
                </h5>
                <Link
                  to="#"
                  className="link-danger text-decoration-underline"
                >
                  Past Data
                </Link>
              </div>
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="d-flex align-items-center mb-3">
                      <span className="avatar rounded bg-light text-dark flex-shrink-0 me-2">
                        <i className="ti ti-droplet fs-16" />
                      </span>
                      <div>
                        <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                          Blood Pressure
                        </h6>
                        <p className="mb-0 fs-13 d-inline-flex align-items-center text-truncate">
                          100/67 mmHg
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="d-flex align-items-center mb-3">
                      <span className="avatar rounded bg-light text-dark flex-shrink-0 me-2">
                        <i className="ti ti-heart-rate-monitor fs-16" />
                      </span>
                      <div>
                        <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                          Heart Rate
                        </h6>
                        <p className="mb-0 fs-13 d-inline-flex align-items-center text-truncate">
                          89 Bpm
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="d-flex align-items-center mb-3">
                      <span className="avatar rounded bg-light text-dark flex-shrink-0 me-2">
                        <i className="ti ti-hexagons fs-16" />
                      </span>
                      <div>
                        <h6 className="fs-14 fw-semibold mb-1">SPO2</h6>
                        <p className="mb-0 fs-13 d-inline-flex align-items-center text-truncate">
                          98 %
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="d-flex align-items-center mb-3">
                      <span className="avatar rounded bg-light text-dark flex-shrink-0 me-2">
                        <i className="ti ti-temperature fs-16" />
                      </span>
                      <div>
                        <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                          Temperature
                        </h6>
                        <p className="mb-0 fs-13 d-inline-flex align-items-center text-truncate">
                          101 C
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="d-flex align-items-center mb-3">
                      <span className="avatar rounded bg-light text-dark flex-shrink-0 me-2">
                        <i className="ti ti-ease-in fs-16" />
                      </span>
                      <div>
                        <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                          Respiratory Rate
                        </h6>
                        <p className="mb-0 fs-13 d-inline-flex align-items-center text-truncate">
                          24 rpm
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="d-flex align-items-center mb-3">
                      <span className="avatar rounded bg-light text-dark flex-shrink-0 me-2">
                        <i className="ti ti-circuit-switch-open fs-16" />
                      </span>
                      <div>
                        <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                          Weight
                        </h6>
                        <p className="mb-0 fs-13 d-inline-flex align-items-center text-truncate">
                          100 kg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* card end */}
            {/* card start */}
            <div className="card mb-0">
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h5 className="fw-bold mb-0 d-inline-flex align-items-center">
                  Visit History
                </h5>
                <Link
                  to={all_routes.visits}
                  className="btn btn-sm btn-outline-light flex-shrink-0"
                >
                  View All
                </Link>
              </div>
              <div className="card-body pb-0">
                <div className="row row-gap-3">
                  <div className="col-xl-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <Link
                            to={all_routes.doctorDetails}
                            className="avatar flex-shrink-0"
                          >
                            <ImageWithBasePath
                              src="assets/img/doctors/doctor-12.jpg"
                              className="rounded"
                              alt="doctor"
                            />
                          </Link>
                          <div className="ms-2">
                            <div>
                              <h6 className="fw-semibold fs-14 text-truncate mb-1">
                                <Link to={all_routes.doctorDetails}>
                                  Dr. Samuel Turner
                                </Link>
                              </h6>
                              <p className="fs-13 mb-0">Cardiology, MD, FRCS</p>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3 row-gap-2">
                          <div className="col-sm-6">
                            <h6 className="fw-semibold mb-1 fs-14">Visited On</h6>
                            <p className="fs-13 mb-0 text-truncate">
                              21 Dec 2024, 07:00 AM
                            </p>
                          </div>
                          <div className="col-sm-6">
                            <h6 className="fw-semibold mb-1 fs-14">Follow Up</h6>
                            <p className="fs-13 mb-0">After 15 Days</p>
                          </div>
                        </div>
                        <div className="p-3 bg-light rounded">
                          <h6 className="fw-semibold mb-1 fs-14">Notes</h6>
                          <p className="fs-13 mb-0 text-truncate line-clamb-2">
                            Detailed Information about the symptoms that brought
                            the patient to the visit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <Link
                            to={all_routes.doctorDetails}
                            className="avatar flex-shrink-0"
                          >
                            <ImageWithBasePath
                              src="assets/img/doctors/doctor-09.jpg"
                              className="rounded"
                              alt="doctor"
                            />
                          </Link>
                          <div className="ms-2">
                            <div>
                              <h6 className="fw-semibold fs-14 text-truncate mb-1">
                                <Link to={all_routes.doctorDetails}>
                                  Dr. Natalie Foster
                                </Link>
                              </h6>
                              <p className="fs-13 mb-0">Neurology, MD, DNB</p>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3 row-gap-2">
                          <div className="col-sm-6">
                            <h6 className="fw-semibold mb-1 fs-14">Visited On</h6>
                            <p className="fs-13 mb-0 text-truncate">
                              08 Jan 2024, 09:55 AM
                            </p>
                          </div>
                          <div className="col-sm-6">
                            <h6 className="fw-semibold mb-1 fs-14">Follow Up</h6>
                            <p className="fs-13 mb-0">After 12 Days</p>
                          </div>
                        </div>
                        <div className="p-3 bg-light rounded">
                          <h6 className="fw-semibold mb-1 fs-14">Notes</h6>
                          <p className="fs-13 mb-0 text-truncate line-clamb-2">
                            Information provided to the patient regarding their
                            condition and symptoms
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* card end */}
          </div>
          {/* col end */}
        </div>
        {/* row end */}
      </div>
      {/* End Content */}
      {/* Start Footer */}
     <CommonFooter/>
      {/* End Footer */}
    </div>
    {/* ========================
              End Page Content
          ========================= */}
  </>
  
  )
}

export default PatientDetails