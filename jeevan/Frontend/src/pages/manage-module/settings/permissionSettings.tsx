import { Link } from "react-router-dom";
import CommonFooter from "../../../components/common-footer/commonFooter";
import { all_routes } from "../../../routes/all_routes";
import SettingsTabs from "./SettingsTabs";

const PermissionSettings = () => {
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
                  <li className="breadcrumb-item active">Permissions</li>
                </ol>
              </div>
            </div>
          </div>
          {/* End Page Header */}
          {/* Start Tabs */}
        <SettingsTabs/>
          {/* End Tabs */}
          {/* Item */}
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between gap-2">
              <h5 className="mb-0">Main</h5>
              <div className="d-flex align-items-center gap-2">
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  id="select-all"
                />
                <label htmlFor="select-all">Allow All</label>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive table-nowrap">
                <table className="table border mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="w-50">Module</th>
                      <th>Create</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      <th>View</th>
                      <th>Allow All</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Patients</td>
                      <td>
                        <div className="form-check form-check-md">
                          <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Doctors</td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Visits</td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Requests</td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Appointments</td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Laboratory</td>
                      <td>
                        <div className="form-check form-check-md">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Messages</td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Contacts</td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Notifications</td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Item */}
          <div className="card select-group2">
            <div className="card-header d-flex align-items-center justify-content-between gap-2">
              <h5 className="mb-0">Medical</h5>
              <div className="d-flex align-items-center gap-2">
                <input
                  className="form-check-input selectall2 mt-0"
                  type="checkbox"
                  id="allow-02"
                />
                <label htmlFor="allow-02">Allow All</label>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive table-nowrap">
                <table className="table border mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="w-50">Module</th>
                      <th>Create</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      <th>View</th>
                      <th>Allow All</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Lab Results</td>
                      <td>
                        <div className="form-check2">
                          <input
                            className="form-check-input form-check-md2 mt-0"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check2">
                          <input
                            className="form-check-input form-check-md2"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check2">
                          <input
                            className="form-check-input form-check-md2"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check2">
                          <input
                            className="form-check-input form-check-md2"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check2">
                          <input
                            className="form-check-input form-check-md2"
                            type="checkbox"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Medical Records</td>
                      <td>
                        <div className="form-check2">
                          <input
                            className="form-check-input form-check-md2"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md2"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md2"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md2"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md2"
                            type="checkbox"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>{" "}
            {/* end card body */}
          </div>{" "}
          {/* end card */}
          {/* Item */}
          <div className="card mb-0 select-group3">
            <div className="card-header d-flex align-items-center justify-content-between gap-2">
              <h5 className="mb-0">Manage</h5>
              <div className="d-flex align-items-center gap-2">
                <input
                  className="form-check-input selectall3 mt-0"
                  type="checkbox"
                  id="allow-01"
                />
                <label htmlFor="allow-01">Allow All</label>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive table-nowrap">
                <table className="table border mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="w-50">Module</th>
                      <th>Create</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      <th>View</th>
                      <th>Allow All</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Pharmacy</td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-check-md3">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Staffs</td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Settings</td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input form-check-md3"
                            type="checkbox"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>{" "}
            {/* end card body */}
          </div>{" "}
          {/* end card */}
          <div className="d-flex align-items-center justify-content-end gap-2 border-top mt-4 pt-3">
            <Link to="" className="btn btn-white">
              {" "}
              Cancel
            </Link>
            <Link to="" className="btn btn-primary">
              {" "}
              Save Changes
            </Link>
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

export default PermissionSettings;
