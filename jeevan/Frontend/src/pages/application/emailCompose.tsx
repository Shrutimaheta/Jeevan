import { Link } from "react-router-dom"
import CommonFooter from "../../components/common-footer/commonFooter"
import { all_routes } from "../../routes/all_routes"
import CommonSelect from "../../components/common-select/commonSelect"
import { Bcc, From, To } from "../../core/json/selectOption"
import Texteditor from "../../components/text-editor/texteditor"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"


const EmailCompose = () => {
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
            <h4 className="mb-1">Email</h4>
            <div className="text-end">
              <ol className="breadcrumb m-0 py-0">
                <li className="breadcrumb-item">
                  <Link to={all_routes.dashboard}>Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#">Applications</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={all_routes.email}>Email</Link>
                </li>
                <li className="breadcrumb-item active">Inbox</li>
              </ol>
            </div>
          </div>
          <div className="gap-2 d-flex align-items-center flex-wrap">
            <Link
              to="#"
              className="btn btn-icon btn-white"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              aria-label="Refresh"
              data-bs-original-title="Refresh"
            >
              <i className="ti ti-refresh" />
            </Link>
            <Link
              to="#"
              className="btn btn-icon btn-white"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              aria-label="Print"
              data-bs-original-title="Print"
            >
              <i className="ti ti-printer" />
            </Link>
          </div>
        </div>
        {/* End Page Header */}
        <div className="card shadow-none mb-0">
          <div className="card-body p-0">
            <div className="row g-0">
              <div className="col-lg-3 col-sm-4">
                <div className="border-end h-100">
                <OverlayScrollbarsComponent style={{maxHeight:' calc(100vh - 10rem);'}}
                  className=" p-4 pb-0 pb-sm-4 mail-sidebar h-100"
                  data-simplebar=""
                >
                  <div>
                    <div className="mb-3">
                      <Link
                        to={all_routes.emailCompose}
                        className="btn btn-primary btn-lg w-100"
                      >
                        <i className="ti ti-square-rounded-plus me-1" />
                        Compose New
                      </Link>
                    </div>
                    <div
                      className="accordion accordion-flush custom-accordion"
                      id="accordionFlushExample"
                    >
                      {/* item */}
                      <div className="accordion-item mb-3 pb-3">
                        <h2 className="accordion-header mb-0">
                          <button
                            className="accordion-button fw-semibold p-0 bg-transparent"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                          >
                            Mail
                          </button>
                        </h2>
                        <div
                          id="flush-collapseOne"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="nav flex-column mt-2">
                            <Link
                              to={all_routes.email}
                              className="d-flex text-start align-items-center fw-medium fs-14 rounded p-2 mb-1"
                            >
                              <i className="ti ti-inbox me-2" />
                              Inbox
                              <span className="avatar avatar-xs ms-auto bg-danger rounded-circle">
                                6
                              </span>
                            </Link>
                            <Link
                              to="#"
                              className="d-flex text-start align-items-center fw-medium fs-14 rounded p-2 mb-1"
                            >
                              <i className="ti ti-star me-2" />
                              Starred
                            </Link>
                            <Link
                              to="#"
                              className="d-flex text-start align-items-center fw-medium fs-14 rounded p-2 mb-1"
                            >
                              <i className="ti ti-clock-hour-7 me-2" />
                              Snoozed
                            </Link>
                            <Link
                              to="#"
                              className="d-flex text-start align-items-center fw-medium fs-14 rounded p-2 mb-1"
                            >
                              <i className="ti ti-send me-2" />
                              Sent
                            </Link>
                            <Link
                              to="#"
                              className="d-flex text-start align-items-center fw-medium fs-14 rounded p-2 mb-1"
                            >
                              <i className="ti ti-file-power me-2" />
                              Drafts
                            </Link>
                            <Link
                              to="#"
                              className="d-flex text-start align-items-center fw-medium fs-14 rounded p-2 mb-1"
                            >
                              <i className="ti ti-badge me-2" />
                              Important
                            </Link>
                            <Link
                              to="#"
                              className="d-flex text-start align-items-center fw-medium fs-14 rounded p-2 mb-1"
                            >
                              <i className="ti ti-brand-hipchat me-2" />
                              Chats
                            </Link>
                            <Link
                              to="#"
                              className="d-flex text-start align-items-center fw-medium fs-14 rounded p-2"
                            >
                              <i className="ti ti-clock-record me-2" />
                              Scheduled
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* item */}
                      <div className="accordion-item mb-3 pb-3">
                        <h2 className="accordion-header mb-0">
                          <button
                            className="accordion-button fw-semibold p-0 bg-transparent"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                          >
                            Others
                          </button>
                        </h2>
                        <div
                          id="flush-collapseTwo"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="nav flex-column mt-2">
                            <Link
                              to="#"
                              className="d-flex text-start align-items-center fw-medium fs-14 rounded p-2 mb-1"
                            >
                              <i className="ti ti-messages me-2" />
                              All Emails
                            </Link>
                            <Link
                              to="#"
                              className="d-flex text-start align-items-center fw-medium fs-14 rounded p-2 mb-1"
                            >
                              <i className="ti ti-box-seam me-2" />
                              Spam
                            </Link>
                            <Link
                              to="#"
                              className="d-flex text-start align-items-center fw-medium fs-14 rounded p-2 mb-1"
                            >
                              <i className="ti ti-trash me-2" />
                              Trash
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* item */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header mb-0">
                          <button
                            className="accordion-button fw-semibold p-0 bg-transparent collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseThree"
                            aria-expanded="false"
                            aria-controls="flush-collapseThree"
                          >
                            Labels
                          </button>
                        </h2>
                        <div
                          id="flush-collapseThree"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="d-flex flex-column mt-3">
                            <Link
                              to="#"
                              className="d-flex align-items-center fw-medium mb-2"
                            >
                              <i className="ti ti-point-filled text-success me-1 fs-18" />
                              Personal
                            </Link>
                            <Link
                              to="#"
                              className="d-flex align-items-center fw-medium mb-2"
                            >
                              <i className="ti ti-point-filled text-warning me-1 fs-18" />
                              Client
                            </Link>
                            <Link
                              to="#"
                              className="d-flex align-items-center fw-medium mb-2"
                            >
                              <i className="ti ti-point-filled text-info me-1 fs-18" />
                              Marketing
                            </Link>
                            <Link
                              to="#"
                              className="d-flex align-items-center fw-medium"
                            >
                              <i className="ti ti-point-filled text-danger me-1 fs-18" />
                              Office
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end card body */}
                </OverlayScrollbarsComponent>
                {/* end card */}
                </div>
              </div>
              <div className="col-lg-9 col-sm-8">
                {/* card start */}
                <div className="card shadow-none border-0 mb-0">
                  <div className="card-header">
                    <h5 className="mb-0">New Message</h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="mail-messages p-4 overflow-auto" data-simplebar="">
                      <form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                From <span className="text-danger">*</span>
                              </label>
                              <CommonSelect
                            options={From}
                            className="select"
                            defaultValue={From[0]}
                          />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                To <span className="text-danger">*</span>
                              </label>
                              <CommonSelect
                            options={To}
                            className="select"
                            defaultValue={To[0]}
                          />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Bcc <span className="text-danger">*</span>
                              </label>
                              <CommonSelect
                            options={Bcc}
                            className="select"
                            defaultValue={Bcc[0]}
                          />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Subject <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="mb-3">
                              <label className="form-label">Message</label>
                              <div className="snow-editor">
                                <Texteditor/>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="position-relative d-inline-flex mb-2">
                              <Link to="#" className="btn btn-dark">
                                <i className="ti ti-tags me-1" />
                                Attachment
                              </Link>
                              <input
                                type="file"
                                className="position-absolute top-0 start-0 opacity-0 w-100 h-100"
                              />
                            </div>
                            <p className="mb-0">Max upload file size. 32MB</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-end flex-wrap gap-2 border-top mt-3 pt-3">
                          <button className="btn btn-dark" type="button">
                            <i className="ti ti-file-power me-1" />
                            Make as Draft
                          </button>
                          <button className="btn btn-danger" type="button">
                            <i className="ti ti-xbox-x me-1" />
                            Discard
                          </button>
                          <button className="btn btn-primary" type="submit">
                            <i className="ti ti-send me-1" />
                            Send Email
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* card start */}
              </div>
            </div>
          </div>
          {/* end card body */}
        </div>
        {/* end card */}
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

export default EmailCompose