import { View, type ViewProps } from 'react-native';
import { cn } from '@/utils/cn';
import { shadows } from '@/components/ui/shadows';

interface AuthCardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className, style, ...props }: AuthCardProps) {
  return (
    <View
      className={cn(
        'w-full max-w-md rounded-3xl bg-surface p-8 shadow-warm-md',
        className
      )}
      style={[shadows.warmMd, style]}
      {...props}
    >
      {children}
    </View>
  );
}
