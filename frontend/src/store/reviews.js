import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

export const getReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        payload: reviews,
    }
};

export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review,
    }
};

export const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId,
    }
};

export const getAllReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(getReviews(reviews.Reviews));
        return reviews;
    }
};

export const addAReview = (review, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST", 
        headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(review),
    })
    if (response.ok) {
        const review = await response.json();
        dispatch(addReview(review));
        return review;
    }
};

export const deleteAReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE", 
    })
    if (response.ok) {
        dispatch(deleteReview(reviewId))
    }
};

const initialState = { reviews: [] };

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            return { ...state, reviews: action.payload };
        }
        case ADD_REVIEW: {
            return { ...state, reviews: [...state.reviews, action.payload] };
        }
        case DELETE_REVIEW: {
            return {
                ...state, 
                reviews: state.reviews.filter(
                    (review) => {
                         return review.id !== action.reviewId
                    }
                ),
            }
        }
        default:
            return state;
    }
}
export default reviewReducer;