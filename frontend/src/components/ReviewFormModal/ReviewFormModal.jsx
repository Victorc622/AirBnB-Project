import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAReview } from "../../store/reviews.js";
import { useModal } from "../../context/Modal.jsx";
import StarRating from "../StarRating/StarRating.jsx";
import './ReviewFormModal.css'


const ReviewFormModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (review.length < 10) {
            newErrors.review = 'Review must be at least 10 characters long';
        }
        if (stars < 1 || stars > 5) {
            newErrors.stars = 'Stars must be between 1 and 5';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        dispatch(addAReview({ review, stars }, spotId));
        closeModal();
    }
    return (
        <div className="form">
            <h2 className="review-title-form">How was your stay?</h2>
            <form onSubmit={handleSubmit}>
                <textarea 
                    placeholder="Leave your review here..."
                    className="review-text-area"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
                {errors.review && <p className="error-message">{errors.review}</p>}
                <label className="stars-label">
                    <StarRating 
                        rating={stars}
                        setRating={setStars}
                        
                    />
                    <span>Stars</span>
                </label>
                {errors.stars && <p className="error-message">{errors.stars}</p>}
                <div className="button-div">
                <button 
                    className="submit-button"
                    type="submit"
                    disabled={review.length < 10 || stars < 1}
                >
                    Submit Your Review
                </button>
                </div>
            </form>
        </div>
    )
}

export default ReviewFormModal;