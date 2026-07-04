import { Platform, View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { MarketingHome } from '@/components';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#F9A23B" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  if (Platform.OS === 'web') {
    return <MarketingHome />;
  }

  return <Redirect href="/(auth)/login" />;
}
