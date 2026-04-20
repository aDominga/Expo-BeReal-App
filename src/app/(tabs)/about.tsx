import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Image source={{
        uri: "https://media.tenor.com/HHZOPnpoWPMAAAAe/why-you-lying.png",
      }}
      style={styles.Images}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Images: {
    width: 200,
    height:200,
  }
});
