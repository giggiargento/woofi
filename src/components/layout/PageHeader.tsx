import { View, Text } from 'react-native';
import { cn } from '@/utils/cn';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  search?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, actions, search, className }: PageHeaderProps) {
  return (
    <View className={cn('mb-6 border-b border-border-strong pb-4', className)}>
      <View className="flex-row items-start justify-between">
        <View className="mr-4 flex-1">
          <Text className="text-h1 font-bold text-text-dark">{title}</Text>
          {subtitle ? (
            <Text className="mt-1 text-body text-muted">{subtitle}</Text>
          ) : null}
        </View>
        {actions ? <View className="flex-row items-center gap-2">{actions}</View> : null}
      </View>
      {search ? <View className="mt-4">{search}</View> : null}
    </View>
  );
}
