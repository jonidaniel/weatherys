import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Location from "expo-location";
import Header from "./Header.js";
import WeatherDisplay from "./WeatherDisplay.js";

// Personal key needed for making API queries to OpenWeather
const WEATHER_API_KEY = "10fcaeee952a57d9477f5b0ba57d4647";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

export default function MainMenu({ navigation }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [permission, setPermission] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const units = "metric";

  // Refers to the given input of the input field
  const cityRef = useRef();

  useEffect(() => {
    // cityRef.current.value = null;
    // fetchWeather();
    setPermission(false);
  }, []);

  // Fetches the weather information from OpenWeather API based on user input
  async function fetchWeatherByInput() {
    var weatherUrl = `${BASE_WEATHER_URL}q=${cityRef.current.value}&units=${units}&appid=${WEATHER_API_KEY}`;
    cityRef.current.value = null;

    const response = await fetch(weatherUrl);

    const result = await response.json();

    // Is executed if status code is 200
    if (response.ok) {
      setCurrentWeather(result);
      setErrorMessage(null);
    } else {
      setErrorMessage(result.message);
    }
  }

  // Fetches the weather information from OpenWeather API based on user input
  async function fetchWeatherByGps() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted" || permission !== true) {
        setErrorMessage("Permission to access location was denied!");
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      if (cityRef.current.value == null || cityRef.current.value == "") {
        // Weather by device location
        var weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${units}&appid=${WEATHER_API_KEY}`;
        // Weather by inputted location
      } else {
        var weatherUrl = `${BASE_WEATHER_URL}q=${cityRef.current.value}&units=${units}&appid=${WEATHER_API_KEY}`;
      }
      cityRef.current.value = null;

      const response = await fetch(weatherUrl);

      const result = await response.json();

      // Is executed if status code is 200
      if (response.ok) {
        setCurrentWeather(result);
        setErrorMessage(null);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  }

  function handlePermission() {
    if (permission) {
      setPermission(false);
    } else {
      setPermission(true);
    }
  }

  // Is executed if everything went fine
  if (currentWeather && !errorMessage) {
    if (permission) {
      var titleSwitcher = "deny location";
      var colorSwitcher = "#990000";
    } else {
      var titleSwitcher = "allow location";
      var colorSwitcher = "#009900";
    }
    let {
      main: { temp },
      name,
      weather,
      wind: { speed },
    } = currentWeather;
    temp = temp.toFixed(1);
    speed = speed.toFixed(1);
    return (
      <>
        <Button
          style={styles.navButton}
          title="to forecasts"
          color="#841584"
          onPress={() => navigation.navigate("Forecasts")}
        />
        <View style={styles.container}>
          <Header city={name} />
          <WeatherDisplay temp={temp} speed={speed} icon={weather[0].icon} />
          <TextInput
            style={styles.input}
            placeholder="Location"
            ref={cityRef}
            onSubmitEditing={fetchWeatherByInput}
          />
          <Button title="weather by input" onPress={fetchWeatherByInput} />
          <Button
            title="weather by location"
            route="location"
            onPress={fetchWeatherByGps}
          />
          <Button
            title={titleSwitcher}
            color={colorSwitcher}
            onPress={handlePermission}
          />
        </View>
      </>
    );
  } else {
    // Is executed in case of an error
    if (permission) {
      var titleSwitcher = "deny location";
      var colorSwitcher = "#990000";
    } else {
      var titleSwitcher = "allow location";
      var colorSwitcher = "#009900";
    }
    return (
      <>
        <Button
          style={styles.navButton}
          title="to forecasts"
          color="#841584"
          onPress={() => navigation.navigate("Forecasts")}
        />
        <View style={styles.container}>
          <Text>{errorMessage}</Text>
          <Header />
          <WeatherDisplay />
          <TextInput
            style={styles.input}
            placeholder="Location"
            ref={cityRef}
            onSubmitEditing={fetchWeatherByInput}
          />
          <Button title="weather by input" onPress={fetchWeatherByInput} />
          <Button
            title="weather by location"
            route="location"
            onPress={fetchWeatherByGps}
          />
          <Button
            permission={permission}
            title={titleSwitcher}
            color={colorSwitcher}
            onPress={handlePermission}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  navButton: {
    alignItems: "left",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#aff",
  },
  input: {
    borderWidth: 2,
  },
});
