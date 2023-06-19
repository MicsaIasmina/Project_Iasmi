import React, { useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import categories from "../../core/categories";

const Add = (props) => {
  const [category, setCategory] = useState({
    category: "",
    index: -1,
  });
  const [subCategory, setSubCategory] = useState({
    subCategory: "",
    index: -1,
  });

  const selectCategory = (category, index) =>
    setCategory({
      category: category,
      index: index,
    });

  const selectSubCategory = (sub, index) => {
    setSubCategory({
      subCategory: sub,
      index: index,
    });
    if (category.category !== "" && subCategory.subCategory !== "") {
      props.navigation.navigate("Add2", {
        category: category.category,
        subCategory: subCategory.subCategory,
      });
    }
  };

  const list = categories.map((cat, i) => (
    <List.Accordion
      key={i}
      left={(props) => <Image source={cat.icon} style={styles.icon} />}
      titleStyle={{ fontSize: 25 }}
      style={styles.list}
      title={cat.name}
      onPress={() => selectCategory(cat.name, i)}
      expanded={category.index === i}
    >
      {cat.subCategories.map((el, i) => (
        <List.Item
          key={i}
          onPress={() => selectSubCategory(el, i)}
          style={styles.listItem}
          title={el}
        />
      ))}
    </List.Accordion>
  ));
  return (
    <ScrollView>
      <List.Section title="Selecteaza tipul problemei" style={styles.list}>
        {list}
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "100%",
    fontSize: 50,
  },
  listItem: {
    marginLeft: 12,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default Add;
