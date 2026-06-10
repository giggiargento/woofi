import { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Input, Button, Chip, ChipRow } from '@/components';
import { useExploreStore } from '@/stores/exploreStore';
import { ARGENTINA_PROVINCE_IDS, SPECIES, type ArgentinaProvinceId } from '@/constants';
import { provinceIdFromName, provinceLabel } from '@/i18n/provinces';

export default function ExploreFiltersScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const filters = useExploreStore((s) => s.filters);
  const setFilters = useExploreStore((s) => s.setFilters);
  const resetFilters = useExploreStore((s) => s.resetFilters);

  const [provinceId, setProvinceId] = useState<ArgentinaProvinceId | ''>(
    filters.province ? provinceIdFromName(t, filters.province) : ''
  );
  const [city, setCity] = useState(filters.city ?? '');
  const [neighborhood, setNeighborhood] = useState(filters.neighborhood ?? '');
  const [species, setSpecies] = useState(filters.species ?? '');

  const handleApply = () => {
    setFilters({
      province: provinceId ? provinceLabel(t, provinceId) : undefined,
      city: city || undefined,
      neighborhood: neighborhood || undefined,
      species: species || undefined,
    });
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: t('explore.filters'),
          headerStyle: { backgroundColor: '#FFF4EA' },
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        className="flex-1 bg-background px-4 py-4"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-3 text-sm font-semibold text-text">{t('explore.province')}</Text>
        <ChipRow>
          {ARGENTINA_PROVINCE_IDS.slice(0, 8).map((id) => (
            <Chip
              key={id}
              label={provinceLabel(t, id)}
              selected={provinceId === id}
              onPress={() => setProvinceId(provinceId === id ? '' : id)}
              color="sky"
            />
          ))}
        </ChipRow>

        <Input label={t('explore.city')} value={city} onChangeText={setCity} />
        <Input label={t('explore.neighborhood')} value={neighborhood} onChangeText={setNeighborhood} />

        <Text className="mb-3 mt-2 text-sm font-semibold text-text">{t('explore.species')}</Text>
        <ChipRow>
          {SPECIES.map((s) => (
            <Chip
              key={s}
              label={t(`pet.species.${s}`)}
              selected={species === s}
              onPress={() => setSpecies(species === s ? '' : s)}
              color="lavender"
            />
          ))}
        </ChipRow>

        <Button title={t('explore.applyFilters')} onPress={handleApply} className="mt-4" />
        <TouchableOpacity onPress={() => { resetFilters(); router.back(); }} className="mt-5 items-center py-2">
          <Text className="font-semibold text-primary">{t('explore.clearFilters')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
