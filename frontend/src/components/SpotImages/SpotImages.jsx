import { useSelector } from "react-redux";
import "./SpotImages.css";

const SpotImages = ({ spotId }) => {
  const spot = useSelector((state) => state.spots.spotDetails[spotId]);

  if (!spot || !spot.SpotImages || spot.SpotImages.length === 0) {
    return <div>Loading images...</div>;
  }

  const mainImage = spot.SpotImages[0];
  const otherImages = spot.SpotImages.slice(1);

  return (
    <div className="spot-images-wrapper">
      <div className="main-image">
        <img
          className="spot-main-image"
          src={mainImage.url}
          alt={`Main image ${mainImage.id}`}
        />
      </div>

      <div className="image-grid">
        {otherImages.map((image) => (
          <div className="spot-image" key={image.id}>
            <img
              className="spot-image-container"
              src={image.url}
              alt={`Spot image ${image.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotImages;
