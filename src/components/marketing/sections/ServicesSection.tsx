import type { ComponentProps } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { MarketingSection } from '../MarketingSection';
import { MarketingFeatureCard } from '../MarketingFeatureCard';
import type { PastelColor } from '@/components/ui/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

type ServiceKey =
  | 'cuaderno'
  | 'explorar'
  | 'publicar'
  | 'adopcion'
  | 'favoritos'
  | 'identificacion';

const SERVICE_ITEMS: {
  key: ServiceKey;
  icon: IconName;
  pastel: PastelColor;
  featured?: boolean;
  comingSoon?: boolean;
}[] = [
  { key: 'cuaderno', icon: 'book-outline', pastel: 'sand', featured: true },
  { key: 'explorar', icon: 'compass-outline', pastel: 'sky' },
  { key: 'publicar', icon: 'megaphone-outline', pastel: 'lavender' },
  { key: 'adopcion', icon: 'heart-outline', pastel: 'mint' },
  { key: 'favoritos', icon: 'star-outline', pastel: 'pink' },
  { key: 'identificacion', icon: 'qr-code-outline', pastel: 'butter', comingSoon: true },
];

export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <MarketingSection sectionId="servicios">
      <Text className="mb-3 text-center text-3xl font-bold text-text">
        {t('marketing.services.title')}
      </Text>
      <Text className="mb-10 text-center text-base leading-6 text-muted">
        {t('marketing.services.subtitle')}
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {SERVICE_ITEMS.map((item) => (
          <MarketingFeatureCard
            key={item.key}
            icon={item.icon}
            title={t(`marketing.services.items.${item.key}.title`)}
            description={t(`marketing.services.items.${item.key}.description`)}
            pastel={item.pastel}
            featured={item.featured}
            badge={item.comingSoon ? t('marketing.services.comingSoon') : undefined}
          />
        ))}
      </View>
    </MarketingSection>
  );
}
