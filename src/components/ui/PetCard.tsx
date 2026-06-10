import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { SpeciesBadge } from './SpeciesSelector';
import { shadows } from './shadows';
import { PET_SPECIES_ICONS, PET_SPECIES_PLACEHOLDER_BG } from '@/utils/speciesIcons';
import type { Pet } from '@/types';

interface PetCardProps {
  pet: Pet;
  onPress?: () => void;
  compact?: boolean;
}

export function PetCard({ pet, onPress, compact = false }: PetCardProps) {
  const { t } = useTranslation();
  const photo = pet.photoUrls[0];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.92} className="mb-4">
      <View
        className="overflow-hidden rounded-3xl border-2 border-border bg-card"
        style={shadows.card}
      >
        <View className="relative">
          {photo ? (
            <Image
              source={{ uri: photo }}
              className={compact ? 'h-32 w-full' : 'h-44 w-full'}
              contentFit="cover"
            />
          ) : (
            <View
              className={`w-full items-center justify-center ${PET_SPECIES_PLACEHOLDER_BG[pet.species]} ${compact ? 'h-32' : 'h-44'}`}
            >
              <MaterialCommunityIcons
                name={PET_SPECIES_ICONS[pet.species]}
                size={compact ? 40 : 56}
                color="#1F2937"
              />
            </View>
          )}
          <View className="absolute left-3 top-3">
            <SpeciesBadge species={pet.species} />
          </View>
          <View className="absolute right-3 top-3">
            <View className="rounded-full border-2 border-border bg-card px-3 py-1.5">
              <Text className="text-xs font-bold text-text">
                {t(`pet.status.${pet.status}`)}
              </Text>
            </View>
          </View>
        </View>
        <View className="p-4">
          <Text className="text-lg font-bold text-text">{pet.name}</Text>
          {pet.breed ? (
            <Text className="mt-1 text-sm text-muted" numberOfLines={1}>
              {pet.breed}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
