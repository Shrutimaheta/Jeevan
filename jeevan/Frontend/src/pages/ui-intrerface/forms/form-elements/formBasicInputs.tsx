import AutoBreadcrumb from "../../../../components/breadcrumb/AutoBreadcrumb";
import CommonFooter from "../../../../components/common-footer/commonFooter";

const FormBasicInputs = () => {
  return (
    <>
      {/* ========================
			Start Page Content
		========================= */}
      <div className="page-wrapper">
        {/* Start Content */}
        <div className="content">
          {/* Page Header */}
          <AutoBreadcrumb title="Form Elements" />

          {/* End Page Header */}
          {/* start row */}
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Input Types</h5>
                </div>
                <div className="card-body">
                  {/* start row */}
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="basic-input-label" className="form-label">Text</label>
                        <input type="text" className="form-control" id="basic-input-label" aria-describedby="basic-input-label-help" />
                        <div id="basic-input-label-help" className="form-text">Enter text input</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-label-2" className="form-label">Form Input With Label</label>
                        <input type="text" className="form-control" id="basic-input-label-2" aria-describedby="basic-input-label-2-help" />
                        <div id="basic-input-label-2-help" className="form-text">Form input with descriptive label</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-placeholder" className="form-label">Form Input With Placeholder</label>
                        <input type="text" className="form-control" id="basic-input-placeholder" placeholder="Placeholder" aria-describedby="basic-input-placeholder-help" />
                        <div id="basic-input-placeholder-help" className="form-text">Input with placeholder text</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-text" className="form-label">Type Text</label>
                        <input type="text" className="form-control" id="basic-input-text" placeholder="Text" aria-describedby="basic-input-text-help" />
                        <div id="basic-input-text-help" className="form-text">Text input field</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-number" className="form-label">Type Number</label>
                        <input type="number" className="form-control" id="basic-input-number" placeholder="Number" aria-describedby="basic-input-number-help" />
                        <div id="basic-input-number-help" className="form-text">Numeric input field</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-password" className="form-label">Type Password</label>
                        <input type="password" className="form-control" id="basic-input-password" placeholder="Password" aria-describedby="basic-input-password-help" />
                        <div id="basic-input-password-help" className="form-text">Password input field</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-email" className="form-label">Type Email</label>
                        <input type="email" className="form-control" id="basic-input-email" placeholder="Email@xyz.com" aria-describedby="basic-input-email-help" />
                        <div id="basic-input-email-help" className="form-text">Email input field</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-tel" className="form-label">Type Tel</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="basic-input-tel"
                          placeholder="+1100-2031-1233"
                          aria-describedby="basic-input-tel-help"
                        />
                        <div id="basic-input-tel-help" className="form-text">Telephone number input field</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-date" className="form-label">Type Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="basic-input-date"
                          aria-describedby="basic-input-date-help"
                        />
                        <div id="basic-input-date-help" className="form-text">Date input field</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-week" className="form-label">Type Week</label>
                        <input
                          type="week"
                          className="form-control"
                          id="basic-input-week"
                          aria-describedby="basic-input-week-help"
                        />
                        <div id="basic-input-week-help" className="form-text">Week input field</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-month" className="form-label">Type Month</label>
                        <input
                          type="month"
                          className="form-control"
                          id="basic-input-month"
                          aria-describedby="basic-input-month-help"
                        />
                        <div id="basic-input-month-help" className="form-text">Month input field</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-time" className="form-label">Type Time</label>
                        <input type="time" className="form-control" id="basic-input-time" aria-describedby="basic-input-time-help" />
                        <div id="basic-input-time-help" className="form-text">Time input field</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-datetime-local" className="form-label">Type Datetime Local</label>
                        <input type="datetime-local" className="form-control" id="basic-input-datetime-local" aria-describedby="basic-input-datetime-local-help" />
                        <div id="basic-input-datetime-local-help" className="form-text">Local datetime input field</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-text-area" className="form-label">Textarea</label>
                        <textarea className="form-control" id="basic-text-area" rows={4} defaultValue={""} aria-describedby="basic-text-area-help" />
                        <div id="basic-text-area-help" className="form-text">Multi-line text input field</div>
                      </div>
                      <div className="mb-0">
                        <label htmlFor="basic-example-range" className="form-label">Range</label>
                        <input className="form-range" id="basic-example-range" type="range" name="range" min={0} max={100} />
                      </div>
                    </div>
                    {/* end col */}
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="basic-input-search" className="form-label">Type Search</label>
                        <input
                          type="search"
                          className="form-control"
                          id="basic-input-search"
                          placeholder="Search"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-submit" className="form-label">Type Submit</label>
                        <input
                          type="submit"
                          className="form-control"
                          id="basic-input-submit"
                          defaultValue="Submit"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-reset" className="form-label">Type Reset</label>
                        <input
                          type="reset"
                          className="form-control"
                          id="basic-input-reset"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-button" className="form-label">Type Button</label>
                        <input
                          type="button"
                          className="form-control btn btn-primary"
                          id="basic-input-button"
                          defaultValue="Button"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-color" className="form-label">Type Color</label>
                        <input className="form-control form-input-color" type="color" id="basic-input-color" defaultValue="#136bd0" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-file" className="form-label">Type File</label>
                        <input className="form-control" type="file" id="basic-input-file" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-url" className="form-label">Type Url</label>
                        <input className="form-control" type="url" id="basic-input-url" name="website" placeholder="http://example.com" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-disabled" className="form-label">Type Disabled</label>
                        <input type="text" id="basic-input-disabled" className="form-control" placeholder="Disabled input" disabled />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-readonlytext" className="form-label">Input Readonly Text</label>
                        <input type="text" readOnly className="form-control-plaintext" id="basic-input-readonlytext" defaultValue="email@example.com" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-disabled-readonlytext" className="form-label">Disabled Readonly Input</label>
                        <input className="form-control" type="text" defaultValue="Disabled readonly input" id="basic-disabled-readonlytext" aria-label="Disabled input example" disabled readOnly />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-readonly-input" className="form-label">Type Readonly Input</label>
                        <input className="form-control" type="text" id="basic-readonly-input" defaultValue="Readonly input here..." aria-label="readonly input example" readOnly />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-input-DataList" className="form-label">Datalist example</label>
                        <input className="form-control" list="datalistOptions" id="basic-input-DataList" placeholder="Type to search..." />
                        <datalist id="datalistOptions">
                          <option value="San Francisco"></option>
                          <option value="New York"></option>
                          <option value="Seattle"></option>
                          <option value="Los Angeles"></option>
                          <option value="Chicago"></option>
                        </datalist>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="basic-example-select" className="form-label">Input Select</label>
                        <select className="form-select" id="basic-example-select">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="basic-example-multiselect"
                          className="form-label"
                        >
                          Multiple Select
                        </label>
                        <select
                          id="basic-example-multiselect"
                          multiple
                          className="form-control"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                      <div className="mb-0">
                        <label htmlFor="basic-example-helping" className="form-label">
                          Helping text
                        </label>
                        <input
                          type="text"
                          id="basic-example-helping"
                          className="form-control mb-1"
                          placeholder="Helping text"
                        />
                        <span className="help-block">
                          <small>
                            A block of help text that breaks onto a new line and
                            may extend beyond one line.
                          </small>
                        </span>
                      </div>
                    </div>
                    {/* end col */}
                  </div>
                  {/* end row */}
                </div>
                {/* end card-body */}
              </div>
              {/* end card */}
            </div>
            {/* end col */}
            <div className="col-xl-6">
              <div className="card card-h-100">
                <div className="card-header">
                  <h5 className="card-title">Input Shapes</h5>
                </div>
                <div className="card-body">
                  {/* start row */}
                  <div className="row gy-3">
                    <div className="col-xl-12">
                      <label htmlFor="basic-input-noradius" className="form-label">Input With No Radius</label>
                      <input type="text" className="form-control rounded-0" id="basic-input-noradius" placeholder="No Radius" />
                    </div>
                    <div className="col-xl-12">
                      <label htmlFor="basic-input-rounded" className="form-label">Input With Radius</label>
                      <input type="text" className="form-control" id="basic-input-rounded" placeholder="Default Radius" />
                    </div>
                    <div className="col-xl-12">
                      <label
                        htmlFor="basic-input-rounded-pill"
                        className="form-label"
                      >
                        Rounded Input
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="basic-input-rounded-pill"
                        placeholder="Rounded"
                      />
                    </div>
                  </div>
                  {/* end row */}
                </div>
                {/* end card-body */}
              </div>
              {/* end card */}
            </div>
            {/* end col */}
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Disabled forms</h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="basic-disabledTextInput" className="form-label">
                        Disabled input
                      </label>
                      <input
                        type="text"
                        id="basic-disabledTextInput"
                        className="form-control"
                        placeholder="Disabled input"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="basic-disabledSelect" className="form-label">
                        Disabled select menu
                      </label>
                      <select id="basic-disabledSelect" className="form-select">
                        <option>Disabled select</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="basic-disabledFieldsetCheck"
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="basic-disabledFieldsetCheck"
                        >
                          Can't check this
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="basic-disabledFieldsetRadio"
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="basic-disabledFieldsetRadio"
                        >
                          Can't check this
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
                {/* end card-body */}
              </div>
              {/* end card */}
            </div>
            {/* end col */}
            <div className="col-xl-6">
              <div className="card card-h-100">
                <div className="card-header">
                  <h5 className="card-title">Input Sizing</h5>
                </div>
                <div className="card-body">
                  <input
                    className="form-control form-control-sm mb-3"
                    type="text"
                    placeholder=".form-control-sm"
                    aria-label=".form-control-sm example"
                  />
                  <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Default input"
                    aria-label="default input example"
                  />
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder=".form-control-lg"
                    aria-label=".form-control-lg example"
                  />
                </div>
                {/* end card-body */}
              </div>
              {/* end card */}
            </div>
            {/* end col */}
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">File Input</h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="basic-formFile" className="form-label">
                        Default file input example
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="basic-formFile"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="basic-formFileMultiple" className="form-label">
                        Multiple files input example
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="basic-formFileMultiple"
                        multiple
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="basic-formFileDisabled" className="form-label">
                        Disabled file input example
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="basic-formFileDisabled"
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="basic-formFileSm" className="form-label">
                        Small file input example
                      </label>
                      <input
                        className="form-control form-control-sm"
                        id="basic-formFileSm"
                        type="file"
                      />
                    </div>
                    <div>
                      <label htmlFor="basic-formFileLg" className="form-label">
                        Large file input example
                      </label>
                      <input
                        className="form-control form-control-lg"
                        id="basic-formFileLg"
                        type="file"
                      />
                    </div>
                  </form>
                </div>
                {/* end card-body */}
              </div>
              {/* end card */}
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* End Content */}
        {/* Start Footer */}
        <CommonFooter/>
        {/* End Footer */}
      </div>
      {/* ============================================================== */}
      {/* End Page content */}
      {/* ============================================================== */}
    </>
  );
};

export default FormBasicInputs;
