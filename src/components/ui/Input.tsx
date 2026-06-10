import { TextInput, View, Text, type TextInputProps } from 'react-native';
import { cn } from '@/utils/cn';
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
        <Text className="mb-2 text-sm font-semibold text-text">{label}</Text>
      ) : null}
      <View style={shadows.soft}>
        <TextInput
          className={cn(
            'rounded-2xl border-2 border-border bg-card px-4 py-3.5 text-base text-text',
            error && 'border-pink',
            className
          )}
          style={style}
          placeholderTextColor="#6B7280"
          {...props}
        />
      </View>
      {error ? <Text className="mt-1.5 text-sm font-medium text-pink">{error}</Text> : null}
    </View>
  );
}
