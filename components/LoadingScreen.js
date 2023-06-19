import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

const LoadingScreen = (props) => {
  return (
    /*  <View style={styles.screen}>
      <View style={styles.dialog}>
        <ActivityIndicator />
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </View> */
    <AnimatedLoader
      visible={props.loading}
      overlayColor="rgb(255,255,255)"
      source={require("./loader.json")}
      animationStyle={styles.lottie}
      speed={1}
    >
      <Text style={styles.text}>{props.text}</Text>
    </AnimatedLoader>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1000,
  },
  dialog: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default LoadingScreen;
