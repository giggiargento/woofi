import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';
import { COLORS } from '@/constants';
import { shadows } from './shadows';

interface IconButtonProps extends TouchableOpacityProps {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  variant?: 'default' | 'primary' | 'ghost';
  className?: string;
}

export function IconButton({
  icon,
  size = 22,
  color = COLORS.text,
  variant = 'default',
  className,
  style,
  ...props
}: IconButtonProps) {
  return (
    <TouchableOpacity
      className={cn(
        'items-center justify-center rounded-full p-2.5 web:hover:bg-sand/50',
        variant === 'default' && 'bg-sand/40',
        variant === 'primary' && 'bg-primary',
        variant === 'ghost' && 'bg-transparent',
        className
      )}
      style={[variant !== 'ghost' ? shadows.warmSm : undefined, style]}
      activeOpacity={0.8}
      {...props}
    >
      <Ionicons
        name={icon}
        size={size}
        color={variant === 'primary' ? COLORS.textDark : color}
      />
    </TouchableOpacity>
  );
}
