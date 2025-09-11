import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import { all_routes } from "../../routes/all_routes";
import ImageWithBasePath from "../../components/image-with-base-path";
import { Frequency, Timing, YesNo } from "../../core/json/selectOption";
import CommonSelect from "../../components/common-select/commonSelect";
import CommonDatePicker from "../../components/common-date-picker/commonDatePicker";

const StartVisits = () => {
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
              <h4 className="mb-1">Visits</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Visits</li>
                </ol>
              </div>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              <Link
                to={all_routes.visits}
                className="fw-medium d-flex align-items-center"
              >
                <i className="ti ti-arrow-left me-1" />
                Back to Visits
              </Link>
            </div>
          </div>
          {/* End Page Header */}
          {/* start basic information */}
          <div className="card">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h5 className="d-inline-flex align-items-center mb-0">
                Basic Information
              </h5>
            </div>
            <div className="card-body">
              {/* start row */}
              <div className="row row-gap-3 align-items-center">
                <div className="col-lg-6">
                  <div className="d-sm-flex align-items-center">
                    <Link
                      to="#"
                      className="avatar avatar-xxl me-3 flex-shrink-0"
                    >
                      <ImageWithBasePath
                        src="assets/img/avatars/avatar-05.jpg"
                        alt="img"
                        className="rounded"
                      />
                    </Link>
                    <div>
                      <span className="badge badge-soft-primary">
                        Out Patient
                      </span>
                      <h6 className="mb-1 mt-1">
                        <Link to="#" aria-label="View patient James Carter details">James Carter</Link>
                      </h6>
                      <p className="mb-0">Consultation ID : #C243546</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="p-3 bg-light rounded">
                    <div className="row row-gap-2">
                      <div className="col-6 col-md-4">
                        <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                          Age / Gender
                        </h6>
                        <p className="fs-13 mb-0 text-truncate">
                          28 Years / Male
                        </p>
                      </div>
                      <div className="col-6 col-md-4">
                        <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                          Department
                        </h6>
                        <p className="fs-13 mb-0 text-truncate">Cardiology</p>
                      </div>
                      <div className="col-6 col-md-4">
                        <h6 className="fs-14 fw-semibold mb-1">Date</h6>
                        <p className="fs-13 mb-0 text-truncate">
                          25 Jan 2024, 07:00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end row */}
            </div>
          </div>
          {/* end basic information */}
          {/* start vitals information */}
          <div className="card">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h5 className="d-inline-flex align-items-center mb-0">Vitals</h5>
            </div>
            <div className="card-body">
              {/* start row */}
              <div className="row row-gap-3">
                <div className="col-xl-4 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      Temperature<span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <span className="input-group-text">F</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      Pulse<span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <span className="input-group-text">mmHg</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      Respiratory Rate
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <span className="input-group-text">rpm</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      SPO2<span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      Height<span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <span className="input-group-text">cm</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      Weight<span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <span className="input-group-text">Kg</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      BMI<span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <span className="input-group-text">kg/cm</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      Waist<span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <span className="input-group-text">cm</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      BSA<span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <span className="input-group-text">M</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* end row */}
            </div>
          </div>
          {/* end vitals information */}
          {/* start complaint information */}
          <div className="card">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h5 className="d-inline-flex align-items-center mb-0">
                Complaint
              </h5>
            </div>
            <div className="card-body">
              {/* start row */}
              <div className="row row-gap-3">
                <div className="col-xl-12 col-md-12 col-sm-12">
                  <div>
                    <input type="text" className="form-control" />
                    <p className="mb-0 mt-1 fs-13">
                      Enter value separated by comma{" "}
                    </p>
                  </div>
                </div>
              </div>
              {/* end row */}
            </div>
          </div>
          {/* end complaint information */}
          {/* start assessment information */}
          <div className="card">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h5 className="d-inline-flex align-items-center mb-0">
                Assessment
              </h5>
            </div>
            <div className="card-body">
              {/* start row */}
              <div className="row row-gap-3">
                <div className="col-xl-12 col-md-12 col-sm-12">
                  <div>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
              {/* end row */}
            </div>
          </div>
          {/* end assessment information */}
          {/* start medications information */}
          <div className="card">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h5 className="d-inline-flex align-items-center mb-0">
                Medications
              </h5>
            </div>
            <div className="card-body">
              {/* start row */}
              <div className="row row-gap-3 mb-3">
                <div className="col-xl-2 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      Medicine Name<span className="text-danger ms-1">*</span>
                    </label>
                    <input className="form-control" />
                  </div>
                </div>
                <div className="col-xl-2 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      Dosage<span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <span className="input-group-text">mg</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      Duration<span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <span className="input-group-text">M</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      Frequency<span className="text-danger ms-1">*</span>
                    </label>
                    <CommonSelect
                      options={Frequency}
                      className="select"
                      defaultValue={Frequency[0]}
                    />
                  </div>
                </div>
                <div className="col-xl-2 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      Timing<span className="text-danger ms-1">*</span>
                    </label>
                    <CommonSelect
                      options={Timing}
                      className="select"
                      defaultValue={Timing[0]}
                    />
                  </div>
                </div>
                <div className="col-xl-2 col-md-4 col-sm-6">
                  <div>
                    <label className="form-label">
                      Instructions<span className="text-danger ms-1">*</span>
                    </label>
                    <input className="form-control" />
                  </div>
                </div>
              </div>
              {/* end row */}
              {/* start row */}
              <div className="row row-gap-3 mb-3">
                <div className="col-xl-2 col-md-4 col-sm-6">
                  <div>
                    <input className="form-control" />
                  </div>
                </div>
                <div className="col-xl-2 col-md-4 col-sm-6">
                  <div>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <span className="input-group-text">mg</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-md-4 col-sm-6">
                  <div>
                    <div className="input-group">
                      <input type="text" className="form-control" />
                      <span className="input-group-text">M</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-md-4 col-sm-6">
                  <div>
                    <CommonSelect
                      options={Frequency}
                      className="select"
                      defaultValue={Frequency[0]}
                    />
                  </div>
                </div>
                <div className="col-xl-2 col-md-4 col-sm-6">
                  <div>
                    <CommonSelect
                      options={Timing}
                      className="select"
                      defaultValue={Timing[0]}
                    />
                  </div>
                </div>
                <div className="col-xl-2 col-md-4 col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <input className="form-control" />
                    <Link
                      to="#"
                      className="btn btn-icon btn-soft-danger border-0 flex-shrink-0 rounded-circle d-linline-flex align-items-center gap-1"
                    >
                      {" "}
                      <i className="ti ti-trash" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* end row */}
              <Link
                to="#"
                className="text-primary d-linline-flex align-items-center gap-1 fw-medium"
              >
                {" "}
                <i className="ti ti-plus" /> Add More
              </Link>
            </div>
          </div>
          {/* end medications information */}
          {/* start advice information */}
          <div className="card">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h5 className="d-inline-flex align-items-center mb-0">Advice</h5>
            </div>
            <div className="card-body">
              {/* start row */}
              <div className="row row-gap-3">
                <div className="col-xl-12 col-md-12 col-sm-12">
                  <div>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
              {/* end row */}
            </div>
          </div>
          {/* end advice information */}
          {/* start follow Up information */}
          <div className="card mb-3">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h5 className="d-inline-flex align-items-center mb-0">
                Follow Up
              </h5>
            </div>
            <div className="card-body">
              {/* start row */}
              <div className="row row-gap-3 align-items-center">
                <div className="col-xl-6 col-md-6 col-sm-12">
                  <div>
                    <label className="form-label mb-0">Next Visit</label>
                  </div>
                </div>
                <div className="col-xl-6 col-md-6 col-sm-12">
                  <div className=" w-auto input-group-flat">
                    <CommonDatePicker placeholder="dd/mm/yyyy" />
                  </div>
                </div>
                <div className="col-xl-6 col-md-6 col-sm-12">
                  <div>
                    <label className="form-label">
                      Whether to Come on Empty Stomach?
                    </label>
                  </div>
                </div>
                <div className="col-xl-6 col-md-6 col-sm-12">
                  <div>
                    <CommonSelect
                      options={YesNo}
                      className="select"
                      defaultValue={YesNo[0]}
                    />
                  </div>
                </div>
              </div>
              {/* end row */}
            </div>
          </div>
          {/* end follow Up information */}
          <div className="d-flex justify-content-end flex-wrap align-items-center gap-2">
                          <button type="button" className="btn btn-white">
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary next-tab-btn"
                          
                          >
                            End Visit
                          </button>
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
    </>
  );
};

export default StartVisits;
