import { csrfFetch } from "./csrf";

const ALL_SPOTS = "spots/ALL_SPOTS";
const SPOT_DETAILS = "spots/SPOT_DETAILS";
const NEW_SPOT = "spots/NEW_SPOT";
const ADD_SPOT_IMAGE = "spots/ADD_SPOT_IMAGE";
const GET_USER_SPOTS = "spots/GET_USER_SPOTS";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";
const CLEAR_SPOT_STATE = "spots/CLEAR_SPOT_STATE";

export const allSpots = (payload) => ({
  type: ALL_SPOTS,
  payload,
});

export const spotDetails = (payload) => ({
  type: SPOT_DETAILS,
  payload,
});

export const userSpots = (spots) => ({
  type: GET_USER_SPOTS,
  payload: spots,
});

export const newSpot = (spot) => {
  return {
    type: NEW_SPOT,
    payload: spot,
  };
};

export const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  payload: spot,
});

export const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId,
});

export const addImage = (image) => ({
  type: ADD_SPOT_IMAGE,
  image,
});

export const clearSpotState = () => {
  return {
    type: CLEAR_SPOT_STATE,
  };
};

export const getAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  if (response.ok) {
    const payload = await response.json();
    dispatch(allSpots(payload));
  }
};

export const getSpotDetails = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(spotDetails(spot));
    return spot;
  }
};

export const getUserSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  if (response.ok) {
    const spots = await response.json();
    dispatch(userSpots(spots));
  }
};

export const createNewSpot = (spot, navigate) => async () => {
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const addSpot = await response.json();
    console.log(addSpot);
    navigate(`/spots/${addSpot.id}`);
    return addSpot;
  } else {
    const error = await response.json();
    throw error;
  }
};

export const addImageToSpot = (spotId, image) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(image),
  });

  if (response.ok) {
    const newImage = await response.json();
    dispatch(addImage(newImage));
    return newImage;
  }
};

export const updateASpot = (spotId, spotInfo) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
    },
    body: JSON.stringify(spotInfo),
  });
  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(updateSpot(updatedSpot));
    return updatedSpot;
  } else if (!response.ok) {
    console.log("some error happened");
  }
};

export const deleteASpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteSpot(spotId));
  }
};

const initialState = {
  allSpots: {},
  spotDetails: {},
  userSpots: [],
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_SPOTS: {
      const newState = { ...state, allSpots: {} };
      const spotsArray = action.payload.Spots;
      spotsArray.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    }
    case SPOT_DETAILS: {
      return {
        ...state,
        spotDetails: {
          ...state.spotDetails,
          [action.payload.id]: action.payload,
        },
      };
    }
    case NEW_SPOT: {
      const newState = {
        allSpots: {
          [action.payload.id]: action.payload,
          ...state.allSpots,
        },
        spotDetails: {
          ...state.spotDetails,
          [action.payload.id]: action.payload,
        },
      };
      return newState;
    }
    case UPDATE_SPOT: {
      const newState = {
        ...state,
        allSpots: {
          ...state.allSpots,
          [action.payload.id]: action.payload,
        },
        spotDetails: {
          ...state.spotDetails,
          [action.payload.id]: action.payload,
        },
        userSpots: state.userSpots.map((spot) =>
          spot.id === action.payload.id ? action.payload : spot
        ),
      };
      return newState;
    }
    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState.allSpots[action.spotId];
      newState.userSpots = newState.userSpots.filter(
        (spot) => spot.id !== action.spotId
      );
      delete newState.spotDetails[action.spotId];
      return newState;
    }
    case ADD_SPOT_IMAGE: {
      const newState = { ...state };
      const spot = newState.spotDetails[action.image.spotId];
      if (spot) {
        spot.images = spot.images || [];
        spot.images.push(action.image);
      }
      return newState;
    }
    case GET_USER_SPOTS: {
      return {
        ...state,
        userSpots: action.payload.Spots,
      };
    }
    case CLEAR_SPOT_STATE:
      return { ...initialState };
    default:
      return state;
  }
};

export default spotsReducer;
