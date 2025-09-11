import { Link } from "react-router-dom";
import CommonFooter from "../../../components/common-footer/commonFooter";
import { all_routes } from "../../../routes/all_routes";
import SettingsTabs from "./SettingsTabs";
import ImageWithBasePath from "../../../components/image-with-base-path";
import CommonDatePicker from "../../../components/common-date-picker/commonDatePicker";

const PlansBillingsSettings = () => {
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
              <h4 className="mb-1">Settings</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={all_routes.generalSettings}>Settings</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Plan &amp; Billings
                  </li>
                </ol>
              </div>
            </div>
          </div>
          {/* End Page Header */}
          {/* Start Tabs */}
          <SettingsTabs />
          {/* End Tabs */}
          {/* Start form */}
          <h5 className="mb-4">Plans &amp; Billing</h5>
          {/* Items */}
          <div className="mb-4">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
              <h6 className="mb-0"> Current Plan Information </h6>
            </div>
            <div className="rounded border bg-white p-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div>
                <h6 className="fw-medium mb-1">Basic Plan</h6>
                <p className="mb-0">
                  {" "}
                  <i className="ti ti-clock" /> 20 Days Left{" "}
                </p>
              </div>
              <Link
                to="#"
                className="btn btn-primary d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#upgrade"
              >
                {" "}
                <i className="ti ti-shield-star me-1" /> Upgrade
              </Link>
            </div>
          </div>
          {/* Items */}
          <div className="mb-4 pb-4 border-bottom">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
              <h6 className="mb-0"> Saved Cards </h6>
              <Link
                to="#"
                className="btn btn-dark d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#new_modal"
              >
                {" "}
                <i className="ti ti-plus me-1" /> New Card
              </Link>
            </div>
            {/* start row */}
            <div className="row">
              <div className="col-lg-4">
                <div className="card shadow-none mb-lg-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center flex-wrap row-gap-2 mb-3">
                      <Link to="#" className="me-2 flex-shrink-0">
                        <ImageWithBasePath
                          src="assets/img/icons/payment-img-1.svg"
                          className="img-fluid"
                          alt="payment"
                        />
                      </Link>
                      <div>
                        <p className="fw-normal fs-14x mb-0 text-body">
                          James Peterson
                        </p>
                        <span className="fs-14 text-dark fw-medium">
                          Visa •••• 1568
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                      <Link to="#" className="btn btn-sm btn-success fs-12">
                        Default
                      </Link>
                      <div className="d-flex align-items-center">
                        <Link
                          to="#"
                          className="btn btn-icon border rounded-circle me-2 bg-light"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit text-body" />
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-icon border rounded-circle bg-light"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash text-body" />
                        </Link>
                      </div>
                    </div>
                  </div>{" "}
                  {/* end card body */}
                </div>{" "}
                {/* end card */}
              </div>{" "}
              {/* end col */}
              <div className="col-lg-4">
                <div className="card shadow-none mb-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center flex-wrap row-gap-2 mb-3">
                      <Link to="#" className="me-2 flex-shrink-0">
                        <ImageWithBasePath
                          src="assets/img/icons/payment-img-2.svg"
                          className="img-fluid"
                          alt="payment"
                        />
                      </Link>
                      <div>
                        <p className="fw-normal fs-14x mb-0 text-body">
                          Raymond Rowley
                        </p>
                        <span className="fs-14 text-dark fw-medium">
                          Mastercard •••• 1279
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                      <Link
                        to="#"
                        className="text-decoration-underline fs-14 fw-medium text-primary"
                      >
                        Set as Default
                      </Link>
                      <div className="d-flex align-items-center">
                        <Link
                          to="#"
                          className="btn btn-icon border rounded-circle me-2 bg-light"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit text-body" />
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-icon border rounded-circle bg-light"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash text-body" />
                        </Link>
                      </div>
                    </div>
                  </div>{" "}
                  {/* end card body */}
                </div>{" "}
                {/* end card */}
              </div>{" "}
              {/* end col */}
            </div>
            {/* end row */}
          </div>
          {/* Items */}
          <div>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
              <h5 className="mb-0">
                {" "}
                Billing History{" "}
                <span className="badge bg-danger rounded ms-1">6</span>
              </h5>
            </div>
            <div className="table-responsive table-nowrap">
              <table className="table border mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Invoice ID</th>
                    <th>Created Date</th>
                    <th>Amount</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#view_details"
                      >
                        {" "}
                        #IV0020{" "}
                      </Link>
                    </td>
                    <td>22 Jun 2025</td>
                    <td>$299</td>
                    <td>Basic</td>
                    <td>
                      <span className="badge badge-soft-success border fs-13">
                        Success
                      </span>
                    </td>
                    <td className="text-end">
                      <Link
                        to="#"
                        className="btn btn-icon btn-sm btn-outline-light"
                        data-bs-toggle="dropdown"
                        
                       aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
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
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#view_details"
                          >
                            <i className="ti ti-shield me-1" />
                            View Details
                          </Link>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#view_details"
                      >
                        {" "}
                        #IV0019{" "}
                      </Link>
                    </td>
                    <td>10 Jun 2025</td>
                    <td>$399</td>
                    <td>Standard</td>
                    <td>
                      <span className="badge badge-soft-success border fs-13">
                        Success
                      </span>
                    </td>
                    <td className="text-end">
                      <Link
                        to="#"
                        className="btn btn-icon btn-sm btn-outline-light"
                        data-bs-toggle="dropdown"
                        
                       aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
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
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#view_details"
                          >
                            <i className="ti ti-shield me-1" />
                            View Details
                          </Link>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#view_details"
                      >
                        {" "}
                        #IV0018{" "}
                      </Link>
                    </td>
                    <td>22 May 2025</td>
                    <td>$499</td>
                    <td>Professional</td>
                    <td>
                      <span className="badge badge-soft-success border fs-13">
                        Success
                      </span>
                    </td>
                    <td className="text-end">
                      <Link
                        to="#"
                        className="btn btn-icon btn-sm btn-outline-light"
                        data-bs-toggle="dropdown"
                        
                       aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
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
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#view_details"
                          >
                            <i className="ti ti-shield me-1" />
                            View Details
                          </Link>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#view_details"
                      >
                        {" "}
                        #IV0017{" "}
                      </Link>
                    </td>
                    <td>15 May 2025</td>
                    <td>$355</td>
                    <td>Basic</td>
                    <td>
                      <span className="badge badge-soft-success border fs-13">
                        Success
                      </span>
                    </td>
                    <td className="text-end">
                      <Link
                        to="#"
                        className="btn btn-icon btn-sm btn-outline-light"
                        data-bs-toggle="dropdown"
                        
                       aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
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
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#view_details"
                          >
                            <i className="ti ti-shield me-1" />
                            View Details
                          </Link>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#view_details"
                      >
                        {" "}
                        #IV0016{" "}
                      </Link>
                    </td>
                    <td>05 May 2025</td>
                    <td>$499</td>
                    <td>Standard</td>
                    <td>
                      <span className="badge badge-soft-success border fs-13">
                        Success
                      </span>
                    </td>
                    <td className="text-end">
                      <Link
                        to="#"
                        className="btn btn-icon btn-sm btn-outline-light"
                        data-bs-toggle="dropdown"
                        
                       aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
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
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#view_details"
                          >
                            <i className="ti ti-shield me-1" />
                            View Details
                          </Link>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>{" "}
            {/* end table */}
          </div>
          {/* End form */}
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
        {/* Start Upgrade */}
        <div id="upgrade" className="modal fade">
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h5 className="text-dark modal-title fw-bold text-truncate">
                  Upgrade Plan
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
              <div className="modal-body">
                {/* Start Pricing */}
                <div>
                  <div className="text-center">
                    <div className="d-inline-flex py-2 px-3 rounded-pill bg-light justify-content-center align-items-center mb-3">
                      <p className="mb-0 me-2">Monthly</p>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultChecked
                        />
                      </div>
                      <p className="mb-0">Yearly</p>
                    </div>
                  </div>
                  {/* start row */}
                  <div className="row justify-content-center">
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <div className="card border rounded mb-3">
                        <div className="card-body">
                          <div className="pricing-content mb-3">
                            <div className="mb-3">
                              <h6 className="fs-14 mb-0 fw-semibold">Basic</h6>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <h3 className="d-flex align-items-center">
                                $99
                                <span className="fs-14 fw-normal text-dark me-2">
                                  /month
                                </span>
                              </h3>
                              <span className="badge bg-info rounded text-truncate">
                                Only 10 Users
                              </span>
                            </div>
                            <p className="mb-3 text-truncate line-clamb-2">
                              Best for Freelancers &amp; small businesses needs
                              simple invoicing.
                            </p>
                            <Link
                              to="#"
                              className="d-flex align-items-center justify-content-center btn border text-dark rounded w-100 mb-3"
                              data-bs-toggle="modal"
                              data-bs-target="#checkout"
                            >
                              <i className="ti ti-shopping-cart me-1" /> Buy
                              Plan
                            </Link>
                            <div className="price-hdr text-center">
                              <h6 className="fs-12 fw-semibold text-dark me-2 ms-2 mb-0">
                                FEATURES
                              </h6>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                1 Business Account + 1 User
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                14+ Invoice templates
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Collect Online Payments
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                40+ Reports &amp; Insights
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Variants
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Add custom fields &amp; charges
                              </span>
                              <span className="text-dark d-flex align-items-center">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Convert documents
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* end card body */}
                      </div>
                      {/* end card */}
                    </div>
                    {/* end col */}
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <div className="card border rounded mb-3">
                        <div className="card-body">
                          <div className="pricing-content mb-3">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <h6 className="fs-14 mb-0 fw-semibold">
                                Standard
                              </h6>
                              <span className="badge bg-primary text-white">
                                Most Popular
                              </span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <h3 className="d-inline-flex align-items-center">
                                $199
                                <span className="fs-14 fw-normal text-gray-9 me-2">
                                  /month
                                </span>
                              </h3>
                              <span className="badge bg-info text-truncate">
                                Only 50 Users
                              </span>
                            </div>
                            <p className="mb-3 text-truncate line-clamb-2">
                              Growing businesses managing recurring invoices
                              &amp; reports.
                            </p>
                            <Link
                              to="#"
                              className="d-flex align-items-center justify-content-center btn bg-primary border text-white rounded w-100 mb-3"
                              data-bs-toggle="modal"
                              data-bs-target="#checkout"
                            >
                              <i className="ti ti-shopping-cart me-1" /> Current
                              Plan
                            </Link>
                            <div className="price-hdr text-center">
                              <h6 className="fs-12 fw-semibold text-dark me-2 ms-2 mb-0">
                                FEATURES
                              </h6>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                1 Business Account + 1 User
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Bulk downloads
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Multiple Price lists
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                User Activity
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Bulk edits
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Multiple Warehouses
                              </span>
                              <span className="text-dark d-flex align-items-center">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Online Store
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* end card body */}
                      </div>
                      {/* end card */}
                    </div>
                    {/* end col */}
                    <div className="col-xl-4 col-lg-6 col-sm-12">
                      <div className="card border rounded mb-3">
                        <div className="card-body">
                          <div className="pricing-content mb-3">
                            <div className="mb-3">
                              <h6 className="fs-14 mb-0 fw-semibold">
                                Business
                              </h6>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <h3 className="d-inline-flex align-items-center text-nowrap">
                                $299
                                <span className="fs-14 fw-normal text-gray-9 me-2">
                                  /month
                                </span>
                              </h3>
                              <span className="badge bg-info text-truncate">
                                Only 75 Users
                              </span>
                            </div>
                            <p className="mb-3 text-truncate line-clamb-2">
                              Best for Large sales teams requiring automation
                              &amp; integrations.
                            </p>
                            <Link
                              to="#"
                              className="d-flex align-items-center justify-content-center btn border taxt-gray-100 rounded w-100 mb-3"
                              data-bs-toggle="modal"
                              data-bs-target="#checkout"
                            >
                              <i className="ti ti-shopping-cart me-1" /> Buy
                              Plan
                            </Link>
                            <div className="price-hdr text-center">
                              <h6 className="fs-12 fw-semibold text-dark me-2 ms-2 mb-0">
                                FEATURES
                              </h6>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                POS Billing
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Batch &amp; Expiry
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Serial Number/ IMEI Tracking
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Subscription/ Recurring
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Product Grouping
                              </span>
                              <span className="text-dark d-flex align-items-center mb-2">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Additional CESS
                              </span>
                              <span className="text-dark d-flex align-items-center">
                                <i className="ti ti-circle-check-filled text-success me-2" />
                                Bank Reconciliation
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* end card body */}
                      </div>
                      {/* end card */}
                    </div>
                    {/* end col */}
                  </div>
                  {/* end row */}
                </div>
                {/* End Pricing */}
              </div>
            </div>
          </div>
        </div>
        {/* End Upgrade */}
        {/* Start Mew Modal */}
        <div id="new_modal" className="modal fade">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h5 className="text-dark modal-title fw-bold text-truncate">
                  Add New Card
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
              <form >
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">
                      Name on the Card <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Card Number <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Expire Date <span className="text-danger">*</span>
                    </label>
                    <div className=" w-auto input-group-flat">
                      <CommonDatePicker placeholder="dd/mm/yyyy" />
                    </div>
                  </div>
                  <div className="mb-0">
                    <label className="form-label">
                      CVV <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-white me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Card
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* End Mew Modal */}
        {/* Start Edit Modal */}
        <div id="edit_modal" className="modal fade">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h5 className="text-dark modal-title fw-bold text-truncate">
                  Edit New Card
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
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">
                      Name on the Card <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="James Peterson"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Card Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="5396 5250 1908 1568"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Expire Date <span className="text-danger">*</span>
                    </label>
                    <div className=" w-auto input-group-flat">
                      <CommonDatePicker placeholder="dd/mm/yyyy" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      CVV <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={556}
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <label className="form-label mb-0">Status</label>
                    <label className="d-flex align-items-center form-switch ps-2">
                      <input
                        className="form-check-input m-0 me-2"
                        type="checkbox"
                        defaultChecked
                      />
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-white me-2"
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
                    className="btn btn-white w-100"
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
        {/* Start Checkout Modal */}
        <div id="checkout" className="modal fade">
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h5 className="text-dark modal-title fw-bold text-truncate">
                  Checkout
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
              <div className="modal-body">
                <form action="#">
                  {/* start row */}
                  <div className="row">
                    <div className="col-lg-6 mb-lg-0 mb-3">
                      {/* Items */}
                      <div className="border-bottom mb-4 pb-4">
                        <h6 className="mb-3">Basic Information</h6>
                        {/* start row */}
                        <div className="row ">
                          <div className="col-xl-6 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                First Name{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>{" "}
                          {/* end col */}
                          <div className="col-xl-6 col-md-6">
                            <div className="mb-0">
                              <label className="form-label">
                                Last Name <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>{" "}
                          {/* end col */}
                          <div className="col-xl-6 col-md-6">
                            <div className="mb-0">
                              <label className="form-label">
                                Email <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>{" "}
                          {/* end col */}
                          <div className="col-xl-6 col-md-6">
                            <div className="mb-0 w-100">
                              <label className="form-label d-block">
                                Mobile Number{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control w-100"
                                name="phone"
                              />
                            </div>
                          </div>{" "}
                          {/* end col */}
                        </div>
                        {/* end row */}
                      </div>
                      {/* Items */}
                      <div className="">
                        <h6 className="mb-3">Address </h6>
                        {/* start row */}
                        <div className="row">
                          <div className="col-xl-12 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Address <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>{" "}
                          {/* end col */}
                          <div className="col-xl-6 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Country <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>{" "}
                          {/* end col */}
                          <div className="col-xl-6 col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                State <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>{" "}
                          {/* end col */}
                          <div className="col-xl-6 col-md-6">
                            <div className="mb-3 mb-lg-0">
                              <label className="form-label">
                                City <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>{" "}
                          {/* end col */}
                          <div className="col-xl-6 col-md-6">
                            <div className="mb-0 w-100">
                              <label className="form-label d-block">
                                Postal Code
                                <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>{" "}
                          {/* end col */}
                        </div>
                        {/* end row */}
                      </div>
                    </div>
                    <div className="col-lg-6 bg-light rounded pt-2 position-relative">
                      <div className="card border-0">
                        <div className="card-body bg-white ">
                          <h6 className="mb-3">Subscription Details </h6>
                          <p className="d-flex align-items-center justify-content-between flex-wrap gap-2 text-body mb-2 fs-14">
                            Plan Name <span className="text-dark">Basic</span>{" "}
                          </p>
                          <p className="d-flex align-items-center justify-content-between flex-wrap gap-2 text-body mb-2 fs-14">
                            Plan Amount{" "}
                            <span className="text-dark">$99.00 </span>{" "}
                          </p>
                          <p className="d-flex align-items-center justify-content-between flex-wrap gap-2 text-body mb-2 fs-14">
                            Tax <span className="text-dark">$0.00 </span>{" "}
                          </p>
                          <p className="d-flex align-items-center justify-content-between flex-wrap gap-2 text-body mb-2 fs-14">
                            Total <span className="text-dark">$99.00 </span>{" "}
                          </p>
                        </div>
                      </div>
                      <div className="position-lg-absolute bottom-0 start-0 mb px-3 w-100">
                        <div className="d-flex align-items-center p-2 rounded badge-soft-success gap-2 justify-content-center">
                          <div className="">
                            <ImageWithBasePath
                              src="assets/img/icons/shield-img.png"
                              alt=""
                            />
                          </div>
                          <div>
                            <h6 className="mb-0 fs-14 mb-1">
                              100% Cashback Guarantee
                            </h6>
                            <p className="mb-0 fs-14"> We Protect Your Money</p>
                          </div>
                        </div>
                        <div className="text-btn mt-4">
                          <Link
                            to=""
                            className="btn btn-primary w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#success_modal"
                          >
                            Pay $99.00
                          </Link>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                  </div>
                  {/* end row */}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-white me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End Checkout Modal */}
        {/* Start Success Modal  */}
        <div className="modal fade" id="success_modal">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-body text-center position-relative">
                <div className="mb-3 position-relative z-1">
                  <ImageWithBasePath
                    src="assets/img/icons/success-imgs.svg"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <h5 className="mb-1">Payment Successful</h5>
                <p className="mb-3">
                  Your purchase of the Basic Plan has been completed with
                  Reference Number #12559845
                </p>
                <div className="d-flex justify-content-center">
                  <Link
                    to={all_routes.plansBillingsSettings}
                    className="btn btn-white position-relative z-1 me-2"
                    data-bs-dismiss="modal"
                  >
                    Back to Plans
                  </Link>
                  <Link
                    to=""
                    className="btn btn-primary position-relative z-1"
                    data-bs-toggle="modal"
                    data-bs-target="#view_details"
                  >
                    Purchase Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Success Modal  */}
        {/* Start view Modal */}
        <div id="view_details" className="modal fade">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h5 className="text-dark modal-title fw-bold text-truncate">
                  View Details
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
              <div className="modal-body">
                <div className="d-flex align-items-center justify-content-end flex-wrap gap-2 mb-4">
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <Link to="#" className="btn btn-outline-light">
                      <i className="ti ti-file-download me-1" />
                      Download PDF
                    </Link>
                    <Link to="#" className="btn btn-outline-light">
                      <i className="ti ti-printer me-1" />
                      Print
                    </Link>
                  </div>
                </div>
                <div className="p-3 rounded bg-light mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-3">
                    <div>
                      <h4 className="mb-0">Subscription Invoice</h4>
                    </div>
                    <div>
                      <ImageWithBasePath
                        src="assets/img/logo-dark.svg"
                        alt="logo-dark"
                        className="invoice-logo"
                      />
                      <ImageWithBasePath
                        src="assets/img/logo.svg"
                        className="invoice-logo-white"
                        alt="logo-white"
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between row-gap-3 flex-wrap">
                    <div>
                      <h6 className="mb-2">To</h6>
                      <p className="mb-1">
                        Name : <span className="text-dark">James Carter</span>
                      </p>
                      <p className="mb-1">
                        Address :{" "}
                        <span className="text-dark">
                          8/15 Francis street, UK 454787
                        </span>
                      </p>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-2">ID</h6>
                      <p className="mb-1">
                        Invoiced ID : <span className="text-dark">#IV0020</span>
                      </p>
                      <p className="mb-1">
                        Invoice Date : :{" "}
                        <span className="text-dark">17 Jun 2025</span>
                      </p>
                    </div>
                  </div>
                </div>
                <h5 className="mb-3">Product / Service Items</h5>
                <div className="table-responsive table-nowrap rounded border border-bottom-0 mb-4">
                  <table className="table mb-0 rounded">
                    <thead className="table-dark">
                      <tr>
                        <th className="text-white">#</th>
                        <th className="text-white">Product/Service</th>
                        <th className="text-white">Quantity</th>
                        <th className="text-white">Rate</th>
                        <th className="text-white">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td className="text-dark">Basic</td>
                        <td>2</td>
                        <td>$99.00</td>
                        <td>$99.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row justify-content-end">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <p className="fw-semibold text-dark mb-0 fs-14">Amount</p>
                      <p className="fw-semibold text-dark mb-0">$99.00</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <p className="fw-semibold text-dark mb-0">CGST (9%)</p>
                      <p className="fw-semibold text-dark mb-0">$12</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <p className="fw-semibold text-dark mb-0">SGST (9%)</p>
                      <p className="fw-semibold text-dark mb-0">$12</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-3">
                      <p className="fw-semibold text-dark mb-0">
                        Discount (25%)
                      </p>
                      <p className="fw-semibold text-danger mb-0">- $24</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h5 className="mb-0">Total (USD)</h5>
                      <h5 className="mb-0">$99.00</h5>
                    </div>
                  </div>
                </div>
                <p>
                  <span className="text-dark fw-semibold">
                    Total Amount In Words
                  </span>{" "}
                  Ninety Nine Dollars
                </p>
                <div className="border-top mt-4 pt-4 d-flex justify-content-between align-items-center gap-3 flex-wrap">
                  <div>
                    <p className="mb-2">Scan to the pay</p>
                    <ImageWithBasePath
                      src="./assets/img/icons/qr-code.svg"
                      alt="img"
                    />
                  </div>
                  <div>
                    <h6 className="mb-2">Payment Info</h6>
                    <p className="fw-medium mb-2">
                      Debit Card{" "}
                      <span className="fw-semibold text-dark float-end ms-5">
                        4654 **** **** 4195
                      </span>
                    </p>
                    <p className="fw-medium mb-0">
                      Amount{" "}
                      <span className="fw-semibold text-dark float-end">
                        $1,972.43
                      </span>
                    </p>
                  </div>
                </div>
                <div className="border-top mt-4 pt-4 d-flex justify-content-between align-items-center gap-3 flex-wrap">
                  <div>
                    <h6 className="fw-semibold fs-14 mb-1">
                      Terms and Conditions
                    </h6>
                    <ol className="ps-3 mb-3">
                      <li className="mb-1">
                        Goods once sold cannot be taken back or exchanged.
                      </li>
                      <li>
                        We are not the manufacturers the company provides
                        warranty as per its terms
                      </li>
                    </ol>
                    <h6 className="fw-semibold fs-14 mb-1">Notes</h6>
                    <p className="fs-13 mb-0">
                      All charges are final and include applicable taxes, fees,
                      and additional costs
                    </p>
                  </div>
                  <div className="text-center">
                    <ImageWithBasePath
                      src="./assets/img/icons/signature.svg"
                      alt="img"
                      className="signature"
                    />
                    <h6 className="fw-semibold fs-14 mb-1">Ted M. Davis</h6>
                    <p className="mb-0">Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End view Modal */}
      </>
    </>
  );
};

export default PlansBillingsSettings;
