import { Link } from 'react-router-dom';
import { CiStar } from "react-icons/ci";
import { LuFlower } from "react-icons/lu";

export default function SpotTile(props) {
	const { spot } = props;

	return (
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
			</div>
		</Link>
	);
}