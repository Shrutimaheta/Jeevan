import  { useState, Suspense, lazy } from "react"
import { Link } from "react-router-dom"
import CommonFooter from "../../components/common-footer/commonFooter"
import { all_routes } from "../../routes/all_routes"
import ImageWithBasePath from "../../components/image-with-base-path"
import SearchInput from "../../components/data-table/dataTableSearch"


const ContactModal = lazy(() => import("./contactModal"));

const ContactList = () => {




   const [searchText, setSearchText] = useState<string>("");
  const handleSearch = (value: string) => {
    setSearchText(value);
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
              className="btn btn-icon btn-white"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              aria-label="Grid"
              data-bs-original-title="Grid View"
            >
              <i className="ti ti-layout-grid" />
            </Link>
            <Link
              to={all_routes.contactList}
              className="btn btn-icon btn-white active"
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
        {/* card start */}
        <div className="card mb-0">
          <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between">
            <h6 className="d-inline-flex align-items-center mb-0">
              Contacts<span className="badge bg-danger ms-2">658</span>
            </h6>
            <div className="d-flex align-items-center flex-wrap gap-2">
              <div className="search-set">
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <div className="table-search d-flex align-items-center mb-0">
                    <div className="search-input">
                      <Link to="#" className="btn-searchset">
                        <i className="ti ti-search" />
                      </Link>
                      <SearchInput value={searchText} onChange={handleSearch} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown">
                <Link
                  to="#"
                  className="dropdown-toggle btn btn-md btn-outline-light d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                 aria-label="Lab result actions menu" aria-haspopup="true" aria-expanded="false">
                  <i className="ti ti-sort-descending-2 me-1" />
                  <span className="me-1">Sort By : </span> Newest
                </Link>
                <ul className="dropdown-menu  dropdown-menu-end p-2">
                  <li>
                    <Link
                      to="#"
                      className="dropdown-item rounded-1"
                    >
                      Newest
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="dropdown-item rounded-1"
                    >
                      Oldest
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-body">
            {/* table start */}
            <div className="table-responsive table-nowrap">
              <table className="table border mb-0 datatable">
                <thead className="table-light">
                  <tr>
                    
                    <th className="no-sort">Name</th>
                    <th className="no-sort">Phone</th>
                    <th className="no-sort">Email ID</th>
                    <th className="no-sort" />
                    <th className="no-sort" />
                  </tr>
                </thead>
                <tbody>
                  {/* For each static row, add checked and onChange logic */}
                  <tr>
                   
                    <td>
                      <div className="d-flex align-items-center">
                        <Link
                          to="#"
                          className="avatar avatar-sm flex-shrink-0 me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/chat/chat-user-16.jpg"
                            alt="user"
                          />
                        </Link>
                        <h6 className="fs-14 fw-semibold mb-0">
                          <Link to="#">James Jackson</Link>
                        </h6>
                      </div>
                    </td>
                    <td>(123) 4567 890</td>
                    <td>jamesjackson@example.com</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link
                          to={all_routes.voiceCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-phone-calling" />
                        </Link>
                        <Link to={all_routes.chat} className="btn btn-icon btn-light"> 
                          <i className="ti ti-message-chatbot" />
                        </Link>
                        <Link
                          to={all_routes.videoCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-video-plus" />
                        </Link>
                      </div>
                    </td>
                    <td>
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
                    </td>
                  </tr>
                  <tr>
                    
                    <td>
                      <div className="d-flex align-items-center">
                        <Link
                          to="#"
                          className="avatar avatar-sm flex-shrink-0 me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/chat/chat-user-07.jpg"
                            alt="user"
                          />
                        </Link>
                        <h6 className="fs-14 fw-semibold mb-0">
                          <Link to="#">Robin Coffin</Link>
                        </h6>
                      </div>
                    </td>
                    <td>(179) 7382 829</td>
                    <td>robin@example.com</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link
                          to={all_routes.voiceCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-phone-calling" />
                        </Link>
                        <Link to={all_routes.chat} className="btn btn-icon btn-light"> 
                          <i className="ti ti-message-chatbot" />
                        </Link>
                        <Link
                          to={all_routes.videoCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-video-plus" />
                        </Link>
                      </div>
                    </td>
                    <td>
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
                    </td>
                  </tr>
                  <tr>
                    
                    <td>
                      <div className="d-flex align-items-center">
                        <Link
                          to="#"
                          className="avatar avatar-sm flex-shrink-0 me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/chat/chat-user-02.jpg"
                            alt="user"
                          />
                        </Link>
                        <h6 className="fs-14 fw-semibold mb-0">
                          <Link to="#">Vincent Thornburg</Link>
                        </h6>
                      </div>
                    </td>
                    <td>(184) 2719 738</td>
                    <td>vincent@example.com</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link
                          to={all_routes.voiceCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-phone-calling" />
                        </Link>
                        <Link to={all_routes.chat} className="btn btn-icon btn-light">
                          <i className="ti ti-message-chatbot" />
                        </Link>
                        <Link
                          to={all_routes.videoCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-video-plus" />
                        </Link>
                      </div>
                    </td>
                    <td>
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
                    </td>
                  </tr>
                  <tr>
                   
                    <td>
                      <div className="d-flex align-items-center">
                        <Link
                          to="#"
                          className="avatar avatar-sm flex-shrink-0 me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/chat/chat-user-05.jpg"
                            alt="user"
                          />
                        </Link>
                        <h6 className="fs-14 fw-semibold mb-0">
                          <Link to="#">Fran Faulkner</Link>
                        </h6>
                      </div>
                    </td>
                    <td>(184) 2719 738</td>
                    <td>franfaulker@example.com</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link
                          to={all_routes.voiceCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-phone-calling" />
                        </Link>
                        <Link to={all_routes.chat} className="btn btn-icon btn-light"> 
                          <i className="ti ti-message-chatbot" />
                        </Link>
                        <Link
                          to={all_routes.videoCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-video-plus" />
                        </Link>
                      </div>
                    </td>
                    <td>
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
                    </td>
                  </tr>
                  <tr>
                  
                    <td>
                      <div className="d-flex align-items-center">
                        <Link
                          to="#"
                          className="avatar avatar-sm flex-shrink-0 me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/chat/chat-user-04.jpg"
                            alt="user"
                          />
                        </Link>
                        <h6 className="fs-14 fw-semibold mb-0">
                          <Link to="#">Ernestine Waller</Link>
                        </h6>
                      </div>
                    </td>
                    <td>(183) 9302 890</td>
                    <td>waller@example.com</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link
                          to={all_routes.voiceCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-phone-calling" />
                        </Link>
                        <Link to={all_routes.chat} className="btn btn-icon btn-light"> 
                          <i className="ti ti-message-chatbot" />
                        </Link>
                        <Link
                          to={all_routes.videoCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-video-plus" />
                        </Link>
                      </div>
                    </td>
                    <td>
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
                    </td>
                  </tr>
                  <tr>
                    
                    <td>
                      <div className="d-flex align-items-center">
                        <Link
                          to="#"
                          className="avatar avatar-sm flex-shrink-0 me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/chat/chat-user-17.jpg"
                            alt="user"
                          />
                        </Link>
                        <h6 className="fs-14 fw-semibold mb-0">
                          <Link to="#">Jared Adams</Link>
                        </h6>
                      </div>
                    </td>
                    <td>(120) 3728 039</td>
                    <td>jaredadams@example.com</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link
                          to={all_routes.voiceCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-phone-calling" />
                        </Link>
                        <Link to={all_routes.chat} className="btn btn-icon btn-light"> 
                          <i className="ti ti-message-chatbot" />
                        </Link>
                        <Link
                          to={all_routes.videoCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-video-plus" />
                        </Link>
                      </div>
                    </td>
                    <td>
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
                    </td>
                  </tr>
                  <tr>
                    
                    <td>
                      <div className="d-flex align-items-center">
                        <Link
                          to="#"
                          className="avatar avatar-sm flex-shrink-0 me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/chat/chat-user-10.jpg"
                            alt="user"
                          />
                        </Link>
                        <h6 className="fs-14 fw-semibold mb-0">
                          <Link to="#">Reyna Pelfrey</Link>
                        </h6>
                      </div>
                    </td>
                    <td>(102) 8480 832</td>
                    <td>reynapelfrey@example.com</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link
                          to={all_routes.voiceCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-phone-calling" />
                        </Link>
                        <Link to={all_routes.chat} className="btn btn-icon btn-light"> 
                          <i className="ti ti-message-chatbot" />
                        </Link>
                        <Link
                          to={all_routes.videoCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-video-plus" />
                        </Link>
                      </div>
                    </td>
                    <td>
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
                    </td>
                  </tr>
                  <tr>
                   
                    <td>
                      <div className="d-flex align-items-center">
                        <Link
                          to="#"
                          className="avatar avatar-sm flex-shrink-0 me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/chat/chat-user-09.jpg"
                            alt="user"
                          />
                        </Link>
                        <h6 className="fs-14 fw-semibold mb-0">
                          <Link to="#">Rafael Lowe</Link>
                        </h6>
                      </div>
                    </td>
                    <td>(162) 8920 713</td>
                    <td>rafeallowe@example.com</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link
                          to={all_routes.voiceCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-phone-calling" />
                        </Link>
                        <Link to={all_routes.chat} className="btn btn-icon btn-light"> 
                          <i className="ti ti-message-chatbot" />
                        </Link>
                        <Link
                          to={all_routes.videoCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-video-plus" />
                        </Link>
                      </div>
                    </td>
                    <td>
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
                    </td>
                  </tr>
                  <tr>
                   
                    <td>
                      <div className="d-flex align-items-center">
                        <Link
                          to="#"
                          className="avatar avatar-sm flex-shrink-0 me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/chat/chat-user-18.jpg"
                            alt="user"
                          />
                        </Link>
                        <h6 className="fs-14 fw-semibold mb-0">
                          <Link to="#">Enrique Ratcliff</Link>
                        </h6>
                      </div>
                    </td>
                    <td>(189) 0920 723</td>
                    <td>enrique@example.com</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link
                          to={all_routes.voiceCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-phone-calling" />
                        </Link>
                        <Link to={all_routes.chat} className="btn btn-icon btn-light"> 
                          <i className="ti ti-message-chatbot" />
                        </Link>
                        <Link
                          to={all_routes.videoCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-video-plus" />
                        </Link>
                      </div>
                    </td>
                    <td>
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
                    </td>
                  </tr>
                  <tr>
                  
                    <td>
                      <div className="d-flex align-items-center">
                        <Link
                          to="#"
                          className="avatar avatar-sm flex-shrink-0 me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/chat/chat-user-08.jpg"
                            alt="user"
                          />
                        </Link>
                        <h6 className="fs-14 fw-semibold mb-0">
                          <Link to="#">Elizabeth Pegues</Link>
                        </h6>
                      </div>
                    </td>
                    <td>(168) 8392 823</td>
                    <td>elizabeth@example.com</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link
                          to={all_routes.voiceCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-phone-calling" />
                        </Link>
                        <Link to={all_routes.chat} className="btn btn-icon btn-light"> 
                          <i className="ti ti-message-chatbot" />
                        </Link>
                        <Link
                          to={all_routes.videoCall}
                          className="btn btn-icon btn-light"
                        >
                          <i className="ti ti-video-plus" />
                        </Link>
                      </div>
                    </td>
                    <td>
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* table end */}
          </div>
        </div>
        {/* card start */}
      </div>
      {/* End Content */}
      {/* Start Footer */}
     <CommonFooter/>
      {/* End Footer */}
    </div>
    {/* ========================
              End Page Content
          ========================= */}
          <Suspense fallback={<div />}><ContactModal/></Suspense>
  </>
  )
}

export default ContactList