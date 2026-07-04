import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { BottomNavigation, WebShell } from '@/components';

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <WebShell>
      <Tabs
        tabBar={(props) => <BottomNavigation {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" options={{ title: t('tabs.home') }} />
        <Tabs.Screen name="explore" options={{ title: t('tabs.explore') }} />
        <Tabs.Screen name="add" options={{ title: t('tabs.add') }} />
        <Tabs.Screen name="alerts" options={{ title: t('tabs.alerts') }} />
        <Tabs.Screen name="profile" options={{ title: t('tabs.profile') }} />
      </Tabs>
    </WebShell>
  );
}
