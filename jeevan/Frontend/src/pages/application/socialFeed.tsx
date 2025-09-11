import  { useState } from "react"
import { Link } from "react-router-dom"
import { all_routes } from "../../routes/all_routes"
import ImageWithBasePath from "../../components/image-with-base-path"
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const SocialFeed = () => {

  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [open, setOpen] = useState(false);
  const galleryImages = [
    { src: "src/assets/img/social/gallery-big-01.jpg", alt: "Gallery 1" },
    { src: "src/assets/img/social/gallery-big-03.jpg", alt: "Gallery 2" },
    { src: "src/assets/img/social/gallery-big-02.jpg", alt: "Gallery 3" },
    { src: "src/assets/img/social/gallery-big-04.jpg", alt: "Gallery 4" },
  ]
  const galleryThumbs = [
    "src/assets/img/social/gallery-01.jpg",
    "src/assets/img/social/gallery-03.jpg",
    "src/assets/img/social/gallery-02.jpg",
    "src/assets/img/social/gallery-04.jpg",
  ]
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
            <h4 className="mb-1">Social Feed</h4>
            <div className="text-end">
              <ol className="breadcrumb m-0 py-0">
                <li className="breadcrumb-item">
                  <Link to={all_routes.dashboard}>Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#">Applications</Link>
                </li>
                <li className="breadcrumb-item active">Social Feed</li>
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
            <Link
              to="#"
              className="btn btn-icon btn-white"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              aria-label="Download"
              data-bs-original-title="Download"
            >
              <i className="ti ti-cloud-download" />
            </Link>
          </div>
        </div>
        {/* End Page Header */}
        <div className="card ">
          <div className="card-body p-0">
            {/* start row */}
            <div className="row">
              <div className="col-xl-3 theiaStickySidebar">
                <div className="border-end p-4 filemanager-left-sidebar">
                  <div className="p-0">
                    <div className="border shadow-sm rounded p-3 mb-3 position-relative">
                      <div className="text-center">
                        <Link
                          to="#"
                          className="avatar avatar-xl online avatar-rounded"
                        >
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-02.jpg"
                            alt="Img"
                          />
                        </Link>
                        <h6 className="fs-16 mb-1">
                          <Link to="#">James Hong </Link>
                        </h6>
                        <p className="fs-13 mb-0">@James Hong324</p>
                      </div>
                    
                      <div className="position-absolute end-0 top-0 p-2">
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
                              data-bs-target="#edit_todo"
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
                    <div className="mb-3">
                      <Link
                        to="#"
                        className="btn btn-primary d-inline-flex align-items-center justify-content-center w-100"
                      >
                        <i className="ti ti-square-rounded-plus me-2" />
                        Create Post
                      </Link>
                    </div>
                    <div className="files-list border-bottom pb-2 mb-3">
                      <Link
                        to="#"
                        className="d-flex align-items-center justify-content-between active fw-medium p-2"
                      >
                        <span>
                          <i className="ti ti-brand-feedly me-2" />
                          All Feeds
                        </span>
                        <span className="badge bg-danger badge-xs rounded-pill">
                          56
                        </span>
                      </Link>
                      <Link
                        to="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-mood-search me-2" />
                        Explore
                      </Link>
                      <Link
                        to="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-mail-check me-2" />
                        Messages
                      </Link>
                      <Link
                        to="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-list me-2" />
                        Lists
                      </Link>
                      <Link
                        to="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-bookmark me-2" />
                        Bookmark
                      </Link>
                      <Link
                        to="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-coffee me-2" />
                        Marketplace
                      </Link>
                      <Link
                        to="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-file-text me-2" />
                        Files
                      </Link>
                      <Link
                        to="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-music me-2" />
                        Media
                      </Link>
                      <Link
                        to="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-user-share me-2" />
                        Profile
                      </Link>
                    </div>
                    <div>
                      <div className="mb-2">
                        <h6 className="fs-16">Pages You Liked</h6>
                      </div>
                      <div>
                        <Link
                          to="#"
                          className="fw-medium d-flex align-items-center justify-content-between text-dark py-1 mb-2"
                        >
                          <span className="d-inline-flex align-items-center">
                            <ImageWithBasePath
                              src="assets/img/icons/liked-page-01.svg"
                              className="me-2"
                              alt="Img"
                            />
                            Dribble
                          </span>
                          <span className="btn btn-light btn-icon">
                            <i className="ti ti-thumb-down" />
                          </span>
                        </Link>
                        <Link
                          to="#"
                          className="fw-medium d-flex align-items-center justify-content-between text-dark py-1 mb-2"
                        >
                          <span className="d-inline-flex align-items-center">
                            <ImageWithBasePath
                              src="assets/img/icons/liked-page-02.svg"
                              className="me-2"
                              alt="Img"
                            />
                            UI/UX Designs
                          </span>
                          <span className="btn btn-light btn-icon">
                            <i className="ti ti-thumb-down" />
                          </span>
                        </Link>
                        <Link
                          to="#"
                          className="fw-medium d-flex align-items-center justify-content-between text-dark py-1"
                        >
                          <span className="d-inline-flex align-items-center">
                            <ImageWithBasePath
                              src="assets/img/icons/liked-page-03.svg"
                              className="me-2"
                              alt="Img"
                            />
                            Figma Update
                          </span>
                          <span className="btn btn-light btn-icon">
                            <i className="ti ti-thumb-down" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* end card body */}
                </div>
                {/* end card */}
              </div>{" "}
              {/* end col */}
              <div className="col-xl-6">
                <div className="pt-xl-4 mx-4 mx-xl-0">
                  <div className="card">
                    <div className="card-body">
                      <form>
                        <div className="mb-3">
                          <h5 className="fw-bold">Create Post</h5>
                          <div className="position-relative">
                            <textarea
                              className="form-control"
                              rows={2}
                              placeholder="What's on your mind?"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <Link
                              to="#"
                              className="btn btn-icon btn-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              aria-label="Photo"
                              data-bs-original-title="Photo"
                            >
                              <i className="ti ti-photo fs-16" />
                            </Link>
                            <Link
                              to="#"
                              className="btn btn-icon btn-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              aria-label="Link"
                              data-bs-original-title="Link"
                            >
                              <i className="ti ti-link fs-16" />
                            </Link>
                            <Link
                              to="#"
                              className="btn btn-icon btn-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              aria-label="Paperclip"
                              data-bs-original-title="Paperclip"
                            >
                              <i className="ti ti-paperclip fs-16" />
                            </Link>
                            <Link
                              to="#"
                              className="btn btn-icon btn-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              aria-label="Video"
                              data-bs-original-title="Video"
                            >
                              <i className="ti ti-video fs-16" />
                            </Link>
                            <Link
                              to="#"
                              className="btn btn-icon btn-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              aria-label="Hash"
                              data-bs-original-title="Hash"
                            >
                              <i className="ti ti-hash fs-16" />
                            </Link>
                            <Link
                              to="#"
                              className="btn btn-icon btn-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              aria-label="Map"
                              data-bs-original-title="Map"
                            >
                              <i className="ti ti-map-pin-heart fs-16" />
                            </Link>
                            <Link
                              to="#"
                              className="btn btn-icon btn-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              aria-label="Mood"
                              data-bs-original-title="Mood"
                            >
                              <i className="ti ti-mood-smile fs-16" />
                            </Link>
                          </div>
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <Link
                              to="#"
                              className="btn btn-icon btn-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              aria-label="Refresh"
                              data-bs-original-title="Refresh"
                            >
                              <i className="ti ti-refresh fs-16" />
                            </Link>
                            <Link
                              to="#"
                              className="btn btn-icon btn-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              aria-label="Trash"
                              data-bs-original-title="Trash"
                            >
                              <i className="ti ti-trash fs-16" />
                            </Link>
                            <Link
                              to="#"
                              className="btn btn-icon btn-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              aria-label="World"
                              data-bs-original-title="World"
                            >
                              <i className="ti ti-world fs-16" />
                            </Link>
                            <button
                              type="submit"
                              className="btn btn-primary d-inline-flex align-items-center"
                            >
                              <i className="ti ti-square-rounded-plus fs-16 me-2" />
                              Share Post
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* end card body */}
                  </div>
                  {/* end card */}
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <h5 className="mb-0">Popular Channels</h5>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                        <Link to="#">
                          <ImageWithBasePath src="assets/img/icons/channel-01.svg" alt="Img" />
                        </Link>
                        <Link to="#">
                          <ImageWithBasePath src="assets/img/icons/channel-02.svg" alt="Img" />
                        </Link>
                        <Link to="#">
                          <ImageWithBasePath src="assets/img/icons/channel-03.svg" alt="Img" />
                        </Link>
                        <Link to="#">
                          <ImageWithBasePath src="assets/img/icons/channel-04.svg" alt="Img" />
                        </Link>
                        <Link to="#">
                          <ImageWithBasePath src="assets/img/icons/channel-05.svg" alt="Img" />
                        </Link>
                        <Link to="#">
                          <ImageWithBasePath src="assets/img/icons/channel-06.svg" alt="Img" />
                        </Link>
                        <Link to="#">
                          <ImageWithBasePath src="assets/img/icons/channel-07.svg" alt="Img" />
                        </Link>
                        <Link to="#">
                          <ImageWithBasePath src="assets/img/icons/channel-08.svg" alt="Img" />
                        </Link>
                      </div>
                    </div>
                    {/* end card body */}
                  </div>
                  {/* end card */}
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap row-gap-3 pb-3">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-lg avatar-rounded flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-03.jpg"
                              alt="Img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-16 mb-1">
                              <Link to="#">
                                Richard Smith{" "}
                                <i className="ti ti-circle-check-filled text-success" />
                              </Link>
                            </h6>
                            <p className="d-flex align-items-center mb-0">
                              <span className="text-info">@richard442</span>
                              <i className="ti ti-circle-filled fs-7 mx-2" />
                              United Kingdom
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="mb-0 text-dark me-3">About 1 hr ago</p>
                          <div className="dropdown">
                            <Link
                              to="#"
                              className="btn btn-icon btn-outline-light"
                              data-bs-toggle="dropdown"
                              aria-expanded="true"
                             aria-label="Lab result actions menu" aria-haspopup="true" >
                              <i className="ti ti-dots-vertical" aria-hidden="true" />
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-edit me-2" />
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-eye me-2" />
                                  Hide Post
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-report me-2" />
                                  Report
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
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <p className="text-dark fw-medium">
                          "Believe in yourself and all that you are. Know that
                          there is something inside you that is greater than any
                          obstacle.
                          <Link
                            to="#"
                            className="text-info link-hover"
                          >
                            #MotivationMonday
                          </Link>
                          <Link
                            to="#"
                            className="text-info link-hover"
                          >
                            #Inspiration
                          </Link>{" "}
                          🌟"
                        </p>
                      </div>
                      <div className="mb-2">
                        <ImageWithBasePath
                          src="assets/img/social/social-feed-01.jpg"
                          className="rounded img-fluid"
                          alt="Img"
                        />
                      </div>
                      {/* Replace the gallery grid with lightbox-enabled thumbnails */}
                      <div className="row g-2 mb-2">
                        {galleryThumbs.map((thumb, idx) => (
                          <div className="col-md-3 col-3" key={thumb}>
                            <div className="img-full-view lightbox-thumb-wrapper">
                              <a
                                href="#"
                                className="image-popup-desc"
                                onClick={e => {
                                  e.preventDefault();
                                  setLightboxIndex(idx);
                                  setOpen(true);
                                }}
                              >
                                <img
                                  src={thumb}
                                  className="rounded img-fluid w-100"
                                  alt={`Gallery thumb ${idx + 1}`}
                                />
                                <span className="lightbox-thumb-backdrop"></span>
                                <span className="lightbox-thumb-eye">
                                  <i className="ti ti-eye" />
                                </span>
                              </a>
                            </div>
                          </div>
                        ))}
                        <Lightbox
                          open={open}
                          close={() => setOpen(false)}
                          slides={galleryImages.map(img => ({ src: img.src }))}
                          index={lightboxIndex}
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3  p-3">
                        <div className="d-flex align-items-center flex-wrap row-gap-3">
                          <Link
                            to="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="ti ti-heart me-2" />
                            340K Likes
                          </Link>
                          <Link
                            to="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="ti ti-message-dots me-2" />
                            45 Comments
                          </Link>
                          <Link
                            to="#"
                            className="d-inline-flex align-items-center"
                          >
                            <i className="ti ti-share-3 me-2" />
                            28 Share
                          </Link>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="btn btn-icon  border-0 btn-sm"
                          >
                            <i className="ti ti-heart-filled text-danger" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon  border-0 btn-sm"
                          >
                            <i className="ti ti-share" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon  border-0 btn-sm"
                          >
                            <i className="ti ti-message-star" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon border-0 btn-sm"
                          >
                            <i className="ti ti-bookmark-filled text-warning" />
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-start">
                        <Link
                          to="#"
                          className="avatar avatar-rounded me-2 flex-shrink-0"
                        >
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-04.jpg"
                            alt="Img"
                          />
                        </Link>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Comments"
                        />
                      </div>
                    </div>
                    {/* end card body */}
                  </div>
                  {/* end card */}
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap row-gap-3 pb-3">
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="avatar avatar-lg avatar-rounded flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-05.jpg"
                              alt="Img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-16 mb-1">
                              <Link to="#">
                                Jason Heier{" "}
                                <i className="ti ti-circle-check-filled text-success" />
                              </Link>
                            </h6>
                            <p className="d-flex align-items-center mb-0">
                              <span className="text-info">@jason118</span>
                              <i className="ti ti-circle-filled fs-7 mx-2" />{" "}
                              United Kingdom
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="mb-0 text-dark me-3">About 1 hr ago</p>
                          <div className="dropdown">
                            <Link
                              to="#"
                              className="btn btn-icon btn-outline-light"
                              data-bs-toggle="dropdown"
                              aria-expanded="true"
                             aria-label="Lab result actions menu" aria-haspopup="true">
                              <i className="ti ti-dots-vertical" aria-hidden="true" />
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-edit me-2" />
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-eye me-2" />
                                  Hide Post
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-report me-2" />
                                  Report
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
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <p className="text-dark fw-medium">
                          "Believe in yourself and all that you are. Know that
                          there is something inside you that is greater than any
                          obstacle.
                          <Link to="#" className="link-info">
                            #MotivationMonday{" "}
                          </Link>
                          <Link to="#" className="link-info">
                            {" "}
                            #Inspiration
                          </Link>
                          🌟"
                        </p>
                      </div>
                      <div className="card shadow-none mb-3">
                        <div className="card-img card-img-hover rounded-0">
                          <Link to="#" className="rounded-top">
                            <ImageWithBasePath
                              src="assets/img/social/social-feed-02.jpg"
                              className="rounded-top img-fluid"
                              alt="Img"
                            />
                          </Link>
                        </div>
                        <div className="card-body p-3">
                          <h6 className="mb-1 text-truncate">
                            <Link to="#">
                              Drinking water boosts skin health and beauty. Stay
                              hydrated!💧
                            </Link>
                          </h6>
                          <Link to="#">Health.com</Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-3">
                        <div className="d-flex align-items-center flex-wrap row-gap-3">
                          <Link
                            to="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="ti ti-heart me-2" />
                            340K Likes
                          </Link>
                          <Link
                            to="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="ti ti-message-dots me-2" />
                            45 Comments
                          </Link>
                          <Link
                            to="#"
                            className="d-inline-flex align-items-center"
                          >
                            <i className="ti ti-share-3 me-2" />
                            28 Share
                          </Link>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="btn btn-icon  border-0 btn-sm"
                          >
                            <i className="ti ti-heart-filled text-danger" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon  border-0 btn-sm"
                          >
                            <i className="ti ti-share" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon  border-0 btn-sm"
                          >
                            <i className="ti ti-message-star" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon  border-0 btn-sm"
                          >
                            <i className="ti ti-bookmark-filled text-warning" />
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-start">
                        <Link
                          to="#"
                          className="avatar avatar-rounded me-2 flex-shrink-0"
                        >
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-04.jpg"
                            alt="Img"
                          />
                        </Link>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Comments"
                        />
                      </div>
                    </div>
                    {/* end card body */}
                  </div>
                  {/* end card */}
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap row-gap-3 pb-3">
                        <div className="d-flex align-items-center">
                          <span className="avatar avatar-lg avatar-rounded flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-04.jpg"
                              alt="Img"
                            />
                          </span>
                          <div>
                            <h6 className="fs-16 mb-1">
                              <Link to="#">
                                Sophie Headrick{" "}
                                <i className="ti ti-circle-check-filled text-success" />
                              </Link>
                            </h6>
                            <p className="d-flex align-items-center mb-0">
                              <span className="text-info">@sophie241</span>
                              <i className="ti ti-circle-filled fs-7 mx-2" />{" "}
                              United Kingdom
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="mb-0 text-dark me-3">About 1 hr ago</p>
                          <div className="dropdown">
                            <Link
                              to="#"
                              className="btn btn-icon btn-outline-light"
                              data-bs-toggle="dropdown"
                              aria-expanded="true"
                             aria-label="Lab result actions menu" aria-haspopup="true">
                              <i className="ti ti-dots-vertical" aria-hidden="true" />
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-edit me-2" />
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-eye me-2" />
                                  Hide Post
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-report me-2" />
                                  Report
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
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <p className="text-dark fw-medium">
                          Excited to announce the launch of our new product! Get
                          yours now and enjoy a special discount.
                          <Link to="#" className="link-info">
                            #NewRelease{" "}
                          </Link>
                          <Link to="#" className="link-info">
                            {" "}
                            #Innovation
                          </Link>{" "}
                          🎉
                        </p>
                      </div>
                      <div className="card shadow-none mb-3">
                        <div className="card-img card-img-hover rounded-0">
                          <Link to="#" className="rounded-top">
                            <ImageWithBasePath
                              src="assets/img/social/social-feed-03.jpg"
                              className="rounded-top img-fluid"
                              alt="Img"
                            />
                          </Link>
                        </div>
                        <div className="card-body p-3">
                          <h6 className="mb-1 text-truncate">
                            <Link to="#">
                            More Than Just Likes. It's About Meaningful Moments
                            </Link>
                          </h6>
                          <Link to="#">PixSphere.com</Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-3 p-2">
                        <div className="d-flex align-items-center flex-wrap row-gap-3">
                          <Link
                            to="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="ti ti-heart me-2" />
                            340K Likes
                          </Link>
                          <Link
                            to="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="ti ti-message-dots me-2" />
                            45 Comments
                          </Link>
                          <Link
                            to="#"
                            className="d-inline-flex align-items-center"
                          >
                            <i className="ti ti-share-3 me-2" />
                            28 Share
                          </Link>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link
                            to="#"
                            className="btn btn-icon btn-sm  border-0"
                          >
                            <i className="ti ti-heart-filled text-danger" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-sm  border-0"
                          >
                            <i className="ti ti-share" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-sm  border-0"
                          >
                            <i className="ti ti-message-star" />
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-icon btn-sm  border-0"
                          >
                            <i className="ti ti-bookmark-filled text-warning" />
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3">
                        <Link
                          to="#"
                          className="avatar avatar-rounded flex-shrink-0 me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-02.jpg"
                            alt="Img"
                          />
                        </Link>
                        <div className="bg-light rounded flex-fill p-3">
                          <div className="d-flex align-items-center mb-1 justify-content-between">
                            <h6 className="fs-16 mb-0">
                              <Link to="#">Frank Hoffman</Link>
                            </h6>
                            <span className="me-2 text-end">12:45 PM</span>
                          </div>
                          <p className="mb-1">
                            Congratulations on the launch! I've been eagerly
                            waiting for this product, and the special discount
                            makes it even more exciting.
                          </p>
                          <Link
                            to="#"
                            className="d-inline-flex align-items-center"
                          >
                            <i className="ti ti-share-3 me-2" />
                            Reply
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 ms-4 ps-2">
                        <Link
                          to="#"
                          className="avatar avatar-rounded flex-shrink-0 me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-01.jpg"
                            alt="Img"
                          />
                        </Link>
                        <div className="bg-light rounded flex-fill p-3">
                          <div className="d-flex align-items-center mb-1 justify-content-between">
                            <h6 className="fs-16 mb-0">
                              <Link to="#">Sophie Headrick</Link>
                            </h6>
                            <span className="me-2 text-end">12:45 PM</span>
                          </div>
                          <p className="mb-1">
                            Thank you so much for your enthusiasm and support!
                          </p>
                          <Link
                            to="#"
                            className="d-inline-flex align-items-center"
                          >
                            <i className="ti ti-share-3 me-2" />
                            Reply
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3">
                        <Link
                          to="#"
                          className="avatar avatar-rounded flex-shrink-0 me-2"
                        >
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-04.jpg"
                            alt="Img"
                          />
                        </Link>
                        <div className="bg-light rounded flex-fill p-3">
                          <div className="d-flex align-items-center mb-1 justify-content-between">
                            <h6 className="fs-16 mb-0">
                              <Link to="#">Samuel Butler</Link>
                            </h6>
                            <span className="me-2 text-end">12:40 PM</span>
                          </div>
                          <p className="mb-1">
                            So thrilled to see this product finally launched! I've
                            heard amazing things about it and am excited to see
                            how it lives up to the hype.
                          </p>
                          <Link
                            to="#"
                            className="d-inline-flex align-items-center"
                          >
                            <i className="ti ti-share-3 me-2" />
                            Reply
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-start">
                        <span className="avatar avatar-rounded me-2 flex-shrink-0">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-05.jpg"
                            alt="Img"
                          />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Comments"
                        />
                      </div>
                    </div>
                    {/* end card body */}
                  </div>
                  {/* end card */}
                </div>
              </div>{" "}
              {/* end col */}
              <div className="col-xl-3 theiaStickySidebar">
                <div className="pe-4 mt-4 filemanager-left-sidebar">
                  <div className="card ">
                    <div className="card-body">
                      <h5 className="mb-3">Peoples</h5>
                      <div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="avatar avatar-rounded flex-shrink-0 me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-01.jpg"
                                alt="Img"
                              />
                            </Link>
                            <div>
                              <h6 className="d-inline-flex align-items-center fs-14 fw-medium mb-1">
                                <Link to="#">Anthony Lewis</Link>
                                <i className="ti ti-circle-check-filled text-success ms-1" />
                              </h6>
                              <span className="fs-12 d-block">United States</span>
                            </div>
                          </div>
                          <Link
                            to="#"
                            className="btn btn-light btn-icon"
                          >
                            <i className="ti ti-user-x" />
                          </Link>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="avatar avatar-rounded flex-shrink-0 me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-02.jpg"
                                alt="Img"
                              />
                            </Link>
                            <div>
                              <h6 className="d-inline-flex align-items-center fs-14 fw-medium mb-1">
                                <Link to="#">Harvey Smith</Link>
                              </h6>
                              <span className="fs-12 d-block">Ukrain</span>
                            </div>
                          </div>
                          <Link
                            to="#"
                            className="btn btn-light btn-icon"
                          >
                            <i className="ti ti-user-x" />
                          </Link>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="avatar avatar-rounded flex-shrink-0 me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-03.jpg"
                                alt="Img"
                              />
                            </Link>
                            <div>
                              <h6 className="d-inline-flex align-items-center fw-medium fs-14 mb-1">
                                <Link to="#">Stephan Peralt</Link>
                              </h6>
                              <span className="fs-12 d-block">Isreal</span>
                            </div>
                          </div>
                          <Link
                            to="#"
                            className="btn btn-light btn-icon"
                          >
                            <i className="ti ti-user-x" />
                          </Link>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="avatar avatar-rounded flex-shrink-0 me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-02.jpg"
                                alt="Img"
                              />
                            </Link>
                            <div>
                              <h6 className="d-inline-flex align-items-center fs-14 fw-medium mb-1">
                                <Link to="#">Doglas Martini</Link>
                              </h6>
                              <span className="fs-12 d-block">Belgium</span>
                            </div>
                          </div>
                          <Link
                            to="#"
                            className="btn btn-light btn-icon"
                          >
                            <i className="ti ti-user-x" />
                          </Link>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="avatar avatar-rounded flex-shrink-0 me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-09.jpg"
                                alt="Img"
                              />
                            </Link>
                            <div>
                              <h6 className="d-inline-flex align-items-center fs-14 fw-medium mb-1">
                                <Link to="#">Brian Villalobos</Link>
                                <i className="ti ti-circle-check-filled text-success ms-1" />
                              </h6>
                              <span className="fs-12 d-block">
                                United Kingdom
                              </span>
                            </div>
                          </div>
                          <Link
                            to="#"
                            className="btn btn-light btn-icon"
                          >
                            <i className="ti ti-user-x" />
                          </Link>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <Link
                              to="#"
                              className="avatar avatar-rounded flex-shrink-0 me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-02.jpg"
                                alt="Img"
                              />
                            </Link>
                            <div>
                              <h6 className="d-inline-flex align-items-center fs-14 fw-medium mb-1">
                                <Link to="#">Linda Ray</Link>
                              </h6>
                              <span className="fs-12 d-block">Argentina</span>
                            </div>
                          </div>
                          <Link
                            to="#"
                            className="btn btn-light btn-icon"
                          >
                            <i className="ti ti-user-x" />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <Link
                          to="#"
                          className="btn btn-outline-light text-dark w-100"
                        >
                          View All <i className="ti ti-arrow-right ms-2" />
                        </Link>
                      </div>
                    </div>
                    {/* end card body */}
                  </div>
                  {/* end card */}
                  <div className="card">
                    <div className="card-body">
                      <h5 className="mb-3">Saved Feeds</h5>
                      <div className="bg-light rounded p-2 mb-2">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <Link
                            to="#"
                            className="d-flex align-items-center"
                          >
                            <span>
                              <ImageWithBasePath
                                src="assets/img/icons/feeds-01.svg"
                                className="me-2"
                                alt="Img"
                              />
                            </span>
                            <p className="fs-13 fw-medium mb-0">World Health</p>
                          </Link>
                          <Link to="#">
                            <i className="ti ti-bookmark-filled text-warning" />
                          </Link>
                        </div>
                        <p className="text-dark fw-medium mb-0">
                          <Link to="#">
                            Retail investor party continues even as
                          </Link>
                        </p>
                      </div>
                      <div className="bg-light rounded p-2 mb-2">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <Link
                            to="#"
                            className="d-flex align-items-center"
                          >
                            <span>
                              <ImageWithBasePath
                                src="assets/img/icons/feeds-02.svg"
                                className="me-2"
                                alt="Img"
                              />
                            </span>
                            <p className="fs-13 fw-medium mb-0">T3 Tech</p>
                          </Link>
                          <Link to="#">
                            <i className="ti ti-bookmark-filled text-warning" />
                          </Link>
                        </div>
                        <p className="text-dark fw-medium mb-0">
                          <Link to="#">
                            Ipad Air (2020) vs Samsung Galaxy Tab
                          </Link>
                        </p>
                      </div>
                      <div className="bg-light rounded p-2 mb-2">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <Link
                            to="#"
                            className="d-flex align-items-center"
                          >
                            <span>
                              <ImageWithBasePath
                                src="assets/img/icons/feeds-03.svg"
                                className="me-2"
                                alt="Img"
                              />
                            </span>
                            <p className="fs-13 fw-medium mb-0">Fstoppers</p>
                          </Link>
                          <Link to="#">
                            <i className="ti ti-bookmark-filled text-warning" />
                          </Link>
                        </div>
                        <p className="text-dark fw-medium mb-0">
                          <Link to="#">
                            Beyond capital gains tax! Top 50 stock
                          </Link>
                        </p>
                      </div>
                      <div className="bg-light rounded p-2">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <Link
                            to="#"
                            className="d-flex align-items-center"
                          >
                            <span>
                              <ImageWithBasePath
                                src="assets/img/icons/feeds-04.svg"
                                className="me-2"
                                alt="Img"
                              />
                            </span>
                            <p className="fs-13 fw-medium mb-0">Evernote</p>
                          </Link>
                          <Link to="#">
                            <i className="ti ti-bookmark-filled text-warning" />
                          </Link>
                        </div>
                        <p className="text-dark fw-medium mb-0">
                          <Link to="#">
                            Sony Just Destroyed the Competition
                          </Link>
                        </p>
                      </div>
                      <div className="mt-3">
                        <Link
                          to="#"
                          className="btn btn-outline-light text-dark w-100"
                        >
                          View All <i className="ti ti-arrow-right ms-2" />
                        </Link>
                      </div>
                    </div>
                    {/* end card body */}
                  </div>
                  {/* end card */}
                  <div className="card">
                    <div className="card-body">
                      <h5 className="mb-3">Trending Hastags</h5>
                      <div className="d-flex align-items-center flex-wrap gap-1">
                        <Link
                          to="#"
                          className="link-info d-inline-flex"
                        >
                          #HealthTips
                        </Link>
                        <Link
                          to="#"
                          className="link-info d-inline-flex"
                        >
                          #Wellness
                        </Link>
                        <Link
                          to="#"
                          className="link-info d-inline-flex"
                        >
                          #Motivation
                        </Link>
                        <Link
                          to="#"
                          className="link-info d-inline-flex"
                        >
                          #Inspiration{" "}
                        </Link>
                      </div>
                    </div>
                    {/* end card body */}
                  </div>
                  {/* end card */}
                  <div className="card">
                    <div className="card-body">
                      <div className="card-img card-img-hover mb-3">
                        <Link to="#" className="rounded">
                          <ImageWithBasePath
                            src="assets/img/social/social-feed-04.jpg"
                            className="rounded img-fluid w-100"
                            alt="Img"
                          />
                        </Link>
                      </div>
                      <h6 className="text-center fs-14">
                        <Link to="#">
                          Enjoy Unlimited Access on a small price monthly.
                        </Link>
                      </h6>
                      <div className="mt-3">
                        <Link
                          to="#"
                          className="btn btn-outline-light text-dark w-100"
                        >
                          Upgrade Now <i className="ti ti-arrow-right ms-2" />
                        </Link>
                      </div>
                    </div>
                    {/* end card body */}
                  </div>
                  {/* end card */}
                  <div className="d-flex align-items-center flex-wrap justify-content-center gap-2 mb-3"></div>
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
      <footer className="footer text-center">
        <p className="mb-0 text-dark">
          2025 ©{" "}
          <Link to="#" className="link-primary">
            Dreams EMR
          </Link>{" "}
          - All Rights Reserved.
        </p>
      </footer>
      {/* End Footer */}
    </div>
    {/* ========================
              End Page Content
          ========================= */}
  </>
  )
}

export default SocialFeed