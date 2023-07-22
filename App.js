import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlanMyTrip from "./pages/PlanMyTrip";
import ShowMyTrip from "./pages/ShowMyTrip";
import Home from "./pages/Home";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text>Welcome</Text>
        <Image
          source={require("./assets/one.jpg")}
          style={{ width: 400, height: 400 }}
        />
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate("PlanMyTrip")}
        />
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PlanMyTrip" component={PlanMyTrip} />
        <Stack.Screen name="ShowMyTrip" component={ShowMyTrip} options={{
            headerLeft: null, // Remove the back button
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
