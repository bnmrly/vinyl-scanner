import { View as RnView } from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";
import { twMerge } from "@/utilities/utilities";

import type { ClassNameValue } from "tailwind-merge";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  className?: ClassNameValue;
};

import type { ViewProps as RnViewProps } from "react-native";
 
export type AppViewProps = ThemeProps & RnViewProps;

export const AppView = ({ children, style, lightColor, darkColor, className = "", ...otherProps }: AppViewProps) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );


  // TODO: remove if I don't need base className
  
  const mergedClassName = twMerge(className);

  return (
    <RnView className={mergedClassName} style={[{ backgroundColor }, style]} {...otherProps}>
      {children}
    </RnView>
  );
};
