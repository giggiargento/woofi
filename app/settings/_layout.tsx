import { Stack } from 'expo-router';
import { WebShell } from '@/components';
import { COLORS } from '@/constants';

export default function SettingsLayout() {
  return (
    <WebShell>
      <Stack
        screenOptions={{
          headerShown: true,
          title: '',
          headerStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      />
    </WebShell>
  );
}
