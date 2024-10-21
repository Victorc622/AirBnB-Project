import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import ConfirmDeleteReview from "../ConfirmDeleteReview/ConfirmDeleteReview";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";
import { deleteAReview, getAllReviews } from "../../store/reviews";
import './Reviews.css';


const Reviews = ({ spotId }) => {
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useModal();
  const reviews = useSelector((state) => state.reviews.reviews);
  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.spotDetails[spotId]);

  const userPostedReview = reviews.some(
    (review) => sessionUser && sessionUser.id === review.userId
  );
  useEffect(() => {
    dispatch(getAllReviews(spotId));
  }, [dispatch, spotId]);

  const dateForm = (date) => {
    if (date) {
      const monthArr = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const splitDate = date.split("-");
      const monthIndex = parseInt(splitDate[1], 10) - 1;
      return `${monthArr[monthIndex]}-${splitDate[0]}`;
    }
  };

  const handleDelete = (reviewId) => {
    setModalContent(
      <ConfirmDeleteReview
        onConfirm={() => {
          dispatch(deleteAReview(reviewId)).then(() => {
            closeModal();
          });
        }}
        onCancel={() => {
          closeModal();

        }}
      />
    );
  };

  return (
    <div className="review-wrapper">
      {sessionUser &&
        spot &&
        sessionUser.id !== spot.ownerId &&
        !userPostedReview && (
          <div className="post-review">
            <button
              onClick={() =>
                setModalContent(<ReviewFormModal spotId={spotId} />)
              }
              className="add-review-button"
            >
              Post Your Review
            </button>
          </div>
        )}
      {reviews.length > 0 ? (
        reviews
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((review) => (
            <div key={review.id} className="review-container">
              <h3 className="review-user">{review.User?.firstName}</h3>
              <p className="review-date">{dateForm(review.createdAt)}</p>
              <p className="actual-review">{review.review}</p>
              {sessionUser && sessionUser.id === review.userId && (
                <button
                  onClick={() => handleDelete(review.id)}
                  className="delete-review-btn"
                >
                  Delete Review
                </button>
              )}
            </div>
          ))
      ) : sessionUser && sessionUser.id !== spot.ownerId ? (
        <p className="no-review-p">Be the first to post a review!</p>
      ) : (
        <p className="no-review-p">No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;
