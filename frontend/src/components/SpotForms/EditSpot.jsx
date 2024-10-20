import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotById, editSpot } from '../../store/spots';
import './SpotForms.css';

export default function EditSpot() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
  const spot = useSelector((state) => state.spots[id] || {});

	const [formData, setFormData] = useState({
		country: spot.country || '',
		address: spot.address || '',
		city: spot.city || '',
		state: spot.state || '',
		lat: spot.lat || '',
		lng: spot.lng || '',
		description: spot.description || '',
		name: spot.name || '',
		price: spot.price || 0,
		prevImage: { preview: true, url: '' },
		images: [],
	});

	const [valErrors, setValErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	useEffect(() => {
		if (spot) {
			setFormData((prevData) => ({ ...prevData, ...spot }));
		}
  }, [spot]);

	useEffect(() => {
		dispatch(getSpotById());
	}, [dispatch]);

	useEffect(() => {
		const errors = {};
		if (formData.country.trim() === '')
			errors.country = 'Country is required';
		if (formData.address.trim() === '')
			errors.address = 'Address is required';
		if (formData.city.trim() === '') errors.city = 'City is required';
		if (formData.state.trim() === '') errors.state = 'State is required';
		if (!formData.lat) errors.lat = 'Latitude is required';
		if (!formData.lng) errors.lng = 'Longitude is required';
		if (formData.lat < -90 || formData.lat > 90)
			errors.lat = 'Latitude must be between -90 and 90';
		if (formData.lng < -180 || formData.lng > 180)
			errors.lng = 'Longitude must be between -180 and 180';
		if (formData.description.length < 30)
			errors.description =
				'Description needs to be a minimum of 30 characters';
		if (formData.description.length > 1000)
			errors.description = 'Description must be less than 1000 characters';
		if (formData.name.trim() === '') errors.name = 'Name is required';
		if (formData.price < 0.01) errors.price = 'Price must be greater than $0';
		if (formData.images.length > 0) {
			formData.images.forEach((image, idx) => {
				if (image && !/\.(jpg|jpeg|png)$/.test(image)) {
					valErrors[`image${idx}`] =
						'Image URL must end in .png, .jpg, or .jpeg';
				}
			});
		}

		setValErrors(errors);
	}, [formData, valErrors]);

	const handleUpdate = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		if (Object.keys(valErrors).length) return;
		await dispatch(editSpot(id, formData));
		navigate(`/${id}`);
	};

	return (
		<div className='form-container'>
			hi
			<form
				className='new-spot-form'
				style={{ display: 'flex', flexDirection: 'column', width: 525 }}>
				<h1>Update your Spot</h1>
				<h2>Where&apos;s your place located?</h2>
				<caption style={{ textAlign: 'left' }}>
					Guests will only get your exact address once they booked a
					reservation.
				</caption>
				<br></br>
				<br></br>
				<div>
					<label htmlFor='country'>Country</label>
					{submitted && valErrors.country && (
						<span className='errors'> {valErrors.country}</span>
					)}
				</div>
				<input
					value={formData.country}
					onChange={handleChange}
					placeholder='Country'
					type='text'
					name='country'
				/>
				<div>
					<label htmlFor='address'>Street Address</label>
					{submitted && valErrors.address && (
						<span className='errors'> {valErrors.address}</span>
					)}
				</div>
				<input
					value={formData.address}
					onChange={handleChange}
					placeholder='Address'
					type='text'
					name='address'
				/>
				<div className='city-state'>
					<div>
						<div>
							<label htmlFor='city'>City</label>
							{submitted && valErrors.city && (
								<span className='errors'> {valErrors.city}</span>
							)}
						</div>
						<input
							value={formData.city}
							onChange={handleChange}
							placeholder='City'
							type='text'
							name='city'
						/>
					</div>
					<div>
						<div>
							<label htmlFor='state'>State</label>
							{submitted && valErrors.state && (
								<span className='errors'> {valErrors.state}</span>
							)}
						</div>
						<input
							value={formData.state}
							onChange={handleChange}
							placeholder='State'
							type='text'
							name='state'
						/>
					</div>
				</div>
				<div className='coord-container'>
					<div>
						<div>
							<label htmlFor='latitude'>Latitude</label>
							{submitted && valErrors.lat && (
								<span className='errors'> {valErrors.lat}</span>
							)}
						</div>
						<input
							className='lat-lng'
							value={formData.lat}
							onChange={handleChange}
							placeholder='Latitude'
							type='number'
							name='latitude'
						/>
					</div>
					<div>
						<div>
							<label htmlFor='longitude'>Longitude</label>
							{submitted && valErrors.lng && (
								<span className='errors'> {valErrors.lng}</span>
							)}
						</div>
						<input
							className='lat-lng'
							value={formData.lng}
							onChange={handleChange}
							placeholder='Longitude'
							type='number'
							name='longitude'
						/>
					</div>
				</div>
				<h3>Describe your place to guests</h3>
				<caption style={{ textAlign: 'left' }}>
					Mention the best features of your space, any special amenities
					like fast wifi or parking, and what you love about the
					neighborhood.
				</caption>
				<br></br>
				<textarea
					value={formData.description}
					onChange={handleChange}
					placeholder='Description'
					name='description'
					id=''></textarea>
				{submitted && valErrors.description ? (
					<div className='errors'>{valErrors.description}</div>
				) : (
					<div className='hide'>Validated</div>
				)}
				<h3>Create a title for your spot</h3>
				<caption style={{ textAlign: 'left' }}>
					Catch guests&apos; attention with a spot title that highlights
					what makes your place special.
				</caption>
				<br></br>
				<input
					value={formData.name}
					onChange={handleChange}
					placeholder='Name of your spot'
					type='text'
					name='name'
				/>
				{submitted && valErrors.name ? (
					<div className='errors'>{valErrors.name}</div>
				) : (
					<div className='hide'>Validated</div>
				)}
				<h3>Set a base price for your spot</h3>
				<caption style={{ textAlign: 'left' }}>
					Competitive pricing can help your listing stand out and rank
					higher in search results.
				</caption>
				<br></br>
				<label>
					$
					<input
						className='price-input'
						value={formData.price}
						onChange={handleChange}
						type='number'
						name='price'
						placeholder='Price per night (USD)'
					/>
				</label>
				{submitted && valErrors.price ? (
					<div className='errors'>{valErrors.price}</div>
				) : (
					<div className='hide'>Validated</div>
				)}
				<h3>Liven up your spot with photos</h3>
				<caption style={{ textAlign: 'left' }}>
					Submit a link to at least one photo to publish your spot
				</caption>
				<br></br>
				<input
					value={formData.name}
					onChange={handleChange}
					placeholder='Name of your spot'
					type='text'
					name='name'
				/>
				{submitted && valErrors.name && (
					<div className='errors'>{valErrors.name}</div>
				)}
				<h3>Set a base price for your spot</h3>
				<caption style={{ textAlign: 'left' }}>
					Competitive pricing can help your listing stand out and rank
					higher in search results.
				</caption>
				<br />
				<label>
					$
					<input
						value={formData.price}
						onChange={handleChange}
						type='number'
						name='price'
						placeholder='Price per night (USD)'
					/>
				</label>
				{submitted && valErrors.price && (
					<div className='errors'>{valErrors.price}</div>
				)}
				<h3>Liven up your spot with photos</h3>
				<caption style={{ textAlign: 'left' }}>
					Submit a link to at least one photo to publish your spot.
				</caption>
				<br />
				<input
					value={formData.prevImg}
					onChange={handleChange}
					type='text'
					name='prevImg'
					placeholder='Preview Image URL'
				/>
				{submitted && valErrors.prevImg && (
					<div className='errors'>{valErrors.prevImg}</div>
				)}
				<input
					value={formData.image}
					onChange={handleChange}
					type='text'
					name='image'
					placeholder='Image URL'
				/>
				{submitted && valErrors.image && (
					<div className='errors'>{valErrors.image}</div>
				)}
				<input
					value={formData.image}
					onChange={handleChange}
					type='text'
					name='image'
					placeholder='Image URL'
				/>
				{submitted && valErrors.image && (
					<div className='errors'>{valErrors.image}</div>
				)}
				<input
					value={formData.image}
					onChange={handleChange}
					type='text'
					name='image'
					placeholder='Image URL'
				/>
				{submitted && valErrors.image && (
					<div className='errors'>{valErrors.image}</div>
				)}
				<input
					value={formData.image}
					onChange={handleChange}
					type='text'
					name='image'
					placeholder='Image URL'
				/>
				{submitted && valErrors.image && (
					<div className='errors'>{valErrors.image}</div>
				)}
				<button onClick={handleUpdate}>Update Spot</button>
			</form>
		</div>
	);
}