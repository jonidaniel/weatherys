import { Text } from "react-native";

export default function Header({ city }) {
  if (city) {
    return <Text>{city}</Text>;
  } else {
    return <Text>READY TO SUPPLY YOU WITH WEATHER!</Text>;
  }
}
