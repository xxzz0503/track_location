import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";
import { MaterialIcons } from '@expo/vector-icons';

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const _id = navigation.getParam("id");

  const detail = state.find((item) => item._id === _id);
  const initialCoords = detail.locations[0].coords;
  return detail ? (
    <View style={styles.container}>
      <Text>Track detail screen</Text>
      <Text>{detail.name}</Text>
      <MapView
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords,
        }}
        style={styles.map_container}
      >
        <Polyline coordinates={detail.locations.map((item) => item.coords)} />
      </MapView>
    </View>
  ) : null;
};

TrackDetailScreen.navigationOptions = { headerShown: false };

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 50,
    backgroundColor: "#ffffff",
  },
  map_container: {
    height: 300,
  },
});

export default TrackDetailScreen;
