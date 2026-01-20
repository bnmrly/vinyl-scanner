// 3rd party
import { Pressable } from "react-native";

// Hooks
import { useToggleTheme } from "@/hooks/useToggleTheme";

// UI
import { AppView } from "@/components/AppView";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";

export const Profile = () => {
  const { theme, toggleTheme } = useToggleTheme();

  return (
  <AppView variant="bgScreen" className="flex-1 px-4 py-6">
      <AppText className="mb-4">View Profile here</AppText>
      <Button
        onPress={toggleTheme}
        title={` Toggle Theme (current: ${theme})`}
      >
        <AppText className="text-white text-center">
          Toggle Theme (current: {theme})
        </AppText>
      </Button>
    </AppView >
  );
};

export default Profile;
