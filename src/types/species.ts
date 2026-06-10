/**
 * MVP pet species. Extend PET_SPECIES when adding new species to the product.
 */
export const PET_SPECIES = ['dog', 'cat'] as const;

export type PetSpecies = (typeof PET_SPECIES)[number];

export const DEFAULT_PET_SPECIES: PetSpecies = 'dog';

export function isPetSpecies(value: unknown): value is PetSpecies {
  return typeof value === 'string' && (PET_SPECIES as readonly string[]).includes(value);
}

/** Coerce legacy Firestore values to a supported MVP species. */
export function normalizePetSpecies(value: unknown): PetSpecies {
  return isPetSpecies(value) ? value : DEFAULT_PET_SPECIES;
}

export const PET_SPECIES_PASTEL = {
  dog: 'primary',
  cat: 'lavender',
} as const satisfies Record<PetSpecies, 'primary' | 'lavender'>;
