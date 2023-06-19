import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../axios";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import LoadingScreen from "../../components/LoadingScreen";
import { getColorByStatus } from "../../core/categories";

const Map = (props) => {
  const [locations, setLocations] = useState([]);
  const [loadingObject, setLoadingObject] = useState({
    loading: false,
    text: "",
  });
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      setLoadingObject({
        loading: true,
        text: "Se incarca harta",
      });
      const res = await axios.get("/main/locations", {
        headers: {
          "auth-token": await AsyncStorage.getItem("token"),
        },
      });
      const data = res.data;
      const locations = data.locations;
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
      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });

      //console.log(locations);
      setLocations(locations);
      setLoadingObject({
        loading: false,
        text: "",
      });
    })();
  }, []);

  return (
    <View>
      {loadingObject.loading && (
        <LoadingScreen
          loading={loadingObject.loading}
          text={loadingObject.text}
        />
      )}
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
          {locations.map((loc) => (
            <Marker
              coordinate={{
                latitude: loc.lat,
                longitude: loc.lng,
              }}
              pinColor={getColorByStatus(loc.status, loc.category)}
              onPress={() =>
                props.navigation.navigate("Details", {
                  problem: loc,
                })
              }
              //image={() => getIconByCategoryName(loc.category)}
            >
              {/* <Image
                source={getIconByCategoryName(loc.category)}
                style={{ with: 25, height: 25 }}
              /> */}
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
