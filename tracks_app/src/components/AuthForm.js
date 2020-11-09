import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";

const RaisedButton = (props) => <Button raised {...props} />;

const AuthForm = ({ title, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleStyle = (error) => {
    return error ? error_input_styles : normal_input_styles;
  };

  const ErrorMsg = ({ error, title }) => {
    return error ? (
      title === "Sign Up" ? (
        <Text style={handleStyle(error).email_message}>Duplicated!!!</Text>
      ) : (
        <Text style={handleStyle(error).email_message}>Wrong Email!!!</Text>
      )
    ) : null;
  };
  return (
    <>
      <Spacer>
        <Text h1>{title}</Text>
      </Spacer>
      <View style={styles.email_section}>
        <Input
          label="Email"
          value={email}
          labelStyle={handleStyle(errorMessage).label}
          inputContainerStyle={handleStyle(errorMessage).input_container}
          inputStyle={handleStyle(errorMessage).input_text}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <ErrorMsg error={errorMessage} title={title} />
      </View>
      <Spacer />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Spacer>
        <RaisedButton
          title={submitButtonText}
          containerStyle={styles.button_container}
          onPress={() => {
            onSubmit(email, password);
          }}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  button_container: {
    marginBottom: 20,
  },
  goto_sign_in: {
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
    color: "blue",
  },
  email_section: {
    justifyContent: "center",
  },
});

const normal_input_styles = StyleSheet.create({
  input_container: {
    borderBottomColor: "#111111",
  },
  label: {
    color: "#111111",
    opacity: 0.5,
  },
  input_text: {
    color: "#111111",
  },
});

const error_input_styles = StyleSheet.create({
  input_container: {
    borderBottomColor: "red",
    borderBottomWidth: 2,
  },
  label: {
    color: "red",
    opacity: 0.5,
  },
  email_message: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "700",
    color: "red",
    opacity: 0.5,
    alignSelf: "flex-end",
    right: 10,
  },
  input_text: {
    color: "red",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default AuthForm;
