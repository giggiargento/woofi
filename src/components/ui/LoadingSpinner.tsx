import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '@/constants';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'small' | 'large';
}

export function LoadingSpinner({ className, size = 'large' }: LoadingSpinnerProps) {
  return (
    <View className={`items-center justify-center py-12 ${className ?? ''}`}>
      <ActivityIndicator color={COLORS.primary} size={size} />
    </View>
  );
}
