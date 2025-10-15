import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import "./global.css";

export default function App() {
  return (
    <View className="border-4 border-blue-500 flex-1 items-center justify-center">
      <Text className="text-red-500">Hello world</Text>
      <StatusBar style="auto" />
    </View>
  );
}
