import { dataLocale, TYPE_LANGUAGE } from "constants/constants";
import { getLocales } from "expo-localization";
import { useLanguageStore } from "modules/setting/store/languageStore";
import i18n from "src/assets/locales";
import { getDataLocal, getObjectDataLocal, KEY_STORAGE, saveDataLocal } from "src/services/AsyncStorage";
import { create } from "zustand"
import { requestDataCategory } from "../HomeApi";

type HomeState = {
    isShowSuggestYtb: boolean,
    isFocusHome: boolean,
    initFocusHome: () => void,
    changeShowSuggestYtb: (visible: boolean) => void,
}
export const useHomeStore = create<HomeState>((set, get) => ({
    isShowSuggestYtb: false,
    isFocusHome: true,
    
    initFocusHome: () => {
        getDataLocal(KEY_STORAGE.FIRST_FOCUS_HOME).then(val => {
          if(!val){
            setTimeout(() => {
                set({isShowSuggestYtb: true})
            }, 500);
            set({ isFocusHome: false})
          }
          saveDataLocal(KEY_STORAGE.FIRST_FOCUS_HOME, 'false');
        });
    },
    changeShowSuggestYtb: (visible: boolean) => {
        set({
            isShowSuggestYtb: visible
        })
    },
}))