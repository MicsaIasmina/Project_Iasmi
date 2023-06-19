import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../axios";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import { emailValidator, passwordValidator } from "../../core/utils";
import * as actionTypes from "../../store/actions/actions";

const Login = (props) => {
  console.log(props)
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const login = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    /* const data = await login({
      email: email.value,
      password: password.value,
    }); */
    const res = await axios.post("/auth/login", {
      email: email.value,
      password: password.value,
    });
    const data = res.data;
    console.log(data);
    if (data.invalidData) {
      Toast.show({
        text1: "Datele nu sunt valide.",
        type: "error",
        position: "bottom",
        visibilityTime: 2000,
      });
      return;
    }
    if (data.success && data.invalidData === false) {
      //props.setUser(data.token, data.accountType, data.username);
      if (!!data.accountType)
        await AsyncStorage.setItem("accountType", data.accountType);
      if (!!data.username)
        await AsyncStorage.setItem("username", data.username);
      if (!!data.token) await AsyncStorage.setItem("token", data.token);
      if (!!data.email) await AsyncStorage.setItem("email", data.email);
      Toast.show({
        text1: "Autentificare reusita!",
        type: "success",
        position: "bottom",
        visibilityTime: 2000,
      });
      setTimeout(() => props.navigation.navigate("Welcome"), 2300);
    }
    props.navigation.navigate("Welcome");
  };

  return (
    <View style={styles.container}>
      <Logo />

      <Header>Conectare</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={() => login()}>
        Conectare
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Nu ai un cont? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
          <Text style={styles.link}>Inregistrare</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (token, account, username) =>
      dispatch({
        type: actionTypes.SET_USER,
        token: token,
        accountType: account,
        username: username,
      }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
