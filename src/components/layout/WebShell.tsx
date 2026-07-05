import { Platform, View, useWindowDimensions } from 'react-native';
import { cn } from '@/utils/cn';
import { breakpoints } from '@/design/tokens';

/** Tailwind `lg` breakpoint — desktop web shell activates at this width. */
export const WEB_SHELL_BREAKPOINT = breakpoints.desktop;

/** Tablet breakpoint — collapsed sidebar. */
export const TABLET_BREAKPOINT = breakpoints.tablet;

export function useIsWideWeb() {
  const { width } = useWindowDimensions();
  return Platform.OS === 'web' && width >= WEB_SHELL_BREAKPOINT;
}

export function useIsTabletWeb() {
  const { width } = useWindowDimensions();
  return Platform.OS === 'web' && width >= TABLET_BREAKPOINT;
}

interface WebShellProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Constrains tab content on wide web viewports while leaving native and
 * narrow mobile-web layouts unchanged.
 */
export function WebShell({ children, className }: WebShellProps) {
  const isWideWeb = useIsWideWeb();

  return (
    <View className="flex-1 bg-background">
      <View
        className={cn('w-full flex-1', isWideWeb && 'mx-auto max-w-6xl px-6', className)}
      >
        {children}
      </View>
    </View>
  );
}
