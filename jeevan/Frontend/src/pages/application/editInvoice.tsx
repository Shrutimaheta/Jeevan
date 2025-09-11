import { Link } from "react-router-dom"
import CommonFooter from "../../components/common-footer/commonFooter"
import { all_routes } from "../../routes/all_routes"
import { useState } from "react";

const EditInvoice = () => {
     // Add state for quantity
  const [quantity, setQuantity] = useState(10);

  // Increment and decrement handlers
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
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
        <h6 className="mb-0">
          <Link to={all_routes.invoice}>
            <i className="ti ti-arrow-left me-2" />
            Invoice
          </Link>
        </h6>
        <Link to={all_routes.invoiceDetails} className="btn btn-primary">
          <i className="ti ti-eye me-1" />
          Preview
        </Link>
      </div>
      {/* End Page Header */}
      <div className="card mb-0">
        <div className="card-body">
          <h6 className="mb-3">Company Info</h6>
          <form >
            <div className="row justify-content-between align-items-center">
              <div className="col-md-4">
                <div className="bg-light rounded position-relative p-4 text-center mb-3">
                  <i className="ti ti-upload fs-16 mb-2 d-block" />
                  <p className="mb-0">Upload Your Company Logo</p>
                  <input
                    type="file"
                    className="position-absolute top-0 start-0 opacity-0 w-100 h-100"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Invoice Number</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={123456}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={123456}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={123456}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={123456}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={123456}
                  />
                </div>
              </div>
            </div>
            <div className="border-top mt-3 pt-3 mb-3">
              <h6 className="mb-3">Item Details</h6>
              <div className="table-responsive table-nowrap">
                <table className="table border">
                  <thead className="table-dark">
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Unit Price ($)</th>
                      <th>Discount ($)</th>
                      <th>Amount($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="Surgical Gloves"
                          />
                        </div>
                      </td>
                      <td>
                      <div className="custom-increment cart">
                            <div className="d-flex align-items-center border rounded">
                              <button
                                type="button"
                                className="btn btn-icon border-0 px-2 py-1"
                                data-type="minus"
                                data-field=""
                                onClick={handleDecrement}
                                style={{ minWidth: '32px', height: '32px' }}
                              >
                                <i className="ti ti-minus" />
                              </button>
                              <input
                                type="text"
                                id="quantity"
                                name="quantity"
                                className="form-control border-0 text-center flex-grow-1"
                                value={quantity}
                                style={{ minWidth: '60px', maxWidth: '80px' }}
                                readOnly
                              />
                              <button
                                type="button"
                                className="btn btn-icon border-0 px-2 py-1"
                                data-type="plus"
                                data-field=""
                                onClick={handleIncrement}
                                style={{ minWidth: '32px', height: '32px' }}
                              >
                                <i className="ti ti-plus" />
                              </button>
                            </div>
                          </div>
                      </td>
                      <td>
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={45}
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="$10"
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="40.50"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row justify-content-end">
              <div className="col-lg-4">
                <div>
                  <div className="row align-items-center mb-3">
                    <div className="col-6">
                      <h6 className="mb-0 fw-semibold fs-14">Amount</h6>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="40.50"
                      />
                    </div>
                  </div>
                  <div className="row align-items-center mb-3">
                    <div className="col-6 text-dark fw-medium">
                      <h6 className="mb-0 fw-semibold fs-14">Tax (16%)</h6>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="2.43"
                      />
                    </div>
                  </div>
                  <div className="row align-items-center mb-3">
                    <div className="col-6 text-dark fw-medium">
                      <h6 className="mb-0 fw-semibold fs-14">Discount (10%)</h6>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={24}
                      />
                    </div>
                  </div>
                  <div className="row align-items-center mb-3">
                    <div className="col-6 text-dark fw-medium">
                      <h6 className="mb-0 fw-semibold fs-14">
                        Shipping Charge
                      </h6>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={45}
                      />
                    </div>
                  </div>
                  <div className="row align-items-center mb-3">
                    <div className="col-6 text-dark fw-medium">
                      <h6 className="mb-0 fw-semibold fs-14">Total Amount</h6>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="78.21"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Notes</label>
              <textarea className="form-control" rows={4} defaultValue={""} />
            </div>
            <div className="mb-3">
              <label className="form-label">Terms &amp; Conditions</label>
              <textarea className="form-control" rows={4} defaultValue={""} />
            </div>
            <div className="d-flex align-items-center justify-content-center gap-3 border-top pt-3 mt-3">
              <Link to={all_routes.invoiceDetails} className="btn btn-dark">
                <i className="ti ti-eye me-1" />
                Preview
              </Link>
              <button className="btn btn-info" type="submit">
                <i className="ti ti-message-share me-1" />
                Save Invoice
              </button>
              <button className="btn btn-primary" type="button">
                <i className="ti ti-send me-1" />
                Send Invoice
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    {/* End Content */}
    {/* Start Footer */}
   <CommonFooter/>
    {/* End Footer */}
  </div>
  {/* ========================
			End Page Content
		========================= */}
</>

  )
}

export default EditInvoice