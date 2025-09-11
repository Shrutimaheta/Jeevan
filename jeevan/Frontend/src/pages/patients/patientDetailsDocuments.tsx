import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import { all_routes } from "../../routes/all_routes";
import PatientDetailsHeader from "./PatientDetailsHeader";

const PatientDetailsDocuments = () => {
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
              <h4 className="mb-1">Patient Details</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Patient Details</li>
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
          {/* tabs start */}
          <PatientDetailsHeader />
          {/* tabs end */}
          {/* card start */}
          <div className="card mb-0">
            <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h5 className="d-inline-flex align-items-center mb-0">
                Documents<span className="badge bg-danger ms-2">658</span>
              </h5>
              <div className="d-flex align-items-center flex-wrap">
                <div className="dropdown">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-md btn-outline-light d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                   aria-label="Patient actions menu" aria-haspopup="true" aria-expanded="false">
                    <i className="ti ti-sort-descending-2 me-1" />
                    <span className="me-1">Sort By : </span> Newest
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-2">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
                        Newest
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">
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
                      <th className="no-sort">Document Name</th>
                      <th>Date</th>
                      <th className="no-sort" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Laboratory Report</td>
                      <td>17 Jun 2025</td>
                      <td className="text-end">
                        <Link to="#" className="btn btn-icon btn-outline-light">
                          <i className="ti ti-download" />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Lab - Blood Test</td>
                      <td>10 Jun 2025</td>
                      <td className="text-end">
                        <Link to="#" className="btn btn-icon btn-outline-light">
                          <i className="ti ti-download" />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Radiology Report</td>
                      <td>22 May 2025</td>
                      <td className="text-end">
                        <Link to="#" className="btn btn-icon btn-outline-light">
                          <i className="ti ti-download" />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Lab - Hepetatis</td>
                      <td>15 May 2025</td>
                      <td className="text-end">
                        <Link to="#" className="btn btn-icon btn-outline-light">
                          <i className="ti ti-download" />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Operative Report</td>
                      <td>30 Apr 2025</td>
                      <td className="text-end">
                        <Link to="#" className="btn btn-icon btn-outline-light">
                          <i className="ti ti-download" />
                        </Link>
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
        <CommonFooter />
        {/* End Footer */}
      </div>
      {/* ========================
			End Page Content
		========================= */}
      <>
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
                    to="#"
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
        {/* Start view Modal */}
        <div id="view_modal" className="modal fade">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h4 className="text-dark modal-title fw-bold text-truncate">
                  Medical History
                </h4>
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
                <div className="d-flex align-items-center mb-4">
                  <Link to="#" className="avatar flex-shrink-0 bg-primary">
                    <i className="ti ti-history fs-16" />
                  </Link>
                  <div className="ms-2">
                    <div>
                      <h6 className="fw-semibold fs-14 text-truncate mb-1">
                        <Link to="#">Throat Pain</Link>
                      </h6>
                      <p className="fs-13 mb-0">25 Jan 2024, (2yrs ago)</p>
                    </div>
                  </div>
                </div>
                <h6 className="fw-semibold mb-2">Assessment</h6>
                <ol className="ps-3">
                  <li className="mb-2">
                    Applying a cool compress to the forehead or the back of the
                    neck may provide some relief. Avoid using cold water, as it
                    can cause shivering and may increase body temperature.
                  </li>
                  <li className="mb-4">
                    Keep an eye on the person's symptoms and seek medical
                    attention if the fever persists, is very high, or if there
                    are other concerning symptoms such as difficulty breathing,
                    persistent vomiting, or severe headache.
                  </li>
                </ol>
                <h6 className="fw-semibold mb-2">Notes</h6>
                <p className="mb-4">
                  If the fever is accompanied by other worrisome symptoms or if
                  it lasts for more than a few days, it's essential to consult
                  with a healthcare professional. They can provide a proper
                  diagnosis and recommend appropriate treatment.
                </p>
                <div className="p-3 bg-light rounded">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-semibold mb-1 fs-14 text-truncate">
                        X-ray_throat 4356
                      </h6>
                      <p className="fs-13 mb-0 text-truncate line-clamb-2">
                        Size : 21.2 Kb
                      </p>
                    </div>
                    <Link to="#" className="btn btn-icon fs-16">
                      <i className="ti ti-download" />
                    </Link>
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

export default PatientDetailsDocuments;
