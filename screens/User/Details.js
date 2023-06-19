import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Paragraph, Subheading, Title } from "react-native-paper";
import Toast from "react-native-toast-message";
import Button from "../../components/Button";
import CloseIcon from "../../components/CloseIcon";
import DoneIcon from "../../components/DoneIcon";
import { getColorByStatus } from "../../core/categories";
import { theme } from "../../core/theme";
import { convertStatus } from "../../core/utils";

const Details = (props) => {
  const { problem } = props.route.params;
  const [isProblemVoted, setIsProblemVoted] = useState(false);
  const [positiveVotes, setPositiveVotes] = useState(0);
  const [negativeVotes, setNegativeVotes] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const accountType = await AsyncStorage.getItem("accountType");
      if (accountType !== "user") {
        setIsAdmin(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/main/is-voted/" + problem.id, {
        headers: {
          "auth-token": await AsyncStorage.getItem("token"),
        },
      });
      const data = res.data;
      console.log(data);
      setIsProblemVoted(data.isProblemVoted);
      setPositiveVotes(data.positiveVotes);
      setNegativeVotes(data.negativeVotes);
    })();
  }, [isProblemVoted]);

  const updateStatus = async (status) => {
    const res = await axios.put(
      `/main/update-status/${problem.id}/${status}`,
      null,
      {
        headers: {
          "auth-token": await AsyncStorage.getItem("token"),
        },
      }
    );
    const data = res.data;
    //console.log(data);
    if (data.updated)
      alert(
        `Ai setat problema cu statusul: ${
          status === "IN_PROGRESS"
            ? "Problema este in lucru"
            : "Problema este rezolvata"
        }`
      );
  };

  const sendVote = async (vote) => {
    const res = await axios.post(
      "/main/vote",
      {
        problemId: problem.id,
        vote: vote,
      },
      {
        headers: {
          "auth-token": await AsyncStorage.getItem("token"),
        },
      }
    );
    const data = res.data;
    if (data.success === 1 && data.saved === 1) {
      //alert("ok");
      setIsProblemVoted(1);
      return;
    }
    if (data.voted === 1)
      Toast.show({
        text1: "Ai votat deja aceasta sesizare",
        position: "bottom",
        type: "error",
        visibilityTime: 1200,
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.cover} source={{ uri: problem.image }} />
      <View style={styles.infos}>
        <Title>Categorie: {problem.category}</Title>
        <Title>Subcategorie: {problem.subCategory}</Title>
        <Title>
          Status:{" "}
          <Title style={{ color: getColorByStatus(problem.status) }}>
            {convertStatus(problem.status)}
          </Title>
        </Title>
        <Subheading>
          Sesizare facuta de:{" "}
          <Text style={{ fontWeight: "bold" }}>{problem.user?.username}</Text>
        </Subheading>
        <Subheading>
          Sesizare facuta in data de:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            {moment(problem.createdAt).format("DD MM YYYY hh:mm")}
          </Text>
        </Subheading>
        <Subheading>Observatii:</Subheading>
        <Paragraph>{problem.observations}</Paragraph>
        <Subheading>Locatie: </Subheading>
        <View style={styles.mapView}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: problem.lat,
              longitude: problem.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: problem.lat, longitude: problem.lng }}
              pinColor={getColorByStatus(problem.status, problem.category)}
            />
          </MapView>
        </View>
      </View>
      {isAdmin && (
        <>
          <Button
            //style={styles.saveBtn}
            mode="contained"
            onPress={() => updateStatus("DONE")}
            //onPress={() => setSkip((prev) => prev + 2)}
          >
            <Text>Problema este rezolvata </Text>
          </Button>
          <Button
            //style={styles.saveBtn}
            mode="contained"
            onPress={() => updateStatus("IN_PROGRESS")}
            //onPress={() => setSkip((prev) => prev + 2)}
          >
            <Text>Problema este in lucru </Text>
          </Button>
        </>
      )}
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => sendVote("Y")}
          style={[
            styles.floatingButton,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <DoneIcon />
          <Text style={styles.nrVotes}>{positiveVotes}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => sendVote("N")}
          style={[
            styles.floatingButton,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <CloseIcon />
          <Text style={styles.nrVotes}>{negativeVotes}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    width: "100%",
    height: 300,
  },
  infos: {
    width: "100%",
    padding: 15,
  },
  mapView: {
    //marginTop: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: 200,
  },
  buttons: {
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  floatingButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nrVotes: {
    fontSize: 20,
    color: "white",
  },
});

export default Details;
