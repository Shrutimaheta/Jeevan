import { Link } from "react-router-dom";
import CommonFooter from "../../components/common-footer/commonFooter";
import ImageWithBasePath from "../../components/image-with-base-path";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { all_routes } from "../../routes/all_routes";
import { useState } from "react";

const Chat = () => {
  const [isChatActive, setIsChatActive] = useState(false);

  const handleChatUserClick = () => {
    setIsChatActive(true);
  };

  const handleCloseChat = () => {
    setIsChatActive(false);
  };

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
              <h4 className="mb-1">Chat</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Applications</Link>
                  </li>
                  <li className="breadcrumb-item active">Chat</li>
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
          <div className={`card shadow-none mb-0 ${isChatActive ? 'chat-active' : ''}`}>
            <div className="card-body p-0">
              <div className="d-lg-flex">
                <div className="chat-user-nav">
                  <div>
                    <div className="d-flex align-items-center justify-content-between border-bottom p-3">
                      <div className="d-flex align-items-center">
                        <span className="avatar me-2 flex-shrink-0">
                          <ImageWithBasePath
                            src="assets/img/chat/chat-user-01.jpg"
                            alt="user"
                                     className="rounded-circle"
                          />
                        </span>
                        <div>
                          <h6 className="fs-14 mb-1">James Hong </h6>
                          <p className="mb-0">Admin</p>
                        </div>
                      </div>
                      <Link
                        to="#"
                        className="btn btn-icon btn-primary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="New Chat"
                        aria-label="New Chat"
                      >
                        <i className="ti ti-plus" />
                      </Link>
                    </div>
                    <div>
                      <div className="input-group w-auto input-group-flat p-4 pb-0">
                        <span className="input-group-text border-end-0">
                          <i className="ti ti-search" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Keyword"
                        />
                      </div>
                      <OverlayScrollbarsComponent
                        style={{ maxHeight: "calc(100vh - 18rem)" }}
                        className="chat-users p-4"
                        data-simplebar=""
                      >
                        <h6 className="mb-3">All Messages</h6>
                        <div className="d-flex align-items-center justify-content-between rounded p-3 user-list active mb-1" onClick={handleChatUserClick}>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="avatar me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-02.jpg"
                                alt="user"
                                className="rounded-circle"
                              />
                            </Link>
                            <div>
                              <h6 className="fs-14 mb-1">
                                <Link to="#">Mark Smith</Link>
                              </h6>
                              <p className="mb-0 text-truncate">
                                Hey Sam! Did you Ch...
                              </p>
                            </div>
                          </div>
                          <div className="text-end">
                            <span className="text-dark d-block">10:10 AM</span>
                            <span className="d-block text-success">
                              <i className="ti ti-checks" />
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between rounded p-3 user-list mb-1" onClick={handleChatUserClick}>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="avatar me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-03.jpg"
                                alt="user"
                                className="rounded-circle"
                              />
                            </Link>
                            <div>
                              <h6 className="fs-14 mb-1">
                                <Link to="#">Eugene Sikora</Link>
                              </h6>
                              <p className="mb-0 text-truncate">
                                How are your Today
                              </p>
                            </div>
                          </div>
                          <div className="text-end">
                            <span className="text-dark d-block mb-1">
                              08:26 AM
                            </span>
                            <span className="badge ms-auto bg-danger rounded-circle message-count">
                              5
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between rounded p-3 user-list mb-1" onClick={handleChatUserClick}>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="avatar me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-04.jpg"
                                alt="user"    
                                className="rounded-circle"
                              />
                            </Link>
                            <div>
                              <h6 className="fs-14 mb-1">
                                <Link to="#">Robert Fassett</Link>
                              </h6>
                              <p className="mb-0 text-truncate">
                                Here are some of ve...
                              </p>
                            </div>
                          </div>
                          <div className="text-end">
                            <span className="text-dark d-block mb-1">
                              yesterday
                            </span>
                            <span className="badge ms-auto bg-danger rounded-circle message-count">
                              5
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between rounded p-3 user-list mb-1" onClick={handleChatUserClick}>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="avatar me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-05.jpg"
                                alt="user"
                                className="rounded-circle"
                              />
                            </Link>
                            <div>
                              <h6 className="fs-14 mb-1">
                                <Link to="#">Andrew Fletcher</Link>
                              </h6>
                              <p className="mb-0 text-truncate">
                                Use tools like Trello...
                              </p>
                            </div>
                          </div>
                          <div className="text-end">
                            <span className="text-dark d-block mb-1">
                              yesterday
                            </span>
                            <span className="d-block text-light">
                              <i className="ti ti-checks" />
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between rounded p-3 user-list mb-1" onClick={handleChatUserClick}>
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="avatar badge-soft-purple fw-semibold me-2 flex-shrink-0"
                            >
                              TD
                            </Link>
                            <div>
                              <h6 className="fs-14 mb-1">
                                <Link to="#">Tyron Derby</Link>
                              </h6>
                              <p className="mb-0 text-truncate">
                                Let's reconvene next...
                              </p>
                            </div>
                          </div>
                          <div className="text-end">
                            <span className="text-dark d-block mb-1">
                              16 Jul
                            </span>
                            <span className="d-block text-light">
                              <i className="ti ti-checks text-success" />
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between rounded p-3 user-list mb-1" onClick={handleChatUserClick}>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="avatar me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-06.jpg"
                                alt="user"
                                className="rounded-circle"
                              />
                            </Link>
                            <div>
                              <h6 className="fs-14 mb-1">
                                <Link to="#">Anna Johnson</Link>
                              </h6>
                              <p className="mb-0 text-truncate">
                                How are your Today
                              </p>
                            </div>
                          </div>
                          <div className="text-end">
                            <span className="text-dark d-block mb-1">
                              16 Jul
                            </span>
                            <span className="d-block text-light">
                              <i className="ti ti-check text-light" />
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between rounded p-3 user-list mb-1" onClick={handleChatUserClick}>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="avatar me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-07.jpg"
                                alt="user"
                                className="rounded-circle"
                              />
                            </Link>
                            <div>
                              <h6 className="fs-14 mb-1">
                                <Link to="#">Emily Davis</Link>
                              </h6>
                              <p className="mb-0 text-truncate">
                                Sure, I can help with...
                              </p>
                            </div>
                          </div>
                          <div className="text-end">
                            <span className="text-dark d-block mb-1">
                              15 Jul
                            </span>
                            <span className="d-block text-light">
                              <i className="ti ti-checks text-light" />
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between rounded p-3 user-list mb-1" onClick={handleChatUserClick}>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="avatar me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-08.jpg"
                                alt="user"
                                className="rounded-circle"
                              />
                            </Link>
                            <div>
                              <h6 className="fs-14 mb-1">
                                <Link to="#">Susan Denton</Link>
                              </h6>
                              <p className="mb-0 text-truncate">
                                I'll share the meeting...
                              </p>
                            </div>
                          </div>
                          <div className="text-end">
                            <span className="text-dark d-block mb-1">
                              15 Jul
                            </span>
                            <span className="d-block text-light">
                              <i className="ti ti-checks text-light" />
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between rounded p-3 user-list" onClick={handleChatUserClick}>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="avatar me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-09.jpg"
                                alt="user"
                                className="rounded-circle"
                              />
                            </Link>
                            <div>
                              <h6 className="fs-14 mb-1">
                                <Link to="#">David Cruz</Link>
                              </h6>
                              <p className="mb-0 text-truncate">
                                Let me know if you...
                              </p>
                            </div>
                          </div>
                          <div className="text-end">
                            <span className="text-dark d-block mb-1">
                              14 Jul
                            </span>
                            <span className="d-block text-light">
                              <i className="ti ti-checks text-light" />
                            </span>
                          </div>
                        </div>
                      </OverlayScrollbarsComponent>
                    </div>
                  </div>
                  {/* end card body */}
                </div>
                <div className="flex-fill chat-messages shadow-none">
                  {/* card start */}
                  <div className="card border-0 mb-0">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-3">
                      <div className="d-flex align-items-center">
                        <span className="avatar me-2 flex-shrink-0">
                          <ImageWithBasePath
                            src="assets/img/chat/chat-user-02.jpg"
                            alt="user"
                            className="rounded-circle"
                          />
                        </span>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">Mark Smith</h6>
                          <p className="mb-0 d-inline-flex align-items-center custom-dot">
                            <i className="ti ti-point-filled text-success" />
                            Online
                          </p>
                        </div>
                      </div>
                      <div className="gap-2 d-flex align-items-center flex-wrap">
                        <Link
                          to={all_routes.voiceCall}
                          className="btn btn-icon btn-light"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          aria-label="Refresh"
                          data-bs-original-title="Voice Call"
                        >
                          <i className="ti ti-phone" />
                        </Link>
                        <Link
                          to={all_routes.videoCall}
                          className="btn btn-icon btn-light"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          aria-label="Refresh"
                          data-bs-original-title="Video Call"
                        >
                          <i className="ti ti-video" />
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-icon btn-light"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          aria-label="Refresh"
                          data-bs-original-title="Info"
                        >
                          <i className="ti ti-info-circle" />
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-icon btn-light close-chat d-md-none"
                          onClick={handleCloseChat}
                        >
                          <i className="ti ti-x" />
                        </Link>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <OverlayScrollbarsComponent
                        style={{ maxHeight: "calc(100vh - 18.5rem)" }}
                        className="message-body p-4"
                        data-simplebar=""
                      >
                        <div className="chat-list mb-3">
                          <div className="d-flex align-items-start">
                            <span className="avatar online me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-02.jpg"
                                alt="user"
                                className="rounded-circle"
                              />
                            </span>
                            <div>
                              <div className="d-flex align-items-center mb-1">
                                <h6 className="fs-14 mb-0">Mark Smith</h6>
                                <p className="mb-0 d-inline-flex align-items-center">
                                  <i className="ti ti-point-filled mx-2" />
                                  02:39 PM
                                </p>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="message-box receive-message p-3">
                                  <p className="mb-0 fs-14">
                                    Hey mark! Did you check out the new logo
                                    design?
                                  </p>
                                </div>
                                <div className="ms-2">
                                  <Link to="#" data-bs-toggle="dropdown" aria-label="Message actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu p-2">
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-back-up me-1" />
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-forward-up me-1" />
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-file-export me-1" />
                                        Copy
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-heart me-1" />
                                        Mark as Favourite
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-trash me-1" />
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-check me-1" />
                                        Mark as Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-box-align-right me-1" />
                                        Archeive Chat
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-pin me-1" />
                                        Pin Chat
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="chat-list ms-auto mb-3">
                          <div className="d-flex align-items-start justify-content-end">
                            <div>
                              <div className="d-flex align-items-center justify-content-end mb-1">
                                <p className="mb-0 d-inline-flex align-items-center">
                                  <i className="ti ti-checks text-success me-1" />
                                  02:39 PM
                                  <i className="ti ti-point-filled mx-2" />
                                </p>
                                <h6 className="fs-14 fw-semibold mb-0">You</h6>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="me-2">
                                  <Link to="#" data-bs-toggle="dropdown" aria-label="Message actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu p-2">
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-back-up me-1" />
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-forward-up me-1" />
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-file-export me-1" />
                                        Copy
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-heart me-1" />
                                        Mark as Favourite
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-trash me-1" />
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-check me-1" />
                                        Mark as Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-box-align-right me-1" />
                                        Archeive Chat
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-pin me-1" />
                                        Pin Chat
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <div className="message-box sent-message p-3">
                                  <p className="mb-0 fs-14">
                                    Not yet. Can you send it here?
                                  </p>
                                </div>
                              </div>
                            </div>
                            <span className="avatar ms-2 online flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-01.jpg"
                                alt="user"
                                className="rounded-circle"
                              />
                            </span>
                          </div>
                        </div>
                        <div className="chat-list mb-3">
                          <div className="d-flex align-items-start">
                            <span className="avatar online me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-02.jpg"
                                alt="user"
                                className="rounded-circle"
                              />
                            </span>
                            <div>
                              <div className="d-flex align-items-center mb-1">
                                <h6 className="fs-14 mb-0">Mark Smith</h6>
                                <p className="mb-0 d-inline-flex align-items-center">
                                  <i className="ti ti-point-filled mx-2" />
                                  02:39 PM
                                </p>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="message-box receive-message p-3">
                                  <p className="mb-2 fs-14">
                                    Sure! Please check the below logo
                                    Attached!!!
                                  </p>
                                  <div className="d-flex align-items-center gap-2">
                                    <span className="bg-white d-block rounded p-1">
                                      <ImageWithBasePath
                                        src="assets/img/social/attachment-03.jpg"
                                        className="rounded"
                                        alt="attachment"
                                      />
                                    </span>
                                    <span className="bg-white d-block rounded p-1">
                                      <ImageWithBasePath
                                        src="assets/img/social/attachment-04.jpg"
                                        className="rounded"
                                        alt="attachment"
                                      />
                                    </span>
                                  </div>
                                </div>
                                <div className="ms-2">
                                  <Link to="#" data-bs-toggle="dropdown" aria-label="Message actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu p-2">
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-back-up me-1" />
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-forward-up me-1" />
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-file-export me-1" />
                                        Copy
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-heart me-1" />
                                        Mark as Favourite
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-trash me-1" />
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-check me-1" />
                                        Mark as Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-box-align-right me-1" />
                                        Archeive Chat
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-pin me-1" />
                                        Pin Chat
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <span className="badge bg-light rounded-pill px-3 text-dark fs-14">
                            Today
                          </span>
                        </div>
                        <div className="chat-list ms-auto mb-3">
                          <div className="d-flex align-items-start justify-content-end">
                            <div>
                              <div className="d-flex align-items-center justify-content-end mb-1">
                                <p className="mb-0 d-inline-flex align-items-center">
                                  <i className="ti ti-checks text-success me-1" />
                                  10:00 AM
                                  <i className="ti ti-point-filled mx-2" />
                                </p>
                                <h6 className="fs-14 fw-semibold mb-0">You</h6>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="me-2">
                                  <Link to="#" data-bs-toggle="dropdown" aria-label="Message actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu p-2">
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-back-up me-1" />
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-forward-up me-1" />
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-file-export me-1" />
                                        Copy
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-heart me-1" />
                                        Mark as Favourite
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-trash me-1" />
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-check me-1" />
                                        Mark as Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-box-align-right me-1" />
                                        Archeive Chat
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-pin me-1" />
                                        Pin Chat
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <div className="message-box sent-message p-3">
                                  <p className="mb-0 fs-14">
                                    Looks clean! I like the font. Maybe try a
                                    slightly darker blue?
                                  </p>
                                </div>
                              </div>
                            </div>
                            <span className="avatar ms-2 online flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-01.jpg"
                                alt="user"
                                 className="rounded-circle"
                              />
                            </span>
                          </div>
                        </div>
                        <div className="chat-list mb-3">
                          <div className="d-flex align-items-start">
                            <span className="avatar online me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-02.jpg"
                                alt="user"
                                className="rounded-circle"
                              />
                            </span>
                            <div>
                              <div className="d-flex align-items-center mb-1">
                                <h6 className="fs-14 mb-0">Mark Smith</h6>
                                <p className="mb-0 d-inline-flex align-items-center">
                                  <i className="ti ti-point-filled mx-2" />
                                  10:05 AM
                                </p>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="message-box receive-message p-3">
                                  <p className="mb-0 fs-14">
                                    Perfect! That layout will work great on the
                                    landing page. 👍
                                  </p>
                                </div>
                                <div className="ms-2">
                                  <Link to="#" data-bs-toggle="dropdown" aria-label="Message actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu p-2">
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-back-up me-1" />
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-forward-up me-1" />
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-file-export me-1" />
                                        Copy
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-heart me-1" />
                                        Mark as Favourite
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-trash me-1" />
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-check me-1" />
                                        Mark as Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-box-align-right me-1" />
                                        Archeive Chat
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-pin me-1" />
                                        Pin Chat
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="chat-list ms-auto mb-3">
                          <div className="d-flex align-items-start justify-content-end">
                            <div>
                              <div className="d-flex align-items-center justify-content-end mb-1">
                                <p className="mb-0 d-inline-flex align-items-center">
                                  <i className="ti ti-checks text-success me-1" />
                                  10:00 AM
                                  <i className="ti ti-point-filled mx-2" />
                                </p>
                                <h6 className="fs-14 fw-semibold mb-0">You</h6>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="me-2">
                                  <Link to="#" data-bs-toggle="dropdown" aria-label="Message actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu p-2">
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-back-up me-1" />
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-forward-up me-1" />
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-file-export me-1" />
                                        Copy
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-heart me-1" />
                                        Mark as Favourite
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-trash me-1" />
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-check me-1" />
                                        Mark as Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-box-align-right me-1" />
                                        Archeive Chat
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-pin me-1" />
                                        Pin Chat
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <div className="message-box sent-message p-3">
                                  <p className="mb-0 fs-14">
                                    Perfect It looks Great!!!
                                  </p>
                                </div>
                              </div>
                            </div>
                            <span className="avatar ms-2 online flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-01.jpg"
                                alt="user"
                                 className="rounded-circle"
                              />
                            </span>
                          </div>
                        </div>
                        <div className="chat-list">
                          <div className="d-flex align-items-start">
                            <span className="avatar online me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/chat/chat-user-02.jpg"
                                alt="user"
                                className="rounded-circle"
                              />
                            </span>
                            <div>
                              <div className="d-flex align-items-center mb-1">
                                <h6 className="fs-14 mb-0">Mark Smith</h6>
                                <p className="mb-0 d-inline-flex align-items-center">
                                  <i className="ti ti-point-filled mx-2" />
                                  02:39 PM
                                </p>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="message-box receive-message p-3">
                                  <p className="mb-0 fs-14">
                                    Hey mark! Did you check out the new logo
                                    design?
                                  </p>
                                </div>
                                <div className="ms-2">
                                  <Link to="#" data-bs-toggle="dropdown" aria-label="Message actions menu" aria-haspopup="true" aria-expanded="false">
                                    <i className="ti ti-dots-vertical" aria-hidden="true" />
                                  </Link>
                                  <ul className="dropdown-menu p-2">
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-back-up me-1" />
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-forward-up me-1" />
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-file-export me-1" />
                                        Copy
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-arrow-back-up me-1" />
                                        Mark as Favourite
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-trash me-1" />
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-check me-1" />
                                        Mark as Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-box-align-right me-1" />
                                        Archeive Chat
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-pin me-1" />
                                        Pin Chat
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </OverlayScrollbarsComponent>
                      <div className="message-footer d-flex align-items-center border-top p-3">
                        <div className="flex-fill">
                          <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Type Something..."
                          />
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Link to="#" className="btn btn-icon btn-light">
                            <i className="ti ti-photo-plus" />
                          </Link>
                          <Link to="#" className="btn btn-icon btn-light">
                            <i className="ti ti-mood-smile-beam" />
                          </Link>
                          <div>
                            <Link
                              to="#"
                              className="btn btn-icon btn-light"
                              data-bs-toggle="dropdown"
                             aria-label="Chat actions menu" aria-haspopup="true" aria-expanded="false">
                              <i className="ti ti-dots-vertical" aria-hidden="true" />
                            </Link>
                            <ul className="dropdown-menu p-2">
                              <li>
                                <Link to="#" className="dropdown-item">
                                  <i className="ti ti-camera-selfie me-2" />
                                  Camera
                                </Link>
                              </li>
                              <li>
                                <Link to="#" className="dropdown-item">
                                  <i className="ti ti-photo-up me-2" />
                                  Gallery
                                </Link>
                              </li>
                              <li>
                                <Link to="#" className="dropdown-item">
                                  <i className="ti ti-music me-2" />
                                  Audio
                                </Link>
                              </li>
                              <li>
                                <Link to="#" className="dropdown-item">
                                  <i className="ti ti-map-pin-share me-2" />
                                  Location
                                </Link>
                              </li>
                              <li>
                                <Link to="#" className="dropdown-item">
                                  <i className="ti ti-user-check me-2" />
                                  Contact
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <Link to="#" className="btn btn-icon btn-primary">
                            <i className="ti ti-send" />
                          </Link>
                        </div>
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
        <CommonFooter />
        {/* End Footer */}
      </div>
      {/* ========================
			End Page Content
		========================= */}
    </>
  );
};

export default Chat;
