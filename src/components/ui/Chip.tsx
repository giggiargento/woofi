import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { cn } from '@/utils/cn';
import type { PastelColor } from './theme';
import { pastelClassNames } from './theme';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  color?: PastelColor;
  icon?: React.ReactNode;
  className?: string;
}

export function Chip({
  label,
  selected,
  onPress,
  color = 'lavender',
  icon,
  className,
}: ChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.8}
      className={cn(
        'mr-2 flex-row items-center rounded-full border-2 border-border px-4 py-2.5',
        selected ? pastelClassNames[color] : 'bg-card',
        className
      )}
    >
      {icon}
      <Text
        className={cn(
          'text-sm font-semibold',
          selected ? 'text-text' : 'text-muted',
          icon ? 'ml-1.5' : ''
        )}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function ChipRow({
  children,
  horizontal,
  className,
}: {
  children: React.ReactNode;
  horizontal?: boolean;
  className?: string;
}) {
  if (horizontal) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className={cn('mb-2', className)}
        contentContainerClassName="pr-2"
      >
        {children}
      </ScrollView>
    );
  }
  return <View className={cn('flex-row flex-wrap', className)}>{children}</View>;
}
