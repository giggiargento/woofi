import { View, Text, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { userProfile } = useAuth();

  return (
    <>
      <Stack.Screen
        options={{
          title: t('settings.title'),
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        className="flex-1 bg-background px-4 py-4"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        <Card variant="floating" className="mb-4">
          <View className="mb-3 flex-row items-center">
            <View className="mr-3 rounded-full border-2 border-border bg-cream p-2">
              <Ionicons name="person-outline" size={20} color="#1F2937" />
            </View>
            <Text className="text-lg font-bold text-text">{t('settings.account')}</Text>
          </View>
          <Text className="text-base text-muted">{userProfile?.email}</Text>
        </Card>
        <Card variant="floating" pastel="lavender">
          <View className="mb-3 flex-row items-center">
            <View className="mr-3 rounded-full border-2 border-border bg-card p-2">
              <Ionicons name="language-outline" size={20} color="#1F2937" />
            </View>
            <Text className="text-lg font-bold text-text">{t('settings.language')}</Text>
          </View>
          <Text className="text-base text-muted">
            {t(`settings.locale.${userProfile?.locale ?? 'es-AR'}`)}
          </Text>
        </Card>
      </ScrollView>
    </>
  );
}
