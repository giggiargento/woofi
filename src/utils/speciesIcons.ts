import type { MaterialCommunityIcons } from '@expo/vector-icons';
import type { PetSpecies } from '@/types/species';

export const PET_SPECIES_ICONS: Record<
  PetSpecies,
  keyof typeof MaterialCommunityIcons.glyphMap
> = {
  dog: 'dog',
  cat: 'cat',
};

export const PET_SPECIES_PLACEHOLDER_BG: Record<PetSpecies, string> = {
  dog: 'bg-primary',
  cat: 'bg-lavender',
};
