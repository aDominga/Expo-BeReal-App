import { ColorPicker, Host } from "@expo/ui/swift-ui";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function ColorPickerIOS() {
  const [isOpened, setIsOpened] = useState(false);
  const [color, setColor] = useState("#FF6347");

  return (
    <View style={styles.container}>
  <Host>
    <ColorPicker selection={color} onSelectionChange={setColor} />
    </Host>
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
