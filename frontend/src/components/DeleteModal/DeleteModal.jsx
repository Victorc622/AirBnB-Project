import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { destroySpot } from '../../store/spots';
import { destroyReview } from '../../store/reviews';
import './DeleteModal.css';

export default function DeleteModal({ spotId, reviewId, type }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();


	const handleYes = () => {
    if (type == 'spot') {
      dispatch(destroySpot(spotId));
		} else {
      dispatch(destroyReview(reviewId));
		}
		closeModal();
  };

  const handleNo = () => closeModal();

	return (
		<div className='delete-container'>
			<h2>Confirm Delete</h2>
			<p>
				Are you sure you want to delete this{' '}
				{type === 'spot' ? 'spot' : 'review'}?
			</p>
			<button className='yes' onClick={handleYes}>
				Yes {`(Delete ${type})`}
			</button>
			<button className='no' onClick={handleNo}>
				No {`(Keep ${type})`}
			</button>
		</div>
	);
}