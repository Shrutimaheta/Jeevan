import  { useState } from "react"
import { Link } from "react-router-dom"
import CommonFooter from "../../components/common-footer/commonFooter"
import { all_routes } from "../../routes/all_routes"
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


const imageList = [
  { src: "src/assets/img/media/media-15.jpg", alt: "img 15" },
  { src: "src/assets/img/media/media-16.jpg", alt: "img 16" },
  { src: "src/assets/img/media/media-17.jpg", alt: "img 17" },
  { src: "src/assets/img/media/media-18.jpg", alt: "img 18" },
  { src: "src/assets/img/media/media-19.jpg", alt: "img 19" },
  { src: "src/assets/img/media/media-20.jpg", alt: "img 20" },
  { src: "src/assets/img/media/media-21.jpg", alt: "img 21" },
  { src: "src/assets/img/media/media-22.jpg", alt: "img 22" },
  { src: "src/assets/img/media/media-23.jpg", alt: "img 23" },
  { src: "src/assets/img/media/media-24.jpg", alt: "img 24" },
  { src: "src/assets/img/media/media-25.jpg", alt: "img 25" },
  { src: "src/assets/img/media/media-26.jpg", alt: "img 26" },
]

const SearchResult = () => {
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0)
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
          <h4 className="mb-1">Search Result</h4>
          <div className="text-end">
            <ol className="breadcrumb m-0 py-0">
              <li className="breadcrumb-item">
                <Link to={all_routes.dashboard}>Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Applications</Link>
              </li>
              <li className="breadcrumb-item active">Search Result</li>
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
      <div className="card">
        <div className="card-body">
          <form>
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control flex-fill me-3"
                defaultValue="Dreams EMR"
              />
              <button type="submit" className="btn btn-primary">
                <i className="ti ti-search me-1" />
                Search
              </button>
            </div>
          </form>
        </div>
        {/* end card body */}
      </div>
      {/* end card */}
      <div className="card mb-0">
        <div className="card-body">
          <h6 className="mb-3 text-capitalize">
            Search result for "Dreams EMR"
          </h6>
          {/* start row */}
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow-none">
                <div className="card-body">
                  <Link
                    to="#"
                    className="text-info text-truncate mb-2 text-wrap"
                  >
                    https://themeforest.net/search/dreamsemr
                  </Link>
                  <h6>Dreams EMR</h6>
                  <p className="text-truncate line-clamb-2 mb-2">
                    DreamEMR - Html, Vue 3, Angular 17+ &amp; Node Clinical
                    Management &amp; Doctor Booking Template
                  </p>
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <span className="text-gray-9 me-2 pe-2 border-end">
                        1.7K Sales
                      </span>
                      <span className="text-gray-9">$35</span>
                    </div>
                    <div className="text-gray-9 d-flex align-items-center">
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-light me-1" />
                      (45)
                    </div>
                  </div>
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
            </div>
            {/* end col */}
            <div className="col-md-6">
              <div className="card shadow-none">
                <div className="card-body">
                  <Link
                    to="#"
                    className="text-info text-truncate mb-2 text-wrap"
                  >
                    https://themeforest.net/search/dreamsemr
                  </Link>
                  <h6>Dreams EMR</h6>
                  <p className="text-truncate line-clamb-2 mb-2">
                    Dreams EMR - Html, React Js, Vue Js Clinical Management &amp;
                    Doctor Booking Admin Template
                  </p>
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <span className="text-gray-9 me-2 pe-2 border-end">
                        1.5K Sales
                      </span>
                      <span className="text-gray-9">$40</span>
                    </div>
                    <div className="text-gray-9 d-flex align-items-center">
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-light me-1" />
                      (40)
                    </div>
                  </div>
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
            </div>
            {/* end col */}
            <div className="col-md-6">
              <div className="card shadow-none">
                <div className="card-body">
                  <Link
                    to="#"
                    className="text-info text-truncate mb-2 text-wrap"
                  >
                    https://themeforest.net/search/dreamsemr
                  </Link>
                  <h6>Dreams EMR</h6>
                  <p className="text-truncate line-clamb-2 mb-2">
                    Dreams EMR - Html, Vue 3, Angular 17+ &amp; Node Hospital
                    Management &amp; Doctor Booking Appointment
                  </p>
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <span className="text-gray-9 me-2 pe-2 border-end">
                        1.2K Sales
                      </span>
                      <span className="text-gray-9">$30</span>
                    </div>
                    <div className="text-gray-9 d-flex align-items-center">
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-light me-1" />
                      (30)
                    </div>
                  </div>
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
            </div>
            {/* end col */}
            <div className="col-md-6">
              <div className="card shadow-none">
                <div className="card-body">
                  <Link
                    to="#"
                    className="text-info text-truncate mb-2 text-wrap"
                  >
                    https://themeforest.net/search/dreamsemr
                  </Link>
                  <h6>Dreams EMR</h6>
                  <p className="text-truncate line-clamb-2 mb-2">
                    Dreams EMR - Html, Vue 3, Angular 17+ &amp; Node Hospital
                    Management &amp; Doctor Booking Appointment
                  </p>
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <span className="text-gray-9 me-2 pe-2 border-end">
                        1.4K Sales
                      </span>
                      <span className="text-gray-9">$35</span>
                    </div>
                    <div className="text-gray-9 d-flex align-items-center">
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-warning me-1" />
                      <i className="ti ti-star-filled text-light me-1" />
                      (35)
                    </div>
                  </div>
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
            </div>
            {/* end col */}
          </div>
          {/* end row */}
          <h6 className="mb-3">Images</h6>
          {/* start row */}
          <div className="row g-3">
            {imageList.map((img, idx) => (
              <div className="col-xl-2 col-md-4 col-6" key={img.src}>
                <div
                  className="image-popup-desc"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setOpen(true);
                    setLightboxIndex(idx);
                  }}
                >
                  <img
                    src={img.src}
                    className="rounded img-fluid"
                    alt={img.alt}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* end row */}
          {/* Lightbox integration */}
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={imageList.map(img => ({ src: img.src }))}
            index={lightboxIndex}
          />
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

export default SearchResult