import React from "react";
import { Image } from "react-native";

const PlusIcon = () => {
  return (
    <Image
      style={{ width: 48, height: 48 }}
      source={require("../Images/plus.png")}
    />
  );
};

export default PlusIcon;
