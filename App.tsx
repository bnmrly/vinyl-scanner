import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import "./global.css";

export default function App() {
  return (
    <View style={styles.container} className="border-4 border-blue-500">
      <Text className="text-red-500"> Hello world</Text>
      <StatusBar style="auto" />
    </View>
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
