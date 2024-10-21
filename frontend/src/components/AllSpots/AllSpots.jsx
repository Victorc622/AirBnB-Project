import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { useNavigate } from "react-router-dom";
import './AllSpots.css';
import { IoStarSharp } from "react-icons/io5";



function AllSpots() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spots = useSelector((state) => state.spots.allSpots);
    const [toolTip, setToolTip] = useState(null);


    useEffect(() => {
      dispatch(getAllSpots());
    }, [dispatch]);

    const handleSpotClick = (spotId) => {
        navigate(`/spots/${spotId}`);
    }

    const allSpots = Object.values(spots)

    return (
        <div className="spots-component">
            <div >
                <div className="spots-wrapper">
                    {allSpots && allSpots
                        .sort((a, b) => b.id - a.id)
                        .map((spot) => (
                        <div 
                            key={spot.id}
                            className="spot-div" 
                            value={toolTip}
                            onMouseOut={() => setToolTip(null)}
                            onMouseOver={() => setToolTip(spot.id)}
                            onClick={() => handleSpotClick(spot.id)}
                        >
                            {toolTip === spot.id && <div id="tooltip">{spot.name}
                        </div>}
                            <img 
                                className="spot-image" 
                                src={spot.previewImage} 
                                alt={spot.name} 
                            />
                            <div className="spot-star">
                                <p className="spot-city-state">
                                    {spot.city}, {spot.state}
                                </p>
                                <p className="spot-rating">
                                <IoStarSharp />
                                    {spot.avgRating ? spot.avgRating.toFixed(1) : "New"}
                                </p>
                            </div>
                            <p className="spot-price">{`$${spot.price} night`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default AllSpots;
