import { View } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Button } from '@/components/ui/Button';
import {
  SidebarNavItem,
  SidebarNavGroup,
  SidebarDivider,
} from './SidebarNavItem';
import { cn } from '@/utils/cn';

interface AppSidebarProps {
  collapsed?: boolean;
  className?: string;
}

const MAIN_NAV = [
  { route: '/(tabs)', segment: 'index', icon: 'home-outline' as const, labelKey: 'tabs.home' },
  {
    route: '/(tabs)/explore',
    segment: 'explore',
    icon: 'compass-outline' as const,
    labelKey: 'tabs.explore',
  },
  { route: '/(tabs)/add', segment: 'add', icon: 'add-circle-outline' as const, labelKey: 'tabs.add' },
  {
    route: '/(tabs)/alerts',
    segment: 'alerts',
    icon: 'notifications-outline' as const,
    labelKey: 'tabs.alerts',
  },
  {
    route: '/(tabs)/profile',
    segment: 'profile',
    icon: 'person-outline' as const,
    labelKey: 'tabs.profile',
  },
] as const;

export function AppSidebar({ collapsed, className }: AppSidebarProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (segment: string) => {
    if (segment === 'index') {
      return pathname === '/' || pathname.endsWith('/index') || pathname === '/(tabs)';
    }
    return pathname.includes(segment);
  };

  return (
    <View
      className={cn(
        'border-r border-border-strong bg-surface px-3 py-6',
        collapsed ? 'w-16 items-center' : 'w-60',
        className
      )}
    >
      <BrandLogo size="sidebar" className={cn('mb-8', collapsed ? 'items-center' : 'items-start')} />

      <Button
        title={collapsed ? '+' : t('tabs.add')}
        size="sm"
        className={cn('mb-4', collapsed && 'w-10 px-0')}
        onPress={() => router.push('/(tabs)/add')}
      />

      <SidebarNavGroup>
        {MAIN_NAV.map((item) => (
          <SidebarNavItem
            key={item.segment}
            label={t(item.labelKey)}
            icon={item.icon}
            active={isActive(item.segment)}
            collapsed={collapsed}
            onPress={() => router.push(item.route)}
          />
        ))}
      </SidebarNavGroup>

      <SidebarDivider />

      <SidebarNavGroup>
        <SidebarNavItem
          label={t('profile.favorites')}
          icon="star-outline"
          collapsed={collapsed}
          active={pathname.includes('favorites')}
          onPress={() => router.push('/favorites')}
        />
        <SidebarNavItem
          label={t('profile.settings')}
          icon="settings-outline"
          collapsed={collapsed}
          active={pathname.includes('settings')}
          onPress={() => router.push('/settings')}
        />
      </SidebarNavGroup>
    </View>
  );
}
