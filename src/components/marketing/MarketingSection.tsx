import { View, type ViewProps } from 'react-native';
import { cn } from '@/utils/cn';
import { useIsWideWeb } from '@/components/layout/WebShell';

interface MarketingSectionProps extends ViewProps {
  children: React.ReactNode;
  sectionId?: string;
  className?: string;
}

export function MarketingSection({
  children,
  sectionId,
  className,
  ...props
}: MarketingSectionProps) {
  const isWideWeb = useIsWideWeb();

  return (
    <View
      nativeID={sectionId}
      className={cn(
        'w-full max-w-6xl self-center px-6',
        isWideWeb ? 'py-24' : 'py-16',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}
