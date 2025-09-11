// Edit Patient form, based on AddPatient
import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import { all_routes } from "../../routes/all_routes";
import ImageWithBasePath from "../../components/image-with-base-path";
import CommonSelect from "../../components/common-select/commonSelect";
import {
  BloodGroup,
  City,
  Country,
  Department,
  Gender,
  HealthCondition,
  MartialStatus,
  PatientType,
  ReferredBy,
  State,
  Type,
} from "../../core/json/selectOption";
import CommonDatePicker from "../../components/common-date-picker/commonDatePicker";
import { useEffect, useState } from "react";


const stepKeys = [
  "v-pills-info",
  "v-pills-vituals",
  "v-pills-medical-history",
  "v-pills-complaints",
];

const EditPatient = () => {

  const [currentStep, setCurrentStep] = useState(0);

  // Navigation handlers
  const goToStep = (idx: number) => setCurrentStep(idx);
  const goNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, stepKeys.length - 1));
  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

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
                  <li className="breadcrumb-item active">Edit Patient</li>
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
          {/* row start */}
          <div className="row vertical-tab">
            <div className="col-xl-3 col-lg-4">
            <div className="nav flex-column nav-pills vertical-tab mb-lg-0 mb-4" id="v-pills-tab">
                <button
                  className={`nav-link fw-medium d-flex align-items-center rounded${
                    currentStep === 0
                      ? " active"
                      : currentStep > 0
                      ? " activated"
                      : ""
                  }`}
                  id="v-pills-info-tab"
                  onClick={() => goToStep(0)}
                  type="button"
                >
                  <span />
                  <i className="ti ti-info-circle fs-16" />
                  Basic Information
                </button>
                <button
                  className={`nav-link fw-medium d-flex align-items-center rounded${
                    currentStep === 1
                      ? " active"
                      : currentStep > 1
                      ? " activated"
                      : ""
                  }`}
                  id="v-pills-vituals-tab"
                  onClick={() => goToStep(1)}
                  type="button"
                >
                  <span />
                  <i className="ti ti-vector-spline fs-16" />
                  Vitals
                </button>
                <button
                  className={`nav-link fw-medium d-flex align-items-center rounded${
                    currentStep === 2
                      ? " active"
                      : currentStep > 2
                      ? " activated"
                      : ""
                  }`}
                  id="v-pills-medical-history-tab"
                  onClick={() => goToStep(2)}
                  type="button"
                >
                  <span />
                  <i className="ti ti-files fs-16" />
                  Medical HIstory
                </button>
                <button
                  className={`nav-link fw-medium d-flex align-items-center rounded${
                    currentStep === 3
                      ? " active"
                      : currentStep > 3
                      ? " activated"
                      : ""
                  }`}
                  id="v-pills-complaints-tab"
                  onClick={() => goToStep(3)}
                  type="button"
                >
                  <span />
                  <i className="ti ti-vaccine fs-16" />
                  Complaints
                </button>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div
                className="patient-form-wizard flex-fill"
                id="v-pills-tabContent"
              >
                {/* basic information */}
                 <div
                  className={`form-wizard-content${
                    currentStep === 0 ? " active" : " d-none"
                  }`}
                  id="v-pills-info"
                >
                  <form>
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Basic Information</h5>
                      </div>
                      <div className="card-body pb-1">
                        <div className="mb-3">
                          <label className="form-label">
                            Profile Image
                            <span className="text-danger ms-1">*</span>
                          </label>
                          <div className="d-flex align-items-center flex-wrap gap-3">
                            <div className="flex-shrink-0">
                              <div className="position-relative d-flex align-items-center border rounded">
                                <ImageWithBasePath
                                  src="assets/img/users/user-12.jpg"
                                  className="avatar avatar-xxl"
                                  alt="patient"
                                />
                              </div>
                            </div>
                            <div className="d-inline-flex flex-column align-items-start">
                              <div className="d-inline-flex align-items-start gap-2 flex-wrap">
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
                                    className="btn btn-light d-flex align-items-center gap-1"
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
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">ID</label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="#PT0005"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                First Name
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="Reyan"
                              />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Middle Name
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Last Name
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="Verol"
                              />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Blood Group
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <CommonSelect
                            options={BloodGroup}
                            className="select"
                            defaultValue={BloodGroup[1]}
                          />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Age<span className="text-danger ms-1">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={30}
                              />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                DOB<span className="text-danger ms-1">*</span>
                              </label>
                              <div className=" w-auto input-group-flat">
                              <CommonDatePicker placeholder="dd/mm/yyyy" />

                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Patient Type
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <CommonSelect
                            options={PatientType}
                            className="select"
                            defaultValue={PatientType[1]}
                          />
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
                            defaultValue={Gender[1]}
                          />
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Company Name with Location
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Martial Status
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <CommonSelect
                            options={MartialStatus}
                            className="select"
                            defaultValue={MartialStatus[1]}
                          />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Contact Information</h5>
                      </div>
                      <div className="card-body pb-1">
                        <div className="row">
                          <div className="col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Mobile Number
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="phone"
                                type="tel"
                                defaultValue="+1 75964 25493"
                              />
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Emergency Number
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="phone"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Guardian / Person Name
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Address Line 1
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="2557 Tanglewood Road, Jackson, MS 39213"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Address Line 2
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Country
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <CommonSelect
                            options={Country}
                            className="select"
                            defaultValue={Country[1]}
                          />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">City</label>
                              <CommonSelect
                            options={City}
                            className="select"
                            defaultValue={City[1]}
                          />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">State</label>
                              <CommonSelect
                            options={State}
                            className="select"
                            defaultValue={State[1]}
                          />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Pincode</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Referral Doctor’s Info</h5>
                      </div>
                      <div className="card-body pb-1">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label">
                                Referred By
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <CommonSelect
                            options={ReferredBy}
                            className="select"
                            defaultValue={ReferredBy[1]}
                          />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label">
                                Referred On
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <div className=" w-auto input-group-flat">
                              <CommonDatePicker placeholder="dd/mm/yyyy" />

                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
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
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Other Information</h5>
                      </div>
                      <div className="card-body pb-1">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Notes If Any</label>
                              <textarea
                                rows={4}
                                className="form-control"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end flex-wrap align-items-center gap-2">
                      <button
                        type="button"
                        className="btn btn-primary next-tab-btn"
                        id="save-basic-info"
                        onClick={goNext}
                      >
                        Save &amp; Add Vitals
                      </button>
                    </div>
                  </form>
                </div>
                {/* vituals */}
                <div
                  className={`form-wizard-content${
                    currentStep === 1 ? " active" : " d-none"
                  }`}
                  id="v-pills-vituals"
                >
                  <form >
                    <div className="card pb-0">
                      <div className="card-header">
                        <h5 className="mb-0">Vitals</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Temperature
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="101 C"
                                />
                                <span className="input-group-text">F</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Pulse<span className="text-danger ms-1">*</span>
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="100/67 mmHg"
                                />
                                <span className="input-group-text">mmHg</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Respiratory Rate
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="24 rpm"
                                />
                                <span className="input-group-text">rpm</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                SPO2<span className="text-danger ms-1">*</span>
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="98 %"
                                />
                                <span className="input-group-text">%</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Height
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="176 cm"
                                />
                                <span className="input-group-text">cm</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Weight
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue="100 kg"
                                />
                                <span className="input-group-text">Kg</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                BMI<span className="text-danger ms-1">*</span>
                              </label>
                              <div className="input-group">
                                <input type="text" className="form-control" />
                                <span className="input-group-text">kg/cm</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Waist<span className="text-danger ms-1">*</span>
                              </label>
                              <div className="input-group">
                                <input type="text" className="form-control" />
                                <span className="input-group-text">cm</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                BSA<span className="text-danger ms-1">*</span>
                              </label>
                              <div className="input-group">
                                <input type="text" className="form-control" />
                                <span className="input-group-text">M</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-0">
                              <label className="form-label">Quick Notes</label>
                              <textarea
                                rows={4}
                                className="form-control"
                                placeholder="Description"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end flex-wrap align-items-center gap-2">
                      <button type="button" className="btn btn-white back-btn"
                        onClick={goBack}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary next-tab-btn"
                        id="save-vitals"
                        onClick={goNext}
                      >
                        Save &amp; Add Medical Histroy
                      </button>
                    </div>
                  </form>
                </div>
                {/* medical history */}
                <div
                  className={`form-wizard-content${
                    currentStep === 2 ? " active" : " d-none"
                  }`}
                  id="v-pills-medical-history"
                >
                  <form>
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Medical History</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Type</label>
                              <CommonSelect
                            options={Type}
                            className="select"
                            defaultValue={Type[1]}
                          />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Date of Illness
                              </label>
                              <div className=" w-auto input-group-flat">
                              <CommonDatePicker placeholder="dd/mm/yyyy" />

                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Reason</label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="Fever"
                              />
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Hospital Name
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <div className="form-check mb-2">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck1"
                                  defaultChecked
                                />
                                <label
                                  className="form-check-label form-label mb-0"
                                  htmlFor="customCheck1"
                                >
                                  Assessment done if any
                                </label>
                              </div>
                              <textarea
                                rows={4}
                                className="form-control bg-soft-light"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <div className="form-check mb-2">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck2"
                                  defaultChecked
                                />
                                <label
                                  className="form-check-label form-label mb-0"
                                  htmlFor="customCheck2"
                                >
                                  Notes
                                </label>
                              </div>
                              <textarea
                                rows={4}
                                className="form-control bg-soft-light"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <div className="form-check mb-2">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck3"
                                />
                                <label
                                  className="form-check-label form-label mb-0"
                                  htmlFor="customCheck3"
                                >
                                  Documents If any
                                </label>
                              </div>
                              <div className="profile-uploader">
                                <input
                                  type="file"
                                  className="form-control"
                                  multiple
                                  id="image_sign"
                                />
                                <div id="frames" />
                              </div>
                              <div className="row mt-3">
                                <div className="col-xl-8">
                                  <div className="row g-3">
                                    <div className="col-md-6">
                                      <div className="d-flex align-items-center justify-content-between border shadow p-3 rounded">
                                        <div>
                                          <h6 className="fs-14 fw-semibold mb-1">
                                            Xray_report_head
                                          </h6>
                                          <span className="fs-13">
                                            Size : 21.2 Kb
                                          </span>
                                        </div>
                                        <Link
                                          to="#"
                                          className="link-danger"
                                        >
                                          <i className="ti ti-trash-x-filled fs-16" />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="d-flex align-items-center justify-content-between shadow border p-3 rounded">
                                        <div>
                                          <h6 className="fs-14 fw-semibold mb-1">
                                            Blood_report_head
                                          </h6>
                                          <span className="fs-13">
                                            Size : 30.5 Kb
                                          </span>
                                        </div>
                                        <Link
                                          to="#"
                                          className="link-success"
                                        >
                                          <i className="ti ti-loader-2 fs-16" />
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 mt-2 border-top medication-list">
                          <div className="row medication-list-item">
                            <div className="col-xl-3 col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Type</label>
                                <CommonSelect
                            options={Type}
                            className="select"
                            defaultValue={Type[0]}
                          />
                              </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Date of Illness
                                </label>
                                <div className=" w-auto input-group-flat">
                                  <CommonDatePicker placeholder="dd/mm/yyyy" />

                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                              <div className="mb-3">
                                <label className="form-label">Reason</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Hospital Name
                                </label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <div className="form-check mb-2">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customCheck5"
                                  />
                                  <label
                                    className="form-check-label form-label mb-0"
                                    htmlFor="customCheck5"
                                  >
                                    Assessment done if any
                                  </label>
                                </div>
                                <div className="form-check mb-2">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customCheck6"
                                  />
                                  <label
                                    className="form-check-label form-label mb-0"
                                    htmlFor="customCheck6"
                                  >
                                    Notes
                                  </label>
                                </div>
                                <div className="form-check mb-2">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customCheck7"
                                  />
                                  <label
                                    className="form-check-label form-label mb-0"
                                    htmlFor="customCheck7"
                                  >
                                    Documents If any
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <Link
                                to="#"
                                className="link-danger add-medication fw-medium"
                              >
                                <i className="ti ti-plus me-1" />
                                Add New
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end flex-wrap align-items-center gap-2">
                      <button type="button" className="btn btn-white back-btn"
                        onClick={goBack}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary next-tab-btn"
                        id="save-medical-history"
                        onClick={goNext}
                      >
                        Save &amp; Add Complaints
                      </button>
                    </div>
                  </form>
                </div>
                {/* complaints */}
                <div
                  className={`form-wizard-content${
                    currentStep === 3 ? " active" : " d-none"
                  }`}
                  id="v-pills-complaints"
                >
                  <form>
                    <div className="card pb-0">
                      <div className="card-header">
                        <h5 className="mb-0">Complaints</h5>
                      </div>
                      <div className="card-body pb-1">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-4">
                              <label className="form-label">
                                Patients Overall Health Condition
                              </label>
                              <CommonSelect
                            options={HealthCondition}
                            className="select"
                            defaultValue={HealthCondition[1]}
                          />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-4">
                              <div className="form-check mb-2">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck4"
                                  defaultChecked
                                />
                                <label
                                  className="form-check-label form-label mb-0"
                                  htmlFor="customCheck4"
                                >
                                  Does patient have any health Condition
                                </label>
                              </div>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <div className="form-check mb-2">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck8"
                                  defaultChecked
                                />
                                <label
                                  className="form-check-label form-label mb-0"
                                  htmlFor="customCheck8"
                                >
                                  Allergies if Any Before
                                </label>
                              </div>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end flex-wrap align-items-center gap-2">
                      <button
                        type="button"
                        className="btn btn-white back-btn"
                        id="backButton"
                        onClick={goBack}
                      >
                        Back
                      </button>
                      <Link
                        to="#"
                        className="btn btn-primary  next-tab-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#success_modal"
                      >
                        Save &amp; Confirm
                      </Link>
                    </div>
                  </form>
                </div>
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
                <div className="mb-4 position-relative z-1">
                  <span className="avatar avatar-xl badge-soft-success text-success rounded-circle">
                    <i className="ti ti-calendar-check fs-40" />
                  </span>
                </div>
                <h6 className="mb-1">Added Successfully</h6>
                <p className="mb-4">
                  Patient “Hendrita Merkel” has been added to the Patient List
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <Link
                    to={all_routes.patients}
                    className="btn btn-outline-light position-relative z-1 me-2 w-100"
                    onClick={handleModalNavigation}
                  >
                    Back To List
                  </Link>
                  <Link
                    to={all_routes.patientDetails}
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

export default EditPatient;
