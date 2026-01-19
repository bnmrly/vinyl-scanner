import { colors } from '@/designSystem/tokens/colors';

/**
 * These semantic names map directly to Tailwind utility classes.
 * 
 * Usage:
 * - Components use Tailwind classes like `bg-screen`, `text-content`, `border-default`
 * - The `dark` class on root enables `dark:` variants automatically
 * - No need for complex variant logic or manual color switching
 */

export const Theme = {
  light: {
    // Backgrounds
    bgScreen: colors.white.offWhite,
    bgSection: colors.white.default,
    bgCard: colors.grey["100"],
    // Text
    textContent: colors.black.blackBlue,
    textMuted: colors.grey["600"],
    textBrand: colors.orange["500"],
    // UI Elements
    tint: colors.orange[300],
    border: colors.grey["200"],
    // Tabs
    tabIconDefault: colors.grey[600],
    tabIconSelected: colors.orange[300],
  },
  dark: {
    // Backgrounds
    bgScreen: colors.black.blackBlue,
    bgSection: colors.grey["800"],
    bgCard: colors.grey["900"],
    // Text
    textContent: colors.grey["100"],
    textMuted: colors.grey["300"],
    textBrand: colors.orange["500"],
    // UI Elements
    tint: colors.red[200],
    border: colors.grey["700"],  
    // Tabs
    tabIconDefault: colors.grey[600],
    tabIconSelected: colors.red[200],
  },
} as const;

export type ColorRole = keyof typeof Theme.light;