import { create } from "zustand";
import { TypeMyVoice } from "../model";
import R from "src/assets/R";

type MyVoiceStateProps = {
  arrMyVoice: Array<TypeMyVoice>;
};

export const useMyVoiceStore = create<MyVoiceStateProps>()((set) => ({
  arrMyVoice: [
    // { id: "1", thumbnail: R.images.ic_app },
    // { id: "2", thumbnail: R.images.ic_app },
    // { id: "3", thumbnail: R.images.ic_app },
  ],
  setArrMyVoice: (arrMyVoice: Array<TypeMyVoice>) => set({ arrMyVoice }),
}));
