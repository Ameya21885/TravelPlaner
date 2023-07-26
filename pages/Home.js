import { StyleSheet, Text, View, Button, Image } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.one}></View>
      <View style={styles.two}>
        <Text style={styles.head}>Welcome</Text>
        <Image source={require("../assets/one.jpg")} style={styles.img} />
        <View style={styles.but}>
          <Button
            title="Plan my trip"
            onPress={() => navigation.navigate("PlanMyTrip")}
            color="rgb(207, 151, 234)"
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "97%",
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // border: "2px solid black",
  },
  one: {
    display: "flex",
    width: "8%",
    backgroundColor: "rgb(203, 179, 215)",
    height: "100%",
  },
  two: {
    width: "94%",
    margin: 10,
  },
  head: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "rgb(170, 83, 213)",
  },
  img: {
    width: 320,
    height: 400,
    margin: 10,
    borderRadius: 20,
  },
  but: {
    // width: "fit-content",
    alignSelf: "flex-start",
    margin: 10,
    borderRadius: 20,
  },
});
