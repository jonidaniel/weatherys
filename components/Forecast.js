import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

// Personal key needed for making API queries to OpenWeather
const WEATHER_API_KEY = "fa190f010bd766ccd94aaba8364a24ee";
const BASE_FORECAST_URL =
  "https://api.openweathermap.org/data/2.5/forecast/daily?";

// FOR TESTING FLATLIST
const testData = [{ key: "TEST A" }, { key: "TEST B" }, { key: "TEST C" }];

export default function Forecast() {
  const [forecast, setForecast] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const units = "metric";

  // Count of days included in the forecast
  const cnt = 3;

  useEffect(() => {
    fetchForecast();
  }, []);

  // Fetches the forecast information from OpenWeather API
  async function fetchForecast() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMessage("Permission to access location was denied!");
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      var forecastUrl = `${BASE_FORECAST_URL}lat=${latitude}&lon=${longitude}&units=${units}&cnt=${cnt}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(forecastUrl);

      const result = await response.json();

      // Is executed if status code is 200
      if (response.ok) {
        setForecast(result);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  }

  // Is executed if everything went fine
  if (forecast) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{forecast.city.name}</Text>
        <Text>{forecast.list[0].weather[0].main}</Text>
        <Text>{forecast.list[0].temp.day} °C</Text>
        <Text>{forecast.list[0].speed} m/s</Text>
        <Text>{forecast.list[1].weather[0].main}</Text>
        <Text>{forecast.list[1].temp.day} °C</Text>
        <Text>{forecast.list[1].speed} m/s</Text>
        <Text>{forecast.list[2].weather[0].main}</Text>
        <Text>{forecast.list[2].temp.day} °C</Text>
        <Text>{forecast.list[2].speed} m/s</Text>
        <FlatList
          data={testData}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#aff",
  },
});
