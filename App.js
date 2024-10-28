import * as React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Forecast from "./components/Forecast.js";
import MainMenu from "./components/MainMenu.js";

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Current Weather" component={MainMenu} />
        <Stack.Screen name="Forecasts" component={Forecast} />
      </Stack.Navigator>
      {/* <Drawer.Navigator>
        <Drawer.Screen name="CurrentWeather" component={CurrentWeather} />
        <Drawer.Screen name="Forecasts" component={Forecast} />
      </Drawer.Navigator> */}
      {/* <Tab.Navigator>
        <Tab.Screen name="CurrentWeather" component={CurrentWeather} />
        <Tab.Screen name="Forecasts" component={Forecast} />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
