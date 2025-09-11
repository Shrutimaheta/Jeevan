import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import ImageWithBasePath from "../../components/image-with-base-path";
import {
  City,
  Country,
  Department,
  Gender,
  Languages,
  Specialist,
  State,
} from "../../core/json/selectOption";
import CommonSelect from "../../components/common-select/commonSelect";
import CommonDatePicker from "../../components/common-date-picker/commonDatePicker";
import { all_routes } from "../../routes/all_routes";

const AddDoctors = () => {
  // Step state: 'basic' or 'extra'
  const [step, setStep] = useState<'basic' | 'extra'>('basic');
  const [activatedSteps, setActivatedSteps] = useState<{ basic: boolean; extra: boolean }>({ basic: false, extra: false });

  // Handlers for navigation
  const goToBasic = () => setStep('basic');
  const goToExtra = () => {
    setActivatedSteps((prev) => ({ ...prev, basic: true }));
    setStep('extra');
  };

  // Clean up any lingering modal backdrops on component mount
  useEffect(() => {
    // Remove any lingering modal-backdrop and modal-open classes
    document.body.classList.remove('modal-open');
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach((el) => el.parentNode && el.parentNode.removeChild(el));
  }, []);

  // Function to handle modal cleanup when navigating
  const handleModalNavigation = () => {
    const modal = document.getElementById("success_modal");
    if (modal) {
      // @ts-ignore
      const bsModal = window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal);
      bsModal.hide();
      
      // Remove backdrop manually if needed
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      
      // Remove modal-open class from body
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  };

  // Optionally, you can add validation/data collection here

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
              <h4 className="mb-1">Add Doctors</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Add Doctors</li>
                </ol>
              </div>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              <Link
                to={all_routes.doctors}
                className="fw-medium d-flex align-items-center"
              >
                <i className="ti ti-arrow-left me-1" />
                Back to Doctors
              </Link>
            </div>
          </div>
          {/* End Page Header */}
          {/* row start */}
          <div className="row row-gap-3 vertical-tab">
            <div className="col-xl-3 col-lg-4">
              <div className="nav flex-column nav-pills" id="v-pills-tab">
                <button
                  className={`nav-link fw-medium d-flex align-items-center rounded${step === 'basic' ? ' active' : activatedSteps.basic ? ' activated' : ''}`}
                  id="v-pills-info-tab"
                  type="button"
                  onClick={goToBasic}
                >
                  <span />
                  <i className="ti ti-info-circle fs-16" />
                  Basic Information
                </button>
                <button
                  className={`nav-link fw-medium d-flex align-items-center rounded${step === 'extra' ? ' active' : activatedSteps.extra ? ' activated' : ''}`}
                  id="v-pills-vituals-tab"
                  type="button"
                  onClick={goToExtra}
                  disabled={false /* Optionally disable until basic info is filled */}
                >
                  <span />
                  <i className="ti ti-vector-spline fs-16" />
                  Extra Information
                </button>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div
                className="patient-form-wizard flex-fill"
                id="v-pills-tabContent"
              >
                {/* Wizard Steps: wrap in fragment to ensure valid JSX */}
                <>
                  {step === 'basic' && (
                    <div className="form-wizard-content active" id="v-pills-info">
                      <form onSubmit={e => { e.preventDefault(); goToExtra(); }}>
                        {/* Start Basic Information */}
                        <div className="card">
                          <div className="card-header">
                            <h5 className="mb-0">Basic Information</h5>
                          </div>
                          <div className="card-body">
                            <div className="mb-3">
                              <label className="form-label">
                                Profile Image
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <div className="d-flex align-items-center flex-wrap gap-3">
                                <div className="flex-shrink-0">
                                  <div className="position-relative d-flex align-items-center border rounded">
                                    <ImageWithBasePath
                                      src="assets/img/doctors/doctor-01.jpg"
                                      className="avatar avatar-xxl"
                                      alt="doctor"
                                    />
                                  </div>
                                </div>
                                <div className="d-inline-flex flex-column align-items-start">
                                  <div className="d-inline-flex align-items-start gap-2">
                                    <div className="drag-upload-btn btn btn-dark position-relative mb-2">
                                      <i className="ti ti-arrows-exchange-2 me-1" />
                                      Change Image
                                      <input
                                        type="file"
                                        className="form-control image-sign"
                                        multiple
                                      />
                                    </div>
                                    <div>
                                      <Link
                                        to="#"
                                        className="btn btn-danger d-flex align-items-center gap-1"
                                      >
                                        {" "}
                                        <i className="ti ti-trash" /> Remove
                                      </Link>
                                    </div>
                                  </div>
                                  <span className="fs-13 text-body">
                                    Use JPEG, PNG, or GIF. Best size: 200x200
                                    pixels. Keep it under 5MB
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="doctor-id">ID</label>
                                  <input type="text" className="form-control" id="doctor-id" defaultValue="#DR0005" disabled />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="doctor-first-name">First Name<span className="text-danger ms-1">*</span></label>
                                  <input type="text" className="form-control" id="doctor-first-name" />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="doctor-last-name">Last Name<span className="text-danger ms-1">*</span></label>
                                  <input type="text" className="form-control" id="doctor-last-name" />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Department
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <CommonSelect
                                    options={Department}
                                    className="select"
                                    defaultValue={Department[0]}
                                  />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Specialist
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <CommonSelect
                                    options={Specialist}
                                    className="select"
                                    defaultValue={Specialist[0]}
                                  />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Fees ($)
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Phone Number
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Email Address
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    DOB<span className="text-danger ms-1">*</span>
                                  </label>
                                  <div className=" w-auto input-group-flat">
                                    <CommonDatePicker placeholder="dd/mm/yyyy" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Gender
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <CommonSelect
                                    options={Gender}
                                    className="select"
                                    defaultValue={Gender[0]}
                                  />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Registration Number
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div  className="mb-3">
                                  <label className="form-label">
                                    Known Languages
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <CommonSelect
                                    options={Languages}
                                    className="select"
                                    defaultValue={Languages[0]}
                                  />
                                </div>
                              </div>
                              <div className="col-xl-12 col-md-12">
                                <div className="mb-0">
                                  <label className="form-label">About</label>
                                  <textarea
                                    className="form-control"
                                    rows={4}
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Basic Information */}
                        {/* Start Address Information */}
                        <div className="card">
                          <div className="card-header">
                            <h5 className="mb-0">Address Information</h5>
                          </div>
                          <div className="card-body pb-1">
                            <div className="row">
                              <div className="col-xl-12 col-md-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Address
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input
                                    className="form-control"
                                    name="phone"
                                    type="tel"
                                  />
                                </div>
                              </div>
                              <div className="col-xl-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Country</label>
                                  <CommonSelect
                                    options={Country}
                                    className="select"
                                    defaultValue={Country[0]}
                                  />
                                </div>
                              </div>
                              <div className="col-xl-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">State</label>
                                  <CommonSelect
                                    options={State}
                                    className="select"
                                    defaultValue={State[0]}
                                  />
                                </div>
                              </div>
                              <div className="col-xl-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">City</label>
                                  <CommonSelect
                                    options={City}
                                    className="select"
                                    defaultValue={City[0]}
                                  />
                                </div>
                              </div>
                              <div className="col-xl-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Pin Code</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Address Information */}
                        {/* Start Account Details */}
                        <div className="card">
                          <div className="card-header">
                            <h5 className="mb-0">Account Details</h5>
                          </div>
                          <div className="card-body pb-1">
                            <div className="row">
                              <div className="col-xl-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Display Name</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-xl-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">User Name</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-xl-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Password</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-xl-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Confirm Password
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Account Details */}
                        <div className="d-flex justify-content-end flex-wrap align-items-center gap-2">
                          <button type="button" className="btn btn-white" onClick={goToBasic}>
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary next-tab-btn"
                            id="save-basic-info"
                          >
                            Save &amp; Next
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  {step === 'extra' && (
                    <div className="form-wizard-content active" id="v-pills-vituals">
                      <form onSubmit={e => e.preventDefault()}>
                        {/* Start Educational Details */}
                        <div className="card">
                          <div className="card-header">
                            <h5 className="mb-0">Educational Details</h5>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Institute Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    defaultValue=""
                                  />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Qualification
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Year<span className="text-danger ms-1">*</span>
                                  </label>
                                  <div className=" w-auto input-group-flat">
                                    <CommonDatePicker placeholder="dd/mm/yyyy" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Institute Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    defaultValue=""
                                  />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Qualification
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Year<span className="text-danger ms-1">*</span>
                                  </label>
                                  <div className="d-flex align-items-center gap-3">
                                    <div className=" w-auto input-group-flat">
                                      <CommonDatePicker placeholder="dd/mm/yyyy" />
                                    </div>
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
                            </div>
                            <Link
                              to="#"
                              className="text-primary d-linline-flex align-items-center gap-1 fw-medium"
                            >
                              {" "}
                              <i className="ti ti-plus" /> Add More
                            </Link>
                          </div>
                        </div>
                        {/* Start Educational Details */}
                        {/* Start Experience Details */}
                        <div className="card">
                          <div className="card-header">
                            <h5 className="mb-0">Experience</h5>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Hospital Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    defaultValue=""
                                  />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    No of Years
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Year<span className="text-danger ms-1">*</span>
                                  </label>
                                  <div className=" w-auto input-group-flat">
                                    <CommonDatePicker placeholder="dd/mm/yyyy" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Link
                              to="#"
                              className="text-primary d-linline-flex align-items-center gap-1 fw-medium"
                            >
                              {" "}
                              <i className="ti ti-plus" /> Add More
                            </Link>
                          </div>
                        </div>
                        {/* Start Experience Details */}
                        {/* Start Social Media Details */}
                        <div className="card">
                          <div className="card-header">
                            <h5 className="mb-0">Social Media</h5>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-xl-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Facebook</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    defaultValue=""
                                  />
                                </div>
                              </div>
                              <div className="col-xl-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Twitter</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-xl-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Linkedin</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-xl-3 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Instagram</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Start Experience Details */}
                        {/* Start Membership Details */}
                        <div className="card">
                          <div className="card-header">
                            <h5 className="mb-0">Membership</h5>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Title</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    defaultValue=""
                                  />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Year</label>
                                  <div className=" w-auto input-group-flat">
                                    <CommonDatePicker placeholder="dd/mm/yyyy" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Description</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                            </div>
                            <Link
                              to="#"
                              className="text-primary d-linline-flex align-items-center gap-1 fw-medium"
                            >
                              {" "}
                              <i className="ti ti-plus" /> Add More
                            </Link>
                          </div>
                        </div>
                        {/* Start Membership Details */}
                        {/* Start Awards Details */}
                        <div className="card mb-0">
                          <div className="card-header">
                            <h5 className="mb-0">Awards</h5>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Title</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    defaultValue=""
                                  />
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Year</label>
                                  <div className=" w-auto input-group-flat">
                                    <CommonDatePicker placeholder="dd/mm/yyyy" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Description</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                            </div>
                            <Link
                              to="#"
                              className="text-primary d-linline-flex align-items-center gap-1 fw-medium"
                            >
                              {" "}
                              <i className="ti ti-plus" /> Add More
                            </Link>
                          </div>
                        </div>
                        {/* Start Membership Details */}
                        <div className="d-flex justify-content-end flex-wrap align-items-center gap-2 mt-3">
                          <button type="button" className="btn btn-white back-btn" onClick={goToBasic}>
                            Back
                          </button>
                          <Link
                            to="#"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#success_modal"
                          >
                            Save &amp; Confirm
                          </Link>
                        </div>
                      </form>
                    </div>
                  )}
                </>
              </div>
            </div>
          </div>
          {/* row end */}
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
  {/* success modal */}
  <div className="modal fade" id="success_modal">
    <div className="modal-dialog modal-dialog-centered modal-sm">
      <div className="modal-content">
        <div className="modal-body text-center position-relative">
          <div className="mb-2 position-relative z-1">
            <span className="avatar avatar-md bg-success rounded-circle">
              <i className="ti ti-calendar-check fs-24" />
            </span>
          </div>
          <h5 className="mb-1">Added Successfully</h5>
          <p className="mb-4">
            Patient “Hendrita Merkel” has been added to the Patient List
          </p>
          <div className="d-flex justify-content-center gap-2">
            <Link
              to={all_routes.doctors}
              className="btn btn-outline-light position-relative z-1 w-100"
              onClick={handleModalNavigation}
            >
              Back To List
            </Link>
            <Link
              to={all_routes.doctorDetails}
              className="btn btn-primary position-relative z-1 w-100"
              onClick={handleModalNavigation}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* success modal */}
</>

    </>
  );
};

export default AddDoctors;
