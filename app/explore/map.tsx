import { View, Text, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { CaseCard, EmptyState } from '@/components';
import { useExploreCases } from '@/hooks/useCases';
import { shadows } from '@/components';

export default function ExploreMapScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: cases } = useExploreCases();

  return (
    <>
      <Stack.Screen
        options={{
          title: t('map.title'),
          headerStyle: { backgroundColor: '#FFF4EA' },
          headerShadowVisible: false,
        }}
      />
      <View className="flex-1 bg-background">
        <View
          className="mx-4 mt-4 rounded-3xl border-2 border-border bg-sky px-4 py-4"
          style={shadows.soft}
        >
          <Text className="text-center text-sm font-medium leading-5 text-text">
            {t('map.webFallback')}
          </Text>
        </View>
        <ScrollView
          className="flex-1 px-4 py-4"
          contentContainerClassName="pb-10"
          showsVerticalScrollIndicator={false}
        >
          {cases && cases.length > 0 ? (
            cases.map((c) => (
              <CaseCard
                key={c.id}
                caseItem={c}
                onPress={() => router.push(`/case/${c.id}`)}
              />
            ))
          ) : (
            <EmptyState title={t('explore.empty')} icon="map-outline" accent="sky" />
          )}
        </ScrollView>
      </View>
    </>
  );
}
