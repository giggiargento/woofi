import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '@/components';

export default function AlertsScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="px-4 pt-4">
        <Text className="text-3xl font-bold text-text">{t('alerts.title')}</Text>
      </View>
      <EmptyState
        title={t('alerts.empty')}
        subtitle={t('alerts.emptySubtitle')}
        icon="notifications-outline"
        accent="butter"
      />
    </SafeAreaView>
  );
}
