/**
 * Single source of truth for WOOFI design tokens.
 * Consumed by theme.ts, constants/index.ts, and tailwind.config.js.
 *
 * Brand alignment: docs/brand/BRAND-GUIDELINES.md §3.2
 */

/** Logo-locked values — do not change SVG assets without Brand review */
const brand = {
  orange: '#ffb850',
  cream: '#fff2d0',
  brown: '#5e4432',
};

/** UI semantic tokens (product screens + components) */
const semantic = {
  primary: '#F7B24A',
  primaryAccent: '#D97B32',
  brown: '#5B3E2D',
  brownDark: '#3B2417',
  background: '#FFF6E5',
  surface: '#FFFDF9',
};

/** @deprecated Migrate callers to semantic tokens — kept for reference / preview */
const legacy = {
  primary: '#F9A23B',
  background: '#FFF4EA',
  text: '#1F2937',
  cream: '#FFF9F3',
};

/** Pastel accents for chips, badges, cards */
const pastel = {
  lavender: '#D8C3FF',
  pink: '#FFC8D8',
  sky: '#BDEFFF',
  mint: '#CFF5DC',
  butter: '#FFF4B8',
  sand: '#E8DCC8',
};

/** Flat color map for COLORS export and runtime (services, spinners, etc.) */
const COLORS = {
  primary: semantic.primary,
  primaryAccent: semantic.primaryAccent,
  background: semantic.background,
  surface: semantic.surface,
  cream: brand.cream,
  butter: pastel.butter,
  lavender: pastel.lavender,
  pink: pastel.pink,
  sky: pastel.sky,
  mint: pastel.mint,
  sand: pastel.sand,
  text: semantic.brown,
  textDark: semantic.brownDark,
  muted: '#6B7280',
  card: semantic.surface,
  border: '#000000',
  /** @deprecated Use primary — legacy #F9A23B */
  legacyPrimary: legacy.primary,
  /** @deprecated Use background */
  legacyBackground: legacy.background,
  /** @deprecated Use text */
  legacyText: legacy.text,
};

/** Tailwind theme.extend.colors — keys must match NativeWind class names */
const tailwindColors = {
  primary: semantic.primary,
  'primary-accent': semantic.primaryAccent,
  background: semantic.background,
  surface: semantic.surface,
  cream: brand.cream,
  butter: pastel.butter,
  lavender: pastel.lavender,
  pink: pastel.pink,
  sky: pastel.sky,
  mint: pastel.mint,
  sand: pastel.sand,
  text: semantic.brown,
  'text-dark': semantic.brownDark,
  muted: COLORS.muted,
  card: semantic.surface,
  border: COLORS.border,
  brown: semantic.brown,
  'brown-dark': semantic.brownDark,
  'legacy-primary': legacy.primary,
  'legacy-background': legacy.background,
};

module.exports = {
  brand,
  semantic,
  legacy,
  pastel,
  COLORS,
  tailwindColors,
};
