import { Link } from "react-router-dom"
import CommonFooter from "../../components/common-footer/commonFooter"
import { all_routes } from "../../routes/all_routes"
import ImageWithBasePath from "../../components/image-with-base-path"


const VoiceCall = () => {
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
          <h4 className="mb-1">Voice Call</h4>
          <div className="text-end">
            <ol className="breadcrumb m-0 py-0">
              <li className="breadcrumb-item">
                <Link to={all_routes.dashboard}>Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Applications</Link>
              </li>
              <li className="breadcrumb-item active">Voice Call</li>
            </ol>
          </div>
        </div>
        <Link to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_modal">
          <i className="ti ti-square-rounded-plus me-1" />
          Add Participant
        </Link>
      </div>
      {/* End Page Header */}
      <div className="card voice-call mb-0 shadow-none">
        <div className="card-body position-relative text-center d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <span className="avatar avatar-md me-2 online avatar-rounded">
                <ImageWithBasePath src="assets/img/calls/user-01.jpg" alt="img" />
              </span>
              <div>
                <h6 className="mb-1">
                  <Link to="#">Edward Lietz</Link>
                </h6>
                <span className="fs-13 d-block">+22-555-345-11</span>
              </div>
            </div>
            <div>
              <Link
                to="#"
                className="btn btn-icon btn-outline-light"
                data-bs-toggle="dropdown"
                
               aria-label="Actions menu" aria-haspopup="true" aria-expanded="false">
                <i className="ti ti-dots-vertical" aria-hidden="true" />
              </Link>
              <ul className="dropdown-menu p-2">
                <li>
                  <Link to="#" className="dropdown-item">
                    Add Participant
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item">
                    Hold Call
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item">
                    Transfer Call
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item">
                    End Call
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="call-body border flex-grow-1 position-relative d-flex align-items-center justify-content-center mb-3 p-5">
            <ImageWithBasePath
              src="assets/img/bg/call-bg-01.png"
              className="position-absolute top-0 end-0 rounded-top"
              alt="bg"
            />
            <ImageWithBasePath
              src="assets/img/bg/call-bg-02.png"
              className="position-absolute bottom-0 start-0 rounded-bottom"
              alt="bg"
            />
            <div className="flex-fill text-center">
              <div className="animation-ripple call-avatar-outer d-flex align-items-center justify-content-center m-auto mb-4">
                <div className="avatar call-avatar d-flex mx-auto rounded-circle">
                  <ImageWithBasePath
                    src="assets/img/calls/user-01.jpg"
                    className="img-fluid rounded-circle"
                    alt="img"
                  />
                </div>
              </div>
              <span className="badge bg-white text-dark">01:45</span>
              <div className="border rounded border-2 border-primary avatar avatar-xxl d-inline-flex position-absolute end-0 bottom-0 m-4">
                <div className="bg-light p-1 rounded-circle d-inline-flex align-items-center justify-content-center">
                  <Link to="#" className="avatar avatar-lg">
                    <ImageWithBasePath
                      src="assets/img/calls/user-02.jpg"
                      className="rounded-circle"
                      alt="Img"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="call-footer border rounded p-2">
            <div className="d-flex align-items-center justify-content-center flex-wrap row-gap-2">
              <Link to="#" className="btn btn-light btn-icon me-2">
                <i className="ti ti-microphone fs-16" />
              </Link>
              <Link to="#" className="btn btn-light btn-icon me-2">
                <i className="ti ti-video fs-16" />
              </Link>
              <Link to="#" className="btn btn-light btn-icon me-2">
                <i className="ti ti-messages fs-16" />
              </Link>
              <Link
                to="#"
                className="btn btn-icon p-4 btn-danger text-white me-2"
              >
                <i className="ti ti-phone fs-16" />
              </Link>
              <Link to="#" className="btn btn-light btn-icon me-2">
                <i className="ti ti-volume fs-16" />
              </Link>
              <Link to="#" className="btn btn-light btn-icon me-2">
                <i className="ti ti-mood-smile fs-16" />
              </Link>
              <Link to="#" className="btn btn-light btn-icon">
                <i className="ti ti-screen-share fs-16" />
              </Link>
            </div>
          </div>
        </div>{" "}
        {/* end card-body */}
      </div>{" "}
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
  {/* Add Participant */}
  <div className="modal fade" id="add_modal">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">New Participant</h5>
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
             <div className="input-group w-auto input-group-flat">
              <span className="input-group-text">
                <i className="ti ti-search" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
            </div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="avatar flex-shrink-0">
                <ImageWithBasePath src="assets/img/chat/chat-user-01.jpg" alt="user" className="img-fluid rounded-circle" />
              </span>
              <div>
                <h6 className="fs-14 mb-1">James Hong </h6><p className ="mb-0">+1 54789 31795</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="avatar flex-shrink-0">
                <ImageWithBasePath src="assets/img/chat/chat-user-02.jpg" alt="user" className="img-fluid rounded-circle" />
              </span>
              <div>
                <h6 className="fs-14 mb-1">Daniel Williams</h6><p className ="mb-0">+1 19325 24785</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="avatar flex-shrink-0">
                <ImageWithBasePath src="assets/img/chat/chat-user-03.jpg" alt="user" className="img-fluid rounded-circle" />
              </span>
              <div>
                <h6 className="fs-14 mb-1">Olivia Miller </h6><p className ="mb-0">+1 34852 34985</p>
              </div>
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
              Add Participant
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* Add Participant end */}
</>
  )
}

export default VoiceCall