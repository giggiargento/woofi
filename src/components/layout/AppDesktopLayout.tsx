import { View } from 'react-native';
import { Platform, useWindowDimensions } from 'react-native';
import { cn } from '@/utils/cn';
import { AppSidebar } from './AppSidebar';
import { WEB_SHELL_BREAKPOINT, TABLET_BREAKPOINT, useIsTabletWeb } from './WebShell';

interface AppDesktopLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AppDesktopLayout({ children, className }: AppDesktopLayoutProps) {
  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= WEB_SHELL_BREAKPOINT;
  const isTabletWeb = useIsTabletWeb();

  if (!isDesktopWeb && !isTabletWeb) {
    return <View className={cn('flex-1 bg-background', className)}>{children}</View>;
  }

  const collapsed = isTabletWeb && !isDesktopWeb;

  return (
    <View className={cn('flex-1 flex-row bg-background', className)}>
      <AppSidebar collapsed={collapsed} />
      <View className="flex-1 px-6 py-6">{children}</View>
    </View>
  );
}
