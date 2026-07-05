import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants';
import { shadows } from './shadows';

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home-outline',
  explore: 'compass-outline',
  add: 'add',
  alerts: 'notifications-outline',
  profile: 'person-outline',
};

export function BottomNavigation({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomOffset = Platform.OS === 'ios' ? Math.max(insets.bottom, 16) : 16;

  return (
    <View
      className="absolute left-4 right-4"
      style={{ bottom: bottomOffset }}
      pointerEvents="box-none"
    >
      <View
        className="flex-row items-center justify-around rounded-full bg-surface px-2 py-2 shadow-warm-lg"
        style={shadows.warmLg}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title ?? route.name;
          const isFocused = state.index === index;
          const isAdd = route.name === 'add';
          const iconName = TAB_ICONS[route.name] ?? 'ellipse-outline';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          if (isAdd) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                activeOpacity={0.85}
                className="items-center justify-center px-2"
              >
                <View className="rounded-full bg-primary p-3 shadow-warm-sm">
                  <Ionicons name="add" size={28} color={COLORS.textDark} />
                </View>
                <Text className="mt-1 text-[10px] font-bold text-text">{label}</Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.8}
              className="min-w-[56px] items-center justify-center px-1 py-1"
            >
              <View
                className={`items-center justify-center rounded-full p-2 ${
                  isFocused ? 'bg-sand/70' : ''
                }`}
              >
                <Ionicons
                  name={iconName}
                  size={22}
                  color={isFocused ? COLORS.textDark : COLORS.muted}
                />
              </View>
              <Text
                className={`mt-0.5 text-[10px] font-bold ${
                  isFocused ? 'text-text-dark' : 'text-muted'
                }`}
                numberOfLines={1}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
