import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
// import Loader from "../components/Loader";

const ShowMyTrip = ({ route }) => {
  const { tripData } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!tripData) {
      // Handle case when tripData is undefined
      setIsLoading(false);
      return;
    }

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [tripData]);

  if (!tripData || isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="rgb(207, 151, 234)" />
        <Text style={styles.load}>Loading...</Text>
        {/* <Loader/> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.one}></View>
      <View style={styles.two}>
        <Text style={styles.tripDataHeading}>Trip Data:</Text>
        <Text style={styles.tripDataText}>{JSON.stringify(tripData.plan)}</Text>
      </View>
    </View>
  );
};

export default ShowMyTrip;

const styles = StyleSheet.create({
  load: {
    color: "rgb(207, 151, 234)",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center", // Align text to center
  },
  container: {
    display: "flex",
    width: "100%",
    height: "auto", // Take the full width
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  one: {
    display: "flex",
    width: "4%",
    backgroundColor: "rgb(203, 179, 215)",
    height: "100%",
  },
  two: {
    width: "92%", // Adjust width to 92% to leave space for the border
    margin: 0,
    padding: 10,
    // borderWidth: 2, // Use borderWidth instead of border
    // borderColor: "black", // Set border color
  },
  tripDataHeading: {
    fontWeight: "bold",
    textAlign: "center", // Align text to center
    fontSize: 20,
    marginBottom: 10,
    color: "rgb(162, 47, 220)",
  },
  tripDataText: {
    textAlign: "center", // Align text to center
  },
});
