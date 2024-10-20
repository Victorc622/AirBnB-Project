import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../DeleteModal';

const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'June',
	'July',
	'Aug',
	'Sept',
	'Oct',
	'Nov',
	'Dec',
];

export default function ReviewTile({ review }) {
	const session = useSelector((state) => state.session);
	const date = new Date(review.createdAt);
	const month = date.getMonth();
	const year = date.getFullYear();

	return (
		<div>
			<h4>{review.User.firstName}</h4>
			<p>
				{MONTHS[month]} {year}
			</p>
			<p className='review-text'>{review.review}</p>
			{session.user?.id === review.User.id && (
				<OpenModalButton
					buttonText={'Delete'}
					modalComponent={
						<DeleteModal reviewId={review.id} type='review' />
					}
				/>
			)}
		</div>
	);
}