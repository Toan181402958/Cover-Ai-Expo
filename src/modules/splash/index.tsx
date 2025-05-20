import { ROUTER_APP } from "constants/constants";
import { useHistoryStore } from "modules/history/store/historyStore";
import { useCategoryStore } from "modules/home/store/categoryStore";
import { useLanguageStore } from "modules/setting/store/languageStore";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import R from "src/assets/R";
import { useUiStore } from "src/store/uiStore";
import { useUserStore } from "src/store/userStore";
import { styleView } from "src/theme";
import navigationHelper from "utils/navigationHelper";

const SplashScreen = () => {
  const { initLocale } = useLanguageStore();
  const { focusApp } = useUiStore();
  const { getDataCategory } = useCategoryStore.getState();
  const { getDataLocal } = useHistoryStore.getState();
  const { getUserInfo } = useUserStore.getState();
  const [fadeAnim] = useState(new Animated.Value(0));

  //start animation image
  const startAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const initializeApp = () => {
    startAnimation();
    focusApp();
    initLocale();
    getDataCategory();
    getDataLocal();
    getUserInfo();
  };

  useEffect(() => {
    initializeApp();
    const timer = setTimeout(() => {
      navigationHelper.navigate(ROUTER_APP.MAIN_TAB);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Animated.Image
          testID={"ic_app"}
          source={R.images.ic_app}
          style={[styles.iconApp, { opacity: fadeAnim }]}
        />
      </View>

      <Animated.Text
        testID={"txt_app_name"}
        style={[styles.textAppName, { opacity: fadeAnim, marginBottom: 32 }]}
      >
        {R.strings().app_name}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...styleView.centerItem,
    backgroundColor: "#000",
  },
  iconContainer: {
    width: 100,
    height: 100,
    marginBottom: 12,
    borderRadius: 50,
    overflow: "hidden",
  },
  iconApp: {
    width: 100,
    height: 100,
  },
  textAppName: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "600",
    color: "#07BA59",
    textAlign: "center",
  },
});

export default SplashScreen;
