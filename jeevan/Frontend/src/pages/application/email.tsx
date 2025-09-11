import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CommonFooter from "../../components/common-footer/commonFooter";
import { all_routes } from "../../routes/all_routes";
import ImageWithBasePath from "../../components/image-with-base-path";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";



const Email = () => {
  // State to manage checkbox selections
  const [selectAll, setSelectAll] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  
  // State to manage star ratings for each email
  const [emailRatings, setEmailRatings] = useState<{ [key: number]: number }>({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0
  });

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedEmails([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    } else {
      setSelectedEmails([]);
    }
  };

  // Handle individual email checkbox
  const handleEmailSelect = (emailId: number, checked: boolean) => {
    if (checked) {
      setSelectedEmails((prev) => [...prev, emailId]);
    } else {
      setSelectedEmails((prev) => prev.filter((id) => id !== emailId));
    }
  };

  // Handle star rating click
  const handleStarClick = (emailId: number, _starIndex: number) => {
    setEmailRatings(prev => ({
      ...prev,
      [emailId]: prev[emailId] === 1 ? 0 : 1
    }));
  };

  // Update select all state based on individual selections
  useEffect(() => {
    if (selectedEmails.length === 11) {
      setSelectAll(true);
    } else if (selectedEmails.length === 0) {
      setSelectAll(false);
    } else {
      setSelectAll(false);
    }
  }, [selectedEmails]);

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
              <div className="row g-0 flex-fill-0">
                <div className="col-lg-3 col-md-4">
                  <OverlayScrollbarsComponent style={{ overflow: "auto"}}
                    className=" p-4 pb-0 pb-sm-4 mail-sidebar border-end h-100"
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
                              aria-expanded="true"
                              aria-controls="flush-collapseOne"
                            >
                              Mail
                            </button>
                          </h2>
                          <div
                            id="flush-collapseOne"
                            className="accordion-collapse collapse show"
                          >
                            <div className="nav flex-column mt-2">
                              <Link
                                to={all_routes.email}
                                className="d-flex text-start align-items-center fw-medium fs-14 bg-light rounded p-2 mb-1"
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
                              className="accordion-button fw-semibold p-0 bg-transparent collapsed"
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
                            className="accordion-collapse collapse"
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
                            className="accordion-collapse collapse"
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
                <div className="col-lg-9 col-md-8">
                  {/* card start */}
                  <div className="card border-0 mb-0 ">
                    <div className="card-header d-flex align-items-center flex-wrap gap-2 justify-content-between px-3">
                      <div className="d-flex align-items-center gap-2">
                        <div className="form-check form-check-md">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="select-all"
                            checked={selectAll}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                          />
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Archive"
                          >
                            <i className="ti ti-archive" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Delete"
                          >
                            <i className="ti ti-trash" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-light"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Report Spam"
                          >
                            <i className="ti ti-message-report" />
                          </Link>
                          <div>
                            <Link
                              to="#"
                              className="btn btn-icon btn-light"
                              data-bs-toggle="dropdown"
                              aria-label="Lab result actions menu"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i
                                className="ti ti-dots-vertical"
                                aria-hidden="true"
                              />
                            </Link>
                            <ul className="dropdown-menu p-2">
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item d-flex align-items-center"
                                >
                                  Recent
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item d-flex align-items-center"
                                >
                                  Unread
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item d-flex align-items-center"
                                >
                                  Mark All Read
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item d-flex align-items-center"
                                >
                                  Spam
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item d-flex align-items-center"
                                >
                                  Delete All
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="input-group w-auto input-group-flat">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <OverlayScrollbarsComponent style={{ height: "100%", width: "100%" }} className="mail-messages " data-simplebar="">
                        <div>
                          {/* table start */}
                          <div className="table-responsive table-nowrap custom-border">
                            <table className="table border-0 w-100">
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <div className="form-check form-check-md d-flex align-items-center">
                                        <input
                                          className="form-check-input mail-check-input"
                                          type="checkbox"
                                          checked={selectedEmails.includes(1)}
                                          onChange={(e) =>
                                            handleEmailSelect(
                                              1,
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </div>
                                                                             <span 
                                         className="star d-flex align-items-center" 
                                         onClick={() => handleStarClick(1, 0)}
                                         style={{ cursor: 'pointer' }}
                                       >
                                         <i className={`ti ${emailRatings[1] > 0 ? 'ti-star-filled text-warning' : 'ti-star '} fs-16`} />
                                       </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <Link
                                        to={all_routes.emailDetails}
                                        className="avatar avatar-sm"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/users/user-02.jpg"
                                          alt="user"
                                        />
                                      </Link>
                                      <p className="fs-14 mb-0">
                                        <Link to={all_routes.emailDetails}>
                                          Sarah, me (7)
                                        </Link>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <h6 className="fs-14 mb-1">
                                        <Link to={all_routes.emailDetails}>
                                          [Reminder] Client Meeting at 3 PM
                                          Today
                                        </Link>
                                      </h6>
                                      <p className="mb-0">
                                        Hi John, just a quick reminder about our
                                        meeting with ABC Corp at 3 PM...
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="fs-13 text-dark fw-medium">
                                      4:15 PM
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <div className="form-check form-check-md d-flex align-items-center">
                                        <input
                                          className="form-check-input mail-check-input"
                                          type="checkbox"
                                          checked={selectedEmails.includes(2)}
                                          onChange={(e) =>
                                            handleEmailSelect(
                                              2,
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </div>
                                                                             <span 
                                         className="star d-flex align-items-center" 
                                         onClick={() => handleStarClick(2, 0)}
                                         style={{ cursor: 'pointer' }}
                                       >
                                         <i className={`ti ${emailRatings[2] > 0 ? 'ti-star-filled text-warning' : 'ti-star '} fs-16`} />
                                       </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <Link
                                        to={all_routes.emailDetails}
                                        className="avatar avatar-sm"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/users/user-01.jpg"
                                          alt="user"
                                        />
                                      </Link>
                                      <p className="fs-14 mb-0">
                                        <Link to={all_routes.emailDetails}>
                                          Mike, team (5)
                                        </Link>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <h6 className="fs-14 mb-1">
                                        <Link to={all_routes.emailDetails}>
                                          Submit Project Proposal
                                        </Link>
                                      </h6>
                                      <p className="mb-0">
                                        Hi Team, please ensure that your
                                        sections of the project proposal are
                                        sub...
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="fs-13 text-dark fw-medium">
                                      5:00 PM
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <div className="form-check form-check-md d-flex align-items-center">
                                        <input
                                          className="form-check-input mail-check-input"
                                          type="checkbox"
                                          checked={selectedEmails.includes(3)}
                                          onChange={(e) =>
                                            handleEmailSelect(
                                              3,
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </div>
                                      <span 
                                        className="star d-flex align-items-center" 
                                        onClick={() => handleStarClick(3, 0)}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <i className={`ti ${emailRatings[3] > 0 ? 'ti-star-filled text-warning' : 'ti-star '} fs-16`} />
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <Link
                                        to={all_routes.emailDetails}
                                        className="avatar avatar-sm"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/users/user-06.jpg"
                                          alt="user"
                                        />
                                      </Link>
                                      <p className="fs-14 mb-0">
                                        <Link to={all_routes.emailDetails}>
                                          Anna
                                        </Link>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <h6 className="fs-14 d-flex align-items-center mb-1 fw-normal">
                                        <Link to={all_routes.emailDetails}>
                                          Team Outing Next Friday
                                        </Link>
                                        <span className="badge bg-info ms-2">
                                          Markting
                                        </span>
                                      </h6>
                                      <p className="mb-0">
                                        Hello Everyone, we're planning a team
                                        outing next Friday. Please RSVP by...
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="fs-13 text-dark fw-medium">
                                      1:00 PM
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <div className="form-check form-check-md d-flex align-items-center">
                                        <input
                                          className="form-check-input mail-check-input"
                                          type="checkbox"
                                          checked={selectedEmails.includes(4)}
                                          onChange={(e) =>
                                            handleEmailSelect(
                                              4,
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </div>
                                      <span 
                                        className="star d-flex align-items-center" 
                                        onClick={() => handleStarClick(4, 0)}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <i className={`ti ${emailRatings[4] > 0 ? 'ti-star-filled text-warning' : 'ti-star '} fs-16`} />
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <Link
                                        to={all_routes.emailDetails}
                                        className="avatar avatar-sm"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/users/user-03.jpg"
                                          alt="user"
                                        />
                                      </Link>
                                      <p className="fs-14 mb-0">
                                        <Link to={all_routes.emailDetails}>
                                          Tom
                                        </Link>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <h6 className="fs-14 d-flex align-items-center mb-1">
                                        <Link to={all_routes.emailDetails}>
                                          [Update] New Design Guidelines
                                          Available
                                        </Link>
                                        <span className="badge bg-warning ms-2">
                                          Client
                                        </span>
                                      </h6>
                                      <p className="mb-0">
                                        Hi all, the new design guidelines have
                                        been finalized and are now available...
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="fs-13 text-dark fw-medium">
                                      3:30 PM
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <div className="form-check form-check-md d-flex align-items-center">
                                        <input
                                          className="form-check-input mail-check-input"
                                          type="checkbox"
                                          checked={selectedEmails.includes(5)}
                                          onChange={(e) =>
                                            handleEmailSelect(
                                              5,
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </div>
                                      <span 
                                        className="star d-flex align-items-center" 
                                        onClick={() => handleStarClick(5, 0)}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <i className={`ti ${emailRatings[5] > 0 ? 'ti-star-filled text-warning' : 'ti-star '} fs-16`} />
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <Link
                                        to={all_routes.emailDetails}
                                        className="avatar avatar-sm"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/users/user-16.jpg"
                                          alt="user"
                                        />
                                      </Link>
                                      <p className="fs-14 mb-0">
                                        <Link to={all_routes.emailDetails}>
                                          Lisa
                                        </Link>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <h6 className="fs-14 mb-1 fw-normal">
                                        <Link to={all_routes.emailDetails}>
                                          [Event] Webinar on Social Media
                                          Strategy
                                        </Link>
                                      </h6>
                                      <p className="mb-0">
                                        Don't forget to register for our webinar
                                        covering advanced social media stra...
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="fs-13 text-dark fw-medium">
                                      2:45 PM
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <div className="form-check form-check-md d-flex align-items-center">
                                        <input
                                          className="form-check-input mail-check-input"
                                          type="checkbox"
                                          checked={selectedEmails.includes(6)}
                                          onChange={(e) =>
                                            handleEmailSelect(
                                              6,
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </div>
                                      <span 
                                        className="star d-flex align-items-center" 
                                        onClick={() => handleStarClick(6, 0)}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <i className={`ti ${emailRatings[6] > 0 ? 'ti-star-filled text-warning' : 'ti-star '} fs-16`} />
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <Link
                                        to={all_routes.emailDetails}
                                        className="avatar avatar-sm"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/users/user-05.jpg"
                                          alt="user"
                                        />
                                      </Link>
                                      <p className="fs-14 mb-0">
                                        <Link to={all_routes.emailDetails}>
                                          Jason, me (9)
                                        </Link>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <h6 className="fs-14 mb-1">
                                        <Link to={all_routes.emailDetails}>
                                          [Reminder] Sales Targets Review
                                        </Link>
                                      </h6>
                                      <p className="mb-0">
                                        Hey Team, please prepare your sales
                                        reports for the review meeting
                                        schedul...
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="fs-13 text-dark fw-medium">
                                      10:00 AM
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <div className="form-check form-check-md d-flex align-items-center">
                                        <input
                                          className="form-check-input mail-check-input"
                                          type="checkbox"
                                          checked={selectedEmails.includes(7)}
                                          onChange={(e) =>
                                            handleEmailSelect(
                                              7,
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </div>
                                      <span 
                                        className="star d-flex align-items-center" 
                                        onClick={() => handleStarClick(7, 0)}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <i className={`ti ${emailRatings[7] > 0 ? 'ti-star-filled text-warning' : 'ti-star '} fs-16`} />
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <Link
                                        to={all_routes.emailDetails}
                                        className="avatar avatar-sm"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/users/user-22.jpg"
                                          alt="user"
                                        />
                                      </Link>
                                      <p className="fs-14 mb-0">
                                        <Link to={all_routes.emailDetails}>
                                          Emily
                                        </Link>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <h6 className="fs-14 d-flex align-items-center mb-1 fw-normal">
                                        <Link to={all_routes.emailDetails}>
                                          [Alert] System Maintenance Scheduled
                                        </Link>
                                        <span className="badge bg-success ms-2">
                                          Personal
                                        </span>
                                      </h6>
                                      <p className="mb-0">
                                        Dear Team, please be aware that there
                                        will be system maintenance this Satu...
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="fs-13 text-dark fw-medium">
                                      12:00 AM
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <div className="form-check form-check-md d-flex align-items-center">
                                        <input
                                          className="form-check-input mail-check-input"
                                          type="checkbox"
                                          checked={selectedEmails.includes(8)}
                                          onChange={(e) =>
                                            handleEmailSelect(
                                              8,
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </div>
                                      <span 
                                        className="star d-flex align-items-center" 
                                        onClick={() => handleStarClick(8, 0)}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <i className={`ti ${emailRatings[8] > 0 ? 'ti-star-filled text-warning' : 'ti-star '} fs-16`} />
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <Link
                                        to={all_routes.emailDetails}
                                        className="avatar avatar-sm"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/users/user-07.jpg"
                                          alt="user"
                                        />
                                      </Link>
                                      <p className="fs-14 mb-0">
                                        <Link to={all_routes.emailDetails}>
                                          Kevin
                                        </Link>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <h6 className="fs-14 mb-1">
                                        <Link to={all_routes.emailDetails}>
                                          Expense Reports Due
                                        </Link>
                                      </h6>
                                      <p className="mb-0">
                                        Hi everyone, please submit all expense
                                        reports for Q3 by the end of this
                                        week...
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="fs-13 text-dark fw-medium">
                                      5:30 PM
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <div className="form-check form-check-md d-flex align-items-center">
                                        <input
                                          className="form-check-input mail-check-input"
                                          type="checkbox"
                                          checked={selectedEmails.includes(9)}
                                          onChange={(e) =>
                                            handleEmailSelect(
                                              9,
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </div>
                                      <span 
                                        className="star d-flex align-items-center" 
                                        onClick={() => handleStarClick(9, 0)}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <i className={`ti ${emailRatings[9] > 0 ? 'ti-star-filled text-warning' : 'ti-star '} fs-16`} />
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <Link
                                        to={all_routes.emailDetails}
                                        className="avatar avatar-sm"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/users/user-24.jpg"
                                          alt="user"
                                        />
                                      </Link>
                                      <p className="fs-14 mb-0">
                                        <Link to={all_routes.emailDetails}>
                                          Rachel
                                        </Link>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <h6 className="fs-14 mb-1 fw-normal">
                                        <Link to={all_routes.emailDetails}>
                                          Beta Testing
                                        </Link>
                                      </h6>
                                      <p className="mb-0">
                                        Hi Team, your feedback on the latest
                                        beta release is crucial. Please
                                        complete...
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="fs-13 text-dark fw-medium">
                                      4:00 PM
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <div className="form-check form-check-md d-flex align-items-center">
                                        <input
                                          className="form-check-input mail-check-input"
                                          type="checkbox"
                                          checked={selectedEmails.includes(10)}
                                          onChange={(e) =>
                                            handleEmailSelect(
                                              10,
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </div>
                                      <span 
                                        className="star d-flex align-items-center" 
                                        onClick={() => handleStarClick(10, 0)}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <i className={`ti ${emailRatings[10] > 0 ? 'ti-star-filled text-warning' : 'ti-star '} fs-16`} />
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <Link
                                        to={all_routes.emailDetails}
                                        className="avatar avatar-sm"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/users/user-08.jpg"
                                          alt="user"
                                        />
                                      </Link>
                                      <p className="fs-14 mb-0">
                                        <Link to={all_routes.emailDetails}>
                                          David
                                        </Link>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <h6 className="fs-14 mb-1 fw-normal">
                                        <Link to={all_routes.emailDetails}>
                                          [Reminder] Contract Renewals
                                        </Link>
                                      </h6>
                                      <p className="mb-0">
                                        Attention all, please ensure that all
                                        contract renewals are reviewed and...
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="fs-13 text-dark fw-medium">
                                      11:00 AM
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <div className="form-check form-check-md d-flex align-items-center">
                                        <input
                                          className="form-check-input mail-check-input"
                                          type="checkbox"
                                          checked={selectedEmails.includes(11)}
                                          onChange={(e) =>
                                            handleEmailSelect(
                                              11,
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </div>
                                      <span 
                                        className="star d-flex align-items-center" 
                                        onClick={() => handleStarClick(11, 0)}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <i className={`ti ${emailRatings[11] > 0 ? 'ti-star-filled text-warning' : 'ti-star '} fs-16`} />
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center gap-3">
                                      <Link
                                        to={all_routes.emailDetails}
                                        className="avatar avatar-sm"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/users/user-25.jpg"
                                          alt="user"
                                        />
                                      </Link>
                                      <p className="fs-14 mb-0">
                                        <Link to={all_routes.emailDetails}>
                                          Nina, me (9)
                                        </Link>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <h6 className="fs-14 mb-1 fw-normal">
                                        <Link to={all_routes.emailDetails}>
                                          [Notice] Policy Changes
                                        </Link>
                                      </h6>
                                      <p className="mb-0">
                                        Hello Team, we have implemented some
                                        policy changes effective immediately...
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="fs-13 text-dark fw-medium">
                                      9:00 AM
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          {/* table start */}
                        </div>
                      </OverlayScrollbarsComponent>
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

export default Email;
