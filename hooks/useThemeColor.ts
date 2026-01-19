import { useTheme } from "@/context/ThemeContext";
import { Theme, ColorRole } from '@/designSystem/theme/appTheme';

/**
 * Hook to get theme-aware colors from the flattened Theme object.
 * 
 * @param props - Optional explicit light/dark color overrides
 * @param role - Semantic color role from Theme (bgScreen, bgSection, textContent, etc.)
 * @returns The appropriate color for the current theme
 * 
 * @example
 * // Get semantic background color
 * const bgColor = useThemeColor({}, 'bgScreen');
 * 
 * // Override with custom colors
 * const customColor = useThemeColor({ light: '#fff', dark: '#000' });
 * 
 * // Get text color
 * const textColor = useThemeColor({}, 'textContent');
 */
export const useThemeColor = (
  props?: { light?: string; dark?: string },
  role?: ColorRole
): string | undefined => {
  const { theme } = useTheme();

  // Explicit override always wins
  const override = props?.[theme];
  if (override) return override;

  // Return undefined if no role specified
  if (!role) return undefined;

  // Look up the role in the flat Theme structure
  return Theme[theme][role];
};
