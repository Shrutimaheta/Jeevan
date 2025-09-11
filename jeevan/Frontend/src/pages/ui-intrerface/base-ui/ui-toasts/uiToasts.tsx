import AutoBreadcrumb from "../../../../components/breadcrumb/AutoBreadcrumb"
import CommonFooter from "../../../../components/common-footer/commonFooter"
import ImageWithBasePath from "../../../../components/image-with-base-path"


const UiToasts = () => {
  return (
    <>
    {/* ========================
              Start Page Content
          ========================= */}
    <div className="page-wrapper">
      {/* Start Content */}
      <div className="content pb-0">
        {/* Page Header */}
       <AutoBreadcrumb title="Toasts"/>
        {/* End Page Header */}
        {/* start row */}
        <div className="row">
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Basic</h5>
              </div>
              <div className="card-body">
                <p className="text-muted">
                  Toasts are as flexible as you need and have very little required
                  markup. At a minimum, we require a single element to contain
                  your “toasted” content and strongly encourage a dismiss button.
                </p>
                <div className="p-3">
                  <div
                    className="toast fade show"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                  >
                    <div className="toast-header">
                      <ImageWithBasePath
                        src="assets/img/logo-small.svg"
                        alt="brand-logo"
                        height={16}
                        className="me-1"
                      />
                      <strong className="me-auto">Admin</strong>
                      <small>11 mins ago</small>
                      <button
                        type="button"
                        className="ms-2 btn-close"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                      />
                    </div>
                    <div className="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
                  {/*end toast*/}
                </div>
              </div>{" "}
              {/* end card-body */}
            </div>{" "}
            {/* end card */}
          </div>{" "}
          {/* end col */}
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Translucent</h5>
              </div>
              <div className="card-body">
                <p className="text-muted">
                  Toasts are slightly translucent, too, so they blend over
                  whatever they might appear over. For browsers that support the
                  backdrop-filter CSS property, we’ll also attempt to blur the
                  elements under a toast.
                </p>
                <div className="p-3 bg-light bg-opacity-50">
                  <div
                    className="toast fade show"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                  >
                    <div className="toast-header">
                      <ImageWithBasePath
                        src="assets/img/logo-small.svg"
                        alt="brand-logo"
                        height={16}
                        className="me-1"
                      />
                      <strong className="me-auto">Admin</strong>
                      <small>11 mins ago</small>
                      <button
                        type="button"
                        className="ms-2 btn-close"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                      />
                    </div>
                    <div className="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
                  {/*end toast*/}
                </div>
              </div>{" "}
              {/* end card-body */}
            </div>{" "}
            {/* end card */}
          </div>{" "}
          {/* end col */}
          <div className="col-xl-6">
            <div className="card card-h-100">
              <div className="card-header">
                <h5 className="card-title">Stacking</h5>
              </div>
              <div className="card-body">
                <p className="text-muted">
                  When you have multiple toasts, we default to vertiaclly stacking
                  them in a readable manner.
                </p>
                <div className="p-3">
                  <div
                    aria-live="polite"
                    aria-atomic="true"
                    style={{ position: "relative", minHeight: 200 }}
                  >
                    {/* Position it */}
                    <div
                      className="toast-container"
                      style={{ position: "absolute", top: 0, right: 0 }}
                    >
                      {/* Then put toasts within */}
                      <div
                        className="toast fade show"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                      >
                        <div className="toast-header">
                          <ImageWithBasePath
                            src="assets/img/logo-small.svg"
                            alt="brand-logo"
                            height={16}
                            className="me-1"
                          />
                          <strong className="me-auto">Admin</strong>
                          <small className="text-muted">just now</small>
                          <button
                            type="button"
                            className="ms-2 btn-close"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                          />
                        </div>
                        <div className="toast-body">See? Just like this.</div>
                      </div>
                      {/*end toast*/}
                      <div
                        className="toast fade show"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                      >
                        <div className="toast-header">
                          <ImageWithBasePath
                            src="assets/img/logo-small.svg"
                            alt="brand-logo"
                            height={16}
                            className="me-1"
                          />
                          <strong className="me-auto">Admin</strong>
                          <small className="text-muted">2 seconds ago</small>
                          <button
                            type="button"
                            className="ms-2 btn-close"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                          />
                        </div>
                        <div className="toast-body">
                          Heads up, toasts will stack automatically
                        </div>
                      </div>
                      {/*end toast*/}
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* end card-body */}
            </div>{" "}
            {/* end card */}
          </div>{" "}
          {/* end col */}
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Placement</h5>
              </div>
              <div className="card-body">
                <p className="text-muted">
                  Place toasts with custom CSS as you need them. The top right is
                  often used for notifications, as is the top middle. If you’re
                  only ever going to show one toast at a time, put the positioning
                  styles right on the <code>.toast</code>.
                </p>
                <div className="p-3">
                  <div
                    aria-live="polite"
                    aria-atomic="true"
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: 200 }}
                  >
                    {/* Then put toasts within */}
                    <div
                      className="toast fade show"
                      role="alert"
                      aria-live="assertive"
                      aria-atomic="true"
                      data-bs-toggle="toast"
                    >
                      <div className="toast-header">
                        <ImageWithBasePath
                          src="assets/img/logo-small.svg"
                          alt="brand-logo"
                          height={16}
                          className="me-1"
                        />
                        <strong className="me-auto">Admin</strong>
                        <small>11 mins ago</small>
                        <button
                          type="button"
                          className="ms-2 btn-close"
                          data-bs-dismiss="toast"
                          aria-label="Close"
                        />
                      </div>
                      <div className="toast-body">
                        Hello, world! This is a toast message.
                      </div>
                    </div>
                    {/*end toast*/}
                  </div>
                </div>
              </div>{" "}
              {/* end card-body */}
            </div>{" "}
            {/* end card */}
          </div>{" "}
          {/* end col */}
        </div>
        {/* end row */}
        {/* start row */}
        <div className="row">
          <div className="col-lg-6">
            <div className="card card-h-100">
              <div className="card-header">
                <h5 className="card-title">Custom Content</h5>
              </div>
              <div className="card-body">
                <p className="text-muted">
                  Alternatively, you can also add additional controls and
                  components to toasts.
                </p>
                <div
                  className="toast show align-items-center mb-4"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  <div className="d-flex">
                    <div className="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                    <button
                      type="button"
                      className="btn-close me-2 m-auto"
                      data-bs-dismiss="toast"
                      aria-label="Close"
                    />
                  </div>
                </div>
                <div
                  className="toast show align-items-center text-white bg-primary border-0 mb-4"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  <div className="d-flex">
                    <div className="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-close-white me-2 m-auto"
                      data-bs-dismiss="toast"
                      aria-label="Close"
                    />
                  </div>
                </div>
                <div
                  className="toast show mb-4"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  <div className="toast-body">
                    Hello, world! This is a toast message.
                    <div className="mt-2 pt-2 border-top">
                      <button type="button" className="btn btn-primary btn-sm me-2">
                        Take action
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        data-bs-dismiss="toast"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="toast bg-primary show"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  <div className="toast-body text-white">
                    Hello, world! This is a toast message.
                    <div className="mt-2 pt-2 border-top">
                      <button type="button" className="btn btn-light btn-sm me-2">
                        Take action
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        data-bs-dismiss="toast"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* end card body */}
            </div>{" "}
            {/* end card */}
          </div>{" "}
          {/* end col */}
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Placement</h5>
              </div>
              <div className="card-body">
                <p className="text-muted">
                  Place toasts with custom CSS as you need them. The top right is
                  often used for notifications, as is the top middle. If you’re
                  only ever going to show one toast at a time, put the positioning
                  styles right on the <code>.toast</code>.
                </p>
                <form>
                  <div className="mb-3">
                    <label htmlFor="selectToastPlacement">Toast placement</label>
                    <select
                      className="form-select mt-2"
                      id="selectToastPlacement"
                    >
                      <option value="" selected>
                        Select a position...
                      </option>
                      <option value="top-0 start-0">Top left</option>
                      <option value="top-0 start-50 translate-middle-x">
                        Top center
                      </option>
                      <option value="top-0 end-0">Top right</option>
                      <option value="top-50 start-0 translate-middle-y">
                        Middle left
                      </option>
                      <option value="top-50 start-50 translate-middle">
                        Middle center
                      </option>
                      <option value="top-50 end-0 translate-middle-y">
                        Middle right
                      </option>
                      <option value="bottom-0 start-0">Bottom left</option>
                      <option value="bottom-0 start-50 translate-middle-x">
                        Bottom center
                      </option>
                      <option value="bottom-0 end-0">Bottom right</option>
                    </select>
                  </div>
                </form>
                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className="bg-light position-relative bd-example-toasts"
                  style={{ minHeight: 294 }}
                >
                  <div
                    className="toast-container position-absolute p-3"
                    id="toastPlacement"
                  >
                    <div className="toast show">
                      <div className="toast-header">
                        <ImageWithBasePath
                          src="assets/img/logo-small.svg"
                          alt="brand-logo"
                          height={16}
                          className="me-1"
                        />
                        <strong className="me-auto">Admin</strong>
                        <small>11 mins ago</small>
                      </div>
                      <div className="toast-body">
                        Hello, world! This is a toast message.
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* end card body */}
            </div>{" "}
            {/* end card */}
          </div>{" "}
          {/* end col */}
        </div>
        {/* end row */}
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

export default UiToasts