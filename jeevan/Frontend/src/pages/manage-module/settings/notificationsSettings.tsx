import { Link } from "react-router-dom"
import CommonFooter from "../../../components/common-footer/commonFooter"
import { all_routes } from "../../../routes/all_routes"
import SettingsTabs from "./SettingsTabs"


const NotificationsSettings = () => {
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
                <li className="breadcrumb-item active">Notifications</li>
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
              <h5 className="mb-0 pt-2">Notifications</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive table-nowrap">
                <table className="table border mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="w-75">General Notifications</th>
                      <th className="text-grey fw-regular">Push</th>
                      <th className="text-grey fw-regular">Email</th>
                      <th className="text-grey fw-regular">SMS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-0">Email Notifications</td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0">Appointment Alerts</td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0">Subscription Alerts</td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0">Security Alerts</td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0">Device Login Alerts</td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td className="border-0">
                        <div className="form-check form-switch p-0 d-flex align-items-center">
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>{" "}
              {/* end table */}
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

export default NotificationsSettings