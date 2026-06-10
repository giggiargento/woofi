import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  PetCard,
  CaseCard,
  Button,
  ListRow,
  SectionHeader,
  LoadingSpinner,
} from '@/components';
import { shadows } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { usePets } from '@/hooks/usePets';
import { useMyCases } from '@/hooks/useCases';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { userProfile, logout } = useAuth();
  const { data: pets, isLoading: petsLoading } = usePets();
  const { data: myCases } = useMyCases();

  const location = userProfile?.city
    ? [userProfile.neighborhood, userProfile.city, userProfile.province].filter(Boolean).join(', ')
    : undefined;

  const menuItems = [
    { key: 'favorites', icon: 'heart' as const, route: '/favorites' },
    { key: 'settings', icon: 'settings' as const, route: '/settings' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1 px-4" contentContainerClassName="pb-32" showsVerticalScrollIndicator={false}>
        <View className="mb-8 items-center pt-4">
          <View
            className="mb-4 h-28 w-28 items-center justify-center rounded-full border-2 border-border bg-lavender"
            style={shadows.card}
          >
            <Ionicons name="person" size={52} color="#1F2937" />
          </View>
          <Text className="text-2xl font-bold text-text">{userProfile?.displayName}</Text>
          <Text className="mt-1 text-sm text-muted">{userProfile?.email}</Text>
          {location ? (
            <View className="mt-2 flex-row items-center rounded-full border-2 border-border bg-cream px-4 py-1.5">
              <Ionicons name="location-outline" size={14} color="#6B7280" />
              <Text className="ml-1 text-sm text-muted">{location}</Text>
            </View>
          ) : null}
        </View>

        {menuItems.map((item) => (
          <ListRow
            key={item.key}
            label={t(`profile.${item.key}`)}
            icon={item.icon}
            onPress={() => router.push(item.route as never)}
          />
        ))}

        <SectionHeader title={t('profile.myPets')} className="mt-6" />
        {petsLoading ? (
          <LoadingSpinner size="small" />
        ) : pets && pets.length > 0 ? (
          pets.slice(0, 3).map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onPress={() => router.push(`/pet/${pet.id}`)}
              compact
            />
          ))
        ) : (
          <Text className="text-sm text-muted">{t('home.empty.title')}</Text>
        )}

        <SectionHeader title={t('profile.myCases')} className="mt-4" />
        {myCases && myCases.length > 0 ? (
          myCases.slice(0, 3).map((c) => (
            <CaseCard
              key={c.id}
              caseItem={c}
              onPress={() => router.push(`/case/${c.id}`)}
            />
          ))
        ) : (
          <View className="rounded-3xl border-2 border-border bg-cream p-5">
            <Text className="text-center text-sm text-muted">{t('explore.empty')}</Text>
          </View>
        )}

        <Button
          title={t('auth.logout')}
          variant="outline"
          onPress={() => logout()}
          className="mt-8"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
