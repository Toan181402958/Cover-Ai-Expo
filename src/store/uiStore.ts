import { useHomeStore } from "modules/home/store/homeStore";
import { create } from "zustand"

type UiStateProps = {
    isFirst: boolean,
    focusApp: () => void
}

export const useUiStore = create<UiStateProps>((set, get) => ({
    isFirst: true,
    focusApp: () => {
        // const currentIsFirst = get().isFirst;
        // console.log("🚀 ~ currentIsFirst:", currentIsFirst)
        // if(!!currentIsFirst){
        //     useHomeStore.getState().changeShowSuggestYtb(true)
        //     // set({isFirst: false})
        // }
        
    }
}))