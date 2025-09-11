import  {  useState } from "react";
import { Link } from "react-router-dom"
import ImageWithBasePath from "../../components/image-with-base-path"
import CallUsersSlider from "./callUsersSlider"
import { all_routes } from "../../routes/all_routes";
import CommonFooter from "../../components/common-footer/commonFooter";

const VideoCall = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="page-wrapper">
      {/* Start Content */}
      <div className="content">
        {/* Page Header */}
        <div className="d-flex align-items-center justify-content-between gap-2 mb-4 flex-wrap">
          <div className="breadcrumb-arrow">
            <h4 className="mb-1">Video Call</h4>
            <div className="text-end">
              <ol className="breadcrumb m-0 py-0">
                <li className="breadcrumb-item">
                  <Link to={all_routes.dashboard}>Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#">Applications</Link>
                </li>
                <li className="breadcrumb-item active">Video Call</li>
              </ol>
            </div>
          </div>
          <Link to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_modal">
            <i className="ti ti-square-rounded-plus me-1" />
            Add Participant
          </Link>
        </div>
        {/* End Page Header */}
        <div className="card mb-0">
          <div className="card-body">
            <div className="d-xl-flex">
              <div className="video-chat w-100">
                <div className="position-relative">
                  <div className="mb-4 call-user-img">
                    <ImageWithBasePath
                      src="assets/img/calls/video-call.jpg"
                      className="img-fluid rounded"
                      alt="user"
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between position-absolute top-0 start-0 w-100 p-3">
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-white text-dark">
                        Rachael Thomas
                      </span>
                      <span className="badge bg-white text-dark">01:45</span>
                    </div>
                    <div>
                      <Link
                        to="#"
                        className="btn btn-icon btn-white btnFullscreen"
                        onClick={toggleFullscreen}
                      >
                        <i className={`ti ${isFullscreen ? "ti-maximize" : "ti-minimize"}`} />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="swiper call-users">
                  <div className="swiper-wrapper">
                  <CallUsersSlider/>
                  </div>
                </div>
                <div className="call-footer border rounded p-2 mt-3">
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
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* end card */}
      <CommonFooter/>
      
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
    </div>
  );
}

export default VideoCall;