import { View, type ViewProps } from 'react-native';
import { cn } from '@/utils/cn';
import { useIsWideWeb } from './WebShell';

interface PageSectionProps extends ViewProps {
  children: React.ReactNode;
  sectionId?: string;
  className?: string;
}

export function PageSection({ children, sectionId, className, ...props }: PageSectionProps) {
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
