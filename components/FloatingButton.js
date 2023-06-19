import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { theme } from "../core/theme";

const FloatingButton = ({ mode, style, children, ...props }) => {
  return (
    <Button
      style={[
        styles.btm,
        mode === "outlined" && { backgroundColor: theme.colors.surface },
      ]}
      mode={mode}
      {...props}
    >
      <Ionicons name="add-outline"></Ionicons>
    </Button>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 999,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default FloatingButton;
