import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { COLORS } from '@/constants';
import { MarketingSection } from '../MarketingSection';
import { scrollToMarketingSection } from '../scrollToSection';
import { useIsWideWeb } from '@/components/layout/WebShell';

const BULLET_KEYS = ['1', '2', '3', '4'] as const;

export function AboutSection() {
  const { t } = useTranslation();
  const isWideWeb = useIsWideWeb();

  return (
    <MarketingSection sectionId="nosotros">
      <View className={isWideWeb ? 'flex-row items-center' : ''}>
        <View className={isWideWeb ? 'mb-0 w-[45%] pr-8' : 'mb-8 w-full'}>
          <Card pastel="mint" className="min-h-[260px] items-center justify-center p-8">
            <View className="rounded-full border-2 border-border bg-surface p-8">
              <Ionicons name="people-outline" size={64} color={COLORS.text} />
            </View>
          </Card>
        </View>

        <View className={isWideWeb ? 'flex-1' : 'w-full'}>
          <Text className="mb-4 text-3xl font-bold text-text">{t('marketing.about.title')}</Text>
          <Text className="mb-6 text-base leading-7 text-muted">{t('marketing.about.lead')}</Text>

          {BULLET_KEYS.map((key) => (
            <View key={key} className="mb-3 flex-row items-start">
              <Ionicons name="checkmark-circle-outline" size={22} color={COLORS.primary} />
              <Text className="ml-3 flex-1 text-base leading-6 text-text">
                {t(`marketing.about.bullets.${key}`)}
              </Text>
            </View>
          ))}

          <Button
            title={t('marketing.about.cta')}
            variant="outline"
            className="mt-4 self-start"
            onPress={() => scrollToMarketingSection('plan')}
          />
        </View>
      </View>
    </MarketingSection>
  );
}
