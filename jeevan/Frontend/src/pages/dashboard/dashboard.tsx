import { Link } from "react-router-dom"
import CommonFooter from "../../components/common-footer/commonFooter"
import ImageWithBasePath from "../../components/image-with-base-path"
import { Suspense } from "react";
import { all_routes } from "../../routes/all_routes"
import PredefinedDatePicker from "../../components/common-date-range-picker/PredefinedDatePicker"
import ChartOne from "./chart/chart1"
import ChartTwo from "./chart/chart2"
import ChartThree from "./chart/chart3"
import ChartFour from "./chart/chart4"
import ChartFive from "./chart/chart5"
import PatientsVisitsChart from "./chart/patientsVisitsChart"
import SemiDonutChart from "./chart/semiDonutChart"


const Dashboard = () => {
  return (
    <>
  {/* ========================
			Start Page Content
		========================= */}
  <div className="page-wrapper" id="main-content">
    {/* Start Content */}
    <div className="content">
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4 flex-wrap">
        <div className="breadcrumb-arrow">
          <h4 className="mb-1">Welcome, Admin</h4>
          <p className="mb-0">
            Today you have 10 visits,{" "}
            <Link to={all_routes.visits} className="text-decoration-underline">
              View Details
            </Link>
          </p>
        </div>
        <PredefinedDatePicker/>
      </div>
      {/* End Page Header */}
      {/* row start */}
      <div className="row">
        {/* col start */}
        <div className="col-xl-3 col-md-6 d-flex">
          <div className="card pb-2 flex-fill">
            <div className="d-flex align-items-center justify-content-between gap-1 card-body pb-0 mb-1">
              <div className="d-flex align-items-center overflow-hidden">
                <span className="avatar bg-primary rounded-circle flex-shrink-0">
                  <i className="ti ti-user-exclamation fs-20" />
                </span>
                <div className="ms-2 overflow-hidden">
                  <p className="mb-1 text-truncate">Patients</p>
                  <h5 className="mb-0">108</h5>
                </div>
              </div>
              <div className="text-end">
                <span className="badge badge-soft-success">+20%</span>
              </div>
            </div>
            <Suspense fallback={<div />}><ChartOne/></Suspense>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-3 col-md-6 d-flex">
          <div className="card pb-2 flex-fill">
            <div className="d-flex align-items-center justify-content-between gap-1 card-body pb-0 mb-1">
              <div className="d-flex align-items-center overflow-hidden">
                <span className="avatar bg-orange rounded-circle flex-shrink-0">
                  <i className="ti ti-calendar-check fs-20" />
                </span>
                <div className="ms-2 overflow-hidden">
                  <p className="mb-1 text-truncate">Appointments</p>
                  <h5 className="mb-0">658</h5>
                </div>
              </div>
              <div className="text-end">
                <span className="badge badge-soft-danger">-15%</span>
              </div>
            </div>
            <Suspense fallback={<div />}><ChartTwo/></Suspense>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-3 col-md-6 d-flex">
          <div className="card pb-2 flex-fill">
            <div className="d-flex align-items-center justify-content-between gap-1 card-body pb-0 mb-1">
              <div className="d-flex align-items-center overflow-hidden">
                <span className="avatar bg-purple rounded-circle flex-shrink-0">
                  <i className="ti ti-stethoscope fs-20" />
                </span>
                <div className="ms-2 overflow-hidden">
                  <p className="mb-1 text-truncate">Doctors</p>
                  <h5 className="mb-0">565</h5>
                </div>
              </div>
              <div className="text-end">
                <span className="badge badge-soft-success">+18%</span>
              </div>
            </div>
            <Suspense fallback={<div />}><ChartThree/></Suspense>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-3 col-md-6 d-flex">
          <div className="card pb-2 flex-fill">
            <div className="d-flex align-items-center justify-content-between gap-1 card-body pb-0 mb-1">
              <div className="d-flex align-items-center overflow-hidden">
                <span className="avatar bg-pink rounded-circle flex-shrink-0">
                  <i className="ti ti-moneybag fs-20" />
                </span>
                <div className="ms-2 overflow-hidden">
                  <p className="mb-1 text-truncate">Transactions</p>
                  <h5 className="mb-0">$5,523.56</h5>
                </div>
              </div>
              <div className="text-end">
                <span className="badge badge-soft-success">+12%</span>
              </div>
            </div>
           <Suspense fallback={<div />}><ChartFour/></Suspense>
          </div>
        </div>
        {/* col end */}
      </div>
      {/* row end */}
      {/* row start */}
      <div className="row">
        {/* col start */}
        <div className="col-xl-6 d-flex">
          <div className="card flex-fill w-100">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
              <h5 className="fw-bold mb-0">Appointment Request</h5>
              <Link
                to={all_routes.appointments}
                className="btn btn-sm btn-outline-light flex-shrink-0"
              >
                All Appointments
              </Link>
            </div>
            <div className="card-body p-1 py-2">
              {/* table start */}
              <div className="table-responsive table-nowrap">
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-23.jpg"
                              alt="patient"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-1 fw-semibold">
                              <Link to={all_routes.patientDetails}>Dominic Foster</Link>
                            </h6>
                            <div className="d-flex align-items-center">
                              <p className="mb-0 fs-13 d-inline-flex align-items-center text-body">
                                <i className="ti ti-calendar me-1" />
                                12 Aug 2025
                              </p>
                              <span>
                                <i className="ti ti-minus-vertical text-light fs-14 mx-1" />
                              </span>
                              <p className="mb-0 fs-13 d-inline-flex align-items-center text-body">
                                <i className="ti ti-clock-hour-7 me-1" />
                                11:35 PM
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-soft-success">
                          Urology
                        </span>
                      </td>
                      <td className="text-end border-0">
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
                            aria-label="Reject appointment"
                          >
                            <i className="ti ti-xbox-x" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
                            aria-label="Accept appointment"
                          >
                            <i className="ti ti-check" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-08.jpg"
                              alt="patient"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-1 fw-semibold">
                              <Link to={all_routes.patientDetails}>
                                Charlotte Bennett
                              </Link>
                            </h6>
                            <div className="d-flex align-items-center">
                              <p className="mb-0 fs-13 d-inline-flex align-items-center text-body">
                                <i className="ti ti-calendar me-1" />
                                06 Aug 2025
                              </p>
                              <span>
                                <i className="ti ti-minus-vertical text-light fs-14 mx-1" />
                              </span>
                              <p className="mb-0 fs-13 d-inline-flex align-items-center text-body">
                                <i className="ti ti-clock-hour-7 me-1" />
                                09:58 AM
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-soft-info">
                          Cardiology
                        </span>
                      </td>
                      <td className="text-end border-0">
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
                            aria-label="Reject appointment"
                          >
                            <i className="ti ti-xbox-x" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
                            aria-label="Accept appointment"
                          >
                            <i className="ti ti-check" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-21.jpg"
                              alt="patient"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-1 fw-semibold">
                              <Link to={all_routes.patientDetails}>Ethan Sullivan</Link>
                            </h6>
                            <div className="d-flex align-items-center">
                              <p className="mb-0 fs-13 d-inline-flex align-items-center text-body">
                                <i className="ti ti-calendar me-1" />
                                01 Aug 2025
                              </p>
                              <span>
                                <i className="ti ti-minus-vertical text-light fs-14 mx-1" />
                              </span>
                              <p className="mb-0 fs-13 d-inline-flex align-items-center text-body">
                                <i className="ti ti-clock-hour-7 me-1" />
                                12:10 PM
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-soft-teal">
                          Dermatology
                        </span>
                      </td>
                      <td className="text-end border-0">
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
                            aria-label="Reject appointment"
                          >
                            <i className="ti ti-xbox-x" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
                            aria-label="Accept appointment"
                          >
                            <i className="ti ti-check" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/users/user-37.jpg"
                              alt="patient"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-1 fw-semibold">
                              <Link to={all_routes.patientDetails}>
                                Brianna Thompson
                              </Link>
                            </h6>
                            <div className="d-flex align-items-center">
                              <p className="mb-0 fs-13 d-inline-flex align-items-center text-body">
                                <i className="ti ti-calendar me-1" />
                                26 Jul 2025
                              </p>
                              <span>
                                <i className="ti ti-minus-vertical text-light fs-14 mx-1" />
                              </span>
                              <p className="mb-0 fs-13 d-inline-flex align-items-center text-body">
                                <i className="ti ti-clock-hour-7 me-1" />
                                08:20 AM
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-soft-purple">
                          ENT Surgery
                        </span>
                      </td>
                      <td className="text-end border-0">
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
                            aria-label="Reject appointment"
                          >
                            <i className="ti ti-xbox-x" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
                            aria-label="Accept appointment"
                          >
                            <i className="ti ti-check" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={all_routes.patientDetails}
                            className="avatar me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/users/user-01.jpg"
                              alt="patient"
                              className="rounded"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 mb-1 fw-semibold">
                              <Link to={all_routes.patientDetails}>Braun Tucker</Link>
                            </h6>
                            <div className="d-flex align-items-center">
                              <p className="mb-0 fs-13 d-inline-flex align-items-center text-body">
                                <i className="ti ti-calendar me-1" />
                                23 Jul 2025
                              </p>
                              <span>
                                <i className="ti ti-minus-vertical text-light fs-14 mx-1" />
                              </span>
                              <p className="mb-0 fs-13 d-inline-flex align-items-center text-body">
                                <i className="ti ti-clock-hour-7 me-1" />
                                10:30 AM
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-soft-info">Radiology</span>
                      </td>
                      <td className="text-end border-0">
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
                            aria-label="Reject appointment"
                          >
                            <i className="ti ti-xbox-x" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
                            aria-label="Accept appointment"
                          >
                            <i className="ti ti-check" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* table start */}
            </div>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-6 d-flex">
          <div className="card shadow flex-fill w-100">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="fw-bold mb-0">Patients Statistics</h5>
              <Link
                to={all_routes.allPatientsList}
                className="btn btn-sm btn-outline-light"
              >
                View All
              </Link>
            </div>
            <div className="card-body pb-0">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h6 className="fs-14 fw-semibold mb-0">
                  Total No of Patients : 480
                </h6>
                <div className="d-flex align-items-center gap-3">
                  <p className="mb-0 text-dark">
                    <i className="ti ti-point-filled me-1 text-primary" />
                    New Patients
                  </p>
                  <p className="mb-0 text-dark">
                    <i className="ti ti-point-filled me-1 text-soft-primary" />
                    Old Patients
                  </p>
                </div>
              </div>
             <Suspense fallback={<div />}><ChartFive/></Suspense>
            </div>
          </div>
        </div>
        {/* col end */}
      </div>
      {/* row end */}
      {/* row start */}
      <div className="row">
        {/* col start */}
        <div className="col-xl-2 col-md-4 col-sm-6">
          <Link to={all_routes.patients} className="card">
            <div className="card-body text-center">
              <span className="badge-soft-primary rounded w-100 d-flex p-3 justify-content-center fs-32 mb-2">
                <i className="ti ti-users" />
              </span>
              <h6 className="fs-14 fw-semibold text-truncate mb-0">
                All Patient
              </h6>
            </div>
          </Link>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-2 col-md-4 col-sm-6">
          <Link to={all_routes.allDoctorsList} className="card">
            <div className="card-body text-center">
              <span className="badge-soft-success rounded w-100 d-flex p-3 justify-content-center fs-32 mb-2">
                <i className="ti ti-topology-bus" />
              </span>
              <h6 className="fs-14 fw-semibold text-truncate mb-0">Doctors</h6>
            </div>
          </Link>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-2 col-md-4 col-sm-6">
          <Link to={all_routes.labResults} className="card">
            <div className="card-body text-center">
              <span className="badge-soft-warning rounded w-100 d-flex p-3 justify-content-center fs-32 mb-2">
                <i className="ti ti-test-pipe-2" />
              </span>
              <h6 className="fs-14 fw-semibold text-truncate mb-0">
                Labs Results
              </h6>
            </div>
          </Link>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-2 col-md-4 col-sm-6">
          <Link to={all_routes.pharmacy} className="card">
            <div className="card-body text-center">
              <span className="badge-soft-danger rounded w-100 d-flex p-3 justify-content-center fs-32 mb-2">
                <i className="ti ti-prescription" />
              </span>
              <h6 className="fs-14 fw-semibold text-truncate mb-0">
                Prescriptions
              </h6>
            </div>
          </Link>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-2 col-md-4 col-sm-6">
          <Link to={all_routes.visits} className="card">
            <div className="card-body text-center">
              <span className="badge-soft-purple rounded w-100 d-flex p-3 justify-content-center fs-32 mb-2">
                <i className="ti ti-e-passport" />
              </span>
              <h6 className="fs-14 fw-semibold text-truncate mb-0">Visits</h6>
            </div>
          </Link>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-2 col-md-4 col-sm-6">
          <Link to={all_routes.medicalResults} className="card">
            <div className="card-body text-center">
              <span className="badge-soft-teal rounded w-100 d-flex p-3 justify-content-center fs-32 mb-2">
                <i className="ti ti-file-description" />
              </span>
              <h6 className="fs-14 fw-semibold text-truncate mb-0">
                Medical Records
              </h6>
            </div>
          </Link>
        </div>
        {/* col end */}
      </div>
      {/* row end */}
      {/* row start */}
      <div className="row">
        {/* col start */}
        <div className="col-xl-4 d-flex">
          <div className="card flex-fill w-100">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
              <h5 className="mb-0">Patient Reports</h5>
              <Link
                to={all_routes.labResults}
                className="btn btn-sm btn-outline-light flex-shrink-0"
              >
                View All
              </Link>
            </div>
            <div className="card-body pb-1">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Link
                    to="#"
                    className="avatar me-2 badge-soft-primary rounded-circle"
                    aria-label="Hemoglobin test report"
                  >
                    <i className="ti ti-droplet fs-20" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold text-truncate mb-1">
                      <Link to={all_routes.patientDetails}>David Marshall</Link>
                    </h6>
                    <p className="mb-0 fs-13">Hemoglobin</p>
                  </div>
                </div>
                <Link
                  to="#"
                  className="btn btn-icon btn-light me-1"
                  aria-label="Download report"
                >
                  <i className="ti ti-download" />
                </Link>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Link
                    to="#"
                    className="avatar me-2 badge-soft-success rounded-circle"
                    aria-label="X-Ray report"
                  >
                    <i className="ti ti-mood-neutral fs-20" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold text-truncate mb-1">
                      <Link to={all_routes.patientDetails}>Thomas McLean</Link>
                    </h6>
                    <p className="mb-0 fs-13">X Ray</p>
                  </div>
                </div>
                <Link
                  to="#"
                  className="btn btn-icon btn-light me-1"
                  aria-label="Download report"
                >
                  <i className="ti ti-download" />
                </Link>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Link
                    to="#"
                    className="avatar me-2 badge-soft-danger rounded-circle"
                    aria-label="MRI Scan report"
                  >
                    <i className="ti ti-rainbow fs-20" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold text-truncate mb-1">
                      <Link to={all_routes.patientDetails}>Greta Kinney</Link>
                    </h6>
                    <p className="mb-0 fs-13">MRI Scan</p>
                  </div>
                </div>
                <Link
                  to="#"
                  className="btn btn-icon btn-light me-1"
                  aria-label="Download report"
                >
                  <i className="ti ti-download" />
                </Link>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Link
                    to="#"
                    className="avatar me-2 badge-soft-purple rounded-circle"
                    aria-label="Blood test report"
                  >
                    <i className="ti ti-rosette fs-20" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold text-truncate mb-1">
                      <Link to={all_routes.patientDetails}>Larry Wilburn</Link>
                    </h6>
                    <p className="mb-0 fs-13">Blood Test</p>
                  </div>
                </div>
                <Link
                  to="#"
                  className="btn btn-icon btn-light me-1"
                  aria-label="Download report"
                >
                  <i className="ti ti-download" />
                </Link>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Link
                    to="#"
                    className="avatar me-2 badge-soft-teal rounded-circle"
                    aria-label="CT Scan report"
                  >
                    <i className="ti ti-radio fs-20" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold text-truncate mb-1">
                      <Link to={all_routes.patientDetails}>Reyan Verol</Link>
                    </h6>
                    <p className="mb-0 fs-13">CT Scan</p>
                  </div>
                </div>
                <Link
                  to="#"
                  className="btn btn-icon btn-light me-1"
                  aria-label="Download report"
                >
                  <i className="ti ti-download" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-4 col-md-6 d-flex">
          <div className="card shadow flex-fill w-100">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
              <h5 className="mb-0">Patient Visits</h5>
              <Link
                to={all_routes.visits}
                className="btn btn-sm btn-outline-light flex-shrink-0"
              >
                View All
              </Link>
            </div>
            <div className="card-body">
              <Suspense fallback={<div />}><PatientsVisitsChart/></Suspense>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <span className="avatar bg-primary rounded-circle flex-shrink-0">
                    <i className="ti ti-gender-male fs-20" />
                  </span>
                  <div className="ms-2">
                    <h6 className="mb-1 fs-14 fw-semibold">Male</h6>
                    <p className="mb-1 fs-13 text-truncate">
                      <span className="text-success">-15%</span> Since Last Week
                    </p>
                  </div>
                </div>
                <h6 className="mb-0">69%</h6>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-0">
                <div className="d-flex align-items-center">
                  <span className="avatar bg-purple rounded-circle flex-shrink-0">
                    <i className="ti ti-gender-female fs-20" />
                  </span>
                  <div className="ms-2">
                    <h6 className="mb-1 fs-14 fw-semibold">Female</h6>
                    <p className="mb-1 fs-13 text-truncate">
                      <span className="text-success">-15%</span> Since Last Week
                    </p>
                  </div>
                </div>
                <h6 className="mb-0">56%</h6>
              </div>
            </div>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-4 col-md-6 d-flex">
          <div className="card shadow flex-fill w-100">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
              <h5 className="mb-0">Doctors</h5>
              <Link
                to={all_routes.doctors}
                className="btn btn-sm btn-outline-light flex-shrink-0"
              >
                View All
              </Link>
            </div>
            <div className="card-body">
              <div className="overflow-auto">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <Link
                      to={all_routes.doctorDetails}
                      className="avatar flex-shrink-0"
                    >
                      <ImageWithBasePath
                        src="assets/img/doctors/doctor-01.jpg"
                        className="rounded"
                        alt="doctor"
                      />
                    </Link>
                    <div className="ms-2">
                      <div>
                        <h6 className="fw-semibold fs-14 text-truncate mb-1">
                          <Link to={all_routes.doctorDetails}>Dr. William Harrison</Link>
                        </h6>
                        <p className="fs-13 mb-0">Cardiology</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ms-2">
                    <span className="badge badge-soft-success">Available</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <Link
                      to={all_routes.doctorDetails}
                      className="avatar flex-shrink-0"
                    >
                      <ImageWithBasePath
                        src="assets/img/doctors/doctor-11.jpg"
                        className="rounded"
                        alt="doctor"
                      />
                    </Link>
                    <div className="ms-2">
                      <div>
                        <h6 className="fw-semibold fs-14 text-truncate mb-1">
                          <Link to={all_routes.doctorDetails}>Dr. Victoria Adams</Link>
                        </h6>
                        <p className="fs-13 mb-0">Urology</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ms-2">
                    <span className="badge badge-soft-danger">Unavailable</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <Link
                      to={all_routes.doctorDetails}
                      className="avatar flex-shrink-0"
                    >
                      <ImageWithBasePath
                        src="assets/img/doctors/doctor-06.jpg"
                        className="rounded"
                        alt="doctor"
                      />
                    </Link>
                    <div className="ms-2">
                      <div>
                        <h6 className="fw-semibold fs-14 text-truncate mb-1">
                          <Link to={all_routes.doctorDetails}>Dr. Jonathan Bennett</Link>
                        </h6>
                        <p className="fs-13 mb-0">Radiology</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ms-2">
                    <span className="badge badge-soft-success">Available</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <Link
                      to={all_routes.doctorDetails}
                      className="avatar flex-shrink-0"
                    >
                      <ImageWithBasePath
                        src="assets/img/doctors/doctor-07.jpg"
                        className="rounded"
                        alt="doctor"
                      />
                    </Link>
                    <div className="ms-2">
                      <div>
                        <h6 className="fw-semibold fs-14 text-truncate mb-1">
                          <Link to={all_routes.doctorDetails}>Dr. Natalie Brooks</Link>
                        </h6>
                        <p className="fs-13 mb-0">ENT Surgery</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ms-2">
                    <span className="badge badge-soft-success">Available</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-0">
                  <div className="d-flex align-items-center">
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
                          <Link to={all_routes.doctorDetails}>Dr. Samuel Reed</Link>
                        </h6>
                        <p className="fs-13 mb-0">Dermatology</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ms-2">
                    <span className="badge badge-soft-success">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* col end */}
      </div>
      {/* row end */}
      {/* row start */}
      <div className="row">
        {/* col start */}
        <div className="col-xl-5 d-flex">
          <div className="card shadow flex-fill w-100">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Top Departments</h5>
              <Link
                to="#"
                className="btn btn-sm btn-outline-light flex-shrink-0"
              >
                View All
              </Link>
            </div>
            <div className="card-body">
              <div className="row row-gap-3 align-items-center mb-4">
                <div className="col-sm-6">
                  <div className="position-relative">
                   <Suspense fallback={<div />}><SemiDonutChart/></Suspense>
                    <div className="position-absolute text-center top-50 start-50 translate-middle">
                      <p className="fs-13 mb-1">Appointments</p>
                      <h3>3656</h3>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="text-sm-start text-center">
                    <p className="text-dark mb-2">
                      <i className="ti ti-circle-filled text-info fs-13 me-1" />
                      Cardiology
                    </p>
                    <p className="text-dark mb-2">
                      <i className="ti ti-circle-filled text-cyan fs-13 me-1" />
                      Neurology
                    </p>
                    <p className="text-dark mb-2">
                      <i className="ti ti-circle-filled text-purple fs-13 me-1" />
                      Dermatology
                    </p>
                    <p className="text-dark mb-2">
                      <i className="ti ti-circle-filled text-orange fs-13 me-1" />
                      Orthopedics
                    </p>
                    <p className="text-dark mb-2">
                      <i className="ti ti-circle-filled text-warning fs-13 me-1" />
                      Urology
                    </p>
                    <p className="text-dark mb-0">
                      <i className="ti ti-circle-filled text-indigo fs-13 me-1" />
                      Radiology
                    </p>
                  </div>
                </div>
              </div>
              <div className="border rounded p-1">
                <div className="row g-0">
                  <div className="col-6 p-2 border-end text-center">
                    <h5 className="mb-1 ">$2512.32</h5>
                    <p className="mb-0 ">Revenue Generated</p>
                  </div>
                  <div className="col-6 p-2 text-center">
                    <h5 className="mb-1">3125+</h5>
                    <p className="mb-0">Appointments last month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col-xl-7 d-flex">
          {/* card start */}
          <div className="card shadow flex-fill w-100">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
              <h5 className="mb-0">Patient Record</h5>
              <Link
                to={all_routes.medicalResults}
                className="btn btn-sm btn-outline-light flex-shrink-0"
              >
                View All
              </Link>
            </div>
            <div className="card-body">
              {/* table start */}
              <div className="table-responsive table-nowrap">
                <table className="table border mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Patient Name</th>
                      <th>Diagnosis</th>
                      <th>Department</th>
                      <th>Last Visit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h6 className="fs-14 mb-0 fw-medium">
                          <Link to={all_routes.patientDetails}>James Carter</Link>
                        </h6>
                      </td>
                      <td>Male</td>
                      <td>
                        <span className="badge badge-soft-info">
                          Cardiology
                        </span>
                      </td>
                      <td>17 Jun 2025</td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="fs-14 mb-0 fw-medium">
                          <Link to={all_routes.patientDetails}>Emily Davis</Link>
                        </h6>
                      </td>
                      <td>Female</td>
                      <td>
                        <span className="badge badge-soft-success">
                          Urology
                        </span>
                      </td>
                      <td>10 Jun 2025</td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="fs-14 mb-0 fw-medium">
                          <Link to={all_routes.patientDetails}>Michael John</Link>
                        </h6>
                      </td>
                      <td>Male</td>
                      <td>
                        <span className="badge badge-soft-info">Radiology</span>
                      </td>
                      <td>22 May 2025</td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="fs-14 mb-0 fw-medium">
                          <Link to={all_routes.patientDetails}>Olivia Miller</Link>
                        </h6>
                      </td>
                      <td>Female</td>
                      <td>
                        <span className="badge badge-soft-purple">
                          ENT Surgery
                        </span>
                      </td>
                      <td>15 May 2025</td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="fs-14 mb-0 fw-medium">
                          <Link to={all_routes.patientDetails}>David Smith</Link>
                        </h6>
                      </td>
                      <td>Male</td>
                      <td>
                        <span className="badge badge-soft-teal">
                          Dermatology
                        </span>
                      </td>
                      <td>30 Apr 2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* table start */}
            </div>
          </div>
          {/* card end */}
        </div>
        {/* col end */}
      </div>
      {/* row end */}
    
      {/* card start */}
      <div className="card shadow flex-fill w-100 mb-0">
        <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
          <h5 className="mb-0">Latest Appointments</h5>
          <Link
            to={all_routes.appointments}
            className="btn btn-sm btn-outline-light flex-shrink-0"
          >
            View All
          </Link>
        </div>
        <div className="card-body">
          {/* table start */}
          <div className="table-responsive table-nowrap">
            <table className="table border mb-0">
              <thead className="table-light">
                <tr>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>Session Type</th>
                  <th>Doctor Name</th>
                  <th>Date &amp; Time</th>
                  <th>Status</th>
                 
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link
                      to="#"
                      className="link-muted"
                      data-bs-toggle="modal"
                      data-bs-target="#view_appointment_modal"
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
                          src="assets/img/users/user-04.jpg"
                          alt="patient"
                          className="rounded"
                        />
                      </Link>
                      <div>
                        <h6 className="fs-14 mb-0 fw-medium">
                          <Link to={all_routes.patientDetails}>James Carter</Link>
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td>Visit</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Link
                        to={all_routes.doctorDetails}
                        className="avatar avatar-xs me-2"
                      >
                        <ImageWithBasePath
                          src="assets/img/doctors/doctor-01.jpg"
                          alt="patient"
                          className="rounded"
                        />
                      </Link>
                      <div>
                        <h6 className="fs-14 mb-0 fw-medium">
                          <Link to={all_routes.doctorDetails}>Dr. Andrew Clark</Link>
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td>17 Jun 2025, 09:00 AM to 10:00 AM</td>
                  <td>
                    <span className="badge badge-soft-purple">Inprogress</span>
                  </td>
                  
                </tr>
                <tr>
                  <td>
                    <Link
                      to="#"
                      className="link-muted"
                      data-bs-toggle="modal"
                      data-bs-target="#view_appointment_modal"
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
                          src="assets/img/users/user-34.jpg"
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
                  <td>Consultation</td>
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
                          <Link to={all_routes.doctorDetails}>Dr. Katherine Brooks</Link>
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td>10 Jun 2025, 10:30 AM to 11:30 AM</td>
                  <td>
                    <span className="badge badge-soft-purple">Inprogress</span>
                  </td>
                  
                </tr>
                <tr>
                  <td>
                    <Link
                      to="#"
                      className="link-muted"
                      data-bs-toggle="modal"
                      data-bs-target="#view_appointment_modal"
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
                          src="assets/img/users/user-11.jpg"
                          alt="patient"
                          className="rounded"
                        />
                      </Link>
                      <div>
                        <h6 className="fs-14 mb-0 fw-medium">
                          <Link to={all_routes.patientDetails}>Michael Johnson</Link>
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td>Visit</td>
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
                          <Link to={all_routes.doctorDetails}>Dr. Benjamin Harris</Link>
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td>22 May 2025, 01:15 PM to 02:15 PM</td>
                  <td>
                    <span className="badge badge-soft-success">Completed</span>
                  </td>
                  
                </tr>
                <tr>
                  <td>
                    <Link
                      to="#"
                      className="link-muted"
                      data-bs-toggle="modal"
                      data-bs-target="#view_appointment_modal"
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
                          src="assets/img/users/user-16.jpg"
                          alt="patient"
                          className="rounded"
                        />
                      </Link>
                      <div>
                        <h6 className="fs-14 mb-0 fw-medium">
                          <Link to={all_routes.patientDetails}>Olivia Miller</Link>
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td>Consultation</td>
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
                          <Link to={all_routes.doctorDetails}>Dr. Laura Mitchell</Link>
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td>15 May 2025, 11:30 AM to 12:30 PM</td>
                  <td>
                    <span className="badge badge-soft-success">Completed</span>
                  </td>
                  
                </tr>
                <tr>
                  <td>
                    <Link
                      to="#"
                      className="link-muted"
                      data-bs-toggle="modal"
                      data-bs-target="#view_appointment_modal"
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
                          src="assets/img/users/user-14.jpg"
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
                  <td>Consultation</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Link
                        to={all_routes.doctorDetails}
                        className="avatar avatar-xs me-2"
                      >
                        <ImageWithBasePath
                          src="assets/img/doctors/doctor-15.jpg"
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
                  <td>30 Apr 2025, 12:20 PM to 01:20 PM</td>
                  <td>
                    <span className="badge badge-soft-success">Completed</span>
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
    <CommonFooter/>
    {/* End Footer */}
  </div>
  {/* ========================
			End Page Content
		========================= */}
       
</>

  )
}

export default Dashboard