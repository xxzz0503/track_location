import axios from "axios";
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "http://4e174175c479.ngrok.io",
});

instance.interceptors.request.use(
  // the first function is going to be called automatically
  // anytime that we are about to make a request
  async (config) => {
    // config object is going to be very similar to the config
    // object we passed inside "axios.create".
    // you can make to that config inside this function like adding
    // token to "authorization"
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  // the second function is going to be called automatically
  // anytime that there is an error with us making that request
  // not necessary in the response but if there is some issue
  // with making the request from the get go
  // like don't have internet connection ... etc
  (e) => {
    return Promise.reject(e);
  }
);

export default instance;
