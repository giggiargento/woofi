import type { ComponentType } from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import type { SvgProps } from 'react-native-svg';
import { cn } from '@/utils/cn';
import LogoWordmarkModule from '../../../assets/brand/logo-wordmark.svg';

/** Minimum widths per docs/brand/BRAND-GUIDELINES.md §2.1 */
const SIZE_WIDTH = {
  header: 96,
  auth: 200,
  sidebar: 120,
} as const;

export type BrandLogoSize = keyof typeof SIZE_WIDTH;

export interface BrandLogoProps {
  /** Preset aligned to brand clear-space / minimum width guidelines */
  size?: BrandLogoSize;
  /** Override width (height follows square viewBox aspect ratio) */
  width?: number;
  className?: string;
  accessibilityLabel?: string;
}

type SvgComponent = ComponentType<SvgProps>;

function resolveSvgComponent(mod: unknown): SvgComponent | null {
  if (typeof mod === 'function') {
    return mod as SvgComponent;
  }

  if (mod && typeof mod === 'object') {
    const candidate = (mod as { default?: unknown }).default;
    if (typeof candidate === 'function') {
      return candidate as SvgComponent;
    }
  }

  return null;
}

function resolveImageSource(mod: unknown): { uri: string } | number | null {
  if (typeof mod === 'number') {
    return mod;
  }

  if (!mod || typeof mod !== 'object') {
    return null;
  }

  const record = mod as { uri?: string; default?: unknown };
  if (typeof record.uri === 'string') {
    return { uri: record.uri };
  }

  if (typeof record.default === 'number') {
    return record.default;
  }

  if (typeof record.default === 'string') {
    return { uri: record.default };
  }

  if (record.default && typeof record.default === 'object') {
    const nested = record.default as { uri?: string };
    if (typeof nested.uri === 'string') {
      return { uri: nested.uri };
    }
  }

  return null;
}

const LogoWordmark = resolveSvgComponent(LogoWordmarkModule);
const logoImageSource = LogoWordmark ? null : resolveImageSource(LogoWordmarkModule);

/**
 * Official WOOFI wordmark — assets/brand/logo-wordmark.svg
 * Transparent SVG on cream/background surfaces. No shadows or extra borders.
 */
export function BrandLogo({
  size = 'auth',
  width,
  className,
  accessibilityLabel,
}: BrandLogoProps) {
  const { t } = useTranslation();
  const logoWidth = width ?? SIZE_WIDTH[size];
  const label = accessibilityLabel ?? t('brand.logoAccessibility');

  return (
    <View
      className={cn('items-center justify-center', className)}
      accessible
      accessibilityRole="image"
      accessibilityLabel={label}
    >
      {LogoWordmark ? (
        <LogoWordmark width={logoWidth} height={logoWidth} />
      ) : logoImageSource ? (
        <Image
          source={logoImageSource}
          style={{ width: logoWidth, height: logoWidth }}
          contentFit="contain"
          accessibilityLabel={label}
        />
      ) : null}
    </View>
  );
}

/** @alias BrandLogo */
export const Logo = BrandLogo;
