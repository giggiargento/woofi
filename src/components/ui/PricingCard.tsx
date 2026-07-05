import { View, Text, type ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Card } from './Card';
import { Button } from './Button';
import { COLORS } from '@/constants';

const FEATURE_KEYS = ['1', '2', '3', '4'] as const;

export interface PricingCardProps {
  priceLabel: string;
  planName: string;
  price: string;
  period: string;
  featureKeys: readonly string[];
  featurePrefix: string;
  ctaLabel: string;
  note: string;
  onCtaPress?: () => void;
  ctaHref?: '/register' | '/login';
}

export function PricingCard({
  priceLabel,
  planName,
  price,
  period,
  featureKeys,
  featurePrefix,
  ctaLabel,
  note,
  onCtaPress,
  ctaHref = '/register',
}: PricingCardProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const handleCta = () => {
    if (onCtaPress) {
      onCtaPress();
      return;
    }
    router.push(ctaHref);
  };

  return (
    <Card className="mx-auto w-full max-w-md p-8 shadow-warm-md">
      <Text className="mb-1 text-center text-label uppercase tracking-wide text-muted">
        {priceLabel}
      </Text>
      <Text className="mb-1 text-center text-h2 font-bold text-text">{planName}</Text>
      <View className="mb-6 flex-row items-end justify-center">
        <Text className="text-5xl font-bold text-text">{price}</Text>
        <Text className="mb-2 ml-1 text-body text-muted">{period}</Text>
      </View>

      <View className="mb-8">
        {featureKeys.map((key) => (
          <View key={key} className="mb-3 flex-row items-center">
            <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
            <Text className="ml-3 text-body text-text">{t(`${featurePrefix}.${key}`)}</Text>
          </View>
        ))}
      </View>

      <Button title={ctaLabel} className="w-full" onPress={handleCta} />

      <Text className="mt-4 text-center text-small text-muted">{note}</Text>
    </Card>
  );
}
