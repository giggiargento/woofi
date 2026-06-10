import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';
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
  color = '#1F2937',
  variant = 'default',
  className,
  style,
  ...props
}: IconButtonProps) {
  return (
    <TouchableOpacity
      className={cn(
        'items-center justify-center rounded-full border-2 border-border p-2.5',
        variant === 'default' && 'bg-card',
        variant === 'primary' && 'bg-primary',
        variant === 'ghost' && 'border-transparent bg-transparent',
        className
      )}
      style={[variant !== 'ghost' ? shadows.soft : undefined, style]}
      activeOpacity={0.8}
      {...props}
    >
      <Ionicons name={icon} size={size} color={variant === 'primary' ? '#1F2937' : color} />
    </TouchableOpacity>
  );
}
