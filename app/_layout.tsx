// 3rd party
import { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavThemeProvider,
} from "@react-navigation/native";
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Provider } from "react-redux";

// Context
import {
  ThemeProvider as AppThemeProvider,
  useTheme as useAppTheme,
} from "@/context/ThemeContext";

// Store
import { store } from "@/store";
import { persistCollection, loadPersistedCollection } from "@/store/persistence";
import { setCollection } from "@/store/slices/collectionSlice";

// Styling
import "../global.css";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const RootLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  //Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
};

const RootLayoutNav = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const hydrateCollection = async () => {
      const items = await loadPersistedCollection();
      store.dispatch(setCollection(items));
      if (isMounted) setIsHydrated(true);
    };

    hydrateCollection();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const unsubscribe = store.subscribe(() => {
      const items = store.getState().collection.items;
      const persistItems = async () => {
        await persistCollection(items);
      };

      persistItems();
    });

    return unsubscribe;
  }, [isHydrated]);

  if (!isHydrated) return null;

  return (
    <Provider store={store}>
      <AppThemeProvider>
        <Nav />
      </AppThemeProvider>
    </Provider>
  );
};

const Nav = () => {
  const { theme } = useAppTheme();
  const navTheme = theme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <NavThemeProvider value={navTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </NavThemeProvider>
  );
};

export default RootLayout;
