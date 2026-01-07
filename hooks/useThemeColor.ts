import { useTheme } from "@/context/ThemeContext";
import { Theme } from '@/designSystem/theme/appTheme';

export const useThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Theme.light & keyof typeof Theme.dark
) => {
  const { theme } = useTheme();

  const colorFromProps = props[theme];
  if (colorFromProps) {
    return colorFromProps;
  }

  return Theme[theme][colorName];
};
