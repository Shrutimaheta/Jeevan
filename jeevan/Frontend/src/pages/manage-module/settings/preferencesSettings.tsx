import { Link } from "react-router-dom"
import CommonFooter from "../../../components/common-footer/commonFooter"
import { all_routes } from "../../../routes/all_routes"
import SettingsTabs from "./SettingsTabs"


const PreferencesSettings = () => {
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
                <li className="breadcrumb-item active">Preferences</li>
              </ol>
            </div>
          </div>
        </div>
        {/* End Page Header */}
        {/* Start Tabs */}
       <SettingsTabs/>
        {/* End Tabs */}
        {/* Start form */}
        <form>
          <div className="card mb-0">
            <div className="card-header border-0 pb-1">
              <h5 className="mb-0 pt-2">Preferences</h5>
            </div>
            <div className="card-body">
              {/* start row */}
              <div className="row row-gap-4">
                <div className="col-xxl-4 col-xl-4 col-sm-6">
                  <div className="d-flex justify-content-between align-items-center border rounded bg-light p-3">
                    <h6 className="fw-semibold mb-0 fs-14">Patients</h6>
                    <div className="form-check form-switch m-0 d-flex align-items-center">
                      <input
                        className="form-check-input m-0"
                        type="checkbox"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>{" "}
                {/* end col */}
                <div className="col-xxl-4 col-xl-4 col-sm-6">
                  <div className="d-flex justify-content-between align-items-center border rounded bg-light p-3">
                    <h6 className="fw-semibold mb-0 fs-14">Doctors</h6>
                    <div className="form-check form-switch m-0 d-flex align-items-center">
                      <input
                        className="form-check-input m-0"
                        type="checkbox"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>{" "}
                {/* end col */}
                <div className="col-xxl-4 col-xl-4 col-sm-6">
                  <div className="d-flex justify-content-between align-items-center border rounded bg-light p-3">
                    <h6 className="fw-semibold mb-0 fs-14">Visits</h6>
                    <div className="form-check form-switch m-0 d-flex align-items-center">
                      <input
                        className="form-check-input m-0"
                        type="checkbox"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>{" "}
                {/* end col */}
                <div className="col-xxl-4 col-xl-4 col-sm-6">
                  <div className="d-flex justify-content-between align-items-center border rounded bg-light p-3">
                    <h6 className="fw-semibold mb-0 fs-14">Appointments</h6>
                    <div className="form-check form-switch m-0 d-flex align-items-center">
                      <input
                        className="form-check-input m-0"
                        type="checkbox"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>{" "}
                {/* end col */}
                <div className="col-xxl-4 col-xl-4 col-sm-6">
                  <div className="d-flex justify-content-between align-items-center border rounded bg-light p-3">
                    <h6 className="fw-semibold mb-0 fs-14">Laboratory</h6>
                    <div className="form-check form-switch m-0 d-flex align-items-center">
                      <input
                        className="form-check-input m-0"
                        type="checkbox"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>{" "}
                {/* end col */}
                <div className="col-xxl-4 col-xl-4 col-sm-6">
                  <div className="d-flex justify-content-between align-items-center border rounded bg-light p-3">
                    <h6 className="fw-semibold mb-0 fs-14">Lab Results</h6>
                    <div className="form-check form-switch m-0 d-flex align-items-center">
                      <input
                        className="form-check-input m-0"
                        type="checkbox"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>{" "}
                {/* end col */}
                <div className="col-xxl-4 col-xl-4 col-sm-6">
                  <div className="d-flex justify-content-between align-items-center border rounded bg-light p-3">
                    <h6 className="fw-semibold mb-0 fs-14">Medical Records</h6>
                    <div className="form-check form-switch m-0 d-flex align-items-center">
                      <input
                        className="form-check-input m-0"
                        type="checkbox"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>{" "}
                {/* end col */}
                <div className="col-xxl-4 col-xl-4 col-sm-6">
                  <div className="d-flex justify-content-between align-items-center border rounded bg-light p-3">
                    <h6 className="fw-semibold mb-0 fs-14">Pharmacy</h6>
                    <div className="form-check form-switch m-0 d-flex align-items-center">
                      <input
                        className="form-check-input m-0"
                        type="checkbox"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>{" "}
                {/* end col */}
                <div className="col-xxl-4 col-xl-4 col-sm-6">
                  <div className="d-flex justify-content-between align-items-center border rounded bg-light p-3">
                    <h6 className="fw-semibold mb-0 fs-14">Staffs</h6>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input m-0"
                        type="checkbox"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>{" "}
                {/* end col */}
              </div>
              {/* end row */}
              <div className="d-flex align-items-center justify-content-end gap-2 border-top mt-4 pt-3">
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
            </div>
          </div>
        </form>
        {/* End form */}
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

export default PreferencesSettings