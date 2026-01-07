import { useTheme } from "@/context/ThemeContext";

export const useToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();
  return { theme, toggleTheme };
};
