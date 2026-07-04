import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MarketingSection } from '../MarketingSection';
import { MarketingPlanCard } from '../MarketingPlanCard';

export function PlanSection() {
  const { t } = useTranslation();

  return (
    <MarketingSection sectionId="plan">
      <Text className="mb-3 text-center text-3xl font-bold text-text">
        {t('marketing.plan.title')}
      </Text>
      <Text className="mb-10 text-center text-base leading-6 text-muted">
        {t('marketing.plan.subtitle')}
      </Text>
      <MarketingPlanCard />
    </MarketingSection>
  );
}
