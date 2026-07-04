import { Platform } from 'react-native';

export function scrollToMarketingSection(sectionId: string) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') {
    return;
  }

  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}
