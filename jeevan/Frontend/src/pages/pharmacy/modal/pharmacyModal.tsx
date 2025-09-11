import { Link } from "react-router-dom";
import CommonDatePicker from "../../../components/common-date-picker/commonDatePicker";
import { Unit } from "../../../core/json/selectOption";
import CommonSelect from "../../../components/common-select/commonSelect";
import { all_routes } from "../../../routes/all_routes";

const PharmacyModal = () => {
  return (
    <>
      {/* Start view Modal */}
      <div id="add_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header justify-content-between">
              <h5 className="modal-title">Add New Product</h5>
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
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="pharmacy-id">ID</label>
                      <input type="text" className="form-control" id="pharmacy-id" defaultValue="#PR00011" disabled />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="pharmacy-name">Name</label>
                      <input type="text" className="form-control" id="pharmacy-name" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="pharmacy-price">Price</label>
                      <input type="text" className="form-control" id="pharmacy-price" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="pharmacy-offer-price">Offer Price</label>
                      <input type="text" className="form-control" id="pharmacy-offer-price" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Purchase Date</label>
                      <div className=" w-auto input-group-flat">
                        <CommonDatePicker placeholder="dd/mm/yyyy" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Expire Date</label>
                      <div className=" w-auto input-group-flat">
                        <CommonDatePicker placeholder="dd/mm/yyyy" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Unit</label>
                      <CommonSelect
                        options={Unit}
                        className="select"
                        defaultValue={Unit[0]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Stock</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div>
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center gap-1">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* End view Modal */}
      {/* Start view Modal */}
      <div id="edit_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header justify-content-between">
              <h5 className="modal-title">Edit Product</h5>
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
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">ID</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="#PR00011"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Acetaminophen"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="$150"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Offer Price</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="$130"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Purchase Date</label>
                      <div className=" w-auto input-group-flat">
                        <CommonDatePicker placeholder="dd/mm/yyyy" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Expire Date</label>
                      <div className=" w-auto input-group-flat">
                        <CommonDatePicker placeholder="dd/mm/yyyy" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Unit</label>
                      <CommonSelect
                        options={Unit}
                        className="select"
                        defaultValue={Unit[1]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Stock</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={400}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        defaultValue={"Prevents heart attacks and strokes"}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="form-label mb-0">Status</label>
                      <label className="d-flex align-items-center justify-content-xl-end form-switch">
                        <input
                          className="form-check-input m-0 me-2"
                          type="checkbox"
                          defaultChecked
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center gap-1">
                <button
                  type="button"
                  className="btn btn-outline-light"
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
      {/* End view Modal */}
      {/* Start view Modal */}
      <div id="view_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header justify-content-between">
              <h5 className="modal-title">Product Detail</h5>
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
              <h6 className="mb-2">Basic Information</h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-2">
                    <h6 className="fs-14 fw-semibold mb-1">Name</h6>
                    <p className="mb-0">Acetaminophen 20mg</p>
                  </div>
                  <div className="mb-2">
                    <h6 className="fs-14 fw-semibold mb-1">Price</h6>
                    <p className="mb-0">$400 (20% Offer)</p>
                  </div>
                  <div className="mb-2">
                    <h6 className="fs-14 fw-semibold mb-1">Purchased Date</h6>
                    <p className="mb-0">17 Jun 2025</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-2">
                    <h6 className="fs-14 fw-semibold mb-1">Expiry Date</h6>
                    <p className="mb-0">22 Jun 2025</p>
                  </div>
                  <div className="mb-2">
                    <h6 className="fs-14 fw-semibold mb-1">Stock</h6>
                    <p className="mb-0">200</p>
                  </div>
                  <div className="mb-2">
                    <h6 className="fs-14 fw-semibold mb-1">Status</h6>
                    <span className="badge badge-soft-success">In Stock</span>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <h6 className="mb-2">Description</h6>
                <p className="mb-0">
                  Provide detailed instructions on how to use prescribed
                  medications. Include dosage, frequency, and any specific
                  application guidelines.
                </p>
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
                  className="btn btn-white position-relative z-1 w-100"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Link>
                <Link
                  to={all_routes.pharmacy}
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
  );
};

export default PharmacyModal;
