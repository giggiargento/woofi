import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Input, PrimaryButton, SpeciesSelector } from '@/components';
import { useCreateCase } from '@/hooks/useCases';
import { usePet } from '@/hooks/usePets';
import { ARGENTINA_PROVINCE_IDS, DEFAULT_PROVINCE_ID, DEFAULT_PET_SPECIES, type ArgentinaProvinceId } from '@/constants';
import { provinceLabel } from '@/i18n/provinces';
import { getCurrentLocation, DEFAULT_LOCATION, type LocationResult } from '@/utils/location';
import type { CreateLostCaseInput, PetSpecies } from '@/types';

export default function CreateLostCaseScreen() {
  const { step, petId } = useLocalSearchParams<{ step: string; petId?: string }>();
  const { t } = useTranslation();
  const router = useRouter();
  const createCase = useCreateCase();
  const { data: existingPet } = usePet(petId ?? '');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState<PetSpecies>(DEFAULT_PET_SPECIES);
  const [provinceId, setProvinceId] = useState<ArgentinaProvinceId>(DEFAULT_PROVINCE_ID);
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState<LocationResult>(DEFAULT_LOCATION);

  useEffect(() => {
    if (existingPet) {
      setPetName(existingPet.name);
      setSpecies(existingPet.species);
      setTitle(`${existingPet.name} - ${t('explore.lost')}`);
    }
  }, [existingPet, t]);

  useEffect(() => {
    getCurrentLocation().then((loc) => {
      if (loc) setLocation(loc);
    });
  }, []);

  const handlePublish = async () => {
    if (!title || !description || !petName || !city) {
      Alert.alert(t('common.error'), t('common.required'));
      return;
    }

    const input: CreateLostCaseInput = {
      caseType: 'lost',
      petId: petId ?? undefined,
      petSnapshot: {
        name: petName,
        species,
        photoUrls: existingPet?.photoUrls ?? [],
        breed: existingPet?.breed,
        sex: existingPet?.sex,
      },
      title,
      description,
      location,
      province: provinceLabel(t, provinceId),
      city,
      neighborhood: neighborhood || undefined,
      addressText: location.addressText,
      lastSeenAt: new Date(),
      lastSeenLocation: location,
      contact: {
        showPhone: Boolean(phone),
        showWhatsApp: Boolean(phone),
        phone: phone || undefined,
        whatsApp: phone || undefined,
        preferredMethod: 'whatsapp',
      },
    };

    try {
      const created = await createCase.mutateAsync(input);
      Alert.alert(t('create.published'));
      router.replace(`/case/${created.id}`);
    } catch {
      Alert.alert(t('common.error'), t('common.error'));
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: t('create.lostPet') }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-background"
      >
        <ScrollView className="flex-1 px-4 py-4" keyboardShouldPersistTaps="handled">
          <Text className="mb-4 text-sm text-muted">
            {t('create.step', { current: step ?? '1', total: 1 })}
          </Text>

          <Input label={t('pet.form.name')} value={petName} onChangeText={setPetName} />
          <Input label={t('create.caseTitle')} value={title} onChangeText={setTitle} />
          <Input
            label={t('case.description')}
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <SpeciesSelector value={species} onChange={setSpecies} />

          <Text className="mb-2 text-sm font-medium text-text">{t('explore.province')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            {ARGENTINA_PROVINCE_IDS.slice(0, 6).map((id) => (
              <TouchableOpacity
                key={id}
                onPress={() => setProvinceId(id)}
                className={`mr-2 rounded-full border-2 border-border px-3 py-2 ${
                  provinceId === id ? 'bg-sky' : 'bg-card'
                }`}
              >
                <Text className="text-xs font-medium">{provinceLabel(t, id)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Input label={t('explore.city')} value={city} onChangeText={setCity} />
          <Input
            label={t('explore.neighborhood')}
            value={neighborhood}
            onChangeText={setNeighborhood}
          />
          <Input label={t('case.contact.call')} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

          <PrimaryButton
            title={t('create.publish')}
            onPress={handlePublish}
            loading={createCase.isPending}
            className="mt-4"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
