// 3rd Party
import React from "react";
import { Text as RNText } from "react-native";

// Hooks and Utilities
import { useThemeColor } from "../hooks/useThemeColor";
import { twMerge } from "@/utilities/utilities";

// Types
import type { TextProps as RNTextProps } from "react-native";
import type { ClassNameValue } from "tailwind-merge";

//  Color is controlled by `constants/Colors.ts` via `useThemeColor`.
//  className prop is intended for additional styles.
//  style prop can be used for edge cases.
 
type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type AppTextProps = RNTextProps & ThemeProps & { className?: ClassNameValue};

const baseTextClassName = "font-body";

export const AppText: React.FC<AppTextProps> = ({
  children,
  style,
  className = "",
  lightColor,
  darkColor,
  ...otherProps
}) => {
  if (!children) return null;

  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const mergedClassName = twMerge([baseTextClassName, className]);
  const textStyle = [style, { color }];

  return (
    <RNText className={mergedClassName} style={textStyle} {...otherProps}>
      {children}
    </RNText>
  );
};
