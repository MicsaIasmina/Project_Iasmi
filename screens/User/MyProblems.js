import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Button from "../../components/Button";
import LoadingScreen from "../../components/LoadingScreen";
import ProblemCard from "../../components/ProblemCard";
import { theme } from "../../core/theme";
import { convertStatus } from "../../core/utils";

const MyProblems = (props) => {
  const [problems, setProblems] = useState([]);
  const [loadingObject, setLoadingObject] = useState({
    loading: false,
    text: "",
  });
  const [skip, setSkip] = useState(0);
  const [take] = useState(3);
  const [showMore, setShowMore] = useState(true);
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const username = await AsyncStorage.getItem("username");
      setUsername(username);
      const email = await AsyncStorage.getItem("email");
      setEmail(email);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setProblems([]);
        setLoadingObject({
          loading: true,
          text: "Se incarca datele",
        });
        const res = await axios.get("/main/problems", {
          headers: {
            "auth-token": await AsyncStorage.getItem("token"),
          },
          params: {
            skip: skip,
            take: take,
            userProblems: true,
            status: status,
          },
        });
        const data = res.data;
        console.log(res.data);
        if (data.success === 1) {
          setLoadingObject({
            loading: false,
            text: "",
          });
          if (data.problems.length === 0) {
            setShowMore(false);
            setLoadingObject({
              loading: false,
              text: "",
            });
            return;
          }
          setProblems((prev) => prev.concat(data.problems));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [skip, status]);

  const goToDetails = (problem) =>
    props.navigation.navigate("Details", {
      problem,
    });

  const deleteAccount = async () => {
    Alert.alert("Stergere cont", "Sigur vrei sa stergi acest cont?", [
      {
        text: "Nu",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Da",
        onPress: async () => {
          await AsyncStorage.clear();
          return props.navigation.navigate("Home");
        },
      },
    ]);
  };

  return (
    <View>
      <View style={styles.userInfo}>
        <Text style={styles.info}>Nume: {username}</Text>
        <Text style={styles.info}>Email: {email}</Text>
        <Button
          onPress={() => deleteAccount()}
          mode="contained"
          style={{
            backgroundColor: "white",
            alignSelf: "flex-end",
          }}
        >
          <Text style={{ color: "red" }}>Stergere cont</Text>
        </Button>
      </View>
      {/*  <Picker
          style={{ height: 50, width: 150 }}
          onValueChange={(value) => setStatus(value)}
          selectedValue={status}
          itemStyle={{ height: 50 }}
        >
          <Picker.Item label="Selecteaza" value="" />
          <Picker.Item
            label="Sesizari in curs de verificare"
            value="VERIFYING"
          />
          <Picker.Item label="Sesizari in lucru" value="IN_PROGRESS" />
          <Picker.Item label="Sesizari rezolvate" value="DONE" />
        </Picker> */}
      {/*<Text>Selecteaza statusul </Text>*/}
      <RNPickerSelect
        //style={{ fontSize: 20, textAlign: "center" }}
        style={{ ...pickerStyles }}
        placeholder={{}}
        onValueChange={(status) => setStatus(status)}
        items={[
          { label: "Sesizari in curs de verificare", value: "VERIFYING" },
          { label: "Sesizari in lucru", value: "IN_PROGRESS" },
          { label: "Sesizari rezolvate", value: "DONE" },
        ]}
      />
      {loadingObject.loading && (
        <LoadingScreen
          loading={loadingObject.loading}
          text={loadingObject.text}
        />
      )}
      {problems.length > 0 ? (
        <ScrollView>
          {problems.map((problem, i) => (
            <ProblemCard goToDetails={goToDetails} problem={problem} key={i} />
          ))}
          {showMore && (
            <Button
              style={styles.saveBtn}
              mode="contained"
              onPress={() => setSkip((prev) => prev + 2)}
            >
              <Text>Vezi mai multe </Text>
            </Button>
          )}
        </ScrollView>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>
            Nu exista nici o sesizare cu statusul {convertStatus(status)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerView: {
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  userInfo: {
    width: "100%",
    height: 250,
    padding: 20,
    /* flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between", */
    backgroundColor: theme.colors.primary,
  },
  info: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    textAlign: "center",
    backgroundColor: theme.colors.primary,
    color: "white",
    height: 50,
    marginTop: 20,
  },
  inputAndroid: {
    fontSize: 20,
    textAlign: "center",
    backgroundColor: theme.colors.primary,
    color: "white",
    height: 50,
  },
});

export default MyProblems;
