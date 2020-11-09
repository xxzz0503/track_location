import React, { useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Button, ListItem } from "react-native-elements";
import Spacer from "../components/Spacer";
import { NavigationEvents } from "react-navigation";
import { Context as TrackContext } from "../context/TrackContext";

import TrackPreview from "../components/TrackPreview";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTrack } = useContext(TrackContext);

  return state ? (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={fetchTrack} />
      <Spacer>
        {/* <Text h3>Track list screen</Text> */}
        <FlatList
          data={state}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Detail", {
                    id: item._id,
                  });
                }}
              >
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: "bold" }}>
                      {item.name}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color="#111111" />
                </ListItem>
              </TouchableOpacity>
            );
          }}
        />
        {/* <TrackPreview /> */}
      </Spacer>
    </View>
  ) :  null;
};

TrackListScreen.navigationOptions = { headerShown: false };

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 50,
    backgroundColor: "#ffffff",
  },
  button_container: {
    borderRadius: 5,
  },
  bc_button: {
    borderRadius: 5,
  },
});

export default TrackListScreen;
