import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../../components/image-with-base-path";
import CommonSelect from "../../../../components/common-select/commonSelect";
import { City, Country, Designation, Gender, JobType, StaffType, State } from "../../../../core/json/selectOption";
import CommonDatePicker from "../../../../components/common-date-picker/commonDatePicker";
import { all_routes } from "../../../../routes/all_routes";


const StaffsModal = () => {
  return (
    <>
      {/* Add New Staff */}
      <div className="modal fade" id="add_staff">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="text-dark modal-title fw-bold text-truncate">
                Add New Staff
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
                <ul className="nav nav-tabs nav-item-dark nav-solid-primary mb-3 pb-3 border-bottom border-0 gap-3">
                  <li className="nav-item">
                    <Link
                      className="nav-link rounded btn btn-md active"
                      to="#basic-staff"
                      data-bs-toggle="tab"
                    >
                      Basic Info
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link rounded btn btn-md"
                      to="#salery-staff"
                      data-bs-toggle="tab"
                    >
                      Salary Info
                    </Link>
                  </li>
                </ul>
                <div className="tab-content">
                  {/* Item 1 */}
                  <div className="tab-pane show active" id="basic-staff">
                    {/* start row */}
                    <div className="row row-gap-3">
                      <div className="col-md-12">
                        <div>
                          <label className="form-label">
                            Profile Image
                            <span className="text-danger ms-1">*</span>
                          </label>
                          <div className="d-flex align-items-center flex-wrap gap-3">
                            <div className="flex-shrink-0">
                              <div className="position-relative d-flex align-items-center border rounded">
                                <ImageWithBasePath
                                  src="assets/img/avatars/avatar-39.jpg"
                                  className="avatar avatar-xxl"
                                  alt="staff"
                                />
                              </div>
                            </div>
                            <div className="d-inline-flex flex-column align-items-start">
                              <div className="d-inline-flex align-items-start gap-2">
                                <div className="drag-upload-btn btn btn-dark position-relative mb-2">
                                  <i className="ti ti-arrows-exchange-2 me-1" />
                                  Change Image
                                  <label htmlFor="profileImageInput" className="visually-hidden">Profile Image</label>
                                  <input
                                    type="file"
                                    className="form-control image-sign"
                                    id="profileImageInput"
                                    multiple
                                  />
                                </div>
                                <div>
                                  <Link
                                    to="#"
                                    className="btn btn-light d-flex align-items-center gap-1"
                                  >
                                    {" "}
                                    <i className="ti ti-trash" /> Remove
                                  </Link>
                                </div>
                              </div>
                              <span className="fs-13 text-body">
                                Use JPEG, PNG, or GIF. Best size: 200x200
                                pixels. Keep it under 5MB
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label" htmlFor="staff-id">ID</label>
                          <input type="text" className="form-control" id="staff-id" defaultValue="#SF0002" disabled />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label" htmlFor="staff-name">Name</label>
                          <input type="text" className="form-control" id="staff-name" />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Gender</label>
                          <CommonSelect
                            options={Gender}
                            className="select"
                            defaultValue={Gender[0]}
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">DOB</label>
                          <div className=" w-auto input-group-flat">
                            <CommonDatePicker placeholder="dd/mm/yyyy" />
                          </div>
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Mobile Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Email</label>
                          <input type="email" className="form-control" />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Designation</label>
                          <CommonSelect
                            options={Designation}
                            className="select"
                            defaultValue={Designation[0]}
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Joining Date</label>
                          <div className=" w-auto input-group-flat">
                            <CommonDatePicker placeholder="dd/mm/yyyy" />
                          </div>
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Staff Type</label>
                          <CommonSelect
                            options={StaffType}
                            className="select"
                            defaultValue={StaffType[0]}
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Job Type</label>
                          <CommonSelect
                            options={JobType}
                            className="select"
                            defaultValue={JobType[0]}
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-4">
                        <div>
                          <label className="form-label">Address Line 1</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-4">
                        <div>
                          <label className="form-label">Address Line 2</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-4">
                        <div>
                          <label className="form-label">City</label>
                          <CommonSelect
                            options={City}
                            className="select"
                            defaultValue={City[0]}
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-4">
                        <div>
                          <label className="form-label">State</label>
                          <CommonSelect
                            options={State}
                            className="select"
                            defaultValue={State[0]}
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-4">
                        <div>
                          <label className="form-label">Country</label>
                          <CommonSelect
                            options={Country}
                            className="select"
                            defaultValue={Country[0]}
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-4">
                        <div>
                          <label className="form-label">Pin Code</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-12">
                        <div className="form-check form-switch d-flex align-items-center justify-content-between gap-2 ps-0">
                          <label className="form-label mb-0" htmlFor="status">
                            Status
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="status"
                            aria-checked="false"
                          />
                        </div>
                      </div>
                      {/* end col */}
                    </div>
                    {/* end row */}
                  </div>
                  {/* Item 2 */}
                  <div className="tab-pane" id="salery-staff">
                    <div>
                      {/* start row */}
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <div>
                            <label className="form-label">Net Salary</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                      </div>
                      {/* end row */}
                      <h6 className="mb-3">Earnings</h6>
                      {/* start row */}
                      <div className="row row-gap-3 mb-3">
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Basic</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">DA</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">HRA</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Conveyance</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Allowance</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">
                              Medical Allowance
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Others</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                      </div>
                      {/* end row */}
                      <h6 className="mb-3">Deductions</h6>
                      {/* start row */}
                      <div className="row row-gap-3">
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">TDS</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">PF</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Leave</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Prof . Tax</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Labour Welfare</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Others</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                      </div>
                      {/* end row */}
                    </div>
                  </div>
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
      {/* Add Todo end */}
      {/* Edit Staff */}
      <div className="modal fade" id="edit_staff">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="text-dark modal-title fw-bold text-truncate">
                Edit Staff
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
                <ul className="nav nav-tabs nav-item-dark nav-solid-primary mb-3 pb-3 border-bottom border-0 gap-3">
                  <li className="nav-item">
                    <Link
                      className="nav-link rounded btn btn-md active"
                      to="#basic-editstaff"
                      data-bs-toggle="tab"
                    >
                      Basic Info
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link rounded btn btn-md"
                      to="#salery-editstaff"
                      data-bs-toggle="tab"
                    >
                      Salary Info
                    </Link>
                  </li>
                </ul>
                <div className="tab-content">
                  {/* Item 1 */}
                  <div className="tab-pane show active" id="basic-editstaff">
                    {/* start row */}
                    <div className="row row-gap-3">
                      <div className="col-md-12">
                        <div>
                          <label className="form-label">
                            Profile Image
                            <span className="text-danger ms-1">*</span>
                          </label>
                          <div className="d-flex align-items-center flex-wrap gap-3">
                            <div className="flex-shrink-0">
                              <div className="position-relative d-flex align-items-center border rounded">
                                <ImageWithBasePath
                                  src="assets/img/avatars/avatar-39.jpg"
                                  className="avatar avatar-xxl"
                                  alt="staff"
                                />
                              </div>
                            </div>
                            <div className="d-inline-flex flex-column align-items-start">
                              <div className="d-inline-flex align-items-start gap-2">
                                <div className="drag-upload-btn btn btn-dark position-relative mb-2">
                                  <i className="ti ti-arrows-exchange-2 me-1" />
                                  Change Image
                                  <input
                                    type="file"
                                    className="form-control image-sign"
                                    multiple
                                  />
                                </div>
                                <div>
                                  <Link
                                    to="#"
                                    className="btn btn-light d-flex align-items-center gap-1"
                                  >
                                    {" "}
                                    <i className="ti ti-trash" /> Remove
                                  </Link>
                                </div>
                              </div>
                              <span className="fs-13 text-body">
                                Use JPEG, PNG, or GIF. Best size: 200x200
                                pixels. Keep it under 5MB
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">ID</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="#SF0025"
                            disabled
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="Benjamin Clark"
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Gender</label>
                          <CommonSelect
                            options={Gender}
                            className="select"
                            defaultValue={Gender[1]}
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">DOB</label>
                          <div className=" w-auto input-group-flat">
                            <CommonDatePicker placeholder="dd/mm/yyyy" />
                          </div>
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Mobile Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            defaultValue="(819) 277-3810"
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            defaultValue="benjamin@example.com"
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Designation</label>
                          <CommonSelect
                            options={Designation}
                            className="select"
                            defaultValue={Designation[1]}
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Joining Date</label>
                          <div className=" w-auto input-group-flat">
                            <CommonDatePicker placeholder="dd/mm/yyyy" />
                          </div>
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Staff Type</label>
                          <CommonSelect
                            options={StaffType}
                            className="select"
                            defaultValue={StaffType[1]}
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-6">
                        <div>
                          <label className="form-label">Job Type</label>
                          <CommonSelect
                            options={JobType}
                            className="select"
                            defaultValue={JobType[1]}
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-4">
                        <div>
                          <label className="form-label">Address Line 1</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="10 Elizabeth town Plaza"
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-4">
                        <div>
                          <label className="form-label">Address Line 2</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="Downer’s Grove"
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-4">
                        <div>
                          <label className="form-label">City</label>
                          <CommonSelect
                            options={City}
                            className="select"
                            defaultValue={City[1]}
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-4">
                        <div>
                          <label className="form-label">State</label>
                          <CommonSelect
                            options={State}
                            className="select"
                            defaultValue={State[1]}
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-4">
                        <div>
                          <label className="form-label">Country</label>
                          <CommonSelect
                            options={Country}
                            className="select"
                            defaultValue={Country[1]}
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-4">
                        <div>
                          <label className="form-label">Pin Code</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="07202"
                          />
                        </div>
                      </div>
                      {/* end col */}
                      <div className="col-md-12">
                        <div className="form-check form-switch d-flex align-items-center justify-content-between gap-2 ps-0">
                          <label
                            className="form-label mb-0"
                            htmlFor="statusone"
                          >
                            Status
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="statusone"
                            defaultChecked
                            aria-checked="true"
                          />
                        </div>
                      </div>
                      {/* end col */}
                    </div>
                    {/* end row */}
                  </div>
                  {/* Item 2 */}
                  <div className="tab-pane" id="salery-editstaff">
                    <div>
                      {/* start row */}
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <div>
                            <label className="form-label">Net Salary</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                      </div>
                      {/* end row */}
                      <h6 className="mb-3">Earnings</h6>
                      {/* start row */}
                      <div className="row row-gap-3 mb-3">
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Basic</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">DA</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">HRA</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Conveyance</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Allowance</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">
                              Medical Allowance
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Others</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                      </div>
                      {/* end row */}
                      <h6 className="mb-3">Deductions</h6>
                      {/* start row */}
                      <div className="row row-gap-3">
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">TDS</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">PF</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Leave</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Prof . Tax</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Labour Welfare</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-3">
                          <div>
                            <label className="form-label">Others</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        {/* end col */}
                      </div>
                      {/* end row */}
                    </div>
                  </div>
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
      {/* Edit end */}
      {/* Staff Deatils */}
      <div className="modal fade" id="view_staff">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="text-dark modal-title fw-bold text-truncate">
                Staff Details
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
                <div className="d-flex align-items-center mb-4">
                  <Link to="#" className="avatar avatar-xxl flex-shrink-0">
                    <ImageWithBasePath
                      src="assets/img/avatars/avatar-28.jpg"
                      className="rounded"
                      alt="staff"
                    />
                  </Link>
                  <div className="ms-3">
                    <div>
                      <span className="badge badge-sm badge-soft-pink mb-2">
                        #SF0025
                      </span>
                      <h6 className="fw-semibold text-truncate mb-1">
                        <Link to="#">Benjamin Clark</Link>
                      </h6>
                      <p className="fs-13 mb-0">Date Joined : 17 Jun 2024</p>
                    </div>
                  </div>
                </div>
                <ul className="nav nav-tabs nav-item-dark nav-solid-primary mb-3 gap-3">
                  <li className="nav-item">
                    <Link
                      className="nav-link rounded btn btn-md active"
                      to="#basic-viewstaff"
                      data-bs-toggle="tab"
                    >
                      Basic Info
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link rounded btn btn-md"
                      to="#salery-viewstaff"
                      data-bs-toggle="tab"
                    >
                      Salary Info
                    </Link>
                  </li>
                </ul>
                <div className="tab-content">
                  {/* Item 1 */}
                  <div className="tab-pane show active" id="basic-viewstaff">
                    <h6 className="mb-3">Basic Information</h6>
                    <div className="row row-gap-2">
                      <div className="col-6 col-md-4">
                        <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                          Job Type
                        </h6>
                        <p className="fs-13 mb-0 text-truncate">Full Time</p>
                      </div>
                      <div className="col-6 col-md-4">
                        <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                          Mobile
                        </h6>
                        <p className="fs-13 mb-0 text-truncate">
                          +1 48902 78194
                        </p>
                      </div>
                      <div className="col-6 col-md-4">
                        <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                          Email
                        </h6>
                        <p className="fs-13 mb-0 text-truncate">
                          benjamin@example.com
                        </p>
                      </div>
                      <div className="col-6 col-md-4">
                        <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                          Gender
                        </h6>
                        <p className="fs-13 mb-0 text-truncate">Male</p>
                      </div>
                      <div className="col-6 col-md-4">
                        <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                          DOB
                        </h6>
                        <p className="fs-13 mb-0 text-truncate">01 Jan 1995</p>
                      </div>
                      <div className="col-6 col-md-4">
                        <h6 className="fs-14 fw-semibold mb-1 text-truncate">
                          Staff Type
                        </h6>
                        <p className="fs-13 mb-0 text-truncate">Permanent</p>
                      </div>
                      <div className="col-12 col-md-12">
                        <h6 className="fw-semibold fs-14 mb-2">Address</h6>
                        <p className="mb-0 fs13">
                          10 Elizabethtown Plaza, Downers Grove, Elizabeth
                          UK07202{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div className="tab-pane" id="salery-viewstaff">
                    {/* table start */}
                    <div className="table-responsive table-nowrap">
                      <table className="table mb-0 border">
                        <thead>
                          <tr>
                            <th className="no-sort">Transaction ID</th>
                            <th className="no-sort">Amount</th>
                            <th className="no-sort">Credit On</th>
                            <th className="no-sort">Salary For</th>
                            <th className="no-sort" />
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <Link to="#">#TN578193</Link>
                            </td>
                            <td>$18600</td>
                            <td>16 Feb 2025</td>
                            <td>Jan 2025</td>
                            <td className="text-end">
                              <Link
                                to="#"
                                className="btn btn-icon btn-outline-light"
                                data-bs-toggle="dropdown"
                                aria-label="more options"
                              >
                                <i className="ti ti-dots-vertical" aria-hidden="true" />
                              </Link>
                              <ul className="dropdown-menu p-2">
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-eye me-1" />
                                    View Details
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-edit me-1" />
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-trash me-1" />
                                    Delete
                                  </Link>
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="#">#TN578192</Link>
                            </td>
                            <td>$18600</td>
                            <td>18 Jan 2025</td>
                            <td>Dec 2024</td>
                            <td className="text-end">
                              <Link
                                to="#"
                                className="btn btn-icon btn-outline-light"
                                data-bs-toggle="dropdown"
                                aria-label="more options"
                              >
                                <i className="ti ti-dots-vertical" aria-hidden="true" />
                              </Link>
                              <ul className="dropdown-menu p-2">
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-eye me-1" />
                                    View Details
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-edit me-1" />
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-trash me-1" />
                                    Delete
                                  </Link>
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="#">#TN578190</Link>
                            </td>
                            <td>$18600</td>
                            <td>15 Dec 2024</td>
                            <td>Nov 2024</td>
                            <td className="text-end">
                              <Link
                                to="#"
                                className="btn btn-icon btn-outline-light"
                                data-bs-toggle="dropdown"
                                aria-label="more options"
                              >
                                <i className="ti ti-dots-vertical" aria-hidden="true" />
                              </Link>
                              <ul className="dropdown-menu p-2">
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-eye me-1" />
                                    View Details
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-edit me-1" />
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-trash me-1" />
                                    Delete
                                  </Link>
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="#">#TN578189</Link>
                            </td>
                            <td>$18600</td>
                            <td>17 Nov 2024</td>
                            <td> Oct 2024</td>
                            <td className="text-end">
                              <Link
                                to="#"
                                className="btn btn-icon btn-outline-light"
                                data-bs-toggle="dropdown"
                                aria-label="more options"
                              >
                                <i className="ti ti-dots-vertical" aria-hidden="true" />
                              </Link>
                              <ul className="dropdown-menu p-2">
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-eye me-1" />
                                    View Details
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-edit me-1" />
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-trash me-1" />
                                    Delete
                                  </Link>
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="#">#TN578188</Link>
                            </td>
                            <td>$18600</td>
                            <td>15 Oct 2024</td>
                            <td>Sep 2024</td>
                            <td className="text-end">
                              <Link
                                to="#"
                                className="btn btn-icon btn-outline-light"
                                data-bs-toggle="dropdown"
                                aria-label="more options"
                              >
                                <i className="ti ti-dots-vertical" aria-hidden="true" />
                              </Link>
                              <ul className="dropdown-menu p-2">
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-eye me-1" />
                                    View Details
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-edit me-1" />
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-trash me-1" />
                                    Delete
                                  </Link>
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="#">#TN578187</Link>
                            </td>
                            <td>$18600</td>
                            <td>18 Sep 2024</td>
                            <td>Aug 2024</td>
                            <td className="text-end">
                              <Link
                                to="#"
                                className="btn btn-icon btn-outline-light"
                                data-bs-toggle="dropdown"
                                aria-label="more options"
                              >
                                <i className="ti ti-dots-vertical" aria-hidden="true" />
                              </Link>
                              <ul className="dropdown-menu p-2">
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-eye me-1" />
                                    View Details
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-edit me-1" />
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-trash me-1" />
                                    Delete
                                  </Link>
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="#">#TN578186</Link>
                            </td>
                            <td>$18600</td>
                            <td>15 Aug 2024</td>
                            <td>Jul 2024</td>
                            <td className="text-end">
                              <Link
                                to="#"
                                className="btn btn-icon btn-outline-light"
                                data-bs-toggle="dropdown"
                                aria-label="more options"
                              >
                                <i className="ti ti-dots-vertical" aria-hidden="true" />
                              </Link>
                              <ul className="dropdown-menu p-2">
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-eye me-1" />
                                    View Details
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-edit me-1" />
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-trash me-1" />
                                    Delete
                                  </Link>
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="#">#TN578185</Link>
                            </td>
                            <td>$18600</td>
                            <td>16 Jul 2024</td>
                            <td>Jun 2024</td>
                            <td className="text-end">
                              <Link
                                to="#"
                                className="btn btn-icon btn-outline-light"
                                data-bs-toggle="dropdown"
                                aria-label="more options"
                              >
                                <i className="ti ti-dots-vertical" aria-hidden="true" />
                              </Link>
                              <ul className="dropdown-menu p-2">
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-eye me-1" />
                                    View Details
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
                                    <i className="ti ti-edit me-1" />
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="dropdown-item d-flex align-items-center"
                                  >
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
                    {/* table start */}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Edit end */}
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
                <Link to={all_routes.staff} className="btn btn-danger w-100">
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

export default StaffsModal;
