import { Link } from "react-router-dom";
import CommonFooter from "../../../components/common-footer/commonFooter";
import { all_routes } from "../../../routes/all_routes";
import ImageWithBasePath from "../../../components/image-with-base-path";

const ManageInvoicesDetails = () => {
  return (
    <>
      {/* ========================
              Start Page Content
          ========================= */}
      <div className="page-wrapper">
        {/* Start Content */}
        <div className="content">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Page Header */}
              <div className="d-flex align-items-center justify-content-between gap-2 mb-4 flex-wrap">
                <h6 className="mb-0">
                  <Link to={all_routes.manageInvoices}>
                    <i className="ti ti-arrow-left me-2" />
                    Invoices
                  </Link>
                </h6>
                <div className="d-flex align-items-center ">
                  <button
                    className="btn btn-outline-light bg-white me-2"
                    type="button"
                  >
                    <i className="ti ti-file-download me-1" />
                    Download PDF
                  </button>
                  <button
                    className="btn btn-outline-light bg-white"
                    type="button"
                  >
                    <i className="ti ti-printer me-1" />
                    Print
                  </button>
                </div>
              </div>
              {/* End Page Header */}
              <div className="card mb-0">
                <div className="card-body">
                  <div className="bg-light rounded p-3 mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div >
                        <ImageWithBasePath
                          src="assets/img/logo-dark.svg"
                          className="invoice-logo"
                          alt="logo"
                        />
                        <ImageWithBasePath
                          src="assets/img/logo.svg"
                          className="invoice-logo-white"
                          alt="logo"
                        />
                      </div>
                      <div className="text-end">
                        <span className="badge bg-success mb-1">Paid</span>
                        <h6 className="mb-0">#INV5465</h6>
                      </div>
                    </div>
                    <div className="row align-items-center gy-4">
                      <div className="col-lg-5">
                        <div>
                          <h6 className="mb-2 fs-16 fw-bold">Invoice From</h6>
                          <h6 className="fs-14 mb-2">Dreams Medical Center</h6>
                          <p className="mb-1">
                            15 Hodges Mews, High Wycombe HP12 3JL, <br /> United
                            Kingdom
                          </p>
                          <p className="mb-0">Phone : +1 45659 96566</p>
                        </div>
                      </div>{" "}
                      {/* end col */}
                      <div className="col-lg-5">
                        <div>
                          <h6 className="mb-2 fs-16 fw-bold">Bill To</h6>
                          <h6 className="fs-14 mb-2">Andrew Fletcher</h6>
                          <p className="mb-1">
                            1147 Rohan Drive Suite, Burlington, VT / 8202115{" "}
                            <br /> United Kingdom
                          </p>
                          <p className="mb-0">Phone : +1 36254 56589</p>
                        </div>
                      </div>{" "}
                      {/* end col */}
                      <div className="col-lg-2">
                        <div>
                          <div className="text-end">
                            <ImageWithBasePath
                              src="assets/img/icons/qr-code.svg"
                              alt="qr-code"
                            />
                          </div>
                        </div>
                      </div>{" "}
                      {/* end col */}
                    </div>
                  </div>
                  <h6 className="mb-3">Items Details</h6>
                  <div className="table-responsive table-nowrap mb-4">
                    <table className="table border">
                      <thead className="table-dark">
                        <tr>
                          <th>#</th>
                          <th>Item Details</th>
                          <th>Quantity</th>
                          <th>Rate</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Syringes &amp; Needles</td>
                          <td>2</td>
                          <td>$200.00</td>
                          <td>$396.00</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Face Masks (3-ply/N95)</td>
                          <td>1</td>
                          <td>$350.00</td>
                          <td>$365.75</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Catheters</td>
                          <td>1</td>
                          <td>$399.00</td>
                          <td>$398.90</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Surgical Drapes</td>
                          <td>4</td>
                          <td>$100.00</td>
                          <td>$396.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-xl-7">
                      <div className="mb-3">
                        <h6 className="mb-2">Terms and Conditions</h6>
                        <p className="mb-1">
                          {" "}
                          1. Goods once sold cannot be taken back or exchanged.
                        </p>
                        <p className="mb-1">
                          {" "}
                          2. We are not the manufacturers the company provides
                          warranty
                        </p>
                        <div className="bg-soft-info text-info rounded mt-3 p-3">
                          <p className="mb-0">
                            <span className="fw-semibold">Note :</span> Please
                            ensure payment is made within 7 days of invoice
                            date,
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-5">
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="fs-14 mb-0 fw-semibold">Amount</h6>
                          <h6 className="fs-14 mb-0 fw-semibold">$1,793.12</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="fs-14 mb-0 fw-semibold">CGST (9%)</h6>
                          <h6 className="fs-14 mb-0 fw-semibold">$18</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="fs-14 mb-0 fw-semibold">SGST (9%)</h6>
                          <h6 className="fs-14 mb-0 fw-semibold">$18</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="fs-14 mb-0 fw-semibold">
                            Discount (25%)
                          </h6>
                          <h6 className="fs-14 mb-0 fw-semibold text-danger">
                            - $18
                          </h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                          <h6 className="mb-0">Total (USD)</h6>
                          <h6 className="mb-0">$1,972.43</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-end border-top pt-3">
                    <div className="mb-1 signature">
                      <ImageWithBasePath src="assets/img/icons/signature.svg" alt="sign" />
                    </div>
                    <p className="mb-0">Authorized Sign</p>
                  </div>
                </div>
              </div>
            </div>
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
  );
};

export default ManageInvoicesDetails;
