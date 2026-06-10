import { COLORS } from '@/constants';

export const theme = {
  colors: {
    ...COLORS,
    cream: '#FFF9F3',
    butter: '#FFF4B8',
    primaryDark: '#E88B1A',
    primaryLight: '#FFD4A0',
    borderSoft: '#1F2937',
  },
  radius: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    pill: 9999,
  },
  spacing: {
    screenX: 16,
    screenBottom: 112,
    section: 24,
    card: 16,
  },
} as const;

export type PastelColor = 'lavender' | 'pink' | 'sky' | 'mint' | 'primary' | 'butter' | 'cream';

export const pastelBg: Record<PastelColor, string> = {
  lavender: theme.colors.lavender,
  pink: theme.colors.pink,
  sky: theme.colors.sky,
  mint: theme.colors.mint,
  primary: theme.colors.primary,
  butter: theme.colors.butter,
  cream: theme.colors.cream,
};
