import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnNull: false,
    fallbackLng: 'ru',
    debug: true,
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
