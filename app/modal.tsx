// 3rd party
import { Platform, View } from "react-native";
import { StatusBar } from "expo-status-bar";

// UI
import { AppView } from "@/components/AppView";
import { AppText } from "@/components/AppText";

// TODO: Replace colors with theme
export const ModalScreen = () => {
  return (
    <AppView className="flex-1 items-center justify-center">
      <AppText className="text-xl font-bold">Modal</AppText>
      <AppView
        className="my-8 w-4/5 h-px"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </AppView>
  );
};

export default ModalScreen;
