import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Logo from "../../components/Logo";

const Home = ({ navigation }) => {
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) return navigation.navigate("Welcome");
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Logo />
      <Header>Report Lugoj</Header>
      <Button mode="contained" onPress={() => navigation.navigate("Login")}>
        AUTENTIFICARE
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate("Register")}>
        CREARE CONT
      </Button>
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
});

export default Home;
