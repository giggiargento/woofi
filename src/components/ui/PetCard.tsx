import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { shadows } from './shadows';
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
              className={`w-full items-center justify-center bg-lavender ${compact ? 'h-32' : 'h-44'}`}
            >
              <Ionicons name="paw" size={compact ? 36 : 52} color="#1F2937" />
            </View>
          )}
          <View className="absolute right-3 top-3">
            <View className="rounded-full border-2 border-border bg-card px-3 py-1.5">
              <Text className="text-xs font-bold text-text">
                {t(`pet.status.${pet.status}`)}
              </Text>
            </View>
          </View>
        </View>
        <View className="p-4">
          <Text className="text-xs font-semibold uppercase tracking-wide text-muted">
            {t(`pet.species.${pet.species}`)}
          </Text>
          <Text className="mt-0.5 text-lg font-bold text-text">{pet.name}</Text>
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
