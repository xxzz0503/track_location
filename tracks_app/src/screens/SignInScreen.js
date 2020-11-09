import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignInScreen = () => {
  const { state, doSignIn, clearErrorMessage } = useContext(AuthContext);
  return (
    <View style={styles.container}>
    {/* <NavigationEvents onWillBlur={() => clearErrorMessage()}/> */}
      <AuthForm
        title="Sign In"
        errorMessage={state.errorMessage}
        onSubmit={(email, password) => doSignIn(email, password)}
        submitButtonText="Sign In"
      />
      <NavLink
        routeName="SignUp"
        text="Don't have account yet? Sign up instead"
        clearError={() => clearErrorMessage()}
      />
    </View>
  );
};

SignInScreen.navigationOptions = { headerShown: false };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 100,
  },
});

export default SignInScreen;
