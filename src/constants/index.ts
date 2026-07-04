/** Brand asset paths (relative to project root) */
export const BRAND_PATHS = {
  logoWordmark: 'assets/brand/logo-wordmark.svg',
  favicon: 'assets/brand/favicon.svg',
} as const;

import { brand, COLORS as DESIGN_COLORS } from '@/design/tokens';

/** Logo-locked palette — see docs/brand/BRAND-GUIDELINES.md §3.1 */
export const BRAND_COLORS = brand;

/** Semantic UI colors — sourced from src/design/tokens.js */
export const COLORS = DESIGN_COLORS;

export const CASE_TYPE_COLORS = {
  lost: COLORS.primary,
  found: COLORS.sky,
  adoption: COLORS.mint,
  transit: COLORS.lavender,
} as const;

export const DEFAULT_LOCALE = 'es-AR' as const;
export const SUPPORTED_LOCALES = ['es-AR', 'en-US'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_NOTIFICATION_RADIUS_KM = 10;

export const FIRESTORE_COLLECTIONS = {
  users: 'users',
  pets: 'pets',
  cases: 'cases',
  sightings: 'sightings',
  favorites: 'favorites',
  notifications: 'notifications',
  organizations: 'organizations',
  documents: 'documents',
  qrProfiles: 'qrProfiles',
  reports: 'reports',
} as const;

export const CASE_TYPES = ['lost', 'found', 'adoption', 'transit'] as const;

export {
  PET_SPECIES,
  DEFAULT_PET_SPECIES,
  type PetSpecies,
} from '@/types/species';

/** @deprecated Use PET_SPECIES */
export { PET_SPECIES as SPECIES } from '@/types/species';

export const SEX_OPTIONS = ['male', 'female', 'unknown'] as const;

export const ARGENTINA_PROVINCE_IDS = [
  'buenos_aires',
  'caba',
  'catamarca',
  'chaco',
  'chubut',
  'cordoba',
  'corrientes',
  'entre_rios',
  'formosa',
  'jujuy',
  'la_pampa',
  'la_rioja',
  'mendoza',
  'misiones',
  'neuquen',
  'rio_negro',
  'salta',
  'san_juan',
  'san_luis',
  'santa_cruz',
  'santa_fe',
  'santiago_del_estero',
  'tierra_del_fuego',
  'tucuman',
] as const;

export type ArgentinaProvinceId = (typeof ARGENTINA_PROVINCE_IDS)[number];
export const DEFAULT_PROVINCE_ID: ArgentinaProvinceId = 'caba';

/** @deprecated Use ARGENTINA_PROVINCE_IDS + i18n locations.provinces.* */
export const ARGENTINA_PROVINCES = ARGENTINA_PROVINCE_IDS;
