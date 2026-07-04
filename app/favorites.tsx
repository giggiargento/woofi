import { FlatList } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { CaseCard, EmptyState, LoadingSpinner, WebShell } from '@/components';
import { COLORS } from '@/constants';
import { useFavorites } from '@/hooks/useFavorites';
import { useCase } from '@/hooks/useCases';

function FavoriteCaseItem({ caseId }: { caseId: string }) {
  const router = useRouter();
  const { data: caseItem } = useCase(caseId);

  if (!caseItem) return null;

  return (
    <CaseCard caseItem={caseItem} onPress={() => router.push(`/case/${caseId}`)} isFavorite />
  );
}

export default function FavoritesScreen() {
  const { t } = useTranslation();
  const { data: favorites, isLoading } = useFavorites();

  const caseFavorites = favorites?.filter((f) => f.targetType === 'case') ?? [];

  return (
    <>
      <Stack.Screen
        options={{
          title: t('favorites.title'),
          headerStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false,
        }}
      />
      <WebShell>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <FlatList
            className="flex-1 bg-background"
            contentContainerClassName="px-4 py-4 pb-10"
            data={caseFavorites}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <EmptyState
                title={t('favorites.empty')}
                subtitle={t('favorites.emptySubtitle')}
                icon="heart-outline"
                accent="pink"
              />
            }
            renderItem={({ item }) => <FavoriteCaseItem caseId={item.targetId} />}
          />
        )}
      </WebShell>
    </>
  );
}
