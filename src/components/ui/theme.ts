import { brand, semantic, legacy, pastel, COLORS } from '@/design/tokens';

export const theme = {
  brand,
  semantic,
  legacy,
  colors: COLORS,
  pastel,
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

export type PastelColor =
  | 'lavender'
  | 'pink'
  | 'sky'
  | 'mint'
  | 'primary'
  | 'butter'
  | 'cream';

/** Hex values for inline styles (e.g. CaseCard placeholders) */
export const pastelBg: Record<PastelColor, string> = {
  lavender: pastel.lavender,
  pink: pastel.pink,
  sky: pastel.sky,
  mint: pastel.mint,
  primary: semantic.primary,
  butter: pastel.butter,
  cream: brand.cream,
};

/** NativeWind class names — single map for all pastel-backed components */
export const pastelClassNames: Record<PastelColor, string> = {
  lavender: 'bg-lavender',
  pink: 'bg-pink',
  sky: 'bg-sky',
  mint: 'bg-mint',
  primary: 'bg-primary',
  butter: 'bg-butter',
  cream: 'bg-cream',
};
