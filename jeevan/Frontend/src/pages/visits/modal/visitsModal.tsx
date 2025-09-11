import { Link } from "react-router-dom";
import {
  Department,
  Doctor,
  ModePayment,
  Patient,
  PatientType,
} from "../../../core/json/selectOption";
import CommonSelect from "../../../components/common-select/commonSelect";
import CommonDatePicker from "../../../components/common-date-picker/commonDatePicker";
import CommonTimePicker from "../../../components/common-time-pickers/CommonTimePicker";


const VisitsModal = () => {


  return (
    <>
      {/* Start Add Modal */}
      <div id="add_visit" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="text-dark modal-title fw-bold text-truncate">
                Add New Visit
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
            <form>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Select Patient</label>
                      <CommonSelect
                        options={Patient}
                        className="select"
                        defaultValue={Patient[0]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Patient Type</label>
                      <CommonSelect
                        options={PatientType}
                        className="select"
                        defaultValue={PatientType[0]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Select Department</label>
                      <CommonSelect
                        options={Department}
                        className="select"
                        defaultValue={Department[0]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Select Doctor</label>
                      <CommonSelect
                        options={Doctor}
                        className="select"
                        defaultValue={Doctor[0]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Date of Visit</label>
                      <div className=" w-auto input-group-flat">
                        <CommonDatePicker placeholder="dd/mm/yyyy" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Time of Visit</label>
                      <div className=" position-relative">
                        <CommonTimePicker />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Reason</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Mode of Payment</label>
                      <CommonSelect
                        options={ModePayment}
                        className="select"
                        defaultValue={ModePayment[0]}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center gap-1">
                <button
                  type="button"
                  className="btn btn-white"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* End Add Modal */}
      {/* Start Edit Modal */}
      <div id="edit_visit" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="text-dark modal-title fw-bold text-truncate">
                Edit Visit
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
            <form>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Select Patient</label>
                      <CommonSelect
                        options={Patient}
                        className="select"
                        defaultValue={Patient[1]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Patient Type</label>
                      <CommonSelect
                        options={PatientType}
                        className="select"
                        defaultValue={PatientType[1]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Select Department</label>
                      <CommonSelect
                        options={Department}
                        className="select"
                        defaultValue={Department[1]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Select Doctor</label>
                      <CommonSelect
                        options={Doctor}
                        className="select"
                        defaultValue={Doctor[1]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Date of Visit</label>
                      <div className=" w-auto input-group-flat">
                        <CommonDatePicker placeholder="dd/mm/yyyy" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Time of Visit</label>
                      <div className=" position-relative">
                        <CommonTimePicker />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Reason</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Mode of Payment</label>
                      <CommonSelect
                        options={ModePayment}
                        className="select"
                        defaultValue={ModePayment[1]}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center gap-1">
                <button
                  type="button"
                  className="btn btn-white"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* End Edit Modal */}
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
                <Link to="#" className="btn btn-danger w-100">
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

export default VisitsModal;
