import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from '@/constants';

/**
 * WOOFI default locale is always es-AR per product architecture.
 * English (en-US) is available as a secondary language via user preference (future settings).
 */
export function getInitialLocale(): SupportedLocale {
  return DEFAULT_LOCALE;
}

export { DEFAULT_LOCALE, SUPPORTED_LOCALES };
export type { SupportedLocale };
