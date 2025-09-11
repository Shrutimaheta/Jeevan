import { Link } from "react-router-dom"
import ImageWithBasePath from "../../../components/image-with-base-path";
import { all_routes } from "../../../routes/all_routes";


const UnderMaintenance = () => {
  return (
    <>
      {/* Start Content */}
      <div className="container-fuild">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100 z-1">
          <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
            <div className="col-lg-6">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="error-images mb-4 w-75">
                  <ImageWithBasePath
                    src="assets/img/error/maintenance.svg"
                    alt="maintenance"
                    className="img-fluid"
                  />
                </div>
                <div className="text-center">
                  <h4 className="mb-2">This Site is Currently Under Maintenance</h4>
                  <p className="text-center">
                    We apologize for the inconvenience caused we’ve almost done.
                  </p>
                  <div className="d-flex justify-content-center">
                    <Link
                      to={all_routes.dashboard}
                      className="btn btn-primary d-flex align-items-center"
                    >
                      Back to Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Content */}
    </>


  )
}

export default UnderMaintenance;