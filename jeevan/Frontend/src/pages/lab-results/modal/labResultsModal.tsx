import { Link } from "react-router-dom";
import { all_routes } from "../../../routes/all_routes";
import ImageWithBasePath from "../../../components/image-with-base-path";

const LabResultsModal = () => {
  return (
    <>
      {/* Start view Modal */}
      <div id="view_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header justify-content-between">
              <h5 className="modal-title">View Report</h5>
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
              <div className="d-flex align-items-center justify-content-between invoice-logo flex-wrap gap-2 mb-4">
                <ImageWithBasePath
                  src="assets/img/logo-dark.svg"
                  className="logo-white"
                  alt="invoice logo"
                />
                <ImageWithBasePath
                  src="assets/img/logo.svg"
                  className="logo-dark"
                  alt="invoice logo"
                />
              </div>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                <div>
                  <h6 className="mb-2">Dream’s Medical Center</h6>
                  <p className="mb-1 text-dark fw-medium">Dr. Sandy Maria</p>
                  <p className="fs-13 mb-0">MD Aerologist. MBBS,MS</p>
                </div>
                <div className="text-lg-end">
                  <p className="mb-1">
                    <span className="text-dark fw-medium">Test Type : </span>CBC
                  </p>
                  <p className="mb-1">
                    <span className="text-dark fw-medium">Collected On: </span>
                    25 Jan 2024, 10:00 AM
                  </p>
                  <p className="mb-0">
                    <span className="text-dark fw-medium">Reported On: </span>25
                    Jan 2024, 11:00 AM
                  </p>
                </div>
              </div>
              <h6 className="mb-2">Patient Details</h6>
              <div className="mb-4 bg-light rounded p-2 d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h6 className="fs-14 fw-medium mb-0">M. Reyan Verol</h6>
                <div className="d-flex align-items-center gap-3">
                  <p className="mb-0">28Y / Male</p>
                  <p className="mb-0">Blood : O+ve</p>
                  <p className="mb-0">Type : Outpatient</p>
                </div>
              </div>
              <h6 className="mb-2">Complete Blood Count(CBC)</h6>
              <div className="table-responsive table-nowrap mb-4">
                <table className="table mb-0 rounded border">
                  <thead className="table-dark">
                    <tr>
                      <th className="text-white">Investigation</th>
                      <th className="text-white">Result</th>
                      <th className="text-white">Reference Value</th>
                      <th className="text-white">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4}>
                        <h6 className="mb-0 fs-14 fw-semibold">
                          Differntial WBC Count
                        </h6>
                      </td>
                    </tr>
                    <tr>
                      <td>Neutrophils</td>
                      <td>75</td>
                      <td>50 - 62</td>
                      <td>%</td>
                    </tr>
                    <tr>
                      <td>Lymphocytes</td>
                      <td>90</td>
                      <td>20 - 40</td>
                      <td>%</td>
                    </tr>
                    <tr>
                      <td>Eosinophils</td>
                      <td>60</td>
                      <td>00 - 06</td>
                      <td>%</td>
                    </tr>
                    <tr>
                      <td>Monocytes</td>
                      <td>60</td>
                      <td>00 - 10</td>
                      <td>%</td>
                    </tr>
                    <tr>
                      <td>Basophils</td>
                      <td>95</td>
                      <td>00 - 02</td>
                      <td>%</td>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        <h6 className="mb-0 fs-14 fw-semibold">
                          Platelet Count
                        </h6>
                      </td>
                    </tr>
                    <tr>
                      <td>Platelet Count</td>
                      <td>150000</td>
                      <td>150000 - 410000</td>
                      <td>cumm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                <div>
                  <ImageWithBasePath
                    src="assets/img/icons/qr-code.svg"
                    alt="qr-code"
                  />
                </div>
                <div className="text-end">
                  <div className="mb-1 signature">
                    <ImageWithBasePath
                      src="assets/img/icons/signature.svg"
                      alt="sign"
                    />
                  </div>
                  <p className="mb-0">Authorized Sign</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End view Modal */}
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
                  className="btn btn-white position-relative w-100 z-1"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Link>
                <Link
                  to={all_routes.labResults}
                  className="btn btn-danger position-relative w-100 z-1"
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
  );
};

export default LabResultsModal;
