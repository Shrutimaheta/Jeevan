import ImageWithBasePath from "../../../components/image-with-base-path";
import { useState } from "react";
import { all_routes } from "../../../routes/all_routes";
import { Link, useNavigate } from "react-router-dom";
type PasswordField = "password" | "confirmPassword";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const togglePasswordVisibility = (field: PasswordField) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // Set loading state
    setIsSubmitting(true);

    // Here you would typically make an API call to create the account
    // For now, we'll just navigate to the login page
    
    // Simulate API call delay
    setTimeout(() => {
      // Show success message
      setShowSuccess(true);
      
      // Reset form data
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        rememberMe: false,
      });
      
      // Navigate to login page after successful account creation
      setTimeout(() => {
        try {
          navigate(all_routes.login);
        } catch (error) {
          // Fallback: redirect using window.location
          window.location.href = all_routes.login;
        }
      }, 2000);
    }, 1000);
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
                  <form
                    className="d-flex justify-content-center align-items-center"
                    onSubmit={handleSubmit}
                  >
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
                            <h5 className="mb-1 fw-bold">Sign Up</h5>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Username<span className="text-danger ms-1">*</span>
                            </label>
                            <div className="input-group input-group-flat">
                              <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => handleInputChange("username", e.target.value)}
                                className="form-control border-end-0"
                                required
                              />
                              <span className="input-group-text bg-white">
                                <i className="ti ti-user fs-14 text-dark" />
                              </span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Email<span className="text-danger ms-1">*</span>
                            </label>
                            <div className="input-group input-group-flat">
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="form-control border-end-0"
                                required
                              />
                              <span className="input-group-text bg-white">
                                <i className="ti ti-mail fs-14 text-dark" />
                              </span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Password<span className="text-danger ms-1">*</span>
                            </label>
                            <div className="input-group input-group-flat pass-group">
                              <input
                                type={passwordVisibility.password ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                className="form-control pass-input"
                                placeholder=""
                                required
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
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                className="form-control pass-input"
                                placeholder=""
                                required
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
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <div className="form-check form-check-md mb-0">
                                <input
                                  className="form-check-input"
                                  id="remember_me"
                                  type="checkbox"
                                  checked={formData.rememberMe}
                                  onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                                />
                                <label
                                  htmlFor="remember_me"
                                  className="form-check-label mt-0"
                                >
                                  Remember Me
                                </label>
                              </div>
                            </div>
                            <div className="text-end">
                              <Link
                                to={all_routes.forgotPassword}
                                className="text-primary"
                              >
                                Forgot Password?
                              </Link>
                            </div>
                          </div>
                          {showSuccess && (
                            <div className="alert alert-success mb-3" role="alert">
                              <i className="ti ti-check-circle me-2"></i>
                              Account created successfully! Redirecting to login page...
                            </div>
                          )}
                          <div className="mb-2">
                            <button
                              type="submit"
                              className="btn bg-primary text-white w-100"
                              disabled={isSubmitting || showSuccess}
                            >
                              {isSubmitting ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                  Creating account...
                                </>
                              ) : showSuccess ? (
                                <>
                                  <i className="ti ti-check-circle me-2"></i>
                                  Account Created!
                                </>
                              ) : (
                                "Create account"
                              )}
                            </button>
                          </div>
                          <div className="login-or position-relative my-1 py-2 text-center fw-medium">
                            <span className="position-relative bg-white px-2 z-2">
                              Or
                            </span>
                          </div>
                          <div className="mb-3">
                            <div className="d-flex align-items-center justify-content-center flex-wrap">
                              <div className="text-center me-2 flex-fill">
                                <a
                                  href="#"
                                  className="br-10 p-1 btn btn-light d-flex align-items-center justify-content-center"
                                >
                                  <ImageWithBasePath
                                    className="img-fluid m-1"
                                    src="assets/img/icons/google.svg"
                                    alt="Google"
                                  />
                                  Google
                                </a>
                              </div>
                              <div className="text-center flex-fill">
                                <a
                                  href="#"
                                  className="br-10 p-1 btn btn-light d-flex align-items-center justify-content-center"
                                >
                                  <ImageWithBasePath
                                    className="img-fluid m-1"
                                    src="assets/img/icons/facebook.svg"
                                    alt="Facebook"
                                  />
                                  Facebook
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <h6 className="fw-normal fs-14 text-dark mb-0">
                              Don't have an account yet?
                              <Link to={all_routes.login} className="ms-1 text-primary">
                                Sign In
                              </Link>
                            </h6>
                          </div>
                        </div>
                        {/* end card body */}
                      </div>
                      {/* end card */}
                    </div>
                  </form>
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

export default SignUp;