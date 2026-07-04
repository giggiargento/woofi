import { View, type ViewProps } from 'react-native';
import { cn } from '@/utils/cn';
import { shadows, type ShadowVariant } from './shadows';
import type { PastelColor } from './theme';
import { pastelClassNames } from './theme';

export type CardVariant = 'default' | 'floating' | 'pastel' | 'flat';

interface CardProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
  variant?: CardVariant;
  pastel?: PastelColor;
  shadow?: ShadowVariant | 'none';
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
  const shadowVariant =
    shadow ?? (variant === 'floating' ? 'float' : variant === 'flat' ? 'none' : 'card');

  return (
    <View
      className={cn(
        'rounded-3xl border-2 border-border p-4',
        variant === 'flat' ? 'bg-transparent' : 'bg-card',
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
