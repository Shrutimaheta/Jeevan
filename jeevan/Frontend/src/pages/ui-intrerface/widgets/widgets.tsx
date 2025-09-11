import { Link } from "react-router-dom"
import CommonFooter from "../../../components/common-footer/commonFooter"
import { all_routes } from "../../../routes/all_routes"
import ChartOne from "../../dashboard/chart/chart1"
import ChartTwo from "../../dashboard/chart/chart2"
import ChartThree from "../../dashboard/chart/chart3"
import ChartFour from "../../dashboard/chart/chart4"
import ImageWithBasePath from "../../../components/image-with-base-path"
import ChartFive from "../../dashboard/chart/chart5"
import PatientsVisitsChart from "../../dashboard/chart/patientsVisitsChart"
import { Suspense } from "react"
import SemiDonutChart from "../../dashboard/chart/semiDonutChart"

const Widgets = () => {
  
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
          <h4 className="mb-1">Widgets</h4>
          <div className="text-end">
            <ol className="breadcrumb m-0 py-0">
              <li className="breadcrumb-item">
                <Link to={all_routes.dashboard}>Home</Link>
              </li>
              <li className="breadcrumb-item active">Widgets</li>
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
        </div>
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
            <div id="chart-1" className="chart-set">
                <ChartOne/>
            </div>
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
            <div id="chart-2" className="chart-set" >
            <ChartTwo/>
            </div>
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
            <div id="chart-3" className="chart-set">
                <ChartThree/>
            </div>
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
            <div id="chart-4" className="chart-set">
                <ChartFour/>
            </div>
          </div>
        </div>
        {/* col end */}
      </div>
      {/* row end */}

      {/* row start */}
      <div className="row">
        <div className="col-xl-3 col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                <div>
                  <p className="mb-1">Total Invoice</p>
                  <h6 className="mb-0">$2,45,445</h6>
                </div>
                <span className="avatar rounded-circle bg-soft-primary text-primary">
                  <i className="ti ti-components fs-24" />
                </span>
              </div>
              <div>
                <p className="d-flex align-items-center fs-13 mb-0">
                  <span className="text-success me-1">+31%</span>
                  From Last Month
                </p>
              </div>
            </div>{" "}
            {/* end card body */}
          </div>{" "}
          {/* end card */}
        </div>{" "}
        {/* end col */}
        <div className="col-xl-3 col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                <div>
                  <p className="mb-1">Unpaid Invoice</p>
                  <h6 className="mb-0">$50,000</h6>
                </div>
                <span className="avatar rounded-circle bg-soft-pink text-pink">
                  <i className="ti ti-clipboard-data fs-24" />
                </span>
              </div>
              <div>
                <p className="d-flex align-items-center fs-13 mb-0">
                  <span className="text-danger me-1">-15%</span>
                  From Last Month
                </p>
              </div>
            </div>{" "}
            {/* end card body */}
          </div>{" "}
          {/* end card */}
        </div>{" "}
        {/* end col */}
        <div className="col-xl-3 col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                <div>
                  <p className="mb-1">Pending Invoice</p>
                  <h6 className="mb-0">$45,000</h6>
                </div>
                <span className="avatar rounded-circle bg-soft-indigo text-indigo">
                  <i className="ti ti-cards fs-24" />
                </span>
              </div>
              <div>
                <p className="d-flex align-items-center fs-13 mb-0">
                  <span className="text-success me-1">+48%</span>
                  From Last Month
                </p>
              </div>
            </div>{" "}
            {/* end card body */}
          </div>{" "}
          {/* end card */}
        </div>{" "}
        {/* end col */}
        <div className="col-xl-3 col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                <div>
                  <p className="mb-1">Overdue Invoice</p>
                  <h6 className="mb-0">$2,50,550</h6>
                </div>
                <span className="avatar rounded-circle bg-soft-orange text-orange">
                  <i className="ti ti-calendar-event fs-24" />
                </span>
              </div>
              <div>
                <p className="d-flex align-items-center fs-13 mb-0">
                  <span className="text-success me-1">+39%</span>
                  From Last Month
                </p>
              </div>
            </div>{" "}
            {/* end card body */}
          </div>{" "}
          {/* end card */}
        </div>{" "}
        {/* end col */}
      </div>
      {/* row end */}
      {/* row start */}
      <div className="row">
        {/* col start */}
        <div className="col-xl-5 d-flex">
          <div className="card shadow flex-fill w-100">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Top Departments</h5>
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
                  <div className="col-6 p-2 border-end">
                    <h5 className="mb-1">$2512.32</h5>
                    <p className="mb-0">Revenue Generated</p>
                  </div>
                  <div className="col-6 p-2">
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
      {/* row start */}
      <div className="row">
        {/* col start */}
        <div className="col-xl-4 d-flex">
          <div className="card flex-fill w-100">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
              <h5 className="mb-0">Patient Reports</h5>
              <Link
                to={all_routes.labResults}
                className="btn btn-sm btn-white flex-shrink-0"
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
                >
                  <i className="ti ti-download" />
                </Link>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Link
                    to="#"
                    className="avatar me-2 badge-soft-success rounded-circle"
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
                >
                  <i className="ti ti-download" />
                </Link>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Link
                    to="#"
                    className="avatar me-2 badge-soft-danger rounded-circle"
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
                >
                  <i className="ti ti-download" />
                </Link>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Link
                    to="#"
                    className="avatar me-2 badge-soft-purple rounded-circle"
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
                >
                  <i className="ti ti-download" />
                </Link>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Link
                    to="#"
                    className="avatar me-2 badge-soft-teal rounded-circle"
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
                className="btn btn-sm btn-white flex-shrink-0"
              >
                View All
              </Link>
            </div>
            <div className="card-body">
              <div id="patients-visits" className="mb-3">
                <PatientsVisitsChart/>
              </div>
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
                to={all_routes.allDoctors}
                className="btn btn-sm btn-white flex-shrink-0"
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
      <div className="row row-gap-3">
        {/* col start */}
        <div className="col-xl-6 d-flex">
          <div className="card flex-fill w-100 mb-0">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
              <h5 className="fw-bold mb-0">Appointment Request</h5>
              <Link
                to={all_routes.appointments}
                className="btn btn-sm btn-white flex-shrink-0"
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
                              <div className="mx-1">
                                <span className="vr align-middle" />
                              </div>
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
                          >
                            <i className="ti ti-xbox-x" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
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
                              <div className="mx-1">
                                <span className="vr align-middle" />
                              </div>
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
                          >
                            <i className="ti ti-xbox-x" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
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
                              <div className="mx-1">
                                <span className="vr align-middle" />
                              </div>
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
                          >
                            <i className="ti ti-xbox-x" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
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
                              <div className="mx-1">
                                <span className="vr align-middle" />
                              </div>
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
                          >
                            <i className="ti ti-xbox-x" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
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
                              <div className="mx-1">
                                <span className="vr align-middle" />
                              </div>
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
                          >
                            <i className="ti ti-xbox-x" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
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
          <div className="card shadow flex-fill w-100  mb-0">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="fw-bold mb-0">Patients Statistics</h5>
              <Link to={all_routes.allPatientsList} className="btn btn-sm btn-white">
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
              <div id="chart-5" className="chart-set">
                    <ChartFive/>
              </div>
            </div>
          </div>
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

export default Widgets