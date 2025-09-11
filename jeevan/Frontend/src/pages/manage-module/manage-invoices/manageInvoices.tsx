import { Link } from "react-router-dom"
import CommonFooter from "../../../components/common-footer/commonFooter"
import { all_routes } from "../../../routes/all_routes"
import ImageWithBasePath from "../../../components/image-with-base-path"


const ManageInvoices = () => {
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
          <h4 className="mb-1">Invoices</h4>
          <div className="text-end">
            <ol className="breadcrumb m-0 py-0">
              <li className="breadcrumb-item">
                <Link to ={all_routes.dashboard}>Home</Link>
              </li>
              <li className="breadcrumb-item active">Invoices</li>
            </ol>
          </div>
        </div>
        <div className="gap-2 d-flex align-items-center flex-wrap">
          <Link
            to ="#"
            className="btn btn-icon btn-outline-light bg-white"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            aria-label="Refresh"
            data-bs-original-title="Refresh"
          >
            <i className="ti ti-refresh" />
          </Link>
          <Link
            to ="#"
            className="btn btn-icon btn-outline-light bg-white"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            aria-label="Print"
            data-bs-original-title="Print"
          >
            <i className="ti ti-printer" />
          </Link>
          <Link
            to ="#"
            className="btn btn-icon bg-white btn-outline-light"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            aria-label="Download"
            data-bs-original-title="Download"
          >
            <i className="ti ti-cloud-download" />
          </Link>
          <Link to ={all_routes.manageAddInvoices} className="btn btn-primary">
            <i className="ti ti-square-rounded-plus me-1" />
            New Invoice
          </Link>
        </div>
      </div>
      {/* End Page Header */}
      {/* Start row */}
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
                  <span className="text-success me-1">+31%</span>Increased From
                  Last Month
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
                  <span className="text-danger me-1">-15%</span>Decreased From
                  Last Month
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
                  <span className="text-success me-1">+48%</span>Increased From
                  Last Month
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
                  <span className="text-success me-1">+39%</span>Increased From
                  Last Month
                </p>
              </div>
            </div>{" "}
            {/* end card body */}
          </div>{" "}
          {/* end card */}
        </div>{" "}
        {/* end col */}
      </div>
      {/* End row */}
      {/* card start */}
      <div className="card mb-0">
        <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
          <h6 className="d-inline-flex align-items-center mb-0">
            Total Invoices<span className="badge bg-danger ms-2">658</span>
          </h6>
          <div className="d-flex align-items-center">
            {/* sort by */}
            <div className="dropdown">
              <Link
                to ="#"
                className="dropdown-toggle btn btn-md btn-outline-light d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
               aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                <i className="ti ti-sort-descending-2 me-1" />
                <span className="me-1">Sort By : </span> Newest
              </Link>
              <ul className="dropdown-menu  dropdown-menu-end p-2">
                <li>
                  <Link
                    to ="#"
                    className="dropdown-item rounded-1"
                  >
                    Newest
                  </Link>
                </li>
                <li>
                  <Link
                    to ="#"
                    className="dropdown-item rounded-1"
                  >
                    Oldest
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-body">
          {/* table start */}
          <div className="table-responsive table-nowrap">
            <table className="table border">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Created Date</th>
                  <th>Amount</th>
                  <th>Amount Due</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th className="no-sort" />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to ={all_routes.invoiceDetails}>#IV0025</Link>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Link to ="#" className="avatar avatar-sm me-2">
                        <ImageWithBasePath
                          src="assets/img/avatars/avatar-05.jpg"
                          alt="patient"
                        />
                      </Link>
                      <h6 className="mb-0 fs-14 fw-medium">
                        <Link to ="#">James Carter</Link>
                      </h6>
                    </div>
                  </td>
                  <td>17 Jun 2025, 09:00 AM</td>
                  <td>$500</td>
                  <td>$50</td>
                  <td>17 Jun 2025, 09:00 AM</td>
                  <td>
                    <span className="badge badge-soft-success">Paid</span>
                  </td>
                  <td className="text-end">
                    <div>
                      <Link
                        to ="#"
                        className="btn btn-icon btn-outline-light"
                        data-bs-toggle="dropdown"
                        aria-label="more options"
                      >
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
                        <li>
                          <Link
                            to ={all_routes.manageInvoicesDetails}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-eye me-1" />
                            Preview
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ={all_routes.manageEditInvoices}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-edit me-1" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="ti ti-trash me-1" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to ={all_routes.invoiceDetails}>#IV0024</Link>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Link to ="#" className="avatar avatar-sm me-2">
                        <ImageWithBasePath
                          src="assets/img/avatars/avatar-17.jpg"
                          alt="patient"
                        />
                      </Link>
                      <h6 className="mb-0 fs-14 fw-medium">
                        <Link to ="#">Emily Davis</Link>
                      </h6>
                    </div>
                  </td>
                  <td>10 Jun 2025, 10:30 AM</td>
                  <td>$500</td>
                  <td>$50</td>
                  <td>10 Jun 2025, 10:30 AM</td>
                  <td>
                    <span className="badge badge-soft-danger">Overdue</span>
                  </td>
                  <td className="text-end">
                    <div>
                      <Link
                        to ="#"
                        className="btn btn-icon btn-outline-light"
                        data-bs-toggle="dropdown"
                        aria-label="more options"
                      >
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
                        <li>
                          <Link
                            to ={all_routes.manageInvoicesDetails}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-eye me-1" />
                            Preview
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ={all_routes.manageEditInvoices}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-edit me-1" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="ti ti-trash me-1" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to ={all_routes.invoiceDetails}>#IV0023</Link>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Link to ="#" className="avatar avatar-sm me-2">
                        <ImageWithBasePath
                          src="assets/img/avatars/avatar-06.jpg"
                          alt="patient"
                        />
                      </Link>
                      <h6 className="mb-0 fs-14 fw-medium">
                        <Link to ="#">Michael Johnson</Link>
                      </h6>
                    </div>
                  </td>
                  <td>22 May 2025, 01:15 PM</td>
                  <td>$300</td>
                  <td>$30</td>
                  <td>22 May 2025, 01:15 PM</td>
                  <td>
                    <span className="badge badge-soft-info">Draft</span>
                  </td>
                  <td className="text-end">
                    <div>
                      <Link
                        to ="#"
                        className="btn btn-icon btn-outline-light"
                        data-bs-toggle="dropdown"
                        aria-label="more options"
                      >
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
                        <li>
                          <Link
                            to ={all_routes.manageInvoicesDetails}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-eye me-1" />
                            Preview
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ={all_routes.manageEditInvoices}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-edit me-1" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="ti ti-trash me-1" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to ={all_routes.invoiceDetails}>#IV0022</Link>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Link to ="#" className="avatar avatar-sm me-2">
                        <ImageWithBasePath
                          src="assets/img/avatars/avatar-04.jpg"
                          alt="patient"
                        />
                      </Link>
                      <h6 className="mb-0 fs-14 fw-medium">
                        <Link to ="#">Olivia Miller</Link>
                      </h6>
                    </div>
                  </td>
                  <td>15 May 2025, 11:30 AM</td>
                  <td>$200</td>
                  <td>$20</td>
                  <td>15 May 2025, 11:30 AM</td>
                  <td>
                    <span className="badge badge-soft-warning">Pending</span>
                  </td>
                  <td className="text-end">
                    <div>
                      <Link
                        to ="#"
                        className="btn btn-icon btn-outline-light"
                        data-bs-toggle="dropdown"
                        aria-label="more options"
                      >
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
                        <li>
                          <Link
                            to ={all_routes.manageInvoicesDetails}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-eye me-1" />
                            Preview
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ={all_routes.manageEditInvoices}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-edit me-1" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="ti ti-trash me-1" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to ={all_routes.invoiceDetails}>#IV0021</Link>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Link to ="#" className="avatar avatar-sm me-2">
                        <ImageWithBasePath
                          src="assets/img/avatars/avatar-15.jpg"
                          alt="patient"
                        />
                      </Link>
                      <h6 className="mb-0 fs-14 fw-medium">
                        <Link to ="#">David Smith</Link>
                      </h6>
                    </div>
                  </td>
                  <td>30 Apr 2025, 12:20 PM</td>
                  <td>$100</td>
                  <td>$10</td>
                  <td>30 Apr 2025, 12:20 PM</td>
                  <td>
                    <span className="badge badge-soft-success">Paid</span>
                  </td>
                  <td className="text-end">
                    <div>
                      <Link
                        to ="#"
                        className="btn btn-icon btn-outline-light"
                        data-bs-toggle="dropdown"
                        aria-label="more options"
                      >
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
                        <li>
                          <Link
                            to ={all_routes.manageInvoicesDetails}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-eye me-1" />
                            Preview
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ={all_routes.manageEditInvoices}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-edit me-1" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="ti ti-trash me-1" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to ={all_routes.invoiceDetails}>#IV0020</Link>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Link to ="#" className="avatar avatar-sm me-2">
                        <ImageWithBasePath
                          src="assets/img/avatars/avatar-08.jpg"
                          alt="patient"
                        />
                      </Link>
                      <h6 className="mb-0 fs-14 fw-medium">
                        <Link to ="#">Sophia Wilson</Link>
                      </h6>
                    </div>
                  </td>
                  <td>25 Apr 2025, 03:15 PM</td>
                  <td>$600</td>
                  <td>$60</td>
                  <td>25 Apr 2025, 03:15 PM</td>
                  <td>
                    <span className="badge badge-soft-danger">Overdue</span>
                  </td>
                  <td className="text-end">
                    <div>
                      <Link
                        to ="#"
                        className="btn btn-icon btn-outline-light"
                        data-bs-toggle="dropdown"
                        aria-label="more options"
                      >
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
                        <li>
                          <Link
                            to ={all_routes.manageInvoicesDetails}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-eye me-1" />
                            Preview
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ={all_routes.manageEditInvoices}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-edit me-1" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="ti ti-trash me-1" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to ={all_routes.invoiceDetails}>#IV0019</Link>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Link to ="#" className="avatar avatar-sm me-2">
                        <ImageWithBasePath
                          src="assets/img/avatars/avatar-14.jpg"
                          alt="patient"
                        />
                      </Link>
                      <h6 className="mb-0 fs-14 fw-medium">
                        <Link to ="#">Daniel Williams</Link>
                      </h6>
                    </div>
                  </td>
                  <td>13 Mar 2025, 02:40 PM</td>
                  <td>$700</td>
                  <td>$70</td>
                  <td>13 Mar 2025, 02:40 PM</td>
                  <td>
                    <span className="badge badge-soft-info">Draft</span>
                  </td>
                  <td className="text-end">
                    <div>
                      <Link
                        to ="#"
                        className="btn btn-icon btn-outline-light"
                        data-bs-toggle="dropdown"
                        aria-label="more options"
                      >
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
                        <li>
                          <Link
                            to ={all_routes.manageInvoicesDetails}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-eye me-1" />
                            Preview
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ={all_routes.manageEditInvoices}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-edit me-1" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="ti ti-trash me-1" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to ={all_routes.invoiceDetails}>#IV0018</Link>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Link to ="#" className="avatar avatar-sm me-2">
                        <ImageWithBasePath
                          src="assets/img/avatars/avatar-08.jpg"
                          alt="patient"
                        />
                      </Link>
                      <h6 className="mb-0 fs-14 fw-medium">
                        <Link to ="#">Isabella Anderson</Link>
                      </h6>
                    </div>
                  </td>
                  <td>16 Feb 2025, 03:00 PM</td>
                  <td>$800</td>
                  <td>$80</td>
                  <td>16 Feb 2025, 03:00 PM</td>
                  <td>
                    <span className="badge badge-soft-warning">Pending</span>
                  </td>
                  <td className="text-end">
                    <div>
                      <Link
                        to ="#"
                        className="btn btn-icon btn-outline-light"
                        data-bs-toggle="dropdown"
                        aria-label="more options"
                      >
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
                        <li>
                          <Link
                            to ={all_routes.manageInvoicesDetails}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-eye me-1" />
                            Preview
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ={all_routes.manageEditInvoices}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-edit me-1" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="ti ti-trash me-1" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to ={all_routes.invoiceDetails}>#IV0017</Link>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Link to ="#" className="avatar avatar-sm me-2">
                        <ImageWithBasePath
                          src="assets/img/avatars/avatar-23.jpg"
                          alt="patient"
                        />
                      </Link>
                      <h6 className="mb-0 fs-14 fw-medium">
                        <Link to ="#">William Brown</Link>
                      </h6>
                    </div>
                  </td>
                  <td>20 Jan 2025, 04:45 PM</td>
                  <td>$900</td>
                  <td>$90</td>
                  <td>20 Jan 2025, 04:45 PM</td>
                  <td>
                    <span className="badge badge-soft-success">Paid</span>
                  </td>
                  <td className="text-end">
                    <div>
                      <Link
                        to ="#"
                        className="btn btn-icon btn-outline-light"
                        data-bs-toggle="dropdown"
                        aria-label="more options"
                      >
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
                        <li>
                          <Link
                            to ={all_routes.manageInvoicesDetails}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-eye me-1" />
                            Preview
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ={all_routes.manageEditInvoices}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-edit me-1" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="ti ti-trash me-1" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to ={all_routes.invoiceDetails}>#IV0016</Link>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Link to ="#" className="avatar avatar-sm me-2">
                        <ImageWithBasePath
                          src="assets/img/avatars/avatar-09.jpg"
                          alt="patient"
                        />
                      </Link>
                      <h6 className="mb-0 fs-14 fw-medium">
                        <Link to ="#">Charlotte Taylor</Link>
                      </h6>
                    </div>
                  </td>
                  <td>15 Jan 2025, 05:30 PM</td>
                  <td>$500</td>
                  <td>$50</td>
                  <td>15 Jan 2025, 05:30 PM</td>
                  <td>
                    <span className="badge badge-soft-danger">Overdue</span>
                  </td>
                  <td className="text-end">
                    <div>
                      <Link
                        to ="#"
                        className="btn btn-icon btn-outline-light"
                        data-bs-toggle="dropdown"
                        aria-label="more options"
                      >
                        <i className="ti ti-dots-vertical" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu p-2">
                        <li>
                          <Link
                            to ={all_routes.manageInvoicesDetails}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-eye me-1" />
                            Preview
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ={all_routes.manageEditInvoices}
                            className="dropdown-item d-flex align-items-center"
                          >
                            <i className="ti ti-edit me-1" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            to ="#"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="ti ti-trash me-1" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
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
    <>
  {/* Start Modal  */}
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
          <p className="mb-3">Are you sure you want to delete this invoice?</p>
          <div className="d-flex justify-content-center gap-2">
            <Link
              to="#"
              className="btn btn-white w-100"
              data-bs-dismiss="modal"
            >
              Cancel
            </Link>
            <Link to={all_routes.manageInvoices} className="btn btn-danger w-100">
              Yes, Delete
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Modal  */}
</>

</>

  )
}

export default ManageInvoices