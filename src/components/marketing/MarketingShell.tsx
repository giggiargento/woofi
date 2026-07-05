import { View, Text, Pressable, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Button } from '@/components/ui/Button';
import { useIsWideWeb } from '@/components/layout/WebShell';
import { scrollToMarketingSection } from './scrollToSection';
import { cn } from '@/utils/cn';

interface MarketingShellProps {
  children: React.ReactNode;
}

function NavLink({ label, sectionId }: { label: string; sectionId: string }) {
  const isWideWeb = useIsWideWeb();

  if (!isWideWeb) {
    return null;
  }

  return (
    <Pressable onPress={() => scrollToMarketingSection(sectionId)} className="mx-3">
      <Text className="text-sm font-semibold text-text">{label}</Text>
    </Pressable>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mb-8 min-w-[140px] flex-1">
      <Text className="mb-3 text-sm font-bold text-surface">{title}</Text>
      {children}
    </View>
  );
}

function FooterLink({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <Text className="mb-2 text-sm text-cream">{label}</Text>
    </Pressable>
  );
}

export function MarketingShell({ children }: MarketingShellProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const isWideWeb = useIsWideWeb();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="border-b border-border bg-background">
        <View
          className={cn(
            'mx-auto w-full max-w-6xl flex-row items-center justify-between px-6 py-4',
            !isWideWeb && 'flex-wrap'
          )}
        >
          <BrandLogo size="sidebar" />

          {isWideWeb ? (
            <View className="flex-row items-center">
              <NavLink label={t('marketing.nav.services')} sectionId="servicios" />
              <NavLink label={t('marketing.nav.about')} sectionId="nosotros" />
              <NavLink label={t('marketing.nav.plan')} sectionId="plan" />
            </View>
          ) : null}

          <View className={cn('flex-row items-center', !isWideWeb && 'mt-3 w-full justify-end')}>
            <Button
              title={t('marketing.nav.login')}
              variant="ghost"
              size="sm"
              className="mr-2 max-w-[140px]"
              onPress={() => router.push('/login')}
            />
            <Button
              title={t('marketing.nav.register')}
              size="sm"
              className="max-w-[160px]"
              onPress={() => router.push('/register')}
            />
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={Platform.OS === 'web'}
      >
        {children}

        <View className="bg-brown-dark px-6 py-12">
          <View className="mx-auto w-full max-w-6xl">
            <View className={isWideWeb ? 'mb-10 flex-row flex-wrap' : ''}>
              <View className={cn('mb-8', isWideWeb && 'mr-12 max-w-xs flex-1')}>
                <BrandLogo size="sidebar" className="mb-4 items-start" />
                <Text className="text-sm leading-6 text-cream">{t('marketing.footer.tagline')}</Text>
              </View>

              <FooterColumn title={t('marketing.footer.columns.product.title')}>
                <FooterLink
                  label={t('marketing.footer.columns.product.services')}
                  onPress={() => scrollToMarketingSection('servicios')}
                />
                <FooterLink
                  label={t('marketing.footer.columns.product.plan')}
                  onPress={() => scrollToMarketingSection('plan')}
                />
                <FooterLink
                  label={t('marketing.footer.columns.product.explore')}
                  onPress={() => router.push('/register')}
                />
              </FooterColumn>

              <FooterColumn title={t('marketing.footer.columns.legal.title')}>
                <FooterLink label={t('marketing.footer.columns.legal.privacy')} />
                <FooterLink label={t('marketing.footer.columns.legal.terms')} />
              </FooterColumn>

              <FooterColumn title={t('marketing.footer.columns.contact.title')}>
                <Text className="text-sm text-cream">
                  {t('marketing.footer.columns.contact.locale')}
                </Text>
              </FooterColumn>
            </View>

            <View className="border-t border-cream/20 pt-6">
              <Text className="text-xs text-cream/80">{t('marketing.footer.copyright')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
