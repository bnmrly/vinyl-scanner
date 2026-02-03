import React from "react";
import { Text as RNText } from "react-native";
import { twMerge } from "@/utilities/utilities";
import { useThemeColor } from "@/hooks/useThemeColor";
import type { TextProps as RNTextProps } from "react-native";
import type { ClassNameValue } from "tailwind-merge";
import type { ColorRole } from "@/designSystem/theme/appTheme";

/**
 * Text semantic variants that map to theme colors.
 * These automatically switch between light/dark via useThemeColor hook.
 */
type TextVariant = "body" | "muted" | "brand" | "error";

type TextThemeProps = {
  variant?: TextVariant;
  lightColor?: string;
  darkColor?: string;
};

type AppTextProps = RNTextProps &
  TextThemeProps & { className?: ClassNameValue };

const baseTextClassName = "font-body";

/**
 * AppText: Themed text component with semantic color variants.
 *
 * Variants automatically adapt to light/dark theme via useThemeColor:
 * - body: textContent (black in light, grey-100 in dark)
 * - muted: textMuted (grey-600 in light, grey-300 in dark)
 * - brand: textBrand (orange-500, consistent across themes)
 * - error: red text for error messages
 *
 * Override colors with lightColor/darkColor props when needed.
 */
export const AppText: React.FC<AppTextProps> = ({
  children,
  style,
  className = "",
  variant = "body",
  lightColor,
  darkColor,
  ...otherProps
}) => {
  if (!children) return null;

  const variantToColorRole: Record<TextVariant, ColorRole> = {
    body: "textContent",
    muted: "textMuted",
    brand: "textBrand",
    error: "textError",
  };

  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    variantToColorRole[variant],
  );

  const mergedClassName = twMerge([baseTextClassName, className]);

  return (
    <RNText
      className={mergedClassName}
      style={[{ color }, style]}
      {...otherProps}
    >
      {children}
    </RNText>
  );
};
