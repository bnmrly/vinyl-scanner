import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useColorScheme as systemUseColorScheme, View } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemTheme = (systemUseColorScheme() ?? "light") as Theme;
  const [theme, setTheme] = useState<Theme>(systemTheme);
  const [userPreferred, setUserPreferred] = useState<boolean>(false);

  // If system theme changes and user hasn't chosen a preference, follow system
  useEffect(() => {
    if (!userPreferred) {
      setTheme(systemTheme);
    }
  }, [systemTheme, userPreferred]);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setUserPreferred(true);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Root view with dark class enables Tailwind dark: variants globally */}
      <View className={theme === 'dark' ? 'dark' : ''} style={{ flex: 1 }}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
