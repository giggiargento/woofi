import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Card } from '@/components/ui/Card';
import { COLORS } from '@/constants';
import { MarketingSection } from '../MarketingSection';
import { scrollToMarketingSection } from '../scrollToSection';
import { useIsWideWeb } from '@/components/layout/WebShell';

export function HeroSection() {
  const { t } = useTranslation();
  const router = useRouter();
  const isWideWeb = useIsWideWeb();

  return (
    <MarketingSection>
      <View className={isWideWeb ? 'flex-row items-center' : ''}>
        <View className={isWideWeb ? 'flex-1 pr-10' : 'mb-10'}>
          <Chip
            label={t('marketing.hero.badge')}
            color="butter"
            selected
            className="mb-5 self-start"
          />
          <Text className="mb-4 text-4xl font-bold leading-tight text-text lg:text-5xl">
            {t('marketing.hero.title')}
          </Text>
          <Text className="mb-8 max-w-lg text-base leading-7 text-muted">
            {t('marketing.hero.subtitle')}
          </Text>
          <View className={isWideWeb ? 'flex-row items-center' : ''}>
            <Button
              title={t('marketing.hero.ctaPrimary')}
              className={isWideWeb ? 'mr-4 max-w-xs' : 'mb-3'}
              onPress={() => router.push('/register')}
            />
            <Button
              title={t('marketing.hero.ctaSecondary')}
              variant="outline"
              onPress={() => scrollToMarketingSection('servicios')}
            />
          </View>
          <Text className="mt-6 text-sm text-muted">{t('marketing.hero.proof')}</Text>
        </View>

        <View className={isWideWeb ? 'w-[42%]' : 'w-full'}>
          <Card pastel="sand" className="min-h-[280px] items-center justify-center p-8">
            <View className="rounded-full border-2 border-border bg-surface p-8">
              <Ionicons name="paw" size={72} color={COLORS.text} />
            </View>
          </Card>
        </View>
      </View>
    </MarketingSection>
  );
}
