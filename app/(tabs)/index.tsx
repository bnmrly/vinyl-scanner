import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

// TODO: Above import prevents tailwind colour class being added to <Text />
// import { Text, View } from "react-native";

export default function Scan() {
  return (
    <View className="border border-red-500" style={styles.container}>
      <Text className=" bg-yellow-200">scanner here</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
