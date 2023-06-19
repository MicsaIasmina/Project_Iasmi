import { Video } from "expo-av";
import React from "react";
import { StyleSheet, View } from "react-native";

const Help = () => {
  return (
    <View style={styles.container}>
      <Video
        style={{ width: 500, height: 700 }}
        useNativeControls
        source={require("../../videos/video.mp4")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Help;
