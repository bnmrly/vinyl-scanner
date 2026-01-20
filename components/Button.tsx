import React from "react";
import { Pressable, type PressableProps } from "react-native";
import { AppText } from "./AppText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { twMerge } from "@/utilities/utilities";
import type { ClassNameValue } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = PressableProps & {
  variant?: ButtonVariant;
  className?: ClassNameValue;
  title: string;
};

/**
 * Button: Themed button component with semantic variants.
 * 
 * Background colors automatically switch via useThemeColor hook.
 * No manual color switching or theme context needed in the component.
 * 
 * @example
 * <Button variant="primary" onPress={handlePress}>
 *   Save Changes
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  title,
  disabled,
  ...otherProps
}) => {
  const primaryBg = useThemeColor({}, 'tint'); // orange-300 in light, red-200 in dark
  const borderColor = useThemeColor({}, 'border'); // grey-200 in light, grey-700 in dark

  const variantStyles: Record<ButtonVariant, any> = {
    primary: { backgroundColor: primaryBg, borderWidth: 2, borderColor: 'transparent' },
    secondary: { backgroundColor: 'transparent', borderWidth: 2, borderColor },
    ghost: { backgroundColor: 'transparent', borderWidth: 2, borderColor: 'transparent' },
  };

  const textVariantMap: Record<ButtonVariant, "body" | "brand"> = {
    primary: "body",
    secondary: "body",
    ghost: "brand",
  };

  const baseStyles = "px-4 py-3 rounded-lg items-center justify-center";
  const disabledStyles = disabled ? "opacity-50" : "";

  const buttonClassName = twMerge([
    baseStyles,
    disabledStyles,
    className,
  ]);

  return (
    <Pressable
      className={buttonClassName}
      style={variantStyles[variant]}
      disabled={disabled}
      {...otherProps}
    >
      <AppText variant={textVariantMap[variant]} className="font-semibold">
        {title}
      </AppText>
    </Pressable>
  );
};
