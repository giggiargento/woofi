import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { COLORS } from '@/constants';

const FEATURE_KEYS = ['1', '2', '3', '4'] as const;

export function MarketingPlanCard() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Card className="mx-auto w-full max-w-md border-2 border-border p-8">
      <Text className="mb-1 text-center text-sm font-semibold uppercase tracking-wide text-muted">
        {t('marketing.plan.priceLabel')}
      </Text>
      <Text className="mb-1 text-center text-2xl font-bold text-text">
        {t('marketing.plan.name')}
      </Text>
      <View className="mb-6 flex-row items-end justify-center">
        <Text className="text-5xl font-bold text-text">{t('marketing.plan.price')}</Text>
        <Text className="mb-2 ml-1 text-base text-muted">{t('marketing.plan.period')}</Text>
      </View>

      <View className="mb-8">
        {FEATURE_KEYS.map((key) => (
          <View key={key} className="mb-3 flex-row items-center">
            <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
            <Text className="ml-3 text-base text-text">
              {t(`marketing.plan.features.${key}`)}
            </Text>
          </View>
        ))}
      </View>

      <Button
        title={t('marketing.plan.cta')}
        className="w-full"
        onPress={() => router.push('/register')}
      />

      <Text className="mt-4 text-center text-sm text-muted">{t('marketing.plan.note')}</Text>
    </Card>
  );
}
