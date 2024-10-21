import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createNewSpot } from "../../store/spots";
import { addImageToSpot } from "../../store/spots";
import "./NewSpot.css";

export const NewSpot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    description: "",
    name: "",
    price: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const newErrors = {};
    if (!formInfo.country) newErrors.country = "Country is required";
    if (!formInfo.address) newErrors.address = "Address is required";
    if (!formInfo.city) newErrors.city = "City is required";
    if (!formInfo.state) newErrors.state = "State is required";
    if (formInfo.description < 30)
      newErrors.description = "Description needs 30 or more characters";
    if (!formInfo.name) newErrors.name = "Name is required";
    if (!formInfo.price) newErrors.price = "Price is required";
    if (!formInfo.image1) newErrors.image1 = "Preview Image URL is required";
    setErrors(newErrors);
  }, [formInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (Object.keys(errors).length > 0) {
      return;
    }
    const spot = {
      country: formInfo.country,
      address: formInfo.address,
      city: formInfo.city,
      state: formInfo.state,
      description: formInfo.description,
      name: formInfo.name,
      price: formInfo.price,
    };

    const createSpot = await dispatch(createNewSpot(spot, navigate));
    if (createSpot) {
      const images = [
        { url: formInfo.image1, preview: true },
        { url: formInfo.image2, preview: false },
        { url: formInfo.image3, preview: false },
        { url: formInfo.image4, preview: false },
        { url: formInfo.image5, preview: false },
      ].filter((image) => image.url);

      await Promise.all(
        images.map((image) => dispatch(addImageToSpot(createSpot.id, image)))
      );
    }
  };
  return (
    <div className="create-spot-wrapper">
      <form className="create-spot-form" action="POST" onSubmit={handleSubmit}>
        <div className="create-spot-heading">
          <h2>Create a New Spot</h2>
          <h3>Where&apos;s your place located?</h3>
          <p>
            Guests will only get your exact address once they&apos;ve booked a
            reservation.
          </p>
        </div>
        <div className="form-info-container">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            placeholder="Country"
            type="text"
            value={formInfo.country}
            onChange={handleChange}
          />
          {hasSubmitted && errors.country && (
            <p className="error">{errors.country}</p>
          )}
          <label htmlFor="address">Street Address</label>
          <input
            id="address"
            placeholder="Street Address"
            type="text"
            value={formInfo.address}
            onChange={handleChange}
          />
          {hasSubmitted && errors.address && (
            <p className="error">{errors.address}</p>
          )}
          <div className="city-state-form">
            <div className="city-div">
              <label htmlFor="city">City</label>
              <input
                id="city"
                placeholder="City"
                type="text"
                value={formInfo.city}
                onChange={handleChange}
              />
              {hasSubmitted && errors.city && (
                <p className="error">{errors.city}</p>
              )}
            </div>
            <div className="state-div">
              <label htmlFor="state">State</label>
              <input
                id="state"
                placeholder="State"
                type="text"
                value={formInfo.state}
                onChange={handleChange}
              />
              {hasSubmitted && errors.state && (
                <p className="error">{errors.state}</p>
              )}
            </div>
          </div>
        </div>
        <div className="line-break"></div>
        <div className="from-description">
          <div className="form-headers">
            <h3>Describe your place to guests</h3>
            <p>
              Mention the best features of your space, any special amenitites
              like fast wifi or parking, and what you love about the
              neighborhood.
            </p>
          </div>
          <textarea
            className="form-textarea"
            placeholder="Please write at least 30 characters"
            id="description"
            value={formInfo.description}
            onChange={handleChange}
          />
          {hasSubmitted && errors.description && (
            <p className="error">{errors.description}</p>
          )}
        </div>
        <div className="line-break"></div>
        <div className="form-title-container">
          <div className="form-headers">
            <h3>Create a title for your spot</h3>
            <p>
              Catch guests&apos; attention with a spot title that highlights what
              makes your place special.
            </p>
          </div>
          <input
            className="input-title"
            placeholder="Name of your spot"
            type="text"
            id="name"
            value={formInfo.name}
            onChange={handleChange}
          />
          {hasSubmitted && errors.name && (
            <p className="error">{errors.name}</p>
          )}
        </div>
        <div className="line-break"></div>
        <div className="form-price-container">
          <div className="form-headers">
            <h3>Set a base price for your spot</h3>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
          </div>
          <label>
            $
            <input
              className="input-price"
              placeholder="Price per night (USD)"
              type="number"
              id="price"
              value={formInfo.price}
              onChange={handleChange}
            />
          </label>
          {hasSubmitted && errors.price && (
            <p className="error">{errors.price}</p>
          )}
        </div>
        <div className="line-break"></div>
        <div className="image-inputs-container">
          <div className="form-headers">
            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot.</p>
          </div>
          <input
            placeholder="Image URL"
            type="url"
            id="image1"
            value={formInfo.image1}
            onChange={handleChange}
          />
          {hasSubmitted && errors.image1 && (
            <p className="error">{errors.image1}</p>
          )}
          <input
            placeholder="Image URL"
            type="url"
            id="image2"
            value={formInfo.image2}
            onChange={handleChange}
          />
          <input
            placeholder="Image URL"
            type="url"
            id="image3"
            value={formInfo.image3}
            onChange={handleChange}
          />
          <input
            placeholder="Image URL"
            type="url"
            id="image4"
            value={formInfo.image4}
            onChange={handleChange}
          />
          <input
            placeholder="Image URL"
            type="url"
            id="image5"
            value={formInfo.image5}
            onChange={handleChange}
          />
        </div>
        <div className="line-break"></div>
        <button className="create-spot-button" type="submit">
          Create Spot
        </button>
      </form>
    </div>
  );
};
