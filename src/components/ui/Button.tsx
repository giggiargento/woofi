import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  type TouchableOpacityProps,
} from 'react-native';
import { cn } from '@/utils/cn';
import { COLORS } from '@/constants';
import { shadows } from './shadows';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  textClassName?: string;
}

const variantStyles: Record<ButtonVariant, { container: string; text: string }> = {
  primary: {
    container: 'bg-primary web:hover:bg-primary-accent woofi-hover-lift-sm shadow-warm-sm',
    text: 'text-text-dark font-bold',
  },
  secondary: {
    container: 'bg-lavender web:hover:opacity-90',
    text: 'text-text font-semibold',
  },
  outline: {
    container:
      'bg-surface border border-border web:hover:bg-sand/40 woofi-hover-lift-sm shadow-warm-sm',
    text: 'text-text font-semibold',
  },
  ghost: {
    container: 'bg-transparent web:hover:bg-sand/50',
    text: 'text-primary font-semibold',
  },
  destructive: {
    container: 'bg-pink web:hover:opacity-90',
    text: 'text-text font-bold',
  },
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2.5',
  md: 'px-6 py-3',
  lg: 'px-6 py-3.5',
};

const textSizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-base',
};

export function Button({
  title,
  loading,
  variant = 'primary',
  size = 'lg',
  className,
  textClassName,
  disabled,
  style,
  onPress,
  ...props
}: ButtonProps) {
  const styles = variantStyles[variant];
  const showShadow = variant === 'primary' || variant === 'outline';

  return (
    <TouchableOpacity
      className={cn(
        'w-full items-center justify-center rounded-full',
        sizeStyles[size],
        styles.container,
        (disabled || loading) && 'opacity-60',
        className
      )}
      style={[showShadow ? shadows.warmSm : undefined, style]}
      disabled={disabled || loading}
      activeOpacity={0.85}
      onPress={onPress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.textDark} />
      ) : (
        <Text className={cn(textSizeStyles[size], styles.text, textClassName)}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

/** @deprecated Use Button */
export const PrimaryButton = Button;
