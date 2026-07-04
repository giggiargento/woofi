import { Stack } from 'expo-router';
import { WebShell } from '@/components';

export default function PetLayout() {
  return (
    <WebShell>
      <Stack
        screenOptions={{
          headerShown: true,
          title: '',
          headerStyle: { backgroundColor: '#FFF4EA' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: '#FFF4EA' },
        }}
      />
    </WebShell>
  );
}
