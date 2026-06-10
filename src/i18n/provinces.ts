import type { TFunction } from 'i18next';
import {
  ARGENTINA_PROVINCE_IDS,
  DEFAULT_PROVINCE_ID,
  type ArgentinaProvinceId,
} from '@/constants';

export function provinceLabel(t: TFunction, provinceId: ArgentinaProvinceId): string {
  return t(`locations.provinces.${provinceId}`);
}

export function provinceIdFromName(
  t: TFunction,
  provinceName: string
): ArgentinaProvinceId | '' {
  const id = ARGENTINA_PROVINCE_IDS.find(
    (provinceId) => provinceLabel(t, provinceId) === provinceName
  );
  return id ?? '';
}

export function provinceLabelFromName(t: TFunction, provinceName: string): string {
  const id = provinceIdFromName(t, provinceName);
  return id ? provinceLabel(t, id) : provinceName;
}

export { ARGENTINA_PROVINCE_IDS, DEFAULT_PROVINCE_ID };
export type { ArgentinaProvinceId };
