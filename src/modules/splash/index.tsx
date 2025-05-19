import { ROUTER_APP } from "constants/constants";
import { useHistoryStore } from "modules/history/store/historyStore";
import { useCategoryStore } from "modules/home/store/categoryStore";
import { useLanguageStore } from "modules/setting/store/languageStore";
import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useUiStore } from "src/store/uiStore";
import { useUserStore } from "src/store/userStore";
import navigationHelper from "utils/navigationHelper";

type Props = {};
const SplashScreen = (props: Props) => {
  const {} = props;
  const { initLocale } = useLanguageStore();
  const { focusApp } = useUiStore();

  //check init locale device
  const checkLocaleDevice = () => {
    initLocale();
  };

  //init first app
  const useFirstApp = () => {
    focusApp();
  };

  //get data category, model
  const getDataCategory = () => {
    useCategoryStore.getState().getDataCategory();
  };

  //get data local history
  const getDataLocalHistory = () => {
    useHistoryStore.getState().getDataLocal();
  };

  //get userinfo
  const getUserInfo = () => {
    useUserStore.getState().getUserInfo();
  };

  useEffect(() => {
    useFirstApp();
    checkLocaleDevice();
    getDataCategory();
    getDataLocalHistory();
    getUserInfo();
    setTimeout(() => {
      navigationHelper.navigate(ROUTER_APP.MAIN_TAB);
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Text children={"splash"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
