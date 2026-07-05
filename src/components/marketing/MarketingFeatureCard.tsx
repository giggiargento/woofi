import { FeatureCard } from '@/components/ui/Card';
import type { ComponentProps } from 'react';

export type MarketingFeatureCardProps = ComponentProps<typeof FeatureCard>;

/** @deprecated Use FeatureCard from @/components/ui/Card */
export const MarketingFeatureCard = FeatureCard;
