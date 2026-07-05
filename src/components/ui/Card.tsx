import { View, Text, type ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';
import { COLORS } from '@/constants';
import { shadows, type ShadowVariant } from './shadows';
import type { PastelColor } from './theme';
import { pastelClassNames } from './theme';
import { Chip } from './Chip';

export type CardVariant = 'default' | 'elevated' | 'floating' | 'pastel' | 'flat' | 'feature';

interface CardProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
  variant?: CardVariant;
  pastel?: PastelColor;
  shadow?: ShadowVariant | 'none';
}

function resolveShadow(
  variant: CardVariant,
  shadow?: ShadowVariant | 'none'
): ShadowVariant | 'none' {
  if (shadow !== undefined) return shadow;
  if (variant === 'flat') return 'none';
  if (variant === 'elevated' || variant === 'floating') return 'warmLg';
  return 'warmMd';
}

export function Card({
  className,
  children,
  variant = 'default',
  pastel,
  shadow,
  style,
  ...props
}: CardProps) {
  const shadowVariant = resolveShadow(variant, shadow);
  const isPastel = variant === 'pastel' || Boolean(pastel);

  return (
    <View
      className={cn(
        'rounded-3xl p-5',
        variant === 'flat' ? 'bg-transparent' : 'bg-surface',
        !isPastel && variant !== 'flat' && 'shadow-warm-md',
        pastel && pastelClassNames[pastel],
        className
      )}
      style={[shadowVariant !== 'none' ? shadows[shadowVariant] : undefined, style]}
      {...props}
    >
      {children}
    </View>
  );
}

export interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  pastel?: PastelColor;
  featured?: boolean;
  badge?: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  pastel = 'lavender',
  featured,
  badge,
  className,
}: FeatureCardProps) {
  return (
    <Card
      pastel={pastel}
      className={cn('h-full', featured && 'border border-primary/30', className)}
    >
      <View className="mb-3 flex-row items-start justify-between">
        <View className="rounded-xl bg-sand/60 p-2.5">
          <Ionicons name={icon} size={24} color={COLORS.text} />
        </View>
        {badge ? (
          <Chip label={badge} color="butter" selected className="mr-0 px-3 py-1" />
        ) : null}
      </View>
      <Text className="mb-2 text-h3 font-bold text-text">{title}</Text>
      <Text className="text-body leading-6 text-muted">{description}</Text>
    </Card>
  );
}
