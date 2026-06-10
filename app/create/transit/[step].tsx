import { useState, useEffect } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Text,
  Switch,
  View,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Input, PrimaryButton, SpeciesSelector } from '@/components';
import { useCreateCase } from '@/hooks/useCases';
import { DEFAULT_PROVINCE_ID, DEFAULT_PET_SPECIES } from '@/constants';
import { provinceLabel } from '@/i18n/provinces';
import { getCurrentLocation, DEFAULT_LOCATION } from '@/utils/location';
import type { CreateTransitCaseInput, PetSpecies, TemporaryCare } from '@/types';

export default function CreateTransitCaseScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const createCase = useCreateCase();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState<PetSpecies>(DEFAULT_PET_SPECIES);
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [phone, setPhone] = useState('');
  const [needsHome, setNeedsHome] = useState(true);
  const [location, setLocation] = useState(DEFAULT_LOCATION);

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

    const input: CreateTransitCaseInput = {
      caseType: 'transit',
      petSnapshot: { name: petName, species, photoUrls: [] },
      title,
      description,
      location,
      province: provinceLabel(t, DEFAULT_PROVINCE_ID),
      city,
      neighborhood: neighborhood || undefined,
      transitStartAt: new Date(),
      fosterLocation: location,
      temporaryCare: 'foster' as TemporaryCare,
      needsHome,
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
      <Stack.Screen options={{ title: t('create.transit') }} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-background">
        <ScrollView className="flex-1 px-4 py-4" keyboardShouldPersistTaps="handled">
          <Input label={t('pet.form.name')} value={petName} onChangeText={setPetName} />
          <SpeciesSelector value={species} onChange={setSpecies} />
          <Input label={t('create.caseTitle')} value={title} onChangeText={setTitle} />
          <Input label={t('case.description')} value={description} onChangeText={setDescription} multiline />
          <Input label={t('explore.city')} value={city} onChangeText={setCity} />
          <Input label={t('explore.neighborhood')} value={neighborhood} onChangeText={setNeighborhood} />
          <Input label={t('case.contact.call')} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-text">{t('create.needsPermanentHome')}</Text>
            <Switch value={needsHome} onValueChange={setNeedsHome} trackColor={{ true: '#D8C3FF' }} />
          </View>

          <PrimaryButton title={t('create.publish')} onPress={handlePublish} loading={createCase.isPending} className="mt-4" />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
