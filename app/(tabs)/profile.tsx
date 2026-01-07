// 3rd party
import { Pressable } from "react-native";

// Hooks
import { useToggleTheme } from "@/hooks/useToggleTheme";

// UI
import {  View } from "@/components/Themed";
import { AppText } from "@/components/AppText";

export const Profile = () => {
  const { theme, toggleTheme } = useToggleTheme();

  return (
    <View className="flex-1 px-4 py-6">
      <AppText className="mb-4">View Profile here</AppText>
      <Pressable
        onPress={toggleTheme}
        className="rounded-lg bg-blue-600 px-4 py-3"
        accessibilityLabel="Toggle theme"
      >
        <AppText className="text-white text-center">
          Toggle Theme (current: {theme})
        </AppText>
      </Pressable>
    </View>
  );
};

export default Profile;
