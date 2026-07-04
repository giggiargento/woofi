import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Button';
import { shadows } from './shadows';
import type { PastelColor } from './theme';
import { pastelClassNames } from './theme';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onCta?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  accent?: PastelColor;
}

export function EmptyState({
  title,
  subtitle,
  ctaLabel,
  onCta,
  icon = 'paw-outline',
  accent = 'lavender',
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <View
        className={`mb-6 rounded-full border-2 border-border p-7 ${pastelClassNames[accent]}`}
        style={shadows.card}
      >
        <Ionicons name={icon} size={52} color="#1F2937" />
      </View>
      <Text className="mb-2 text-center text-2xl font-bold text-text">{title}</Text>
      {subtitle ? (
        <Text className="mb-8 max-w-xs text-center text-base leading-6 text-muted">
          {subtitle}
        </Text>
      ) : null}
      {ctaLabel && onCta ? (
        <Button title={ctaLabel} onPress={onCta} className="max-w-xs" />
      ) : null}
    </View>
  );
}
