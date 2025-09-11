import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { useEffect, useState } from "react";
import { all_routes } from "../../../routes/all_routes";

const ComingSoon = () => {
  const [seconds, setSeconds] = useState(60);
    
      useEffect(() => {
        if (seconds <= 0) return;
    
        const intervalId = setInterval(() => {
          setSeconds((prevSeconds) => {
            if (prevSeconds <= 1) {
              clearInterval(intervalId);
              return 0;
            }
            return prevSeconds - 1;
          });
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, [seconds]);
  return (
    <>
      {/* Start Content */}
      <div className="container-fuild position-relative z-1">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100 lock-screen-cover">
          {/* start row */}
          <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap coming-soon-item">
            <div className="col-lg-6 mx-auto">
              <form
                className="d-flex justify-content-center align-items-center"
              >
                <div className="d-flex flex-column justify-content-lg-center p-4 p-lg-0 pb-0 flex-fill">
                  <div className="card border-1 p-lg-3 rounded-3 mb-0  bg-transparent border-0">
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
                      <div className="text-center mb-2">
                        <h2 className="mb-1 fw-bold display-2">Coming Soon</h2>
                      </div>
                      <div className="mb-4">
                        <p className="d-flex text-center justify-content-center">
                          Please check back later, We are working hard to get
                          everything just right.
                        </p>
                      </div>
                      <div className="row align-items-center">
                        <div className="">
                          <ul className="d-flex list-unstyled align-items-center justify-content-center mb-5">
                            <li className="me-sm-4 me-2">
                              <div className="timer-cover border">
                                <h4 className="days fs-28 mb-0">54</h4>
                              </div>
                              <p className="text-center text-dark mb-0">Days</p>
                            </li>
                            <li className="me-sm-4 me-2">
                              <div className="timer-cover border">
                                <h4 className="hours fs-28 mb-0">02</h4>
                              </div>
                              <p className="text-center text-dark mb-0">Hours</p>
                            </li>
                            <li className="me-sm-4 me-2">
                              <div className="timer-cover border">
                                <h4 className="minutes fs-28 mb-0">54</h4>
                              </div>
                              <p className="text-center text-dark mb-0">Minutes</p>
                            </li>
                            <li>
                              <div className="timer-cover border">
                                <h4 className="seconds fs-28 mb-0">{seconds}</h4>
                              </div>
                              <p className="text-center text-dark mb-0">Seconds</p>
                            </li>
                          </ul>
                          <div className="mb-4 text-center px-md-5">
                            <label className="form-label fw-semibold text-center">
                              Get notify when we launch
                            </label>
                            <div className="d-flex align-items-center justify-content-between gap-2">
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Your Email"
                              />
                              <Link
                                to="#"
                                className="btn btn-dark py-2"
                              >
                                Subscribe
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <Link
                              to="#"
                              className="btn btn-icon btn-dark rounded-circle"
                            >
                              <i className="ti ti-brand-facebook" />{" "}
                            </Link>
                            <Link
                              to="#"
                              className="btn btn-icon btn-dark rounded-circle"
                            >
                              <i className="ti ti-brand-instagram" />{" "}
                            </Link>
                            <Link
                              to="#"
                              className="btn btn-icon btn-dark rounded-circle"
                            >
                              <i className="ti ti-brand-linkedin" />{" "}
                            </Link>
                            <Link
                              to="#"
                              className="btn btn-icon btn-dark rounded-circle"
                            >
                              <i className="ti ti-brand-twitter" />{" "}
                            </Link>
                          </div>
                        </div>
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

export default ComingSoon;