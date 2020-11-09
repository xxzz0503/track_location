import { AsyncStorage } from "react-native";
import ContextFactory from "./ContextFactory";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const SIGN_UP_ENDPOINT = "/signup";
const SIGN_IN_ENDPOINT = "/signin";

const authReducer = (state, action) => {
  switch (action.type) {
    case "do_auth":
      return { errorMessage: "", token: action.payload };
    case "sign_out":
      return { errorMessage: "", token: null };
    case "error":
      return { ...state, errorMessage: action.payload };
    case "clear_error":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({
      type: "do_auth",
      payload: token,
    });
    navigate("List");
  } else {
    navigate("SignIn");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({
    type: "clear_error",
  });
};

const doSignUp = (dispatch) => async (email, password) => {
  // make api request to sign up that email and password
  // if we sign up, modify our state, and say we are authenticated
  // if signing up fails, we probably need to reflect an error message
  // somewhere
  try {
    const response = await trackerApi.post(`${SIGN_UP_ENDPOINT}`, {
      email: email,
      password: password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "do_auth",
      payload: response.data.token,
    });

    // navigate to main flow
    navigate("List");
  } catch (e) {
    dispatch({
      type: "error",
      payload: "Something went wrong with sign up",
    });
  }
};

const doSignIn = (dispatch) => async (email, password) => {
  // Try to sign in
  // Handle success by updating state
  // Handle failure by showing error message
  try {
    const response = await trackerApi.post(`${SIGN_IN_ENDPOINT}`, {
      email: email,
      password: password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "do_auth",
      payload: response.data.token,
    });

    navigate("List");
  } catch (e) {
    dispatch({
      type: "error",
      payload: "Something went wrong with sign in",
    });
  }
};

const doSignOut = (dispatch) => async () => {
  // sign out somehow
  // remove token out of AsyncStorage and context state object
  await AsyncStorage.removeItem("token");
  dispatch({
    type: "sign_out",
  });
  navigate("SignIn");
};

export const { Context, Provider } = ContextFactory(
  authReducer,
  { doSignUp, doSignIn, doSignOut, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: "" }
);
