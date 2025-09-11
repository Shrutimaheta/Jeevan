import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import ImageWithBasePath from "../../components/image-with-base-path";
import { all_routes } from "../../routes/all_routes";

const FileManager = () => {
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
              <h4 className="mb-1">File Manager</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Applications</Link>
                  </li>
                  <li className="breadcrumb-item active">File Manager</li>
                </ol>
              </div>
            </div>
            <div className="input-group w-auto input-group-flat">
              <span className="input-group-text">
                <i className="ti ti-search" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search Keyword"
              />
            </div>
          </div>
          {/* End Page Header */}
          <div className="card mb-0">
            <div className="card-body p-0">
              {/* start row */}
              <div className="row g-0">
                {/* Start Sidebar */}
                <div className="col-xl-3">
                  <div className="border-end p-4 h-100">
                    <div>
                      <div className="border-bottom pb-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center overflow-hidden">
                            <span className="avatar flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-01.jpg"
                                alt="img"
                                className="rounded-circle"
                              />
                            </span>
                            <div className="overflow-hidden ms-2">
                              <h5 className="text-truncate mb-1">James Hong</h5>
                              <p className="fs-13 text-truncate mb-0">
                                jameshong@example.com
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="#"
                        className="btn btn-primary btn-lg w-100 mb-3"
                        data-bs-toggle="modal"
                        data-bs-target="#add_new"
                      >
                        <i className="ti ti-square-rounded-plus me-1" />
                        Create New{" "}
                      </Link>
                      <div className="files-list nav d-block mb-3">
                        <Link
                          to="#"
                          className="d-flex align-items-center fw-medium bg-light rounded text-primary p-2 active"
                        >
                          <i className="ti ti-folder-up me-2" />
                          All Folder / Files
                        </Link>
                        <Link
                          to="#"
                          className="d-flex align-items-center fw-medium p-2"
                        >
                          <i className="ti ti-star me-2" />
                          Drive
                        </Link>
                        <Link
                          to="#"
                          className="d-flex align-items-center fw-medium p-2"
                        >
                          <i className="ti ti-octahedron me-2" />
                          Dropbox
                        </Link>
                        <Link
                          to="#"
                          className="d-flex align-items-center fw-medium p-2"
                        >
                          <i className="ti ti-share-2 me-2" />
                          Shared with Me
                        </Link>
                        <Link
                          to="#"
                          className="d-flex align-items-center fw-medium p-2"
                        >
                          <i className="ti ti-file me-2" />
                          Document
                        </Link>
                        <Link
                          to="#"
                          className="d-flex align-items-center fw-medium p-2"
                        >
                          <i className="ti ti-clock-hour-11 me-2" />
                          Recent File
                        </Link>
                        <Link
                          to="#"
                          className="d-flex align-items-center fw-medium p-2"
                        >
                          <i className="ti ti-star me-2" />
                          Important
                        </Link>
                        <Link
                          to="#"
                          className="d-flex align-items-center fw-medium p-2"
                        >
                          <i className="ti ti-music me-2" />
                          Media
                        </Link>
                      </div>
                      <div className="bg-light p-3 text-center rounded">
                        <div className="mb-3">
                          <ImageWithBasePath
                            src="assets/img/icons/file-manager-bg.svg"
                            alt="file-manager-bg"
                          />
                        </div>
                        <h6 className="mb-2">Upgrade to Pro </h6>
                        <p className="mb-0">
                          Unlock Pro for faster transfers, stronger security,
                          and unlimited storage.
                        </p>
                      </div>
                    </div>
                    {/* end card body */}
                  </div>
                  {/* end card */}
                </div>{" "}
                {/* end col */}
                {/* End Sidebar */}
                <div className="col-xl-9">
                  <div className="p-4">
                    <div className="border-bottom mb-3">
                      <h6 className="mb-3">Quick Access</h6>
                      {/* start row */}
                      <div className="row">
                        <div className="col-md-4 col-sm-6 d-flex">
                          <div className="card flex-fill">
                            <div className="card-body">
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="d-flex align-items-center">
                                  <ImageWithBasePath
                                    src="assets/img/icons/dropbox.svg"
                                    alt="img"
                                  />
                                  <h6 className="ms-2 fs-14 mb-0">Dropbox</h6>
                                </div>
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    className="fs-16"
                                    data-bs-toggle="dropdown"
                                   aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Preview
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Duplicate
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Move
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Invite
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Share Link
                                      </Link>
                                    </li>
                                    <li>
                                      <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        View Details
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Download
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Delete
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="progress progress-sm flex-grow-1 mb-2">
                                <div
                                  className="progress-bar bg-danger rounded"
                                  role="progressbar"
                                  style={{ width: "20%" }}
                                  aria-valuenow={30}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <p className="mb-0">1454 Files</p>
                                <p className="text-dark mb-0">28GB / 300GB</p>
                              </div>
                            </div>
                            {/* end card body */}
                          </div>
                          {/* end card */}
                        </div>{" "}
                        {/* end col */}
                        <div className="col-md-4 col-sm-6 d-flex">
                          <div className="card flex-fill">
                            <div className="card-body">
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="d-flex align-items-center">
                                  <ImageWithBasePath
                                    src="assets/img/icons/drive.svg"
                                    alt="img"
                                  />
                                  <h6 className="ms-2 fs-14 mb-0">
                                    Google Drive
                                  </h6>
                                </div>
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    className="fs-16"
                                    data-bs-toggle="dropdown"
                                   aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Preview
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Duplicate
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Move
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Invite
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Share Link
                                      </Link>
                                    </li>
                                    <li>
                                      <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        View Details
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Download
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Delete
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="progress progress-sm flex-grow-1 mb-2">
                                <div
                                  className="progress-bar bg-pink rounded"
                                  role="progressbar"
                                  style={{ width: "80%" }}
                                  aria-valuenow={30}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <p className="mb-0">200 Files</p>
                                <p className="text-dark mb-0">24GB / 65GB</p>
                              </div>
                            </div>
                            {/* end card body */}
                          </div>
                          {/* end card */}
                        </div>{" "}
                        {/* end col */}
                        <div className="col-md-4 col-sm-6 d-flex">
                          <div className="card flex-fill">
                            <div className="card-body">
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="d-flex align-items-center">
                                  <ImageWithBasePath
                                    src="assets/img/icons/cloud.svg"
                                    alt="img"
                                  />
                                  <h6 className="ms-2 fs-14 mb-0">
                                    Cloud Storage
                                  </h6>
                                </div>
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    className="fs-16"
                                    data-bs-toggle="dropdown"
                                   aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Preview
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Duplicate
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Move
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Invite
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Share Link
                                      </Link>
                                    </li>
                                    <li>
                                      <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        View Details
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Download
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        Delete
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="progress progress-sm flex-grow-1 mb-2">
                                <div
                                  className="progress-bar bg-success rounded"
                                  role="progressbar"
                                  style={{ width: "50%" }}
                                  aria-valuenow={30}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <p className="mb-0">144 Files</p>
                                <p className="text-dark mb-0">54GB / 60GB</p>
                              </div>
                            </div>
                            {/* end card body */}
                          </div>
                          {/* end card */}
                        </div>{" "}
                        {/* end col */}
                      </div>
                      {/* end row */}
                    </div>
                    {/* Start Quick Access */}
                    <div className="border-bottom mb-3">
                      <h6 className="mb-3">Recent Files</h6>
                      {/* start row */}
                      <div className="row justify-content-center">
                        <div className="col-md-3 col-sm-6 d-flex">
                          <div className="card position-relative flex-fill">
                            <div className="card-body">
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <ImageWithBasePath
                                  src="assets/img/icons/file.svg"
                                  alt="img"
                                />
                                <div className="d-flex align-items-center gap-2">
                                  <div className="dropdown">
                                    <Link
                                      to="#"
                                      className="fs-16"
                                      data-bs-toggle="dropdown"
                                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                      <li>
                                        <Link
                                          to="#"
                                          className="dropdown-item rounded-1"
                                        >
                                          <i className="ti ti-eye me-2" />
                                          View Details
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          to="#"
                                          className="dropdown-item rounded-1"
                                        >
                                          <i className="ti ti-download me-2" />
                                          Download
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          to="#"
                                          className="dropdown-item rounded-1"
                                        >
                                          <i className="ti ti-trash-x me-2" />
                                          Delete
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <h6 className="mb-2 fs-14">
                                <Link to="#">Final Change.doc</Link>
                              </h6>
                              <p className="mb-0 fs-13 d-flex align-items-center gap-2 file-line">26 Jul 2025<span className="fs-10">|</span>8MB</p>
                            </div>
                            {/* end card body */}
                          </div>
                          {/* end card */}
                        </div>{" "}
                        {/* end col */}
                        <div className="col-md-3 col-sm-6 d-flex">
                          <div className="card position-relative flex-fill">
                            <div className="card-body">
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <ImageWithBasePath
                                  src="assets/img/icons/pdf-icon.svg"
                                  alt="img"
                                />
                                <div className="d-flex align-items-center gap-2">
                                  <div className="dropdown">
                                    <Link
                                      to="#"
                                      className="fs-16"
                                      data-bs-toggle="dropdown"
                                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                      <li>
                                        <Link
                                          to="#"
                                          className="dropdown-item rounded-1"
                                        >
                                          <i className="ti ti-eye me-2" />
                                          View Details
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          to="#"
                                          className="dropdown-item rounded-1"
                                        >
                                          <i className="ti ti-download me-2" />
                                          Download
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          to="#"
                                          className="dropdown-item rounded-1"
                                        >
                                          <i className="ti ti-trash-x me-2" />
                                          Delete
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <h6 className="mb-2 fs-14">
                                <Link to="#">Marklist.pdf</Link>
                              </h6>
                              <p className="mb-0 fs-13 d-flex align-items-center gap-2 file-line">25 Jul 2025<span className="fs-10">|</span>6MB</p>
                            </div>
                            {/* end card body */}
                          </div>
                          {/* end card */}
                        </div>{" "}
                        {/* end col */}
                        <div className="col-md-3 col-sm-6 d-flex">
                          <div className="card position-relative flex-fill">
                            <div className="card-body">
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <ImageWithBasePath
                                  src="assets/img/icons/image.svg"
                                  alt="img"
                                />
                                <div className="d-flex align-items-center gap-2">
                                  <div className="dropdown">
                                    <Link
                                      to="#"
                                      className="fs-16"
                                      data-bs-toggle="dropdown"
                                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                      <li>
                                        <Link
                                          to="#"
                                          className="dropdown-item rounded-1"
                                        >
                                          <i className="ti ti-eye me-2" />
                                          View Details
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          to="#"
                                          className="dropdown-item rounded-1"
                                        >
                                          <i className="ti ti-download me-2" />
                                          Download
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          to="#"
                                          className="dropdown-item rounded-1"
                                        >
                                          <i className="ti ti-trash-x me-2" />
                                          Delete
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <h6 className="mb-2 fs-14">
                                <Link to="#">Nature.png</Link>
                              </h6>
                              <p className="mb-0 fs-13 d-flex align-items-center gap-2 file-line">24 Jul 2025<span className="fs-10">|</span>8MB</p>
                            </div>
                            {/* end card body */}
                          </div>
                          {/* end card */}
                        </div>{" "}
                        {/* end col */}
                        <div className="col-md-3 col-sm-6 d-flex">
                          <div className="card position-relative flex-fill">
                            <div className="card-body">
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <ImageWithBasePath
                                  src="assets/img/icons/folder-icon.svg"
                                  alt="img"
                                />
                                <div className="d-flex align-items-center gap-2">
                                  <div className="dropdown">
                                    <Link
                                      to="#"
                                      className="fs-16"
                                      data-bs-toggle="dropdown"
                                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                      <li>
                                        <Link
                                          to="#"
                                          className="dropdown-item rounded-1"
                                        >
                                          <i className="ti ti-eye me-2" />
                                          View Details
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          to="#"
                                          className="dropdown-item rounded-1"
                                        >
                                          <i className="ti ti-download me-2" />
                                          Download
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          to="#"
                                          className="dropdown-item rounded-1"
                                        >
                                          <i className="ti ti-trash-x me-2" />
                                          Delete
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <h6 className="mb-2 fs-14">
                                <Link to="#">Group Photos</Link>
                              </h6>
                              <p className="mb-0 fs-13 d-flex align-items-center gap-2 file-line">23 Jul 2025<span className="fs-10">|</span>10MB</p>
                            </div>
                            {/* end card body */}
                          </div>
                          {/* end card */}
                        </div>{" "}
                        {/* end col */}
                      </div>
                      {/* end row */}
                    </div>
                    {/* End Quick Access */}
                    {/* Start table list */}
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                      <h4 className="mb-0">Files</h4>
                      <Link to="#" className="btn btn-outline-light">
                        View All
                      </Link>
                    </div>
                    <div className="table-responsive table-nowrap">
                      {/* Start Table List*/}
                      <table className="table mb-0 border">
                        <thead className="table-light bg-light">
                          <tr>
                            <th className="fs-14 fw-medium">Name</th>
                            <th className="fs-14 fw-medium">Size</th>
                            <th className="fs-14 fw-medium">Type</th>
                            <th className="fs-14 fw-medium">Modified</th>
                            <th className="fs-14 fw-medium">Share</th>
                            <th className="fs-14 fw-medium" />
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="avatar avatar-sm bg-light"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#preview"
                                >
                                  <ImageWithBasePath
                                    src="assets/img/icons/file-01.svg"
                                    className="img-fluid w-auto h-auto"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <p className="text-dark fw-medium  mb-0">
                                    <Link
                                      to="#"
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#preview"
                                    >
                                      Secret
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>7.6 MB</td>
                            <td>Doc</td>
                            <td>
                              <p className="text-dark mb-0">Mar 15, 2025</p>
                              <span>05:00:14 PM</span>
                            </td>
                            <td>
                              <div className="avatar-list-stacked avatar-group-sm">
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-03.jpg"
                                    alt="img"
                                  />
                                </span>
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-04.jpg"
                                    alt="img"
                                  />
                                </span>
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-12.jpg"
                                    alt="img"
                                  />
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="star me-2">
                                  <i className="ti ti-star-filled fs-16" />
                                </span>
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    className="btn btn-icon btn-outline-light"
                                    data-bs-toggle="dropdown"
                                   aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-eye me-2" />
                                        View Details
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-download me-2" />
                                        Download
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-trash-x me-2" />
                                        Delete
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="avatar avatar-sm bg-light"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#preview"
                                >
                                  <ImageWithBasePath
                                    src="assets/img/icons/file-02.svg"
                                    className="img-fluid w-auto h-auto"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <p className="text-dark fw-medium  mb-0">
                                    <Link
                                      to="#"
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#preview"
                                    >
                                      Sophie Headrick
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>7.4 MB</td>
                            <td>PDF</td>
                            <td>
                              <p className="text-dark mb-0">Jan 8, 2025</p>
                              <span>08:20:13 PM</span>
                            </td>
                            <td>
                              <div className="avatar-list-stacked avatar-group-sm">
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-15.jpg"
                                    alt="img"
                                  />
                                </span>
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-16.jpg"
                                    alt="img"
                                  />
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="star me-2">
                                  <i className="ti ti-star-filled fs-16" />
                                </span>
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    className="btn btn-icon btn-outline-light"
                                    data-bs-toggle="dropdown"
                                   aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-eye me-2" />
                                        View Details
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-download me-2" />
                                        Download
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-trash-x me-2" />
                                        Delete
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="avatar avatar-sm bg-light"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#preview"
                                >
                                  <ImageWithBasePath
                                    src="assets/img/icons/file-03.svg"
                                    className="img-fluid w-auto h-auto"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <p className="text-dark fw-medium  mb-0">
                                    <Link
                                      to="#"
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#preview"
                                    >
                                      Gallery
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>6.1 MB</td>
                            <td>Image</td>
                            <td>
                              <p className="text-dark mb-0">Aug 6, 2025</p>
                              <span>04:10:12 PM</span>
                            </td>
                            <td>
                              <div className="avatar-list-stacked avatar-group-sm">
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-02.jpg"
                                    alt="img"
                                  />
                                </span>
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-03.jpg"
                                    alt="img"
                                  />
                                </span>
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-05.jpg"
                                    alt="img"
                                  />
                                </span>
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-06.jpg"
                                    alt="img"
                                  />
                                </span>
                                <Link
                                  className="avatar bg-primary avatar-rounded text-fixed-white"
                                  to="#"
                                >
                                  +1
                                </Link>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="star me-2">
                                  <i className="ti ti-star-filled fs-16" />
                                </span>
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    className="btn btn-icon btn-outline-light"
                                    data-bs-toggle="dropdown"
                                   aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-eye me-2" />
                                        View Details
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-download me-2" />
                                        Download
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-trash-x me-2" />
                                        Delete
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="avatar avatar-sm bg-light"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#preview"
                                >
                                  <ImageWithBasePath
                                    src="assets/img/icons/file-04.svg"
                                    className="img-fluid w-auto h-auto"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <p className="text-dark fw-medium  mb-0">
                                    <Link
                                      to="#"
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#preview"
                                    >
                                      Doris Crowley
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>5.2 MB</td>
                            <td>Folder</td>
                            <td>
                              <p className="text-dark mb-0">Jan 6, 2025</p>
                              <span>03:40:14 PM</span>
                            </td>
                            <td>
                              <div className="avatar-list-stacked avatar-group-sm">
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-06.jpg"
                                    alt="img"
                                  />
                                </span>
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-10.jpg"
                                    alt="img"
                                  />
                                </span>
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-15.jpg"
                                    alt="img"
                                  />
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="star me-2">
                                  <i className="ti ti-star-filled fs-16" />
                                </span>
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    className="btn btn-icon btn-outline-light"
                                    data-bs-toggle="dropdown"
                                   aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-eye me-2" />
                                        View Details
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-download me-2" />
                                        Download
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-trash-x me-2" />
                                        Delete
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <Link
                                  to="#"
                                  className="avatar avatar-sm bg-light"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#preview"
                                >
                                  <ImageWithBasePath
                                    src="assets/img/icons/file-05.svg"
                                    className="img-fluid w-auto h-auto"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <p className="text-dark fw-medium  mb-0">
                                    <Link
                                      to="#"
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#preview"
                                    >
                                      Cheat_codez
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>8 MB</td>
                            <td>Xml</td>
                            <td>
                              <p className="text-dark mb-0">Oct 12, 2025</p>
                              <span>05:00:14 PM</span>
                            </td>
                            <td>
                              <div className="avatar-list-stacked avatar-group-sm">
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-04.jpg"
                                    alt="img"
                                  />
                                </span>
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-05.jpg"
                                    alt="img"
                                  />
                                </span>
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-12.jpg"
                                    alt="img"
                                  />
                                </span>
                                <span className="avatar avatar-rounded">
                                  <ImageWithBasePath
                                    className="border border-white"
                                    src="assets/img/profiles/avatar-11.jpg"
                                    alt="img"
                                  />
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="star me-2">
                                  <i className="ti ti-star-filled fs-16" />
                                </span>
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    className="btn btn-icon btn-outline-light"
                                    data-bs-toggle="dropdown"
                                   aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-eye me-2" />
                                        View Details
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-download me-2" />
                                        Download
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="dropdown-item rounded-1"
                                      >
                                        <i className="ti ti-trash-x me-2" />
                                        Delete
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* End Table List */}
                  </div>
                </div>{" "}
                {/* end col */}
              </div>
              {/* end row */}
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

export default FileManager;
