import { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  Chip,
  ChipRow,
  Badge,
  Input,
  EmptyState,
} from '@/components';
import { theme } from '@/components/ui/theme';
import { COLORS } from '@/constants';

function SectionTitle({ children }: { children: string }) {
  return (
    <Text className="mb-3 mt-6 text-lg font-bold text-text">{children}</Text>
  );
}

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  return (
    <View className="mb-3 mr-3 w-[44%]">
      <View
        className="mb-1 h-12 rounded-2xl border border-border"
        style={{ backgroundColor: hex }}
      />
      <Text className="text-xs font-semibold text-text">{name}</Text>
      <Text className="text-xs text-muted">{hex}</Text>
    </View>
  );
}

export default function DesignPreviewScreen() {
  const { t } = useTranslation();
  const [chipSelected, setChipSelected] = useState('lavender');

  if (!__DEV__) {
    return <Redirect href="/(tabs)" />;
  }

  const chipColors = ['lavender', 'sky', 'mint', 'pink', 'primary', 'butter', 'cream'] as const;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('designPreview.title'),
          headerStyle: { backgroundColor: COLORS.background },
        }}
      />
      <ScrollView
        className="flex-1 px-4"
        contentContainerClassName="pb-12"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mt-2 text-sm text-muted">{t('designPreview.subtitle')}</Text>

        <SectionTitle>{t('designPreview.sections.colors')}</SectionTitle>
        <View className="flex-row flex-wrap">
          <ColorSwatch name="primary" hex={theme.semantic.primary} />
          <ColorSwatch name="primaryAccent" hex={theme.semantic.primaryAccent} />
          <ColorSwatch name="background" hex={theme.semantic.background} />
          <ColorSwatch name="surface" hex={theme.semantic.surface} />
          <ColorSwatch name="brown" hex={theme.semantic.brown} />
          <ColorSwatch name="brownDark" hex={theme.semantic.brownDark} />
          <ColorSwatch name="muted" hex={theme.semantic.muted} />
          <ColorSwatch name="sand" hex={theme.pastel.sand} />
          <ColorSwatch name="legacyPrimary" hex={theme.legacy.primary} />
        </View>

        <SectionTitle>{t('designPreview.sections.buttons')}</SectionTitle>
        <View className="gap-3">
          <Button title={t('designPreview.samples.primaryButton')} variant="primary" />
          <Button title={t('designPreview.samples.secondaryButton')} variant="secondary" />
          <Button title={t('designPreview.samples.outlineButton')} variant="outline" />
          <Button title={t('designPreview.samples.ghostButton')} variant="ghost" />
          <Button title={t('designPreview.samples.destructiveButton')} variant="destructive" />
        </View>

        <SectionTitle>{t('designPreview.sections.cards')}</SectionTitle>
        <View className="gap-3">
          <Card>
            <Text className="font-semibold text-text">{t('designPreview.samples.defaultCard')}</Text>
          </Card>
          <Card variant="floating" pastel="lavender">
            <Text className="font-semibold text-text">{t('designPreview.samples.pastelCard')}</Text>
          </Card>
          <Card variant="flat">
            <Text className="font-semibold text-text">{t('designPreview.samples.flatCard')}</Text>
          </Card>
        </View>

        <SectionTitle>{t('designPreview.sections.chips')}</SectionTitle>
        <ChipRow horizontal>
          {chipColors.map((color) => (
            <Chip
              key={color}
              label={t(`designPreview.samples.chip.${color}`)}
              color={color}
              selected={chipSelected === color}
              onPress={() => setChipSelected(color)}
            />
          ))}
        </ChipRow>

        <SectionTitle>{t('designPreview.sections.badges')}</SectionTitle>
        <View className="flex-row flex-wrap gap-2">
          <Badge status="active" caseType="lost" />
          <Badge status="active" caseType="found" />
          <Badge status="active" caseType="adoption" />
          <Badge status="active" caseType="transit" />
        </View>

        <SectionTitle>{t('designPreview.sections.inputs')}</SectionTitle>
        <Input
          label={t('designPreview.samples.inputLabel')}
          placeholder={t('designPreview.samples.inputPlaceholder')}
        />
        <Input
          label={t('designPreview.samples.inputErrorLabel')}
          placeholder={t('designPreview.samples.inputPlaceholder')}
          error={t('designPreview.samples.inputError')}
        />

        <SectionTitle>{t('designPreview.sections.emptyState')}</SectionTitle>
        <Card className="overflow-hidden p-0">
          <EmptyState
            title={t('designPreview.samples.emptyTitle')}
            subtitle={t('designPreview.samples.emptySubtitle')}
            ctaLabel={t('designPreview.samples.emptyCta')}
            onCta={() => {}}
            accent="mint"
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
