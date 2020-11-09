import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

// Polyline is react component to show inside of our map view
// If wee show a polyline inside of a map we will see a line drawn
//   on the actual map itself
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  // nested destructor
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }
  return (
    <MapView
      initialRegion={{
        // latitude & longitude use for
        // where we're going to center the map on
        ...currentLocation.coords,
        // latitudeDelta & longitudeDelta use for
        // how much area or what zoom level we're showing
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    //   region={{
    //     ...currentLocation.coords,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01,
    //   }}
      style={styles.map_container}
    >
      <Circle 
      center={currentLocation.coords}
      radius={30}
      strokeColor="rgba(158, 158, 255, 1.0)"
      fillColor="rgba(158, 158, 255, 0.3)"
      />
      <Polyline coordinates={locations.map(i => i.coords)}/>
    </MapView>
  );
};

const styles = StyleSheet.create({
  map_container: {
    height: 300,
  },
});

export default Map;
