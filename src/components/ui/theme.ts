import {
  brand,
  semantic,
  legacy,
  pastel,
  borders,
  shadows as shadowTokens,
  typography,
  spacing,
  breakpoints,
  motion,
  radius,
  COLORS,
} from '@/design/tokens';

export const theme = {
  brand,
  semantic,
  legacy,
  colors: COLORS,
  pastel,
  borders,
  shadows: shadowTokens,
  typography,
  spacing,
  breakpoints,
  motion,
  radius,
} as const;

export type PastelColor =
  | 'lavender'
  | 'pink'
  | 'sky'
  | 'mint'
  | 'primary'
  | 'butter'
  | 'cream'
  | 'sand';

/** Hex values for inline styles (e.g. CaseCard placeholders) */
export const pastelBg: Record<PastelColor, string> = {
  lavender: pastel.lavender,
  pink: pastel.pink,
  sky: pastel.sky,
  mint: pastel.mint,
  primary: semantic.primary,
  butter: pastel.butter,
  cream: brand.cream,
  sand: pastel.sand,
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
  sand: 'bg-sand',
};
