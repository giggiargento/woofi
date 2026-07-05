import { Platform, type ViewStyle } from 'react-native';

const WARM_COLOR = '#5B3E2D';

function warmShadow(
  offsetY: number,
  radius: number,
  opacity: number,
  elevation: number
): ViewStyle {
  return Platform.select<ViewStyle>({
    ios: {
      shadowColor: WARM_COLOR,
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: { elevation },
    default: {},
  }) as ViewStyle;
}

export const shadows = {
  warmSm: warmShadow(2, 8, 0.06, 2),
  warmMd: warmShadow(4, 20, 0.08, 4),
  warmLg: warmShadow(8, 32, 0.1, 8),
  /** @deprecated Use warmSm */
  soft: warmShadow(2, 8, 0.06, 2),
  /** @deprecated Use warmMd */
  card: warmShadow(4, 20, 0.08, 4),
  /** @deprecated Use warmLg */
  float: warmShadow(8, 32, 0.1, 8),
} as const;

export type ShadowVariant = keyof typeof shadows;
