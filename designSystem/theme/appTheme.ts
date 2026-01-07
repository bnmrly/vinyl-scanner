import { colors } from '@/designSystem/tokens/colors';

export const Theme = {
  light: {
    text: colors.black.blackBlue,
    textBrand: colors.red[500],
    background: colors.grey[100],
    tint: colors.orange[300],
    tabIconDefault: colors.grey[600],
    tabIconSelected: colors.orange[300],
  },
  dark: {
    text: colors.grey[100],
    textBrand: colors.orange[500],
    background: colors.black.blackBlue,
    tint: colors.red[200],
    tabIconDefault: colors.grey[600],
    tabIconSelected: colors.red[200],
  },
};
