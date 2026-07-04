import { Stack } from 'expo-router';
import { WebShell } from '@/components';

export default function AuthLayout() {
  return (
    <WebShell>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFF4EA' },
        }}
      />
    </WebShell>
  );
}
