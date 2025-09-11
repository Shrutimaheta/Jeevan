import AutoBreadcrumb from "../../../../components/breadcrumb/AutoBreadcrumb"
import CommonFooter from "../../../../components/common-footer/commonFooter"


const UiBreadcrumb = () => {
  return (
    <>
  {/* ========================
			Start Page Content
		========================= */}
  <div className="page-wrapper">
    {/* Start Content */}
    <div className="content pb-0">
      {/* Page Header */}
      <AutoBreadcrumb title="Breadcrumb" />
      {/* End Page Header */}
      {/* start row */}
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Default Breadcrumb</h5>
            </div>
            <div className="card-body  py-2">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 py-2">
                  <li className="breadcrumb-item active" aria-current="page">
                    Home
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 py-2">
                  <li className="breadcrumb-item">
                    <a href="#" aria-label="Go to home page">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Library
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 py-2">
                  <li className="breadcrumb-item">
                    <a href="#" aria-label="Go to home page">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#" aria-label="Go to library page">Library</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Data
                  </li>
                </ol>
              </nav>
            </div>{" "}
            {/* end card-body */}
          </div>{" "}
          {/* end card*/}
        </div>{" "}
        {/* end col */}
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Breadcrumb with Icons</h5>
            </div>
            <div className="card-body  py-2">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb py-2 mb-0">
                  <li className="breadcrumb-item active" aria-current="page">
                    <i className="ti ti-smart-home fs-16 me-1" />
                    Home
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb py-2 mb-0">
                  <li className="breadcrumb-item">
                    <a href="#">
                      <i className="ti ti-smart-home fs-16 me-1" />
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Library
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb py-2 mb-0">
                  <li className="breadcrumb-item">
                    <a href="#">
                      <i className="ti ti-smart-home fs-16 me-1" />
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Library</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Data
                  </li>
                </ol>
              </nav>
            </div>{" "}
            {/* end card-body */}
          </div>{" "}
          {/* end card*/}
        </div>{" "}
        {/* end col */}
      </div>
      {/* end row */}
      {/* start row */}
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Arrow Style</h5>
            </div>
            <div className="card-body py-2">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-arrow mb-0 py-2">
                  <li className="breadcrumb-item active" aria-current="page">
                    Home
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-arrow mb-0 py-2">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Library
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-arrow mb-0 py-2">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Library</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Data
                  </li>
                </ol>
              </nav>
            </div>{" "}
            {/* end card-body */}
          </div>{" "}
          {/* end card*/}
        </div>{" "}
        {/* end col */}
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Pipe Style</h5>
            </div>
            <div className="card-body py-2">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-pipe py-2 mb-0">
                  <li className="breadcrumb-item active" aria-current="page">
                    Home
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-pipe py-2 mb-0">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Library
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-pipe py-2 mb-0">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Library</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Data
                  </li>
                </ol>
              </nav>
            </div>{" "}
            {/* end card-body */}
          </div>{" "}
          {/* end card*/}
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

export default UiBreadcrumb