import React from "react";
import { Image } from "react-native";

const PhotoIcon = () => (
  <Image
    source={require("../Images/photo.png")}
    style={{ width: 20, height: 20 }}
  />
);

export default PhotoIcon;
