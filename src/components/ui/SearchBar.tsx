import { View, TextInput, type ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';
import { COLORS } from '@/constants';
import { shadows } from './shadows';

interface SearchBarProps extends ViewProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder,
  className,
  style,
  ...props
}: SearchBarProps) {
  return (
    <View
      className={cn(
        'flex-row items-center rounded-full border border-border bg-surface px-4 py-3',
        className
      )}
      style={[shadows.warmSm, style]}
      {...props}
    >
      <View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-sand/60">
        <Ionicons name="search" size={18} color={COLORS.muted} />
      </View>
      <TextInput
        className="flex-1 text-body text-text"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
      />
    </View>
  );
}
