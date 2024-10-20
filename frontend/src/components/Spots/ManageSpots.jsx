import './Spots.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import ManageSpotsTiles from './ManageSpotsTiles';

export default function Spots() {
	const dispatch = useDispatch();
	const spots = useSelector((state) => state.spots);
  let spotsArr = Object.values(spots);

	useEffect(() => {
		dispatch(getAllSpots());
	}, [dispatch]);

  const navigate = useNavigate();
  const handleClick = () => {
		navigate('/spots/new');
  };

	return (
		<div className='spots-page'>
			<h1>Manage Spots</h1>
			<button className='new-spot' onClick={handleClick}>
				Create a New Spot
			</button>
			<div className='spots-grid'>
				{spotsArr?.map((spot) => (
					<ManageSpotsTiles
						key={`${spot.id}`}
						spot={spot}
						loggedIn={true}
					/>
				))}
			</div>
		</div>
	);
}