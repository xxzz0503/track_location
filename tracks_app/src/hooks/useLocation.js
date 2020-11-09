import { useState, useEffect } from "react";

// watchPositionAsync use for watch the user's location
// and see it change over time
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

export default (shouldTrack, callback) => {
  const [error, setError] = useState("");
  // add shouldTrack to array means every time the value of shouldTrack change
  // ==> call function inside useEffect.

  // define function inside useEffect to make sure that
  // any reference to state variable use in this function
  // will must be added in useEffect dependencies
  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        // const { granted } = await requestPermissionsAsync();
        // if (!granted) {
        //   throw new Error("Location permission is not granted");
        // }
        subscriber = await watchPositionAsync(
          {
            // accuracy is essentially how accurate
            // we want our location reading to be
            // the higher accuracy we asked for the more
            // battery power it's going to take because our app
            // is all about watching the user's location and seeing it change
            // over time.
            //The more rudimentary means of transport,
            // the higher the accuracy must be

            // BestForNavigation means give us some very high accuracy
            // in these reading
            accuracy: Accuracy.BestForNavigation,

            // timeInterval: 1000 means that we want to
            // try to get an update once every second
            timeInterval: 1000,

            // distanceInterval: 10 means try to get
            // an update once every 10 meter
            distanceInterval: 10,
          },
          callback
          // (location) => {
          //   // take location object from expo location library as param
          //   // this object describes the user's actual location
          //   addLocation(location);
          // }
        );
      } catch (e) {
        setError(e);
      }
    };

    // console.log(shouldTrack);
    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }

    // make clean up to make sure startWatching
    // doesn't call twice with the same value
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  // return an array is just convention of hooks
  return [error];
};
