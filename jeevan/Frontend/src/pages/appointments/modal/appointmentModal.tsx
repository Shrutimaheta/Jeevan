import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../components/image-with-base-path";
import CommonSelect from "../../../components/common-select/commonSelect";
import { Consultation, ModePayment, PatientType, SelectDepartment, SelectDoctor, SelectPatient } from "../../../core/json/selectOption";
import CommonDatePicker from "../../../components/common-date-picker/commonDatePicker";
import CommonTimePicker from "../../../components/common-time-pickers/CommonTimePicker";
import { all_routes } from "../../../routes/all_routes";


const AppointmentModal = () => {

    return (
        <>
            {/* Start view Modal */}
            <div id="view_modal" className="modal fade">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header justify-content-between">
                            <h5 className="modal-title text-truncate">Appointment Details</h5>
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
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <div className="d-flex align-items-center">
                                    <Link to="#" className="avatar flex-shrink-0">
                                        <ImageWithBasePath
                                            src="assets/img/avatars/avatar-31.jpg"
                                            className="rounded"
                                            alt="patient"
                                        />
                                    </Link>
                                    <div className="ms-2">
                                        <div>
                                            <h6 className="fw-semibold fs-14 text-truncate mb-1">
                                                <Link to={all_routes.patientDetails}>Gifford</Link>
                                            </h6>
                                            <p className="fs-13 mb-0">Patient</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span className="badge badge-soft-purple">Upcoming</span>
                                </div>
                            </div>
                            <div className="row mb-3 row-gap-3">
                                <div className="col-sm-12">
                                    <h6 className="mb-1">Date &amp; Time</h6>
                                    <p className="text-dark mb-1">$500 / 1 Hr</p>
                                    <p className="fs-13 mb-0">24 Jan 2024, 09:00 AM to 10:00 PM</p>
                                </div>
                                <div className="col-sm-12">
                                    <h6 className="mb-1">Consultation With</h6>
                                    <p className="text-dark mb-1">Dr. Laird</p>
                                    <p className="fs-13 mb-0">Dermatologist</p>
                                </div>
                            </div>
                            <h6 className="mb-1">Reason</h6>
                            <p className="mb-3">Fever, Stomach pain, Drowsiness</p>
                            <h6 className="mb-1">Notes</h6>
                            <p className="mb-0">
                                Provide detailed instructions on how to use prescribed medications.
                                Include dosage, frequency, and any specific application guidelines.
                            </p>
                        </div>
                        <div className="modal-footer d-flex align-items-center gap-1">
                            <button
                                type="button"
                                className="btn btn-white"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <Link
                                to={all_routes.appointmentConsultation}
                                type="submit"
                                className="btn btn-primary"
                            >
                                Start Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* End view Modal */}
            {/* Start add Modal */}
            <div id="add_modal" className="modal fade">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header justify-content-between">
                            <h5 className="modal-title text-truncate">New Appointment</h5>
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
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">Select Patient</label>
                                            <CommonSelect
                                                options={SelectPatient}
                                                className="select"
                                                defaultValue={SelectPatient[0]}
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
                                            <label className="form-label">
                                                Select Department<span className="text-danger ms-1">*</span>
                                            </label>
                                            <CommonSelect
                                                options={SelectDepartment}
                                                className="select"
                                                defaultValue={SelectDepartment[0]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Select Doctor<span className="text-danger ms-1">*</span>
                                            </label>
                                            <CommonSelect
                                                options={SelectDoctor}
                                                className="select"
                                                defaultValue={SelectDoctor[0]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Preffered Mode of Consultation
                                                <span className="text-danger ms-1">*</span>
                                            </label>
                                            <CommonSelect
                                                options={Consultation}
                                                className="select"
                                                defaultValue={Consultation[0]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label className="form-label">Date</label>
                                            <div className=" w-auto input-group-flat">
                                                <CommonDatePicker placeholder="dd/mm/yyyy" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label className="form-label">Start Time</label>
                                            <div className=" position-relative">
                                                <CommonTimePicker />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label className="form-label">End Time</label>
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
                                            <label className="form-label">Quick Notes</label>
                                            <textarea
                                                className="form-control"
                                                placeholder="Additional Information"
                                                rows={4}
                                                defaultValue={""}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-0">
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
                                    Add Appointment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* End add Modal */}
            {/* Start edit Modal */}
            <div id="edit_modal" className="modal fade">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header justify-content-between">
                            <h5 className="modal-title text-truncate">Edit Appointment</h5>
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
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">Select Patient</label>
                                            <CommonSelect
                                                options={SelectPatient}
                                                className="select"
                                                defaultValue={SelectPatient[1]}
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
                                            <label className="form-label">
                                                Select Department<span className="text-danger ms-1">*</span>
                                            </label>
                                            <CommonSelect
                                                options={SelectDepartment}
                                                className="select"
                                                defaultValue={SelectDepartment[1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Select Doctor<span className="text-danger ms-1">*</span>
                                            </label>
                                            <CommonSelect
                                                options={SelectDoctor}
                                                className="select"
                                                defaultValue={SelectDoctor[1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Preffered Mode of Consultation
                                                <span className="text-danger ms-1">*</span>
                                            </label>
                                            <CommonSelect
                                                options={Consultation}
                                                className="select"
                                                defaultValue={Consultation[1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label className="form-label">Date</label>
                                            <div className=" w-auto input-group-flat">
                                                <CommonDatePicker placeholder="dd/mm/yyyy" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label className="form-label">Start Time</label>
                                            <div className="input-icon-end position-relative">
                                                <CommonTimePicker />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label className="form-label">End Time</label>
                                            <div className="input-icon-end position-relative">
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
                                            <label className="form-label">Quick Notes</label>
                                            <textarea
                                                className="form-control"
                                                rows={4}
                                                defaultValue={
                                                    "Provide detailed instructions on how to use prescribed medications. Include dosage, frequency, and any specific application guidelines."
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-0">
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
            {/* End edit Modal */}
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
                                    className="btn btn-white position-relative z-1 w-100"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </Link>
                                <Link
                                    to={all_routes.patientDetails}
                                    className="btn btn-danger position-relative z-1 w-100"
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
    )
}

export default AppointmentModal;