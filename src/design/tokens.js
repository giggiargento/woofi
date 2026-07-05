/**
 * Single source of truth for WOOFI design tokens (v2 — Soft Warm UI).
 * Brand alignment: docs/brand/BRAND-GUIDELINES.md §3.2, docs/design/VISUAL-DIRECTION.md
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
  muted: '#8B7355',
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

/** v2 borders — replaces black neubrutal outlines */
const borders = {
  subtle: 'rgba(91, 62, 45, 0.12)',
  default: 'rgba(91, 62, 45, 0.20)',
  focus: 'rgba(247, 178, 74, 0.45)',
  strong: 'rgba(59, 36, 23, 0.25)',
};

/** v2 warm shadows */
const shadows = {
  warmSm: '0 2px 8px rgba(91, 62, 45, 0.06)',
  warmMd: '0 4px 20px rgba(91, 62, 45, 0.08)',
  warmLg: '0 8px 32px rgba(91, 62, 45, 0.10)',
};

/** Typography scale (desktop / mobile sizes where noted) */
const typography = {
  display: { size: 40, sizeMobile: 32, lineHeight: 1.1, weight: '700' },
  h1: { size: 28, sizeMobile: 24, lineHeight: 1.2, weight: '700' },
  h2: { size: 22, sizeMobile: 20, lineHeight: 1.3, weight: '600' },
  h3: { size: 18, sizeMobile: 17, lineHeight: 1.35, weight: '600' },
  body: { size: 16, lineHeight: 1.6, weight: '400' },
  small: { size: 14, lineHeight: 1.5, weight: '400' },
  label: { size: 13, lineHeight: 1.4, weight: '600' },
};

/** Spacing scale */
const spacing = {
  pageXMobile: 16,
  pageXDesktop: 32,
  sectionYMobile: 64,
  sectionYDesktop: 96,
  stackXs: 4,
  stackSm: 8,
  stackMd: 16,
  stackLg: 24,
  stackXl: 32,
  sidebarWidth: 240,
  sidebarCollapsed: 64,
  contentMax: 1280,
  formMax: 480,
  cardPaddingMobile: 16,
  cardPaddingDesktop: 24,
};

/** Layout breakpoints */
const breakpoints = {
  tablet: 768,
  desktop: 1024,
};

/** Motion tokens (web-first; native uses activeOpacity) */
const motion = {
  durationFast: 150,
  durationNormal: 250,
  durationSlow: 350,
  easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
};

/** Radius scale */
const radius = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  pill: 9999,
};

/** Flat color map for COLORS export and runtime */
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
  muted: semantic.muted,
  card: semantic.surface,
  borderSubtle: borders.subtle,
  borderDefault: borders.default,
  borderFocus: borders.focus,
  borderStrong: borders.strong,
  /** @deprecated Use borderSubtle — legacy black outline */
  border: '#000000',
  legacyPrimary: legacy.primary,
  legacyBackground: legacy.background,
  legacyText: legacy.text,
};

/** Tailwind theme.extend — keys must match NativeWind class names */
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
  muted: semantic.muted,
  card: semantic.surface,
  brown: semantic.brown,
  'brown-dark': semantic.brownDark,
  'border-subtle': borders.subtle,
  'border-default': borders.default,
  'border-focus': borders.focus,
  'border-strong': borders.strong,
  border: borders.subtle,
  'legacy-primary': legacy.primary,
  'legacy-background': legacy.background,
};

const tailwindFontSize = {
  display: ['40px', { lineHeight: '1.1', fontWeight: '700' }],
  'display-mobile': ['32px', { lineHeight: '1.1', fontWeight: '700' }],
  h1: ['28px', { lineHeight: '1.2', fontWeight: '700' }],
  'h1-mobile': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
  h2: ['22px', { lineHeight: '1.3', fontWeight: '600' }],
  'h2-mobile': ['20px', { lineHeight: '1.3', fontWeight: '600' }],
  h3: ['18px', { lineHeight: '1.35', fontWeight: '600' }],
  body: ['16px', { lineHeight: '1.6' }],
  small: ['14px', { lineHeight: '1.5' }],
  label: ['13px', { lineHeight: '1.4', fontWeight: '600' }],
};

module.exports = {
  brand,
  semantic,
  legacy,
  pastel,
  borders,
  shadows,
  typography,
  spacing,
  breakpoints,
  motion,
  radius,
  COLORS,
  tailwindColors,
  tailwindFontSize,
};
