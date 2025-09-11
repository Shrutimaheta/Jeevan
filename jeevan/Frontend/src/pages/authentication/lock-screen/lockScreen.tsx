import { useState } from "react";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { all_routes } from "../../../routes/all_routes";
import { Link } from "react-router-dom";
type PasswordField = "password" | "confirmPassword";


const LockScreen = () => {
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
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
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100 lock-screen-cover">
          {/* start row */}
          <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
            <div className="col-lg-4 mx-auto">
              <form
                
                className="d-flex justify-content-center align-items-center"
              >
                <div className="d-flex flex-column justify-content-lg-center p-4 p-lg-0 pb-0 flex-fill">
                  <div className="card border-1 p-lg-3 shadow-md rounded-3">
                    <div className="card-body">
                      <div className=" mx-auto mb-4 text-center">
                        <Link to={all_routes.dashboard} className="logo">
                        <ImageWithBasePath
                          src="assets/img/logo-dark.svg"
                          className="img-fluid logo"
                          alt="Logo"
                        />
                      </Link>
                      </div>
                      <div className="text-center mb-3">
                        <h5 className="mb-1 fs-20 fw-bold">Welcome Back!</h5>
                      </div>
                      <div className="text-center mb-3">
                        <span className="avatar avatar-xxxl rounded-circle flex-shrink-0">
                          <ImageWithBasePath
                            src="assets/img/avatars/avatar-31.jpg"
                            className="rounded-circle"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="mb-3">
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
                      <div>
                        <Link
                          to={all_routes.dashboard}
                          className="btn bg-primary text-white w-100"
                        >
                          Login
                        </Link>
                      </div>
                    </div>
                    {/* end card body */}
                  </div>
                  {/* end card */}
                </div>
              </form>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
      </div>
      {/* End Content */}
    </>
  )
}

export default LockScreen;