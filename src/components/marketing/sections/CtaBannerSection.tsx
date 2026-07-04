import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MarketingSection } from '../MarketingSection';
import { useIsWideWeb } from '@/components/layout/WebShell';

export function CtaBannerSection() {
  const { t } = useTranslation();
  const router = useRouter();
  const isWideWeb = useIsWideWeb();

  return (
    <MarketingSection>
      <Card pastel="sand" className="items-center border-2 border-border px-6 py-10">
        <Text className="mb-3 max-w-xl text-center text-2xl font-bold text-text lg:text-3xl">
          {t('marketing.cta.title')}
        </Text>
        <Text className="mb-8 max-w-lg text-center text-base leading-6 text-muted">
          {t('marketing.cta.subtitle')}
        </Text>
        <View className={isWideWeb ? 'w-auto' : 'w-full'}>
          <Button
            title={t('marketing.cta.button')}
            size="lg"
            onPress={() => router.push('/register')}
          />
        </View>
      </Card>
    </MarketingSection>
  );
}
