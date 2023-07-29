import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native";

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

  const elegant = (str) => {
    if (str) {
      const lines = str.split("\n");
      const formattedLines = lines.map((line) => {
        const sp = line.split("-");
        const sv = line.split(".");
        // Do something with sp and sv
        return sp.join(" ") + " - ";
      });

      return formattedLines;
    }
    return [];
  };

  const renderItem = ({ item }) => (
    <View style={styles.tripDataContainer}>
      <Text style={styles.tripDataText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.one}></View>
      {isLoading || !tripData ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="rgb(207, 151, 234)" />
          <Text style={styles.load}>Loading...</Text>
        </View>
      ) : (
        <View style={styles.flatListContainer}>
        <Text style={styles.head}>Trip Plan</Text>
          <FlatList
            data={elegant(tripData.plan)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default ShowMyTrip;

const styles = StyleSheet.create({
  load: {
    color: "rgb(207, 151, 234)",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    display: "flex",
    width: "100%",
    height: "auto",
    flexDirection: "row",
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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flatListContainer: {
    flex: 1,
  },
  tripDataContainer: {
    padding: 10,
  },
  head: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "rgb(170, 83, 213)",
  },
});