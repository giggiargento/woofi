import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants';
import { shadows } from './shadows';

interface ListRowProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  iconColor?: string;
}

export function ListRow({ label, icon, onPress, iconColor = COLORS.primary }: ListRowProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} className="mb-3">
      <View
        className="flex-row items-center rounded-3xl bg-surface p-4 shadow-warm-md"
        style={shadows.warmMd}
      >
        <View className="mr-4 rounded-2xl bg-sand/60 p-2.5">
          <Ionicons name={icon} size={22} color={iconColor} />
        </View>
        <Text className="flex-1 text-body font-semibold text-text">{label}</Text>
        <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
      </View>
    </TouchableOpacity>
  );
}
