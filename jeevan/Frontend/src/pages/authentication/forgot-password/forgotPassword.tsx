import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { all_routes } from "../../../routes/all_routes";


const ForgotPassword = () => {
  return (
    <>
      {/* Start Content */}
      <div className="container-fuild position-relative z-1">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100 bg-white lock-screen-cover">
          {/* start row*/}
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="row justify-content-center align-items-center overflow-auto flex-wrap vh-100">
                <div className="col-md-8 mx-auto">
                  <div className="d-flex flex-column justify-content-lg-center flex-fill">
                    <div className="card border-1 p-lg-3 shadow-md rounded-3 m-0">
                      <div className="card-body">
                        <div className="mb-4">
                          <Link to={all_routes.dashboard} className="logo">
                            <ImageWithBasePath
                              src="assets/img/logo-dark.svg"
                              className="img-fluid logo"
                              alt="Logo"
                            />
                          </Link>
                        </div>
                        <div className="mb-3">
                          <h5 className="mb-1 fw-bold">Forgot Password</h5>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Email<span className="text-danger ms-1">*</span>
                          </label>
                          <div className="input-group input-group-flat">
                            <input
                              type="text"
                              defaultValue=""
                              className="form-control border-end-0"
                            />
                            <span className="input-group-text bg-white">
                              <i className="ti ti-mail fs-14 text-dark" />
                            </span>
                          </div>
                        </div>
                        <div className="mb-2">
                          <Link
                            to={all_routes.changePassword}
                            className="btn bg-primary text-white w-100"
                          >
                            Send
                          </Link>
                        </div>
                        <div className="login-or position-relative my-1 py-2 text-center fw-medium">
                          <span className="position-relative bg-white px-2 z-2">
                            Or
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="d-flex align-items-center justify-content-center flex-wrap">
                            <div className="text-center me-2 flex-fill">
                              <Link
                                to="#"
                                className="br-10 p-1 btn btn-light d-flex align-items-center justify-content-center"
                              >
                                <ImageWithBasePath
                                  className="img-fluid m-1"
                                  src="assets/img/icons/google.svg"
                                  alt="Google"
                                />
                                Google
                              </Link>
                            </div>
                            <div className="text-center flex-fill">
                              <Link
                                to="#"
                                className="br-10 p-1 btn btn-light d-flex align-items-center justify-content-center"
                              >
                                <ImageWithBasePath
                                  className="img-fluid m-1"
                                  src="assets/img/icons/facebook.svg"
                                  alt="Facebook"
                                />
                                Facebook
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <h6 className="fw-normal fs-14 text-dark mb-0">
                            Remember Password?
                            <Link
                              to={all_routes.signUp}
                              className="ms-1 text-primary"
                            >
                              Sign Up
                            </Link>
                          </h6>
                        </div>
                      </div>
                      {/* end card body */}
                    </div>
                    {/* end card */}
                  </div>
                </div>{" "}
                {/* end row*/}
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div className="login-backgrounds login-covers bg-primary d-lg-flex align-items-center justify-content-center d-none flex-wrap position-relative h-100 z-0">
                <div className="authentication-card">
                  <div className="authen-overlay-item w-100">
                    <div className="authen-head text-center">
                      <h1 className="text-white fs-28 fw-bold mb-2">
                        Your Wellness Journey Starts Here
                      </h1>
                      <p className="text-light fw-normal text-light mb-0">
                        Our Medical Website Admin Template offers an intuitive
                        interface for efficient administration and organization of
                        medical data
                      </p>
                    </div>
                  </div>
                  <div className="auth-person">
                    <ImageWithBasePath
                      src="assets/img/auth/auth-img-06.png"
                      alt="doctor"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <ImageWithBasePath
                  src="assets/img/auth/auth-img-01.png"
                  alt="shadow"
                  className="position-absolute top-0 start-0"
                />
                <ImageWithBasePath
                  src="assets/img/auth/auth-img-02.png"
                  alt="bubble"
                  className="img-fluid position-absolute top-0 end-0"
                />
                <ImageWithBasePath
                  src="assets/img/auth/auth-img-03.png"
                  alt="shadow"
                  className="img-fluid position-absolute auth-img-01"
                />
                <ImageWithBasePath
                  src="assets/img/auth/auth-img-04.png"
                  alt="bubble"
                  className="img-fluid position-absolute auth-img-02"
                />
                <ImageWithBasePath
                  src="assets/img/auth/auth-img-05.png"
                  alt="bubble"
                  className="img-fluid position-absolute bottom-0"
                />
              </div>
            </div>{" "}
            {/* end row*/}
          </div>
          {/* end row*/}
        </div>
      </div>
      {/* End Content */}
    </>


  )
}

export default ForgotPassword;