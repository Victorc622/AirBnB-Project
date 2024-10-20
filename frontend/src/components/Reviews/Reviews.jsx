import RatingReview from '../RatingReview';
import ReviewTile from './ReviewTile';
import OpenModalButton from '../OpenModalButton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews } from '../../store/reviews';
import ReviewModal from '../ReviewModal';
import './Reviews.css';


export default function Reviews({ spot }) {
  const session = useSelector((state) => state.session);
  const data = useSelector((state) => state.reviews);
  const dataArr = Object.values(data);
  const reviews = dataArr.filter(
    (review) => review.spotId === Number(spot.id)
  );
  reviews.reverse();
  const ownerId = spot.Owner.id

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReviews(spot.id));
  }, [dispatch, spot]);

  if (!data) return <h1>Loading...</h1>;

	return (
		<div className='reviews-container'>
			<div id='rating-reviews'>
				<RatingReview spot={spot} />
			</div>
			<div>
				{session.user && session.user.id !== ownerId && !reviews.length && (
					<p>Be the first to post a review!</p>
				)}
			</div>
			<div>
				{session.user &&
					session.user.id !== ownerId &&
					!reviews.some(
						(review) => review?.userId === session.user?.id
					) && (
						<OpenModalButton
							className='new-review'
							modalComponent={
								<ReviewModal
									spotId={spot.id}
								/>
							}
							buttonText={'Post Your Review'}
						/>
					)}
				{reviews.map((review) => (
					<ReviewTile key={review.id} review={review} />
				))}
			</div>
		</div>
	);
}