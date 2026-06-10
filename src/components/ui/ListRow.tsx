import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from './shadows';

interface ListRowProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  iconColor?: string;
}

export function ListRow({ label, icon, onPress, iconColor = '#F9A23B' }: ListRowProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} className="mb-3">
      <View
        className="flex-row items-center rounded-3xl border-2 border-border bg-card p-4"
        style={shadows.card}
      >
        <View className="mr-4 rounded-2xl border-2 border-border bg-cream p-2.5">
          <Ionicons name={icon} size={22} color={iconColor} />
        </View>
        <Text className="flex-1 text-base font-semibold text-text">{label}</Text>
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      </View>
    </TouchableOpacity>
  );
}
