import { Image, StyleSheet, View } from "react-native";
import Temperature from "./Temperature.js";
import Wind from "./Wind.js";

export default function WeatherDisplay({ temp, speed, icon }) {
  if (icon) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require(`../assets/${icon}@2x.png`)}
        />
        <Temperature temp={temp} />
        <Wind speed={speed} />
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
  },
  image: {
    width: 100,
    height: 100,
  },
});
