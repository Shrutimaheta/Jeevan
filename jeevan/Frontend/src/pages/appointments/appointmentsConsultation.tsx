
import { useEffect } from "react";
import { all_routes } from "../../routes/all_routes";
import CommonFooter from "../../components/common-footer/commonFooter";
import ImageWithBasePath from "../../components/image-with-base-path";
import { Link } from "react-router-dom";
import { Diagnosis, Frequency, ModePayment, Timing, YesORNo } from "../../core/json/selectOption";
import CommonSelect from "../../components/common-select/commonSelect";


const AppointmentConsultation = () => {
    useEffect(() => {
        // Remove any lingering modal-backdrop and modal-open classes
        document.body.classList.remove('modal-open');
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    }, []);
    return (
        <>
            {/* ========================
            Start Page Content
        ========================= */}
            <div className="page-wrapper">
                {/* Start Content */}
                <div className="content">
                    {/* Page Header */}
                    <>
                        {/* Page Header */}
                        <div className="d-flex align-items-center justify-content-between gap-2 mb-4 flex-wrap">
                            <div className="breadcrumb-arrow">
                                <h4 className="mb-1">Consultation</h4>
                                <div className="text-end">
                                    <ol className="breadcrumb m-0 py-0">
                                        <li className="breadcrumb-item">
                                            <Link to={all_routes.dashboard}>Home</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link to={all_routes.appointments}>Appointments</Link>
                                        </li>
                                        <li className="breadcrumb-item active">Consultation</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        {/* End Page Header */}
                    </>

                    {/* End Page Header */}
                    {/* card start */}
                    <div className="card">
                        <div className="card-header">
                            <h5>Basic Information</h5>
                        </div>
                        <div className="card-body">
                            <div className="row row-gap-3 align-items-center">
                                <div className="col-xl-6">
                                    <div className="d-sm-flex align-items-center">
                                        <Link
                                            to="#"
                                            className="avatar avatar-xxxl mb-3 mb-sm-0 me-sm-3 flex-shrink-0"
                                        >
                                            <ImageWithBasePath
                                                src="assets/img/avatars/avatar-05.jpg"
                                                alt="patient"
                                                className="rounded"
                                            />
                                        </Link>
                                        <div>
                                            <span className="badge badge-soft-danger mb-1">
                                                Out Patient
                                            </span>
                                            <h6 className="mb-1">
                                                <Link to={all_routes.patientDetails}>James Carter</Link>
                                            </h6>
                                            <p className="mb-1">
                                                Patient / Consultation ID : OP1245654 / C243546566
                                            </p>
                                            <p className="mb-0">
                                                Known Allergies :{" "}
                                                <span className="text-dark fw-medium">
                                                    Pain near left chest, Pelvic Salinity
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="p-3 bg-light rounded">
                                        <div className="row row-gap-2">
                                            <div className="col-sm-4">
                                                <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                                                    Age / Gender
                                                </h6>
                                                <p className="fs-13 mb-0 text-truncate">28 Years / Male</p>
                                            </div>
                                            <div className="col-sm-4">
                                                <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                                                    Department
                                                </h6>
                                                <p className="fs-13 mb-0 text-truncate">Cardiology</p>
                                            </div>
                                            <div className="col-sm-4">
                                                <h6 className="fs-14 fw-semibold mb-1">Date</h6>
                                                <p className="fs-13 mb-0 text-truncate">
                                                    25 Jan 2024, 07:00
                                                </p>
                                            </div>
                                            <div className="col-sm-4">
                                                <h6 className="fs-14 fw-semibold mb-1">Gender</h6>
                                                <p className="fs-13 mb-0">Male</p>
                                            </div>
                                            <div className="col-sm-4">
                                                <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                                                    Blood Group
                                                </h6>
                                                <p className="fs-13 mb-0">O+ve</p>
                                            </div>
                                            <div className="col-sm-4">
                                                <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                                                    Consultation Type
                                                </h6>
                                                <p className="fs-13 mb-0">Video</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* card end */}
                    {/* card start */}
                    <div className="card pb-0">
                        <div className="card-header">
                            <h5 className="mb-0">Vitals</h5>
                        </div>
                        <div className="card-body">
                            <div className="vitals-info">
                                <div className="row gx-3 vitals_details">
                                    <div className="col-xl-4 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Temperature<span className="text-danger ms-1">*</span>
                                            </label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" />
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
                                                <input type="text" className="form-control" />
                                                <span className="input-group-text">mmHg</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Respiratory Rate<span className="text-danger ms-1">*</span>
                                            </label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" />
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
                                                <input type="text" className="form-control" />
                                                <span className="input-group-text">%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Height<span className="text-danger ms-1">*</span>
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
                                                Weight<span className="text-danger ms-1">*</span>
                                            </label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" />
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
                                </div>
                            </div>
                            <div>
                                <Link to="#" className="link-primary add-vitals">
                                    <i className="ti ti-plus me-1" />
                                    Add New
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* card end */}
                    {/* card start */}
                    <div className="card pb-0">
                        <div className="card-header">
                            <h5 className="mb-0">Complaint</h5>
                        </div>
                        <div className="card-body">
                            <div className="complaint-info">
                                <div className="row gx-3 complaint_details align-items-center">
                                    <div className="col-md-2">
                                        <div className="mb-md-3">
                                            <label className="form-label mb-md-0">Fever</label>
                                        </div>
                                    </div>
                                    <div className="col-md-10">
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Add Symptoms"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Link
                                    to="#"
                                    className="link-primary fw-medium add-complaint"
                                >
                                    <i className="ti ti-plus me-1" />
                                    Add New
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* card end */}
                    {/* card start */}
                    <div className="card pb-0">
                        <div className="card-header">
                            <h5 className="mb-0">Diagnosis</h5>
                        </div>
                        <div className="card-body">
                            <div className="diagnosis-two-info">
                                <div className="row gx-3 diagnosis-two_details align-items-center">
                                    <div className="col-md-2">
                                        <div className="mb-md-3">
                                            <label className="form-label mb-md-0">Fever</label>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="mb-3">
                                            <CommonSelect
                                                options={Diagnosis}
                                                className="select"
                                                defaultValue={Diagnosis[1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Complaint History ( Enter Min 400 Words)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Link
                                    to="#"
                                    className="link-primary fw-medium add-diagnosis-two"
                                >
                                    <i className="ti ti-plus me-1" />
                                    Add New
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* card end */}
                    {/* card start */}
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Medications</h5>
                        </div>
                        <div className="card-body">
                            <div className="medicine-info">
                                <div className="row gx-3 medicine_details">
                                    <div className="col-xl-2 col-md-4 col-sm-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Medicine Name<span className="text-danger ms-1">*</span>
                                            </label>
                                            <input className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-md-4 col-sm-6">
                                        <div className="mb-3">
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
                                        <div className="mb-3">
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
                                        <div className="mb-3">
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
                                        <div className="mb-3">
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
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Instructions<span className="text-danger ms-1">*</span>
                                            </label>
                                            <input className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row gx-3 medicine_details">
                                    <div className="col-xl-2 col-md-4 col-sm-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Medicine Name<span className="text-danger ms-1">*</span>
                                            </label>
                                            <input className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-md-4 col-sm-6">
                                        <div className="mb-3">
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
                                        <div className="mb-3">
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
                                        <div className="mb-3">
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
                                        <div className="mb-3">
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
                                        <label className="form-label">
                                            Instructions<span className="text-danger ms-1">*</span>
                                        </label>
                                        <div className="d-flex align-items-center">
                                            <div className="mb-3 w-100">
                                                <input className="form-control" />
                                            </div>
                                            <Link
                                                to="#"
                                                className="ms-2 mb-3 d-flex align-items-center trash-icon rounded-circle btn-icon btn-xs btn-soft-danger p-0 flex-shrink-0"
                                            >
                                                <i className="ti ti-trash fs-12" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="add-medicine">
                                <Link
                                    to="#"
                                    className="add-medicine link-primary fw-medium"
                                >
                                    <i className="ti ti-plus me-1 " />
                                    Add New
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* card end */}
                    {/* card start */}
                    <div className="card pb-0">
                        <div className="card-header">
                            <h5 className="mb-0">Investigations &amp; Procedure</h5>
                        </div>
                        <div className="card-body">
                            <div className="investigations-info">
                                <div className="row investigations_details align-items-center">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Link
                                    to="#"
                                    className="link-primary fw-medium add-investigations"
                                >
                                    <i className="ti ti-plus me-1" />
                                    Add New
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* card end */}
                    {/* card start */}
                    <div className="card pb-0">
                        <div className="card-header">
                            <h5 className="mb-0">Advice</h5>
                        </div>
                        <div className="card-body">
                            <div className="advice-info">
                                <div className="row advice_details align-items-center">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Link
                                    to="#"
                                    className="link-primary fw-medium add-advice"
                                >
                                    <i className="ti ti-plus me-1" />
                                    Add New
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* card end */}
                    {/* card start */}
                    <div className="card pb-0">
                        <div className="card-header">
                            <h5 className="mb-0">Follow Up</h5>
                        </div>
                        <div className="card-body">
                            <div className="follow-info">
                                <div className="row gx-3 follow_details align-items-center">
                                    <div className="col-md-6">
                                        <div className="mb-md-3">
                                            <label className="form-label mb-md-0">
                                                Next Consultation
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <CommonSelect
                                                options={YesORNo}
                                                className="select"
                                                defaultValue={YesORNo[0]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-md-3">
                                            <label className="form-label mb-md-0">
                                                Whether to come on empty Stomach?
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex align-items-center">
                                        <div className="mb-3 w-100">
                                            <CommonSelect
                                                options={YesORNo}
                                                className="select"
                                                defaultValue={YesORNo[0]}
                                            />
                                        </div>
                                        <Link
                                            to="#"
                                            className="ms-2 mb-3 d-flex align-items-center trash-icon rounded-circle btn-icon btn-xs btn-soft-danger p-0"
                                        >
                                            <i className="ti ti-trash fs-12" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Link
                                    to="#"
                                    className="link-primary fw-medium add-follow"
                                >
                                    <i className="ti ti-plus me-1" />
                                    Add New
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* card end */}
                    {/* card start */}
                    <div className="card mb-0">
                        <div className="card-header">
                            <h5 className="mb-0">Invoice</h5>
                        </div>
                        <div className="card-body pb-1">
                            <div className="invoice-info">
                                <div className="row invoice_details align-items-center">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Service &amp; Product</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row invoice_details align-items-center">
                                    <div className="col-md-12 d-flex align-items-center">
                                        <div className="mb-3 w-100">
                                            <input type="text" className="form-control" />
                                        </div>
                                        <Link
                                            to="#"
                                            className="ms-2 mb-3 d-flex align-items-center trash-icon rounded-circle btn-icon btn-xs btn-soft-danger p-0"
                                        >
                                            <i className="ti ti-trash fs-12" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom pb-3 mb-3">
                                <Link
                                    to="#"
                                    className="link-primary fw-medium add-invoice"
                                >
                                    <i className="ti ti-plus me-1" />
                                    Add New
                                </Link>
                            </div>
                            <div className="row justify-content-end">
                                <div className="col-lg-3 col-sm-5">
                                    <p className="text-dark mb-2 fw-semibold">
                                        Amount :<span className="fw-normal float-end">$0.00</span>
                                    </p>
                                    <p className="text-dark mb-2 fw-semibold">
                                        Tax (0%) :<span className="fw-normal float-end">$0.00</span>
                                    </p>
                                    <p className="text-dark mb-2 fw-semibold pb-2 border-bottom">
                                        Discount (0%) :
                                        <span className="fw-normal float-end">$0.00</span>
                                    </p>
                                    <h6 className="mb-3">
                                        Total :<span className="float-end">$0.00</span>
                                    </h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Payment Mode</label>
                                        <CommonSelect
                                            options={ModePayment}
                                            className="select"
                                            defaultValue={ModePayment[1]}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Amount</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* card end */}
                    <div className="d-flex align-items-center gap-2 mt-4 justify-content-end">
                        <button type="button" className="btn btn-white">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Complete
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

    )
}

export default AppointmentConsultation;