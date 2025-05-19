import { useCategoryStore } from "../store/categoryStore";
import { useHomeStore } from "../store/homeStore"

export const useHome = () => {
    const isFocusHome = useHomeStore(state => state.isFocusHome);
    const isShowSuggestYtb = useHomeStore(state => state.isShowSuggestYtb);
    const stateCategory = useCategoryStore(state => state);
    const changeShowSuggestYtb = useHomeStore(state => state.changeShowSuggestYtb);
    const initFocusHome = useHomeStore(state => state.initFocusHome);
    const init = () => {
        if(!!isFocusHome){
            initFocusHome()
        }
    }
    return {init, isShowSuggestYtb, stateCategory,changeShowSuggestYtb}
}