import { useState } from "react";
import { all_routes } from "../../../routes/all_routes";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../components/image-with-base-path";
type PasswordField = "password" | "confirmPassword" | "newPassword";

const ChangePassword = () => {
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
    newPassword: false,
  });

  const togglePasswordVisibility = (field: PasswordField) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };
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
                  <div className="d-flex flex-column justify-content-lg-center p-3 flex-fill">
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
                          <h5 className="mb-1 fw-bold">Change Password</h5>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Password<span className="text-danger ms-1">*</span>
                          </label>
                          <div className="input-group input-group-flat pass-group">
                            <input
                              type={passwordVisibility.password ? "text" : "password"}
                              className="form-control pass-input"
                              placeholder="****************"
                            />
                            <span
                              className={`ti toggle-password input-group-text toggle-password ${passwordVisibility.password ? "ti-eye" : "ti-eye-off"
                                }`}
                              onClick={() => togglePasswordVisibility("password")}
                            ></span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Confirm Password
                            <span className="text-danger ms-1">*</span>
                          </label>
                          <div className="input-group input-group-flat pass-group">
                            <input
                              type={
                                passwordVisibility.confirmPassword
                                  ? "text"
                                  : "password"
                              }
                              className="form-control pass-input"
                              placeholder="****************"
                            />
                            <span
                              className={`ti toggle-password input-group-text toggle-password ${passwordVisibility.confirmPassword
                                  ? "ti-eye"
                                  : "ti-eye-off"
                                }`}
                              onClick={() =>
                                togglePasswordVisibility("confirmPassword")
                              }
                            ></span>
                          </div>
                        </div>
                        <div className="mb-0">
                          <Link
                            to={all_routes.login}
                            className="btn bg-primary text-white w-100"
                          >
                            Change Password
                          </Link>
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

export default ChangePassword;