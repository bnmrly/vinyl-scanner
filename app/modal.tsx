// 3rd party
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

// UI
import {  View } from "@/components/Themed";
import { AppText } from "@/components/AppText";

export const ModalScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <AppText className="text-xl font-bold">Modal</AppText>
      <View
        className="my-8 w-4/5 h-px"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default ModalScreen;
