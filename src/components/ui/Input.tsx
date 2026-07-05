import { TextInput, View, Text, type TextInputProps } from 'react-native';
import { cn } from '@/utils/cn';
import { COLORS } from '@/constants';
import { shadows } from './shadows';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export function Input({
  label,
  error,
  containerClassName,
  className,
  style,
  ...props
}: InputProps) {
  return (
    <View className={cn('mb-4', containerClassName)}>
      {label ? (
        <Text className="mb-2 text-label font-semibold text-text">{label}</Text>
      ) : null}
      <View style={shadows.warmSm}>
        <TextInput
          className={cn(
            'rounded-2xl border border-border bg-surface px-4 py-3.5 text-body text-text',
            'web:focus:border-border-focus',
            error && 'border-pink',
            className
          )}
          style={style}
          placeholderTextColor={COLORS.muted}
          {...props}
        />
      </View>
      {error ? <Text className="mt-1.5 text-sm font-medium text-pink">{error}</Text> : null}
    </View>
  );
}
