import { Stack } from 'expo-router';
import { WebShell } from '@/components';
import { COLORS } from '@/constants';

export default function ExploreLayout() {
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
      >
        <Stack.Screen name="filters" options={{ presentation: 'modal', title: '' }} />
      </Stack>
    </WebShell>
  );
}
