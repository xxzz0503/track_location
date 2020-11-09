import ContextFactory from "./ContextFactory";
import trackerApi from "../api/tracker";

const TRACK_ENDPOINT = "/tracks";

const TrackReducer = (state, action) => {
  switch (action.type) {
    case "fetch":
      return action.payload;
    default:
      return state;
  }
};

const fetchTrack = (dispatch) => async () => {
  const response = await trackerApi.get(TRACK_ENDPOINT);
  dispatch({
    type: "fetch",
    payload: response.data,
  });
};

const createTrack = (dispatch) => async (name, locations) => {
  await trackerApi.post(TRACK_ENDPOINT, {
    name: name,
    locations: locations,
  });
};

export const { Context, Provider } = ContextFactory(
  TrackReducer,
  { fetchTrack, createTrack },
  []
);
