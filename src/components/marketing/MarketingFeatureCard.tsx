import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import type { PastelColor } from '@/components/ui/theme';
import { useIsWideWeb } from '@/components/layout/WebShell';
import { COLORS } from '@/constants';
import { cn } from '@/utils/cn';

interface MarketingFeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  pastel?: PastelColor;
  featured?: boolean;
  badge?: string;
  className?: string;
}

export function MarketingFeatureCard({
  icon,
  title,
  description,
  pastel = 'lavender',
  featured,
  badge,
  className,
}: MarketingFeatureCardProps) {
  const isWideWeb = useIsWideWeb();

  return (
    <View className={cn(isWideWeb ? 'mb-6 w-[31%]' : 'mb-4 w-full', className)}>
      <Card pastel={pastel} className={cn('h-full', featured && 'border-primary')}>
        <View className="mb-3 flex-row items-start justify-between">
          <View className="rounded-2xl border-2 border-border bg-surface p-2.5">
            <Ionicons name={icon} size={24} color={COLORS.text} />
          </View>
          {badge ? (
            <Chip label={badge} color="butter" selected className="mr-0 px-3 py-1" />
          ) : null}
        </View>
        <Text className="mb-2 text-lg font-bold text-text">{title}</Text>
        <Text className="text-base leading-6 text-muted">{description}</Text>
      </Card>
    </View>
  );
}
