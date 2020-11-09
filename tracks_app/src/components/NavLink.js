import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Spacer from "./Spacer";
import { withNavigation } from "react-navigation";

const NavLink = ({ navigation, routeName, text, clearError }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(routeName);
          clearError();
        }}
      >
        <Spacer>
          <Text style={styles.goto_button}>{text}</Text>
        </Spacer>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  goto_button: {
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
    color: "blue",
  },
});

export default withNavigation(NavLink);
