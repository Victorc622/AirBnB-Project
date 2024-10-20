import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/getSpots';
const GET_SPOT = 'spot/getSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const CREATE_SPOT = 'spots/createSpot';
const DELETE_SPOT = 'spots/deleteSpot';

const getSpots = (payload) => {
	return {
		type: GET_SPOTS,
		payload,
	};
};

export const getAllSpots = () => async (dispatch) => {
	const res = await csrfFetch('/api/spots');
	if (res.ok) {
		const data = await res.json();
		dispatch(getSpots(data.Spots));
		return data;
	}
};

const getSpot = (payload) => {
	return {
		type: GET_SPOT,
		payload,
	};
};

export const getSpotById = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}`);
	if (res.ok) {
		const spot = await res.json();
		dispatch(getSpot(spot));
		return spot;
	}
};

const updateSpot = (payload) => {
	return {
		type: UPDATE_SPOT,
		payload,
	};
};

export const editSpot = (spotId, spot) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}`, {
		method: 'PUT',
		body: JSON.stringify(spot),
		headers: { 'Content-Type': 'application/json' },
	});
	if (res.ok) {
		const updatedSpot = await res.json();
		dispatch(updateSpot(updatedSpot));
		return updatedSpot;
	}
};

const createSpot = (payload) => {
	return {
		type: CREATE_SPOT,
		payload,
	};
};

export const makeSpot = (spot) => async (dispatch) => {
	const res = await csrfFetch('/api/spots', {
		method: 'POST',
		body: JSON.stringify(spot),
		headers: { 'Content-Type': 'application/json' },
	});
	if (res.ok) {
		const newSpot = await res.json();
		dispatch(createSpot(newSpot));
		return newSpot;
	}
};

const deleteSpot = (payload) => {
	return {
		type: DELETE_SPOT,
		payload,
	};
};

export const destroySpot = (spotId) => async (dispatch) => {
	const res = await csrfFetch(`/api/spots/${spotId}`, {
		method: 'DELETE',
	});
	if (res.ok) {
		const spot = await res.json();
		dispatch(deleteSpot(spotId));
		return spot;
	}
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_SPOTS: {
			const newState = { ...state };
			action.payload.forEach((spot) => {
				if (state[spot.id]) {
					newState[spot.id] = { ...state[spot.id], ...spot };
				} else {
					newState[spot.id] = spot;
				}
			});
			return newState;
		}
		case GET_SPOT: {
			const newState = { ...state };
			if (state[action.payload.id]) {
				newState[action.payload.id] = {
					...state[action.payload.id],
					...action.payload,
				};
			} else {
				newState[action.payload.id] = action.payload;
				newState[action.payload.id].previewImage = newState[
					action.payload.id
				].SpotImages.find((image) => image.preview).url;
			}
			return newState;
		}
		case CREATE_SPOT: {
			const newState = { ...state };
			newState[action.payload.id] = action.payload;
			return newState;
		}
		case UPDATE_SPOT: {
			const newState = { ...state };
			newState[action.payload.id] = {
				...newState[action.payload.id],
				...action.payload,
			};
			return newState;
		}
		case DELETE_SPOT: {
			const newState = { ...state };
			delete newState[action.payload];
			return newState;
		}
		default:
			return state;
	}
};

export default spotsReducer;