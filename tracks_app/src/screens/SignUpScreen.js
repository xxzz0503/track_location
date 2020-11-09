import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignUpScreen = () => {
  const { state, doSignUp, clearErrorMessage } = useContext(
    AuthContext
  );

  return (
    <View style={styles.container}>
      {/* <NavigationEvents onWillBlur={() => clearErrorMessage()}/> */}
      <AuthForm
        title="Sign Up"
        errorMessage={state.errorMessage}
        onSubmit={(email, password) => doSignUp(email, password)}
        submitButtonText="Sign Up"
      />
      <NavLink
        routeName="SignIn"
        text="Already have an account? Sign in instead."
        clearError={() => clearErrorMessage()}
      />
    </View>
  );
};

// way 1
// use this if you want to handle with navigation prop
// SignupScreen.navigationOptions = () => {
//     return {
//         headerShown: false,
//     }
// };

// way 2
SignUpScreen.navigationOptions = { headerShown: false };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 100,
  },
});

export default SignUpScreen;
