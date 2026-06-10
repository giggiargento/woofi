import { View, Text, ScrollView, Linking, Share } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import {
  Card,
  Badge,
  Button,
  LoadingSpinner,
  IconButton,
  SectionHeader,
} from '@/components';
import { shadows } from '@/components';
import { useCase } from '@/hooks/useCases';
import { useIsFavorite, useToggleFavorite } from '@/hooks/useFavorites';
import { useAuthStore } from '@/stores/authStore';
import { CASE_TYPE_COLORS } from '@/constants';

export default function CaseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const router = useRouter();
  const { data: caseItem, isLoading } = useCase(id);
  const userId = useAuthStore((s) => s.firebaseUser?.uid);
  const { data: isFav } = useIsFavorite('case', id);
  const toggleFavorite = useToggleFavorite();

  if (isLoading || !caseItem) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <LoadingSpinner />
      </View>
    );
  }

  const photo = caseItem.petSnapshot.photoUrls[0];

  const handleWhatsApp = () => {
    const number = caseItem.contact.whatsApp ?? caseItem.contact.phone;
    if (!number) return;
    Linking.openURL(`https://wa.me/${number.replace(/\D/g, '')}`);
  };

  const handleCall = () => {
    if (!caseItem.contact.phone) return;
    Linking.openURL(`tel:${caseItem.contact.phone}`);
  };

  const handleShare = async () => {
    await Share.share({
      message: t('case.shareMessage', { title: caseItem.title, id: caseItem.id }),
      url: `wuffi://case/${caseItem.id}`,
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t(`case.type.${caseItem.caseType}`),
          headerStyle: { backgroundColor: '#FFF4EA' },
          headerShadowVisible: false,
          headerRight: () =>
            userId ? (
              <IconButton
                icon={isFav ? 'heart' : 'heart-outline'}
                onPress={() =>
                  toggleFavorite.mutate({
                    targetType: 'case',
                    targetId: caseItem.id,
                    caseType: caseItem.caseType,
                  })
                }
                className="mr-2"
              />
            ) : null,
        }}
      />
      <ScrollView
        className="flex-1 bg-background"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 pt-4">
          <View
            className="overflow-hidden rounded-3xl border-2 border-border bg-card"
            style={shadows.float}
          >
            {photo ? (
              <Image source={{ uri: photo }} className="h-72 w-full" contentFit="cover" />
            ) : (
              <View
                className="h-72 w-full items-center justify-center"
                style={{ backgroundColor: CASE_TYPE_COLORS[caseItem.caseType] }}
              >
                <Ionicons name="paw" size={72} color="#1F2937" />
              </View>
            )}
          </View>
        </View>

        <View className="px-4 pt-5">
          <Badge status={caseItem.status} caseType={caseItem.caseType} size="md" />
          <Text className="mt-4 text-3xl font-bold text-text">{caseItem.title}</Text>
          <Text className="mt-1 text-base text-muted">
            {caseItem.petSnapshot.name} · {t(`pet.species.${caseItem.petSnapshot.species}`)}
          </Text>

          <Card className="mt-5" variant="floating">
            <Text className="mb-2 text-lg font-bold text-text">{t('case.description')}</Text>
            <Text className="text-base leading-6 text-muted">{caseItem.description}</Text>
          </Card>

          <Card className="mt-4" variant="floating" pastel="sky">
            <View className="mb-2 flex-row items-center">
              <Ionicons name="location-outline" size={18} color="#1F2937" />
              <Text className="ml-2 text-lg font-bold text-text">{t('case.location')}</Text>
            </View>
            <Text className="text-base leading-6 text-muted">
              {[caseItem.addressText, caseItem.neighborhood, caseItem.city, caseItem.province]
                .filter(Boolean)
                .join(', ')}
            </Text>
          </Card>

          <SectionHeader title={t('case.contact.title')} className="mt-6" />
          {caseItem.contact.showWhatsApp && caseItem.contact.whatsApp ? (
            <Button
              title={t('case.contact.whatsapp')}
              onPress={handleWhatsApp}
              className="mb-3"
            />
          ) : null}
          {caseItem.contact.showPhone && caseItem.contact.phone ? (
            <Button
              title={t('case.contact.call')}
              variant="secondary"
              onPress={handleCall}
              className="mb-3"
            />
          ) : null}
          <Button title={t('case.contact.share')} variant="outline" onPress={handleShare} />

          {caseItem.caseType === 'lost' ? (
            <Button
              title={t('case.reportSighting')}
              variant="secondary"
              onPress={() => router.push(`/case/${id}/sighting`)}
              className="mt-4"
            />
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}
