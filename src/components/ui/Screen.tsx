import { ScrollView, View, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from './theme';

interface ScreenProps extends ScrollViewProps {
  children: React.ReactNode;
  scroll?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  padded?: boolean;
}

export function Screen({
  children,
  scroll = true,
  edges = ['top'],
  padded = true,
  contentContainerClassName,
  className,
  ...props
}: ScreenProps) {
  const paddingClass = padded ? 'px-4' : '';
  const bottomClass = `pb-[${theme.spacing.screenBottom}px]`;

  if (!scroll) {
    return (
      <SafeAreaView className={`flex-1 bg-background ${className ?? ''}`} edges={edges}>
        <View className={`flex-1 ${paddingClass}`}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 bg-background ${className ?? ''}`} edges={edges}>
      <ScrollView
        className={`flex-1 ${paddingClass}`}
        contentContainerClassName={`pb-28 ${contentContainerClassName ?? ''}`}
        showsVerticalScrollIndicator={false}
        {...props}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
