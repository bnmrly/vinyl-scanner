import Scanner from "@/components/Scanner";
// import { View } from "@/components/Themed";

import { View } from "react-native";
export default function Scan() {
  return (
    <View className="flex-1 bg-red-300">
      <Scanner />
    </View>
  );
}
