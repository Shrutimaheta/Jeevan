import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import { all_routes } from "../../routes/all_routes";
import { Suspense, lazy } from "react";

const PharmacyModal = lazy(() => import("./modal/pharmacyModal"));

const Pharmacy = () => {
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
              <h4 className="mb-1">Pharmacy</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Pharmacy</li>
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
              <Link
                to="#"
                className="btn btn-icon btn-white"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Download"
                data-bs-original-title="Download"
              >
                <i className="ti ti-cloud-download" />
              </Link>
              <Link
                to="#"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#add_modal"
              >
                <i className="ti ti-square-rounded-plus me-1" />
                New Product
              </Link>
            </div>
          </div>
          {/* End Page Header */}
          {/* card start */}
          <div className="card mb-0">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h6 className="d-inline-flex align-items-center mb-0">
                Total Products<span className="badge bg-danger ms-2">658</span>
              </h6>
              <div className="d-flex align-items-center flex-wrap gap-2">
                <div className="search-set">
                  <div className="d-flex align-items-center flex-wrap gap-2">
                   
                  </div>
                </div>
                <div className="dropdown">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-md btn-outline-light d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                   aria-label="Pharmacy item actions menu" aria-haspopup="true" aria-expanded="false">
                    <i className="ti ti-sort-descending-2 me-1" />
                    <span className="me-1">Sort By : </span> Newest
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-2" role="menu">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1" role="menuitem">
                        Newest
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1" role="menuitem">
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
                <table className="table mb-0 border">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Product Name</th>
                      <th className="no-sort">Price</th>
                      <th className="no-sort">Offer Price</th>
                      <th>Purchase Date</th>
                      <th>Expiry Date</th>
                      <th>Stock</th>
                      <th className="no-sort">Description</th>
                      <th>Unit (ml/mg)</th>
                      <th className="no-sort" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_modal"
                        >
                          #PR0025
                        </Link>
                      </td>
                      <td>Acetaminophen</td>
                      <td>$500</td>
                      <td>$50</td>
                      <td>17 Jun 2025</td>
                      <td>22 Jun 2025</td>
                      <td>280</td>
                      <td>
                        <p className="mb-0 text-truncate">
                          Prevents heart attacks and strokes
                        </p>
                      </td>
                      <td>20mg</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Pharmacy item actions menu"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                             role="menuitem">
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_modal"
                             role="menuitem">
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" />
                              Delete
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
                          data-bs-target="#view_modal"
                        >
                          #PR0024
                        </Link>
                      </td>
                      <td>Cymbalta</td>
                      <td>$500</td>
                      <td>$50</td>
                      <td>10 Jun 2025</td>
                      <td>15 Jun 2025</td>
                      <td>468</td>
                      <td>
                        <p className="mb-0 text-truncate">
                          Treats hypertension, angina, and heart failure
                        </p>
                      </td>
                      <td>17mg</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Pharmacy item actions menu"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                             role="menuitem">
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_modal"
                             role="menuitem">
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" />
                              Delete
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
                          data-bs-target="#view_modal"
                        >
                          #PR0023
                        </Link>
                      </td>
                      <td>Dupixent</td>
                      <td>$300</td>
                      <td>$30</td>
                      <td>22 May 2025</td>
                      <td>27 May 2025</td>
                      <td>261</td>
                      <td>
                        <p className="mb-0 text-truncate">
                          Used for muscle spasms and spasticity
                        </p>
                      </td>
                      <td>40mg</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Pharmacy item actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                             role="menuitem">
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_modal"
                             role="menuitem">
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" />
                              Delete
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
                          data-bs-target="#view_modal"
                        >
                          #PR0022
                        </Link>
                      </td>
                      <td>Entresto</td>
                      <td>$200</td>
                      <td>$20</td>
                      <td>15 May 2025</td>
                      <td>20 May 2025</td>
                      <td>550</td>
                      <td>
                        <p className="mb-0 text-truncate">
                          Treats depression and panic disorder
                        </p>
                      </td>
                      <td>28mg</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Pharmacy item actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                             role="menuitem">
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_modal"
                             role="menuitem">
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" />
                              Delete
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
                          data-bs-target="#view_modal"
                        >
                          #PR0021
                        </Link>
                      </td>
                      <td>Rybelsus</td>
                      <td>$100</td>
                      <td>$10</td>
                      <td>30 Apr 2025</td>
                      <td>5 May 2025</td>
                      <td>303</td>
                      <td>
                        <p className="mb-0 text-truncate">
                          Treats angina by dilating blood vessels.
                        </p>
                      </td>
                      <td>30ml</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Pharmacy item actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                             role="menuitem">
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_modal"
                             role="menuitem">
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" />
                              Delete
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
                          data-bs-target="#view_modal"
                        >
                          #PR0020
                        </Link>
                      </td>
                      <td>Pantoprazole</td>
                      <td>$600</td>
                      <td>$60</td>
                      <td>25 Apr 2025</td>
                      <td>30 Apr 2025</td>
                      <td>468</td>
                      <td>
                        <p className="mb-0 text-truncate">
                          Used for schizophrenia and bipolar disorder
                        </p>
                      </td>
                      <td>10mg</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Pharmacy item actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                             role="menuitem">
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_modal"
                             role="menuitem">
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" />
                              Delete
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
                          data-bs-target="#view_modal"
                        >
                          #PR0019
                        </Link>
                      </td>
                      <td>Prednisone</td>
                      <td>$700</td>
                      <td>$70</td>
                      <td>13 Mar 2025</td>
                      <td>18 Mar 2025</td>
                      <td>100</td>
                      <td>
                        <p className="mb-0">Reduces stomach acid</p>
                      </td>
                      <td>20ml</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Pharmacy item actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                             role="menuitem">
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_modal"
                             role="menuitem">
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" />
                              Delete
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
                          data-bs-target="#view_modal"
                        >
                          #PR0018
                        </Link>
                      </td>
                      <td>Entyvio</td>
                      <td>$800</td>
                      <td>$80</td>
                      <td>16 Feb 2025</td>
                      <td>21 Feb 2025</td>
                      <td>250</td>
                      <td>
                        <p className="mb-0 text-truncate">
                          For chest pain associated with heart conditions
                        </p>
                      </td>
                      <td>25mg</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Pharmacy item actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                             role="menuitem">
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_modal"
                             role="menuitem">
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" />
                              Delete
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
                          data-bs-target="#view_modal"
                        >
                          #PR0017
                        </Link>
                      </td>
                      <td>Farxiga</td>
                      <td>$900</td>
                      <td>$90</td>
                      <td>20 Jan 2025</td>
                      <td>25 Jan 2025</td>
                      <td>180</td>
                      <td>
                        <p className="mb-0 text-truncate">
                          Treats bacterial infections
                        </p>
                      </td>
                      <td>35mg</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Pharmacy item actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                             role="menuitem">
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_modal"
                             role="menuitem">
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" />
                              Delete
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
                          data-bs-target="#view_modal"
                        >
                          #PR0016
                        </Link>
                      </td>
                      <td>Apexitecan</td>
                      <td>$500</td>
                      <td>$50</td>
                      <td>15 Jan 2025</td>
                      <td>20 Jan 2025</td>
                      <td>220</td>
                      <td>
                        <p className="mb-0 text-truncate">
                          Reduces stomach acid, treats acid reflux
                        </p>
                      </td>
                      <td>45mg</td>
                      <td className="text-end">
                        <Link
                          to="#"
                          className="btn btn-icon btn-outline-light"
                          data-bs-toggle="dropdown"
                          aria-label="Pharmacy item actions menu"
                        >
                          <i className="ti ti-dots-vertical" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu p-2" role="menu">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#view_modal"
                             role="menuitem">
                              <i className="ti ti-eye me-1" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_modal"
                             role="menuitem">
                              <i className="ti ti-edit me-1" />
                              Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item d-flex align-items-center"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                             role="menuitem">
                              <i className="ti ti-trash me-1" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* table end */}
            </div>
          </div>
          {/* card start */}
        </div>
        {/* End Content */}
        {/* Start Footer */}
        <CommonFooter />
        {/* End Footer */}
      </div>
      {/* ========================
			End Page Content
		========================= */}
      <Suspense fallback={<div />}><PharmacyModal /></Suspense>
    </>
  );
};

export default Pharmacy;
