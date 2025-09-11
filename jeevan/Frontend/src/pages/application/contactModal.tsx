
import { Link } from 'react-router-dom'
import { all_routes } from "../../routes/all_routes"

const ContactModal = () => {
  return (
    <>
  {/* Add Contact */}
  <div className="modal fade" id="add_modal">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">New Contact</h5>
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
              <label className="form-label" htmlFor="contact-name">
                Name<span className="text-danger"> *</span>
              </label>
              <input type="text" className="form-control" id="contact-name" />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="contact-phone">
                Phone Number<span className="text-danger"> *</span>
              </label>
              <input type="text" className="form-control" id="contact-phone" />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="contact-email">
                Email Address<span className="text-danger"> *</span>
              </label>
              <input type="text" className="form-control" id="contact-email" />
            </div>
            <div>
              <label className="form-label" htmlFor="contact-description">Description</label>
              <textarea rows={4} className="form-control" id="contact-description" defaultValue={""} />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-light me-2"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* Add Contact end */}
  {/* Edit Contact */}
  <div className="modal fade" id="edit_modal">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Contact</h5>
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
                Name<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue="Melinda Allman"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Phone Number<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue="+41 45879 2548"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Email Address<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue="melindaallaman@example.com"
              />
            </div>
            <div>
              <label className="form-label">Description</label>
              <textarea
                rows={4}
                className="form-control"
                defaultValue={
                  "User friendly design makes it easy to learn and navigate, even for those new to digital records."
                }
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-light me-2"
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
  {/* Edit Contact end */}
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
          <p className="mb-3">Are you sure you want to delete?</p>
          <div className="d-flex justify-content-center gap-2">
            <Link
              to="#"
              className="btn btn-outline-light w-100"
              data-bs-dismiss="modal"
            >
              Cancel
            </Link>
            <Link to={all_routes.contacts} className="btn btn-danger w-100">
              Yes, Delete
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Modal  */}
</>

  )
}

export default ContactModal