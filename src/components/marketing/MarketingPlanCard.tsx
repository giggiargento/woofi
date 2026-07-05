import { useTranslation } from 'react-i18next';
import { PricingCard } from '@/components/ui/PricingCard';

const FEATURE_KEYS = ['1', '2', '3', '4'] as const;

export function MarketingPlanCard() {
  const { t } = useTranslation();

  return (
    <PricingCard
      priceLabel={t('marketing.plan.priceLabel')}
      planName={t('marketing.plan.name')}
      price={t('marketing.plan.price')}
      period={t('marketing.plan.period')}
      featureKeys={FEATURE_KEYS}
      featurePrefix="marketing.plan.features"
      ctaLabel={t('marketing.plan.cta')}
      note={t('marketing.plan.note')}
    />
  );
}
