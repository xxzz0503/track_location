import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Input
        value={name}
        placeholder="Enter Name"
        onChangeText={(text) => changeName(text)}
      />
      <Spacer>
        {recording ? (
          <Button
            buttonStyle={button_styles.stop_button}
            raised
            title="Stop Recording"
            onPress={() => stopRecording()}
          />
        ) : (
          <Button
            raised
            title="Start Recording"
            onPress={() => startRecording()}
          />
        )}
      </Spacer>
      <Spacer>
        {!recording && locations.length ? (
          <Button
            raised
            title="Save Recording"
            onPress={saveTrack}
            buttonStyle={button_styles.save_button}
          />
        ) : null}
      </Spacer>
    </>
  );
};

const button_styles = StyleSheet.create({
  stop_button: {
    backgroundColor: "red",
  },
  start_button: {},
  save_button: {
    backgroundColor: "#28df99",
  },
});

export default TrackForm;
