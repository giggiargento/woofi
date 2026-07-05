export const brand: {
  readonly orange: '#ffb850';
  readonly cream: '#fff2d0';
  readonly brown: '#5e4432';
};

export const semantic: {
  readonly primary: '#F7B24A';
  readonly primaryAccent: '#D97B32';
  readonly brown: '#5B3E2D';
  readonly brownDark: '#3B2417';
  readonly background: '#FFF6E5';
  readonly surface: '#FFFDF9';
  readonly muted: '#8B7355';
};

export const legacy: {
  readonly primary: '#F9A23B';
  readonly background: '#FFF4EA';
  readonly text: '#1F2937';
  readonly cream: '#FFF9F3';
};

export const pastel: {
  readonly lavender: '#D8C3FF';
  readonly pink: '#FFC8D8';
  readonly sky: '#BDEFFF';
  readonly mint: '#CFF5DC';
  readonly butter: '#FFF4B8';
  readonly sand: '#E8DCC8';
};

export const borders: {
  readonly subtle: string;
  readonly default: string;
  readonly focus: string;
  readonly strong: string;
};

export const shadows: {
  readonly warmSm: string;
  readonly warmMd: string;
  readonly warmLg: string;
};

export const typography: Record<
  string,
  { size?: number; sizeMobile?: number; lineHeight: number; weight: string }
>;

export const spacing: Record<string, number>;

export const breakpoints: {
  readonly tablet: 768;
  readonly desktop: 1024;
};

export const motion: {
  readonly durationFast: 150;
  readonly durationNormal: 250;
  readonly durationSlow: 350;
  readonly easing: string;
};

export const radius: {
  readonly sm: 12;
  readonly md: 16;
  readonly lg: 20;
  readonly xl: 24;
  readonly pill: 9999;
};

export const COLORS: Record<string, string>;

export const tailwindColors: Record<string, string>;

export const tailwindFontSize: Record<string, [string, Record<string, string>]>;
