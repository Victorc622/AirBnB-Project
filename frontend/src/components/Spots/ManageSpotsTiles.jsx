import { Link, useNavigate } from 'react-router-dom';
import { CiStar } from 'react-icons/gi';
import { LuFlower } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../DeleteModal';

export default function ManageSpotsTiles(props) {
	const { spot, loggedIn } = props;
	const session = useSelector((state) => state.session);
	const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/spots/${spot.id}/edit`);
  };

	return (
		loggedIn &&
		spot.ownerId === session.user.id && (
			<Link to={`/spots/${spot.id}`} className='tiles'>
				<div className='image-container'>
					<img
						className='tile-img'
						src={spot.previewImage}
						alt={spot.title}
					/>
					<div id='tooltip' className='tooltip'>
						{spot.name}
					</div>
				</div>
				<div className='spot-info'>
					<div className='row1'>
						<div className='location'>
							{spot.city}, {spot.state}
						</div>
						<div className='rating'>
							{spot.avgRating ? (
								<>
									<CiStar
										style={{
											color: '#6a0dad',
											fontSize: '1rem',
										}}
									/>
									{spot.avgRating.toFixed(1)}
								</>
							) : (
								' *New!* '
							)}{' '}
						</div>
					</div>
					<div className='price'>
						<span id='price'>
							{spot.price}
							<LuFlower
								style={{
									color: 'teal',
									fontSize: '1rem',
								}}
							/>
						/night
						</span>
					</div>
					{loggedIn && (
						<div className='button-box'>
							<button className='update' onClick={handleClick}>
								Update
							</button>
							<OpenModalButton
								buttonText={'Delete'}
								modalComponent={
									<DeleteModal spotId={spot.id} type='spot' />
								}
							/>
						</div>
					)}
				</div>
			</Link>
		)
	);
}