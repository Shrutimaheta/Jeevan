import { useState } from "react";
import StarRatings from "react-star-ratings";
import AutoBreadcrumb from "../../../components/breadcrumb/AutoBreadcrumb";
import CommonFooter from "../../../components/common-footer/commonFooter";

const UiRating = () => {
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [rating4, setRating4] = useState(0);
  const [rating5, setRating5] = useState(0);
  const [rating6, setRating6] = useState(0);
  const [hoverCount, setHoverCount] = useState(0);
  const [isLoading] = useState(false);

  // Device-independent event handlers for accessibility
  const handleStarFocus = () => {
    setHoverCount((prevCount) => Math.min(prevCount + 1, 5));
  };

  const handleStarBlur = () => {
    setHoverCount(0);
  };

  // Add keyboard navigation support
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Handle star selection
    }
  };
  const handleRatingChange1 = (newRating: any) => {
    setRating1(newRating);
  };


  const handleRatingChange2 = (newRating: any) => {
    setRating2(newRating);
  };
  const handleRatingChange3 = (newRating: any) => {
    setRating3(newRating);
  };
  const handleRatingChange4 = (newRating: any) => {
    setRating4(newRating);
  };
  const handleRatingChange5 = (newRating: any) => {
    setRating5(newRating);
  };
  const handleRatingChange6 = (newRating: any) => {
    setRating6(newRating);
  };

  return (
    <div className="page-wrapper cardhead">
      <div className="content">
        {/* Page Header */}
        <AutoBreadcrumb title="Rating" />

        {/* End Page Header */}

        <div className="row">
          <div className="col-xxl-4 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">Basic Rater</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">
                    Show Some <span className="text-danger">❤</span> with rating
                    :
                  </p>
                  <StarRatings
                    rating={rating2}
                    starRatedColor="gold"
                    changeRating={handleRatingChange2}
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">5 star rater with steps</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">
                    Dont forget to rate the product :
                  </p>
                  <StarRatings
                    rating={rating3}
                    starRatedColor="gold"
                    changeRating={handleRatingChange3}
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-12">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">Custom messages</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">
                    Your rating is much appreciated👏 :
                  </p>
                  <StarRatings
                    rating={rating1}
                    starRatedColor="gold"
                    changeRating={handleRatingChange1}
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">
                  Unlimited number of stars readOnly
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">Thanks for rating :</p>
                  <StarRatings
                    rating={rating4}
                    starRatedColor="gold"
                    changeRating={handleRatingChange4}
                    numberOfStars={10}
                    name="rating"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">
                  5 Star rater with custom isBusyText and simulated backend
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">Thanks for rating :</p>
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <StarRatings
                      rating={rating5}
                      starRatedColor="gold"
                      changeRating={handleRatingChange5}
                      numberOfStars={5}
                      name="rating"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-6">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">On hover event</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <p className="fs-14 mb-0 fw-semibold">
                    Please give your valuable rating :
                  </p>
                  <div
                    className="d-flex flex-wrap align-items-center"
                    onFocus={handleStarFocus}
                    onBlur={handleStarBlur}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    role="group"
                    aria-label="Star rating with hover effect"
                  >
                    <StarRatings
                      rating={rating6}
                      starRatedColor="gold"
                      changeRating={handleRatingChange6}
                      numberOfStars={5}
                      name="rating"
                    />

                    <span className="live-rating badge bg-success ms-3">
                      {hoverCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <CommonFooter />
    </div>
  );
};

export default UiRating;
