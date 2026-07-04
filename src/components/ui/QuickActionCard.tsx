import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';
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
          className="flex-row items-center rounded-3xl border-2 border-border bg-primary p-5"
          style={shadows.float}
        >
          <View className="mr-4 rounded-2xl border-2 border-border bg-card/90 p-3">
            <Ionicons name={icon} size={32} color="#1F2937" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-text">{label}</Text>
            {description ? (
              <Text className="mt-1 text-sm text-text/80">{description}</Text>
            ) : null}
          </View>
          <View className="rounded-full border-2 border-border bg-card px-3 py-1.5">
            <Ionicons name="arrow-forward" size={18} color="#1F2937" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} className={cn('mr-3', className)}>
      <View
        className={cn(
          'w-[108px] items-center rounded-3xl border-2 border-border p-4',
          pastelClassNames[color]
        )}
        style={shadows.card}
      >
        <View className="mb-3 rounded-2xl border-2 border-border bg-card p-2.5">
          <Ionicons name={icon} size={26} color="#1F2937" />
        </View>
        <Text className="text-center text-xs font-bold leading-4 text-text" numberOfLines={2}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
