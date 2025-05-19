import { dataLocale, TYPE_LANGUAGE } from "constants/constants";
import { getLocales } from "expo-localization";
import i18n from "src/assets/locales";
import { getObjectDataLocal, KEY_STORAGE, saveObjectDataLocal } from "src/services/AsyncStorage";
import { create } from "zustand";

type LanguageStateProps = {
    locale: string;
    initLocale: () => void;
    updateLocale: (locale: string | undefined) => void
}

export const useLanguageStore = create<LanguageStateProps>((set) => ({
    locale: TYPE_LANGUAGE.EN,
    initLocale: () => {
        getObjectDataLocal(KEY_STORAGE.LOCALE).then(res => {
            if (!!res) {
              set({locale: res})
              i18n.changeLanguage(res);
            } else {
              const localeDevice = getLocales()[0].languageCode?.toLocaleLowerCase();
              var valueLanguage: string | undefined = TYPE_LANGUAGE.EN;
              //get language from device
              if (!!dataLocale.find(item => item.value === localeDevice)) {
                valueLanguage = localeDevice;
              }
              set({locale: valueLanguage})
              i18n.changeLanguage(valueLanguage);
            }
          });
    },
    updateLocale: (locale: string | undefined) => {
        set({locale: locale})
        i18n.changeLanguage(locale)
        saveObjectDataLocal(KEY_STORAGE.LOCALE, locale)
    }
}))