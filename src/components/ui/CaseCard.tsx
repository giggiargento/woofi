import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Badge } from './Badge';
import { shadows } from './shadows';
import { CASE_TYPE_COLORS } from '@/constants';
import type { Case } from '@/types';

interface CaseCardProps {
  caseItem: Case;
  onPress?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export function CaseCard({ caseItem, onPress, onFavorite, isFavorite }: CaseCardProps) {
  const { t } = useTranslation();
  const photo = caseItem.petSnapshot.photoUrls[0];
  const location = [caseItem.neighborhood, caseItem.city, caseItem.province]
    .filter(Boolean)
    .join(', ');

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.92} className="mb-4">
      <View
        className="flex-row overflow-hidden rounded-3xl border-2 border-border bg-card"
        style={shadows.card}
      >
        <View className="relative">
          {photo ? (
            <Image source={{ uri: photo }} className="h-[120px] w-[120px]" contentFit="cover" />
          ) : (
            <View
              className="h-[120px] w-[120px] items-center justify-center"
              style={{ backgroundColor: CASE_TYPE_COLORS[caseItem.caseType] }}
            >
              <Ionicons name="paw" size={36} color="#1F2937" />
            </View>
          )}
        </View>
        <View className="flex-1 justify-center p-4">
          <View className="mb-2 flex-row items-start justify-between">
            <Badge status={caseItem.status} caseType={caseItem.caseType} />
            {onFavorite ? (
              <TouchableOpacity
                onPress={onFavorite}
                hitSlop={10}
                className="rounded-full border-2 border-border bg-cream p-1.5"
              >
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={18}
                  color="#F9A23B"
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <Text className="text-base font-bold text-text" numberOfLines={1}>
            {caseItem.title}
          </Text>
          <Text className="mt-0.5 text-sm text-muted" numberOfLines={1}>
            {caseItem.petSnapshot.name} · {t(`pet.species.${caseItem.petSnapshot.species}`)}
          </Text>
          {location ? (
            <View className="mt-2 flex-row items-center">
              <Ionicons name="location-outline" size={12} color="#6B7280" />
              <Text className="ml-1 flex-1 text-xs text-muted" numberOfLines={1}>
                {location}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
