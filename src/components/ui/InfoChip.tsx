import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';
import { COLORS } from '@/constants';
import { shadows } from './shadows';
import type { PastelColor } from './theme';
import { pastelClassNames } from './theme';

interface InfoChipProps {
  label: string;
  value: string | number;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: PastelColor;
  className?: string;
}

export function InfoChip({
  label,
  value,
  icon,
  color = 'cream',
  className,
}: InfoChipProps) {
  return (
    <View
      className={cn('w-[47%] rounded-2xl p-3.5 shadow-warm-sm', pastelClassNames[color], className)}
      style={shadows.warmSm}
    >
      <View className="mb-2 flex-row items-center">
        {icon ? (
          <View className="mr-2 rounded-full bg-surface/80 p-1">
            <Ionicons name={icon} size={14} color={COLORS.text} />
          </View>
        ) : null}
        <Text className="text-label text-muted">{label}</Text>
      </View>
      <Text className="text-body font-bold text-text" numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

export function InfoChipGrid({ children }: { children: React.ReactNode }) {
  return <View className="flex-row flex-wrap gap-3">{children}</View>;
}
