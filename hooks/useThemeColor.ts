import { useTheme } from "@/theme/ThemeContext";
import {colors} from "@/designSystem/tokens/colors";

export const useThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof colors.light & keyof typeof colors.dark
) => {
  const { theme } = useTheme();

  const colorFromProps = props[theme];
  if (colorFromProps) {
    return colorFromProps;
  }

  return colors[theme][colorName];
};
