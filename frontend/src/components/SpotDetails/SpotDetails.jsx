import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotById } from '../../store/spots';
import { useEffect } from 'react';
import { CiStar } from 'react-icons/gi';
import Reviews from '../Reviews';
import RatingReview from '../RatingReview';
import './SpotDetails.css';

export default function SpotDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const spots = useSelector(state => state.spots)
  const spot = spots[id];

  const images = spot?.SpotImages?.filter((image) => image.preview === false);

  useEffect(() => {
    dispatch(getSpotById(id));
  }, [dispatch, id]);

  if (!spot) return <h1>No longer available.</h1>;
  if (!images) return <h1>Loading...</h1>;

  const reserve = (e) => {
    e.preventDefault();
    alert('Feature coming soon...');
  }

	return (
		<div className='spots-page'>
			<div className='spot-container'>
				<div id='spot-title'>
					<h1>{spot.name}</h1>
					<h3>
						{spot.city}, {spot.state}, {spot.country}
					</h3>
				</div>
				<div id='spot-images'>
					<div id='preview-img'>
						<img
							id='preview'
							src={spot.previewImage}
							alt={spot.description}
						/>
					</div>
					<div id='image-tiles'>
						{images?.map((image) => (
							<img
								className='images'
								key={image.id}
								src={image.url}
								alt={image.id}
							/>
						))}
					</div>
				</div>
				<div className='spot-details'>
					<div id='spot-info'>
						<span id='host'>
							Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}
						</span>
						<p>{spot.description}</p>
					</div>
					<div id='callout'>
						<div id='callout-top'>
							<div id='price'>
								{spot.price}
								<CiStar
									style={{
										color: 'teal',
										fontSize: '1rem',
									}}
								/>/night
							</div>
							<div id='rating-reviews'>
								<RatingReview spot={spot} />
							</div>
						</div>
						<div id='reserve-button'>
							<button id='reserve' onClick={reserve}>
								Reserve
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='reviews'>
				<Reviews spot={spot} />
			</div>
		</div>
	);
}