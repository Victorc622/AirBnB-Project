import { useEffect, useState } from 'react';
import { useModal } from '../../context/Modal';
import { makeReview } from '../../store/reviews';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';

export default function ReviewModal({ spotId }) {
  const session = useSelector((state) => state.session);
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [valErrors, setValErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const errors = {};
    if (review.length < 1) errors.review = 'Review must have text';
    if (stars < 1 || stars > 5)
      errors.stars = 'stars must be between 1 and 5';
    setValErrors(errors);
  }, [review, stars]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.values(valErrors).length) {
      return;
    }
    const newReview = {
      review,
      stars,
    };
    await dispatch(makeReview(session.user, spotId, newReview));
    closeModal();
  };

  return (
    <div className='review-modal'>
      <h2>How was your stay?</h2>
      <form>
        <textarea
          className='text'
          placeholder='Leave your review here...'
          name='review'
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className='rating-input'>
          <span
            className={
              stars > 0 || rating > 0 ? 'filled' : 'empty'
            }>
            <FaStar
              onMouseEnter={() => setRating(1)}
              onMouseLeave={() => setRating(stars)}
              onClick={() => setStars(1)}
            />
          </span>
          <span
            className={
              stars > 1 || rating > 1 ? 'filled' : 'empty'
            }>
            <FaStar
              onMouseEnter={() => setRating(2)}
              onMouseLeave={() => setRating(stars)}
              onClick={() => setStars(2)}
            />
          </span>
          <span
            className={
              stars > 2 || rating > 2 ? 'filled' : 'empty'
            }>
            <FaStar
              onMouseEnter={() => setRating(3)}
              onMouseLeave={() => setRating(stars)}
              onClick={() => setStars(3)}
            />
          </span>
          <span
            className={
              stars > 3 || rating > 3 ? 'filled' : 'empty'
            }>
            <FaStar
              onMouseEnter={() => setRating(4)}
              onMouseLeave={() => setRating(stars)}
              onClick={() => setStars(4)}
            />
          </span>
          <span
            className={
              stars > 4 || rating > 4 ? 'filled' : 'empty'
            }>
            <FaStar
              onMouseEnter={() => setRating(5)}
              onMouseLeave={() => setRating(stars)}
              onClick={() => setStars(5)}
            />
          </span>
          <label>Stars</label>
        </div>

        <button
          className='review-button'
          disabled={review.length < 10 || stars < 1}
          onClick={handleSubmit}>
          Submit your Review
        </button>
        {submitted && valErrors.review && (
          <p className='errors'>{valErrors.review}</p>
        )}
        {submitted && valErrors.stars && (
          <p className='errors'>{valErrors.stars}</p>
        )}
      </form>
    </div>
  );
}