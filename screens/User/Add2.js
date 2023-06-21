import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../axios";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import Button from "../../components/Button";
import LoadingScreen from "../../components/LoadingScreen";
import LocationIcon from "../../components/LocationIcon";
import PhotoIcon from "../../components/PhotoIcon";
import { FIREBASE_STORAGE } from "../../firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Add2 = (props) => {
  const { category, subCategory } = props.route.params;
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [observations, setObservations] = useState("");
  const [loading, setLoading] = useState({
    loading: false,
    text: "",
  });

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        text1: "Nu se poate lua locatia curenta",
        type: "error",
        position: "bottom",
        visibilityTime: 2000,
      });
      return;
    }
    setLoading({
      loading: true,
      text: "Se ia locatia",
    });
    const location = await Location.getCurrentPositionAsync({});
    console.log(location);
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    setLoading({
      loading: false,
      text: "",
    });
  };

  const getImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        text1: "Nu se poate accesa galeria",
        type: "error",
        position: "bottom",
        visibilityTime: 2000,
      });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    //console.log(result.base64);
    //console.log(result);
    uploadToFirebase(result.uri);
    //const base64File = convertBlobToBase64(blob);
    //setImage(imageURL);
    //setVisible((prev) => !prev);
  };

  // convertBlobToBase64 = (blob) => Buffer.from(blob).toString("base64");

  const uploadToFirebase = async (uri) => {
    try {
      setLoading({
        loading: true,
        text: "Se incarca imaginea",
      });
      const res = await fetch(uri);
      console.log("res", res.status);
      const blob = await res.blob();
      // console.log("blob", blob);
      const username = await AsyncStorage.getItem("username");
      const storageRef = ref(
        FIREBASE_STORAGE,
        `/images/img_${new Date().toString()}${username}`
      );
      console.log("ref", storageRef);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      // console.log((await uploadTask).ref);
      uploadTask.on(
        "state_changed",
        (snap) => {
          const progress = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          );
          console.log("progress", progress);
        },
        (err) => console.log(err),
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setImage(url);
            setLoading({
              loading: false,
              text: "",
            });
          } catch (error) {
            console.error(error);
          }
        }
      );
    } catch (error) {
      setLoading({
        loading: false,
        text: "",
      });
      setImage(null);
      console.error("error", error);
    }
  };

  const save = async () => {
    //save to db
    if (!image || !location) {
      alert("adaugati locatie si imagine");
      return;
    }
    setLoading({
      loading: true,
      text: "Se salveaza sesizarea",
    });
    const res = await axios.post(
      "/main/add-problem",
      {
        category: category,
        subCategory: subCategory,
        lat: location.lat,
        lng: location.lng,
        image: image,
        observations: observations,
      },
      {
        headers: {
          "auth-token": await AsyncStorage.getItem("token"),
        },
      }
    );
    setLoading({
      loading: false,
      text: "",
    });
    const data = res.data;
    if (data.success && data.saved) {
      Toast.show({
        text1: "Sesizarea s-a salvat cu succes",
        type: "success",
        position: "bottom",
        visibilityTime: 1200,
      });
      setTimeout(() => props.navigation.push("HomeUser"), 800);
    }
  };

  return (
    <View style={styles.container}>
      {loading.loading && (
        <LoadingScreen loading={loading.loading} text={loading.text} />
      )}
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => getLocation()}
          style={[styles.btnAdd, { backgroundColor: "black" }]}
        >
          <LocationIcon />
          <Text style={styles.btnText}>Adauga locatia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => getImage()}
          style={[styles.btnAdd, { backgroundColor: "#60AFF6" }]}
        >
          <PhotoIcon />
          <Text style={styles.btnText}>Adauga poza</Text>
        </TouchableOpacity>
      </View>
      {location != null && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: location.lat, longitude: location.lng }}
          />
        </MapView>
      )}

      <TextInput
        style={styles.input}
        label="Observatii"
        placeholder="Introduceti mai multe detalii"
        //multiline={true}
        onChangeText={(text) => setObservations(text)}
      />
      <Button style={styles.saveBtn} mode="contained" onPress={() => save()}>
        <Text>Salveaza sesizarea</Text>
      </Button>

      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "flex-start",
    /* alignItems: "center", */
    justifyContent: "center",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "flex-start",
    position: "absolute",
    top: 0,
    zIndex: 999,
  },
  btnAdd: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
  },
  btnText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
  map: {
    width: "100%",
    height: 250,
    position: "absolute",
    top: 0,
  },
  saveBtn: {
    position: "absolute",
    bottom: "5%",
  },
  input: {
    justifyContent: "flex-start",
    height: 50,
  },
});

export default Add2;
