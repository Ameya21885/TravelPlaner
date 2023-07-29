import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { TextInput as PaperTextInput } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Checkbox } from "react-native-paper";

const city = [
  { country: "Ahmadnagar" },
  { country: "Akola" },
  { country: "Amravati" },
  { country: "Aurangabad" },
  { country: "Bhandara" },
  { country: "Beed" },
  { country: "Anguilla" },
  { country: "ABuldana" },
  { country: "Antigua and Barbuda" },
  { country: "Chandrapur" },
  { country: "Dhule" },
  { country: "Gadchirol" },
  { country: "Gondia" },
  { country: "Hingol" },
  { country: "Jalgaon" },
  { country: "Latur" },
  { country: "Kolhapur" },
  { country: "Mumbai" },
  { country: "Mumbai Suburban" },
  { country: "Nagpur" },
  { country: "Belgium" },
  { country: "Nanded" },
  { country: "Osmanabad" },
  { country: "Nandurbar" },
  { country: "Nashik" },
  { country: "Parbhani" },
  { country: "Pune" },
  { country: "Raigad" },
  { country: "Ratnagiri" },
  { country: "Sangli" },
  { country: "Satara" },
  { country: "Sindhud" },
  { country: "Solapur" },
  { country: "Thane" },
  { country: "Wardha" },
  { country: "Washim" },
  { country: "Yavatmal" },
];

const PlanMyTrip = () => {
  const navigation = useNavigation();
  const searchRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState(null);
  // form2
  // explore this place

  // 1.how i wish to explore this place

  // form1
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(city);
  const [selectedCity, setSelectedCity] = useState("");

  const [explorePlace, setExplorePlace] = useState([
    { id: 1, label: "Walking", checked: false },
    { id: 2, label: "Cab", checked: false },
    { id: 3, label: "Bike", checked: false },
    { id: 4, label: "Local Transport", checked: false },
    { id: 5, label: "Bike Taxi", checked: false },
  ]);
  const [foodPreferences, setFoodPreferences] = useState([
    { id: 6, label: "Veg", checked: false },
    { id: 7, label: "Non-Veg", checked: false },
    { id: 8, label: "Continental", checked: false },
    { id: 9, label: "Local Veg", checked: false },
    { id: 10, label: "Local Non-Veg", checked: false },
    { id: 11, label: "South Indian", checked: false },
    { id: 12, label: "North Indian", checked: false },
  ]);
  const [placesWishToVisit, setPlacesWishToVisit] = useState([
    { id: 13, label: "Historical", checked: false },
    { id: 14, label: "Forts", checked: false },
    { id: 15, label: "Mountains", checked: false },
    { id: 16, label: "Rivers", checked: false },
    { id: 17, label: "Sea", checked: false },
  ]);
  const [parties, setParties] = useState([
    { id: 18, label: "Pubs", checked: false },
    { id: 19, label: "Discs", checked: false },
    { id: 20, label: "Bars", checked: false },
    { id: 21, label: "Thali Restaurants", checked: false },
  ]);

  const handleCheckboxToggleExplorePlaces = (itemId) => {
    setExplorePlace((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };
  const handleCheckboxToggleFoodPreferences = (itemId) => {
    setFoodPreferences((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };
  const handleCheckboxTogglePlacesWishToVisit = (itemId) => {
    setPlacesWishToVisit((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };
  const handleCheckboxToggleParties = (itemId) => {
    setParties((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Function to enable/disable input fields, radio buttons, and buttons
  const disableAllComponents = (isDisabled) => {
    setSearch(isDisabled ? "" : search);
    setClicked(isDisabled ? false : clicked);
  };
  // form2
  const handlePostRequest = () => {
    // Validate selected city is not empty
    if (selectedCity === "") {
      setError("Please select a city.");
      return;
    }
    // Validate number of days is not empty
    if (!value || parseInt(value) === 0) {
      setError("Please enter a valid number of days.");
      return;
    }
    // Validate at least one checkbox is selected for explorePlace and foodPreferences
    const isExplorePlaceSelected = explorePlace.some((item) => item.checked);
    const isFoodPreferenceSelected = foodPreferences.some(
      (item) => item.checked
    );
    const isPlacesWishToVisit = placesWishToVisit.some((item) => item.checked);
    const isParties = parties.some((item) => item.checked);

    if (
      !isExplorePlaceSelected ||
      !isFoodPreferenceSelected ||
      !isPlacesWishToVisit ||
      !isParties
    ) {
      // Show error message or take appropriate action when validation fails
      //  alert("Please select at least one checkbox from Explore Places and Food Preferences.");
      setError(
        "Please select at least one checkbox from Explore Places and Food Preferences."
      );
      return;
    }
    setError("");
    setIsLoading(true);

    const selectedItems = explorePlace.filter((item) => item.checked);
    // console.log('Selected Expolre Places:', selectedItems);

    const selectedFoodPreferences = foodPreferences.filter(
      (item) => item.checked
    );
    const selectedPlacesWishToVisit = placesWishToVisit.filter(
      (item) => item.checked
    );
    const selectedParties = parties.filter((item) => item.checked);
    // console.log('Selected Food Preferences:', selectedFoodPreferences);

    // Create a function to convert the explorePlace and foodPreferences data into an object
    const convertToPreferencesObject = (items) => {
      const preferences = {};
      items.forEach((item) => {
        if (item.checked) {
          preferences[item.label] = true;
        }
      });
      return preferences;
    };

    // Combine both the selected explore places and food preferences into a single object
    const postData = {
      city: selectedCity,
      duration: `${value} days`,
      preferences: {
        ...convertToPreferencesObject(explorePlace),
        ...convertToPreferencesObject(foodPreferences),
        ...convertToPreferencesObject(placesWishToVisit),
        ...convertToPreferencesObject(parties),
      },
    };
    console.log("Postdata:", postData);

    // Make the post request using Axios (replace the URL with your actual endpoint)
    axios
      .post("https://virenk3o.pythonanywhere.com/generate_travel_plan", postData)
      // .post("http://127.0.0.1:5000/generate_travel_plan", postData)

      .then((response) => {
        console.log("Post Request Response:", response.data);
        setIsLoading(false);
        disableAllComponents(false);
        setTripData(response.data);
      })
      .catch((error) => {
        console.error("Post Request Error:", error);
        setError("An error occurred while saving the data. Please try again.");
        setIsLoading(false);
        disableAllComponents(false);
      });
  };

  useEffect(() => {
    if (!isLoading && tripData) {
      navigation.navigate("ShowMyTrip", { tripData: tripData });
    }
  }, [isLoading, tripData, navigation]);
  // form1
  const onSearch = (search) => {
    if (search !== "") {
      let tempData = data.filter((item) => {
        return item.country.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(city);
    }
  };
  // form1
  const handleTextChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setValue(numericValue);
    console.log(numericValue);
  };
  // form1
  console.log("Selected City:", selectedCity);

  const handleButtonPress = () => {
    // Perform any necessary data processing before navigating
    if (selectedCity === "" || !value || parseInt(value) === 0) {
      setError("Please select a city and enter a valid number of days.");
      return;
    } else {
      setError("");
    }
    handlePostRequest();

 
    // Navigate to the ShowMyTrip component and pass the data as route parameters
    // navigation.navigate("ShowMyTrip", { tripData: tripData });

    // Only navigate when tripData is not null (i.e., data has been received)
    // if (tripData) {
    //   navigation.navigate("ShowMyTrip", { tripData: tripData });
    // } else {
    //   // Handle the case when data is not available yet
    //   // You can show a message or take appropriate action here
    //   console.log("Data is not available yet. Please wait for the response.");
    // }
  };

  return (
    <View style={styles.maincont}>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="rgb(162, 47, 220)" />
        </View>
      )}

      <View style={styles.one} />
      <View style={styles.pageContainer}>
        <View style={styles.two}>
          <KeyboardAvoidingView
            style={styles.maincontainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          >
            <FlatList
              contentContainerStyle={styles.scrollViewContent}
              keyboardShouldPersistTaps="handled"
              ListHeaderComponent={
                <View style={styles.contentContainer}>
                  <Text style={styles.mainheading}>Plan My Trip</Text>

                  {/* form1 */}
                  <View style={styles.formContainer}>
                    <TouchableOpacity
                      style={styles.selectCountryButton}
                      onPress={() => {
                        setClicked(!clicked);
                      }}
                    >
                      <Text style={styles.selectCountryButtonText}>
                        {selectedCity === "" ? "Select City" : selectedCity}
                      </Text>
                      {clicked ? (
                        <Image
                          source={require("../assets/upload.png")}
                          style={styles.icon}
                        />
                      ) : (
                        <Image
                          source={require("../assets/dropdown.png")}
                          style={styles.icon}
                        />
                      )}
                    </TouchableOpacity>
                    {clicked ? (
                      <View style={styles.dropdownContainer}>
                        <TextInput
                          placeholder="Search.."
                          value={search}
                          ref={searchRef}
                          onChangeText={(txt) => {
                            onSearch(txt);
                            setSearch(txt);
                          }}
                          style={styles.searchInput}
                        />

                        <ScrollView>
                          <FlatList
                            data={data}
                            renderItem={({ item, index }) => {
                              return (
                                <TouchableOpacity
                                  style={styles.dropdownItem}
                                  onPress={() => {
                                    setSelectedCity(item.country);
                                    setClicked(!clicked);
                                    onSearch("");
                                    setSearch("");
                                  }}
                                >
                                  <Text style={styles.dropdownItemText}>
                                    {item.country}
                                  </Text>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </ScrollView>
                      </View>
                    ) : null}

                    {/* <Text style={styles.label}>NoOfDays</Text> */}
                    <PaperTextInput
                      label="No. of days"
                      value={value}
                      onChangeText={handleTextChange}
                      keyboardType="numeric"
                      mode="outlined"
                      style={[
                        styles.daysInput,
                        isLoading && styles.disabledInput,
                      ]}
                      editable={!isLoading}
                    />
                  </View>

                  {/* form2 */}
                  <View>
                    {/*1.How I wish to explore this place? */}
                    <View style={{ flex: 1 }}>
                      <Text style={styles.heading}>
                        How I wish to explore this place?
                      </Text>
                      {explorePlace.map((item) => (
                        <Checkbox.Item
                          key={item.id}
                          label={item.label}
                          status={item.checked ? "checked" : "unchecked"}
                          onPress={() =>
                            handleCheckboxToggleExplorePlaces(item.id)
                          }
                          color="rgb(168, 62, 222)" // Customize the checkbox color here
                        />
                      ))}
                    </View>

                    {/*2.How I wish to explore this place? */}
                    <View style={{ flex: 1 }}>
                      <Text style={styles.heading}>My Food Preferences</Text>
                      {foodPreferences.map((item) => (
                        <Checkbox.Item
                          key={item.id}
                          label={item.label}
                          status={item.checked ? "checked" : "unchecked"}
                          onPress={() =>
                            handleCheckboxToggleFoodPreferences(item.id)
                          }
                          color="rgb(168, 62, 222)" // Customize the checkbox color here
                        />
                      ))}
                    </View>

                    {/*3.Places I wish to visit */}
                    <View style={{ flex: 1 }}>
                      <Text style={styles.heading}>Places I wish to visit</Text>
                      {placesWishToVisit.map((item) => (
                        <Checkbox.Item
                          key={item.id}
                          label={item.label}
                          status={item.checked ? "checked" : "unchecked"}
                          onPress={() =>
                            handleCheckboxTogglePlacesWishToVisit(item.id)
                          }
                          color="rgb(168, 62, 222)" // Customize the checkbox color here
                        />
                      ))}
                    </View>

                    {/*4.Parties */}
                    <View style={{ flex: 1 }}>
                      <Text style={styles.heading}>Parties</Text>
                      {parties.map((item) => (
                        <Checkbox.Item
                          key={item.id}
                          label={item.label}
                          status={item.checked ? "checked" : "unchecked"}
                          onPress={() => handleCheckboxToggleParties(item.id)}
                          color="rgb(168, 62, 222)" // Customize the checkbox color here
                        />
                      ))}
                    </View>
                  </View>

                  <View>
                    {/* Error message */}
                    {error ? (
                      <Text style={styles.errorText}>{error}</Text>
                    ) : null}
                  </View>
                  <View style={styles.submit}>
                    {/* Button for making the POST request */}
                    {/* <Button
                        onPress={handlePostRequest}
                        title="Save"
                        color="rgb(207, 151, 234)"
                        
                      />

                      <Button
                        onPress={handleButtonPress}
                        title="Next"
                        color="rgb(207, 151, 234)"
                        
                      /> */}

                    <Button
                      onPress={handleButtonPress}
                      title={step === 1 ? "Next" : "Next"}
                      color="rgb(207, 151, 234)"
                      disabled={isLoading} // Disable the button during the loading state
                    />
                  </View>
                </View>
              }
            />
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
};

export default PlanMyTrip;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 20,
    fontWeight: 450,
    textAlign: "center",
    marginBottom: 10,
  },
  maincont: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    // border: "2px solid black",
  },
  pageContainer: {
    flex: 1,
    // border: "2px solid black",
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#a8a8a8", // Semi-transparent background to disable the content behind the loader
    alignItems: "center",
    justifyContent: "center",
  },
  one: {
    display: "flex",
    width: "4%",
    backgroundColor: "rgb(203, 179, 215)",
    // height: "auto",
    height: "100%",
  },
  two: {
    width: "94%",
    margin: 0,
    height: "100%",
  },
  submit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  maincontainer: {
    flex: 1,
    margin: 1,
    padding: 1,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  mainheading: {
    color: "rgb(162, 47, 220)",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    // border:'2px solid black',
    // backgroundColor:"rgb(203, 179, 215)" ,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "rgb(162, 47, 220)",
  },
  secHed: {
    color: "rgb(162, 47, 220)",
  },

  formContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  selectCountryButton: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  selectCountryButtonText: {
    fontWeight: "600",
  },
  icon: {
    width: 20,
    height: 20,
  },
  dropdownContainer: {
    elevation: 5,
    marginTop: 20,
    height: 127,
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    // border: '2px solid black',
    // height:'auto'
    zIndex: 4,
  },
  searchInput: {
    width: "90%",
    height: 50,
    alignSelf: "center",
    borderWidth: 0.2,
    borderColor: "#8e8e8e",
    borderRadius: 7,
    marginTop: 0,
    paddingLeft: 20,
  },
  dropdownItem: {
    width: "85%",
    alignSelf: "center",
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderColor: "#8e8e8e",
  },
  dropdownItemText: {
    fontWeight: "600",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  daysInput: {
    margin: 15,
    backgroundColor: "rgb(255, 255, 255)",
  },
  disabledInput: {
    backgroundColor: "#a8a8a8", // Apply a light gray background to indicate the disabled state
  },
});
