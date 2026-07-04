import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { PET_SPECIES, PET_SPECIES_PASTEL, type PetSpecies } from '@/types/species';
import { PET_SPECIES_ICONS } from '@/utils/speciesIcons';
import type { PastelColor } from './theme';
import { pastelClassNames } from './theme';
import { cn } from '@/utils/cn';

interface SpeciesSelectorProps {
  value: PetSpecies;
  onChange: (species: PetSpecies) => void;
  className?: string;
}

export function SpeciesSelector({ value, onChange, className }: SpeciesSelectorProps) {
  const { t } = useTranslation();

  return (
    <View className={className}>
      <Text className="mb-2 text-sm font-semibold text-text">{t('pet.form.species')}</Text>
      <View className="mb-4 flex-row flex-wrap gap-2">
        {PET_SPECIES.map((species) => {
          const selected = value === species;
          const color = PET_SPECIES_PASTEL[species] as PastelColor;
          return (
            <TouchableOpacity
              key={species}
              onPress={() => onChange(species)}
              activeOpacity={0.85}
              className={cn(
                'min-w-[120px] flex-1 flex-row items-center justify-center rounded-3xl border-2 border-border px-4 py-3',
                selected ? pastelClassNames[color] : 'bg-card'
              )}
            >
              <MaterialCommunityIcons
                name={PET_SPECIES_ICONS[species]}
                size={22}
                color="#1F2937"
              />
              <Text className="ml-2 text-sm font-bold text-text">
                {t(`pet.species.${species}`)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

interface SpeciesBadgeProps {
  species: PetSpecies;
  className?: string;
  size?: 'sm' | 'md';
}

export function SpeciesBadge({ species, className, size = 'sm' }: SpeciesBadgeProps) {
  const { t } = useTranslation();
  const iconSize = size === 'sm' ? 14 : 18;

  return (
    <View
      className={cn(
        'flex-row items-center self-start rounded-full border-2 border-border bg-cream',
        size === 'sm' ? 'px-2.5 py-1' : 'px-3 py-1.5',
        className
      )}
    >
      <MaterialCommunityIcons
        name={PET_SPECIES_ICONS[species]}
        size={iconSize}
        color="#1F2937"
      />
      <Text
        className={cn(
          'ml-1.5 font-bold text-text',
          size === 'sm' ? 'text-xs' : 'text-sm'
        )}
      >
        {t(`pet.species.${species}`)}
      </Text>
    </View>
  );
}
