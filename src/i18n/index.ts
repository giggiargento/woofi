import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esAR from './locales/es-AR.json';
import enUS from './locales/en-US.json';
import { getInitialLocale, DEFAULT_LOCALE, SUPPORTED_LOCALES } from './config';

const resources = {
  'es-AR': { translation: esAR },
  'en-US': { translation: enUS },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLocale(),
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: [...SUPPORTED_LOCALES],
    nonExplicitSupportedLngs: false,
    compatibilityJSON: 'v4',
    interpolation: { escapeValue: false },
  });
}

export default i18n;
export { getInitialLocale, DEFAULT_LOCALE, SUPPORTED_LOCALES } from './config';
