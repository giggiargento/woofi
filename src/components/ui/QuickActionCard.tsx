import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';
import { COLORS } from '@/constants';
import { shadows } from './shadows';
import type { PastelColor } from './theme';
import { pastelClassNames } from './theme';

interface QuickActionCardProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  color?: PastelColor;
  featured?: boolean;
  description?: string;
  className?: string;
}

export function QuickActionCard({
  label,
  icon,
  onPress,
  color = 'lavender',
  featured = false,
  description,
  className,
}: QuickActionCardProps) {
  if (featured) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        className={cn('mb-4', className)}
      >
        <View
          className="flex-row items-center rounded-3xl bg-primary p-5 shadow-warm-lg"
          style={shadows.warmLg}
        >
          <View className="mr-4 rounded-2xl bg-surface/90 p-3">
            <Ionicons name={icon} size={32} color={COLORS.text} />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-text">{label}</Text>
            {description ? (
              <Text className="mt-1 text-sm text-text/80">{description}</Text>
            ) : null}
          </View>
          <View className="rounded-full bg-surface px-3 py-1.5">
            <Ionicons name="arrow-forward" size={18} color={COLORS.text} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} className={cn('mr-3', className)}>
      <View
        className={cn(
          'w-[108px] items-center rounded-3xl p-4 shadow-warm-md',
          pastelClassNames[color]
        )}
        style={shadows.warmMd}
      >
        <View className="mb-3 rounded-2xl bg-surface p-2.5">
          <Ionicons name={icon} size={26} color={COLORS.text} />
        </View>
        <Text className="text-center text-xs font-bold leading-4 text-text" numberOfLines={2}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
