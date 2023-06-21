import axios from "../../axios";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "../../core/utils";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [accountType, setAccountType] = useState({ value: "user", error: "" });

  const register = async () => {
    try {
      const usernameError = usernameValidator(username.value);
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);

      if (usernameError || emailError || passwordError) {
        setUsername({ ...username, error: usernameError });
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }
      const res = await axios.post("/auth/register", {
        username: username.value,
        email: email.value,
        password: password.value,
        accountType: accountType.value,
      });
      const data = res.data;
      if (data.userAlreadyExists) {
        Alert.alert("Ai deja un cont cu acest email.");
        return;
      }

      if (data.registered) {
        /* Toast.show("Contul a fost creat cu succes.", {
        duration: Toast.durations.LONG,
      }); */
        Toast.show({
          text1: "Contul a fost creat cu succes.",
          position: "bottom",
          visibilityTime: 2000,
        });
        setTimeout(() => navigation.navigate("Home"), 2300);
      }
    } catch (error) {
      console.log(error.response.data);
      Toast.show({
        text1: "A aparut o eroare",
        position: "bottom",
        visibilityTime: 2000,
        type: "error",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Logo />

      <Header>Creare Cont</Header>

      <TextInput
        label="Nume de utilizator"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
      />

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

      {/* <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Text style={{ marginBottom: 12 }}>Tip cont:</Text>
        {Platform.OS === "android" ? (
          <Picker
            selectedValue={accountType.value}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setAccountType({ value: itemValue, error: "" })
            }
          >
            <Picker.Item label="Selecteaza" value="" />
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Utilizator" value="user" />
          </Picker>
        ) : (
          <PickerIOS
            selectedValue={accountType.value}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setAccountType({ value: itemValue, error: "" })
            }
          >
            <Picker.Item label="Selecteaza" value="" />
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Utilizator" value="user" />
          </PickerIOS>
        )}
      </View> */}

      <Button mode="contained" onPress={register}>
        Creare Cont
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Ai deja un cont? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Conectare</Text>
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

export default Register;
