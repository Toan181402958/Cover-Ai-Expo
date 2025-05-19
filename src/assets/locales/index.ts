import i18n, { init } from'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import it from './it.json'
import ja from './ja.json'
import vi from './vi.json'
import de from './de.json'
import { defaultLanguage } from './languageConfig';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  it: { translation: it },
  ja: { translation: ja },
  vi: { translation: vi },
  de: { translation: de },
  };
i18n
.use(initReactI18next)
.init({
    resources,
    // compatibilityJSON: 'v3',
    // // language to use if translations in user language are not available.
    fallbackLng: defaultLanguage,

    // // ns: ['common'],
    // // defaultNS: 'common',

    // interpolation: {
    //   escapeValue: false, // not needed for react as it escapes by default
    // },

    // react: {
    //   useSuspense: true,
    //   defaultTransParent: Text,
    //   transSupportBasicHtmlNodes: false,
    // },
})
export default i18n