import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import AccountScreen from "./src/screens/AccountScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { setNavigator } from "./src/navigationRef";

import {FontAwesome} from "@expo/vector-icons";

const trackListFlow = createStackNavigator({
  List: TrackListScreen,
  Detail: TrackDetailScreen,
});

trackListFlow.navigationOptions = {
  tabBarLabel: () => {
    return null;
  },
  tabBarIcon: <FontAwesome name="th-list" size={30} color="black" />
}

const switchNavigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    // Put inside here a link to each flow.
    //Here we have
    //  - Authentication flow has sign-up & sign-in screen.
    //  - Main flow has the rest.
    // Suggest use lowercase as key to avoid confusion between link and screen.
    authFlow: createStackNavigator({
      SignIn: SignInScreen,
      SignUp: SignUpScreen,
    }),
    mainFlow: createBottomTabNavigator({
      list_detailFlow: trackListFlow,
      Create: TrackCreateScreen,
      Account: AccountScreen,
    }),
  },
  {
    initialRouteName: "ResolveAuth",
  }
);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
