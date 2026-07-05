import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { CaseType } from '@/types';
import { cn } from '@/utils/cn';

interface BadgeProps {
  status: string;
  caseType?: CaseType;
  size?: 'sm' | 'md';
  className?: string;
}

const typeColors: Record<CaseType, string> = {
  lost: 'bg-butter',
  found: 'bg-sky',
  adoption: 'bg-mint',
  transit: 'bg-lavender',
};

export function Badge({ status, caseType = 'lost', size = 'sm', className }: BadgeProps) {
  const { t } = useTranslation();
  const translated = t(`case.status.${status}`, { defaultValue: '' });
  const label = translated || t('common.unknownStatus');

  return (
    <View
      className={cn(
        'flex-row items-center self-start rounded-full',
        typeColors[caseType],
        size === 'sm' ? 'px-3 py-1' : 'px-4 py-1.5',
        className
      )}
    >
      <View className="mr-1.5 h-1.5 w-1.5 rounded-full bg-text" />
      <Text
        className={cn('font-semibold text-text', size === 'sm' ? 'text-xs' : 'text-sm')}
      >
        {label}
      </Text>
    </View>
  );
}

/** @deprecated Use Badge */
export const StatusBadge = Badge;
