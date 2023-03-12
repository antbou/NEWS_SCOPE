import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';

i18n.use(LanguageDetector).init({
  resources: {
    en: { translation: en },
  },
  fallbackLng: 'en',
  debug: false,
});

export default i18n;
