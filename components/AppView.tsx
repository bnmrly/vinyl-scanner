import { View as RnView } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import type { ColorRole } from '@/designSystem/theme/appTheme';
import type { ClassNameValue } from "tailwind-merge";
import type { ViewProps as RnViewProps } from "react-native";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  /**
   * Semantic background color role (bgScreen, bgSection, bgCard)
   * Use 'transparent' for no background
   */
  variant?: "transparent" | Extract<ColorRole, 'bgScreen' | 'bgSection' | 'bgCard'>;
  className?: ClassNameValue;
};
 
export type AppViewProps = ThemeProps & RnViewProps;

/**
 * AppView: Smart container with semantic background variants.
 * The root ThemeProvider applies the 'dark' class globally,
 * so all dark: variants work automatically.
 */
export const AppView = ({ 
  children, 
  style, 
  lightColor, 
  darkColor, 
  variant = "transparent", 
  className = "", 
  ...otherProps 
}: AppViewProps) => {
  // Get background color only if not transparent
  const role = variant === "transparent" ? undefined : variant;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, role);

  // Only include background style when defined (keeps transparent default)
  const styleWithBg = backgroundColor ? [{ backgroundColor }, style] : [style];

  return (
    <RnView className={className} style={styleWithBg} {...otherProps}>
      {children}
    </RnView>
  );
};
