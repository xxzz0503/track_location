import ContextFactory from "./ContextFactory";

const locationReducer = (state, action) => {
  switch (action.type) {
    case "add_current_location":
      return { ...state, currentLocation: action.payload };
    case "add_location":
      return { ...state, locations: [...state.locations, action.payload] };
    case "start_recording":
      return { ...state, recording: true };
    case "stop_recording":
      return { ...state, recording: false };
    case "change_name":
      return { ...state, name: action.payload };
    case "clear_data":
      return { ...state, name: "", locations: [] };
    default:
      return state;
  }
};

const changeName = (dispatch) => (name) => {
  dispatch({
    type: "change_name",
    payload: name,
  });
};

const startRecording = (dispatch) => () => {
  dispatch({
    type: "start_recording",
  });
};

const stopRecording = (dispatch) => () => {
  dispatch({
    type: "stop_recording",
  });
};

const addLocation = (dispatch) => (location, isRecording) => {
  dispatch({
    type: "add_current_location",
    payload: location,
  });
  if (isRecording) {
    dispatch({ type: "add_location", payload: location });
  }
};

const clearData = (dispatch) => () => {
  dispatch({
    type: "clear_data",
  });
};

export const { Context, Provider } = ContextFactory(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName, clearData },
  { name: "", recording: false, locations: [], currentLocation: null }
);
