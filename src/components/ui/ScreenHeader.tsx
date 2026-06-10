import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from './IconButton';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showNotification?: boolean;
  onNotificationPress?: () => void;
  avatarInitial?: string;
}

export function ScreenHeader({
  title,
  subtitle,
  showNotification = false,
  onNotificationPress,
  avatarInitial,
}: ScreenHeaderProps) {
  return (
    <View className="mb-6 flex-row items-center justify-between pt-2">
      <View className="flex-1 flex-row items-center">
        {avatarInitial ? (
          <View className="mr-3 h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-lavender">
            <Text className="text-lg font-bold text-text">{avatarInitial}</Text>
          </View>
        ) : null}
        <View className="flex-1">
          <Text className="text-2xl font-bold text-text" numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <View className="mt-1 flex-row items-center">
              <Ionicons name="location-outline" size={14} color="#6B7280" />
              <Text className="ml-1 text-sm text-muted" numberOfLines={1}>
                {subtitle}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      {showNotification ? (
        <IconButton icon="notifications-outline" onPress={onNotificationPress} />
      ) : null}
    </View>
  );
}
