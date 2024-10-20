import './Spots.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spots';
import SpotTile from './SpotTiles';

export default function Spots() {
	const dispatch = useDispatch();
	const spots = useSelector((state) => state.spots);
	let spotsArr = Object.values(spots);

	useEffect(() => {
		dispatch(getAllSpots());
	}, [dispatch]);

	return (
		<div className='spots-page'>
			<div className='spots-grid'>
				{spotsArr?.map((spot) => (
					<SpotTile key={`${spot.id}`} spot={spot} loggedIn={false} />
				))}
			</div>
		</div>
	);
}