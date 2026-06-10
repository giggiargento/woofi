import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Badge } from './Badge';
import { SpeciesBadge } from './SpeciesSelector';
import { shadows } from './shadows';
import { CASE_TYPE_COLORS } from '@/constants';
import { PET_SPECIES_ICONS } from '@/utils/speciesIcons';
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
  const species = caseItem.petSnapshot.species;
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
              <MaterialCommunityIcons
                name={PET_SPECIES_ICONS[species]}
                size={40}
                color="#1F2937"
              />
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
          <View className="mt-1 flex-row flex-wrap items-center gap-2">
            <Text className="text-sm text-muted" numberOfLines={1}>
              {caseItem.petSnapshot.name}
            </Text>
            <SpeciesBadge species={species} />
          </View>
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
