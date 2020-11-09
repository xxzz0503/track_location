// This file use to fake the move around location
// by set new location once every second

// Make a Location as referent to all function of expo-location 
import * as Location from "expo-location";

const tenMetersWithDegrees = 0.0001;

// get new location 
const getLocation = (increment) => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: 105.77876382 + increment * tenMetersWithDegrees,
      latitude: 21.06519314 + increment * tenMetersWithDegrees,
    },
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 1000);
