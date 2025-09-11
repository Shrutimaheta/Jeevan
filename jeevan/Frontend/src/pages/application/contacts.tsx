import { Link } from "react-router-dom"
import CommonFooter from "../../components/common-footer/commonFooter"
import { all_routes } from "../../routes/all_routes"
import ImageWithBasePath from "../../components/image-with-base-path"
import ContactModal from "./contactModal"


const Contacts = () => {
  return (
    <>
    {/* ========================
              Start Page Content
          ========================= */}
    <div className="page-wrapper">
      {/* Start Content */}
      <div className="content pb-0">
        {/* Page Header */}
        <div className="d-flex align-items-center justify-content-between gap-2 mb-4 flex-wrap">
          <div className="breadcrumb-arrow">
            <h4 className="mb-1">Contact</h4>
            <div className="text-end">
              <ol className="breadcrumb m-0 py-0">
                <li className="breadcrumb-item">
                  <Link to={all_routes.dashboard}>Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#">Applications</Link>
                </li>
                <li className="breadcrumb-item active">Contact</li>
              </ol>
            </div>
          </div>
          <div className="gap-2 d-flex align-items-center flex-wrap">
            <Link
              to={all_routes.contacts}
              className="btn btn-icon btn-white active"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              aria-label="Grid"
              data-bs-original-title="Grid View"
            >
              <i className="ti ti-layout-grid" />
            </Link>
            <Link
              to={all_routes.contactList}
              className="btn btn-icon btn-white"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              aria-label="List"
              data-bs-original-title="List View"
            >
              <i className="ti ti-layout-list" />
            </Link>
            <Link
              to="#"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#add_modal"
            >
              <i className="ti ti-square-rounded-plus me-1" />
              New Contact
            </Link>
          </div>
        </div>
        {/* End Page Header */}
        <div className="row">
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-16.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">James Jackson</Link>
                    </h6>
                    <p className="fs-13 mb-0">jamesjackson@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-07.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Robin Coffin</Link>
                    </h6>
                    <p className="fs-13 mb-0">robin@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-02.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Vincent Thornburg</Link>
                    </h6>
                    <p className="fs-13 mb-0">vincent@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-05.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Fran Faulkner</Link>
                    </h6>
                    <p className="fs-13 mb-0">franfaulkner@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-04.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Ernestine Waller</Link>
                    </h6>
                    <p className="fs-13 mb-0">Waller@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-17.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Jared Adams</Link>
                    </h6>
                    <p className="fs-13 mb-0">jaredadams@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-10.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Reyna Pelfrey</Link>
                    </h6>
                    <p className="fs-13 mb-0">renyapelfrey@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-09.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Rafael Lowe</Link>
                    </h6>
                    <p className="fs-13 mb-0">rafeallowe@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-18.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Enrique Ratcliff</Link>
                    </h6>
                    <p className="fs-13 mb-0">enrique@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-08.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Elizabeth Pegues</Link>
                    </h6>
                    <p className="fs-13 mb-0">elizabeth@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-19.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Jenna Alford</Link>
                    </h6>
                    <p className="fs-13 mb-0">jennaalford@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-20.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Teresa Boggs</Link>
                    </h6>
                    <p className="fs-13 mb-0">teresaboggs@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-21.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Doris Lees</Link>
                    </h6>
                    <p className="fs-13 mb-0">dorislees@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-22.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Michael Anderson</Link>
                    </h6>
                    <p className="fs-13 mb-0">michael@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-06.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">jasmine</Link>
                    </h6>
                    <p className="fs-13 mb-0">jasmine@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-23.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Barbara Reynolds</Link>
                    </h6>
                    <p className="fs-13 mb-0">barbara@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-11.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Allen Snyder</Link>
                    </h6>
                    <p className="fs-13 mb-0">allensnyder@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-12.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Patrick Barnes</Link>
                    </h6>
                    <p className="fs-13 mb-0">patrick@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-27.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Lynne Paz</Link>
                    </h6>
                    <p className="fs-13 mb-0">lynnepaz@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-24.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Jason Tapia</Link>
                    </h6>
                    <p className="fs-13 mb-0">jansontapia@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-25.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Jaime Johnson</Link>
                    </h6>
                    <p className="fs-13 mb-0">jaimejohnson@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-26.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Andrea Meek</Link>
                    </h6>
                    <p className="fs-13 mb-0">andreameek@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-01.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Benjamin Culpepper</Link>
                    </h6>
                    <p className="fs-13 mb-0">benjamin@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="avatar flex-shrink-0 me-2"
                  >
                    <ImageWithBasePath src="assets/img/chat/chat-user-14.jpg" alt="user" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">
                      <Link to="#">Charlotte Howard</Link>
                    </h6>
                    <p className="fs-13 mb-0">chaelotte@example.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Link to={all_routes.voiceCall} className="btn btn-icon btn-light" aria-label="Voice Call">
                      <i className="ti ti-phone-calling" />
                    </Link>
                    <Link to={all_routes.chat} className="btn btn-icon btn-light" aria-label="Chat">
                      <i className="ti ti-message-chatbot" />
                    </Link>
                    <Link to={all_routes.videoCall} className="btn btn-icon btn-light" aria-label="Video Call">
                      <i className="ti ti-video-plus" />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-icon btn-outline-light"
                      data-bs-toggle="dropdown"
                     aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                      <i className="ti ti-dots-vertical" aria-hidden="true" />
                    </Link>
                    <ul className="dropdown-menu p-2">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="ti ti-edit me-1" />
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="ti ti-trash me-1" />
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Content */}
      {/* Start Footer */}
     <CommonFooter/>
      {/* End Footer */}
    </div>
    {/* ========================
              End Page Content
          ========================= */}
          <ContactModal/>
  </>
  
  )
}

export default Contacts