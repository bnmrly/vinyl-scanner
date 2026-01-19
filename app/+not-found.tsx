// 3rd Party
import { Link, Stack } from "expo-router";

//UI
import { AppView } from "@/components/AppView";
import { AppText } from "@/components/AppText";

export const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <AppView variant="bgScreen" className="flex-1 items-center justify-center p-5">
        <AppText className="text-xl font-bold">This screen doesn't exist.</AppText>
        <Link href="/" className="mt-4 py-4">
          <AppText>Go to home screen!</AppText>
        </Link>
      </AppView>
    </>
  );
};

export default NotFoundScreen;
