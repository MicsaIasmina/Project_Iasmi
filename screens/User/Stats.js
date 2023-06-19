import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import RNPickerSelect from "react-native-picker-select";
import LoadingScreen from "../../components/LoadingScreen";
import { categoriesNames } from "../../core/categories";
import { theme } from "../../core/theme";

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  // backgroundColor: "#000000",
  backgroundGradientFrom: "#020024",
  backgroundGradientTo: "#096579",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },

  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const Stats = () => {
  const [inProgress, setInProgress] = useState(0);
  const [resolved, setResolved] = useState(0);
  const [verifying, setVerifying] = useState(0);
  const [category, setCategory] = useState("");

  const [loadingObject, setLoadingObject] = useState({
    loading: false,
    text: "",
  });

  useEffect(() => {
    (async () => {
      setLoadingObject({
        loading: true,
        text: "se incarca",
      });
      const res = await axios.get("/chart/problems-percentages", {
        headers: {
          "auth-token": await AsyncStorage.getItem("token"),
        },
        params: {
          category,
        },
      });
      if (res.data.success) {
        /* const data = res.data.data;
        const categories = data.map((d) => d.category);
        console.log(categories);
        setLabels(categories);
        const values = data.map((d) => d.nr);
        console.log(values);
        setValues(values); */
        console.log(res.data);
        setInProgress(res.data.inProgres);
        setResolved(res.data.resolved);
        setVerifying(res.data.verifying);
        setLoadingObject({
          loading: false,
          text: "",
        });
      }
    })();
  }, [category]);

  return (
    <View>
      {loadingObject.loading && (
        <LoadingScreen
          loading={loadingObject.loading}
          text={loadingObject.text}
        />
      )}
      <RNPickerSelect
        style={{ ...pickerStyles }}
        placeholder="Selecteaza categorie"
        value={category}
        onValueChange={(category) => {
          //setProblems([]);
          console.log(category);
          setCategory(category);
        }}
        items={[
          {
            label: "Selecteaza categoria",
            value: "",
          },
          {
            label: "Toate categoriile",
            value: "ALL",
          },
          ...categoriesNames.map((category) => {
            return {
              label: category,
              value: category,
            };
          }),
        ]}
      />
      {/* {labels.length > 0 && values.length > 0 && (
        <BarChart
          //style={graphStyle}
          data={{
            labels: [...labels],
            datasets: [
              {
                data: values,
              },
            ],
          }}
          width={screenWidth}
          height={300}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      )} */}
      {loadingObject.loading === false ? (
        <PieChart
          data={[
            {
              name: "in verificare",
              value: verifying || 100,
              color: theme.colors.primary,
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "in lucru",
              value: inProgress || 0,
              color: "red",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "rezolvate",
              value: resolved || 0,
              color: "green",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
          ]}
          width={screenWidth}
          height={250}
          chartConfig={chartConfig}
          accessor={"value"}
          backgroundColor={"transparent"}
          //paddingLeft={"15"}
          //center={[10, 50]}
          absolute
        />
      ) : null}
    </View>
  );
};

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    textAlign: "center",
    backgroundColor: theme.colors.primary,
    color: "white",
    height: 50,
  },
  inputAndroid: {
    fontSize: 20,
    textAlign: "center",
    backgroundColor: theme.colors.primary,
    color: "white",
    height: 50,
  },
});

export default Stats;
