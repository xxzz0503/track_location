import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
// Use SafeAreaView to make sure the render content
//is not display over status bar of device.
import { SafeAreaView } from "react-navigation";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AccountScreen = ({ navigation }) => {
  const { doSignOut } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <Spacer>
        <Text>Account screen</Text>

        <Button
          title="Sign Out"
          raised
          containerStyle={styles.button_container}
          buttonStyle={styles.bc_button}
          onPress={() => {
            // Remove token out of Async Storage and remove it out of
            // context state object as well
            doSignOut();
          }}
        ></Button>
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  tabBarLabel: () => {
    return null;
  },
  tabBarIcon: <MaterialCommunityIcons name="account" size={30} color="black" />,
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  button_container: {
    borderRadius: 5,
  },
  bc_button: {
    borderRadius: 5,
  },
});

export default AccountScreen;
