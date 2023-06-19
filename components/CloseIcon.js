import React from "react";
import { Image } from "react-native";

const CloseIcon = () => (
  <Image
    source={require("../Images/close.png")}
    style={{ width: 20, height: 20 }}
  />
);

export default CloseIcon;
