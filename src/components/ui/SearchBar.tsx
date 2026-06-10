import { View, TextInput, type ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';
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
        'flex-row items-center rounded-full border-2 border-border bg-card px-4 py-3.5',
        className
      )}
      style={[shadows.soft, style]}
      {...props}
    >
      <View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-cream">
        <Ionicons name="search" size={18} color="#6B7280" />
      </View>
      <TextInput
        className="flex-1 text-base text-text"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
      />
    </View>
  );
}
