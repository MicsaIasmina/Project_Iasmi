import moment from "moment";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Subheading, Title } from "react-native-paper";

const ProblemCard = ({ problem, goToDetails }) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={problem.category}
        //subtitle="Card Subtitle"
        //left={LeftContent}
      />
      <Card.Content>
        <Title>{problem.subCategory}</Title>
        <Subheading>Sesizare facuta de: {problem.user?.username}</Subheading>
        <Subheading>
          Sesizare facuta in data de:{" "}
          {moment(problem.createdAt).format("DD MM YYYY hh:mm")}
        </Subheading>
      </Card.Content>
      <Card.Cover source={{ uri: problem.image }} />
      <Card.Actions>
        <Button onPress={() => goToDetails(problem)}>Vezi detalii</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
  },
});

export default ProblemCard;
