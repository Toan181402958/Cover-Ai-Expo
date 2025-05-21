import { UserType } from "src/models/user.props";
import { create } from "zustand";
import * as Device from "expo-device";
import { getUniqueId } from "utils/funcHelper";
import { requestGetUserInfo } from "src/services/appApi";
import { Platform } from "react-native";
import { KEY_STORAGE, saveObjectDataLocal } from "src/services/AsyncStorage";

const userInit: UserType = {
  id: "",
  username: "",
  userAvatar: "",
  deviceId: "",
  currentSku: "",
  email: "",
  isSubscribed: false,
  useAppFree: 0,
};
type UserStoreStateProps = {
  user: UserType;
  getUserInfo: () => void;
};

export const useUserStore = create<UserStoreStateProps>((set, get) => ({
  user: userInit,
  getUserInfo: async () => {
    //get data user from api
    const deviceID = await getUniqueId();
    try {
      const payload = {
        deviceId: deviceID,
        platform: Platform.OS,
        // country: deviceLanguage,
        country: "en",
      };
      const response = await requestGetUserInfo(payload);
      if (response && !response.message) {
        set({
          user: {
            ...response,
            // isSubscribed: true //test vip
          },
        });
        saveObjectDataLocal(KEY_STORAGE.USER_SAVED, response);
      }
    } catch (err) {
      console.log("🚀 ~ err:", err);
    }
  },
}));
