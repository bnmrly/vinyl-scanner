import { useTheme } from "@/theme/ThemeContext";

export const useToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();
  return { theme, toggleTheme };
};
