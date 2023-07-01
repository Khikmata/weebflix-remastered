import en from '@assets/locales/en/translation.json'
import ru from '@assets/locales/ru/translation.json'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

export const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
} as const

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: true,
    resources,

    backend: {
      loadPath: '@assets/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: [
        'querystring',
        'cookie',
        'localStorage',
        'sessionStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
      ],
    },
  })

export default i18n
