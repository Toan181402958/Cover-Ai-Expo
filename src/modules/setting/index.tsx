import {
  Animated,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import R from "src/assets/R";
import {
  email_support,
  itunes_store_url,
  privacy_policy_link,
  ROUTER_APP,
  terms_link,
} from "constants/constants";
import { colors, dimensions, globalStyle, styleView } from "src/theme";
import navigationHelper from "utils/navigationHelper";
import { LinearGradient } from "expo-linear-gradient";
import CusText from "components/text/CusText";
import { useLanguageStore } from "./store/languageStore";
import { useUserStore } from "src/store/userStore";

interface SettingScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const SettingScreen = () => {
  const { locale } = useLanguageStore();

  const userInfo = useUserStore((state) => state.user);

  const listData_ = [
    {
      _icon: R.images.ic_language_new,
      _title: R.strings().language,
      _onPress: () => navigationHelper.navigate(ROUTER_APP.LANGUAGE),
    },
    {
      _icon: R.images.ic_email_new,
      _title: R.strings().email_support,
      _onPress: () => Linking.openURL(`mailto:${email_support}`),
    },
    {
      _icon: R.images.ic_share_link_new,
      _title: R.strings().share_with_friends,
      _onPress: () => onShare(),
    },
    {
      _icon: R.images.ic_star_border_new,
      _title: R.strings().rate_it,
      _onPress: () => {},
    },
    {
      _icon: R.images.ic_information_new,
      _title: R.strings().about_us,
      _onPress: () => navigationHelper.navigate(ROUTER_APP.ABOUT_US),
    },
    {
      _icon: R.images.ic_lock_new,
      _title: R.strings().terms_of_use,
      _onPress: () => {
        navigationHelper.navigate(ROUTER_APP.WEB_VIEW, {
          web_url: terms_link,
          web_title: R.strings().terms_of_use,
        });
      },
    },
    {
      _icon: R.images.ic_policy_new,
      _title: R.strings().privacy_policy,
      _onPress: () => {
        navigationHelper.navigate(ROUTER_APP.WEB_VIEW, {
          web_url: privacy_policy_link,
          web_title: R.strings().privacy_policy,
        });
      },
    },
  ];

  const animation = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    const startAnimation = () => {
      animation.setValue(-100);
      Animated.timing(animation, {
        toValue: 100,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => startAnimation());
    };
    startAnimation();
  }, [animation]);

  const translateX = animation.interpolate({
    inputRange: [-100, 100],
    outputRange: [-100, 100],
  });

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: R.strings().app_link,
        message: `${R.strings().please_install_app} :${itunes_store_url}`,
        url: itunes_store_url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log("Error share: ", error);
    }
  };

  useEffect(() => {}, [locale]);

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0)" }}>
      <View style={styles.container}>
        <View style={styles.boxTop}>
          <View style={styles.closeStyle} />
          <CusText
            style={{ alignSelf: "center" }}
            fontSize={20}
            fontWeight="500"
            lineHeight={30}
            content={R.strings().settings}
          />
          <TouchableOpacity
            onPress={() => navigationHelper.goBack()}
            style={styles.boxClose}
          >
            <Image source={R.images.ic_x_close} style={styles.closeStyle} />
          </TouchableOpacity>
        </View>
        <View style={{ height: 16 }} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* {(!userStore.user.isSubscribed 
          ||
                    (userStore.user.isSubscribed &&
                      userStore.userTrial.isTrial
                    )) && ( */}
          <LinearGradient
            colors={["#FF8A13", "#D05BFF"]}
            start={{ x: 0.1, y: 0.1 }}
            style={styles.linearStyle}
          >
            <View style={styles.wrapperTwo}>
              <Image source={R.images.ic_music_setting} style={styles.icLeft} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <CusText
                  fontSize={20}
                  fontWeight="600"
                  color={colors.white}
                  lineHeight={30}
                  content={`${R.strings().go_to_premium}!`}
                />
                <CusText
                  style={{ marginTop: 4 }}
                  color={colors.white}
                  content={R.strings().enjoy_all_benefits}
                />
              </View>
              {!userInfo.isSubscribed && (
                <TouchableOpacity onPress={() => {}} style={styles.boxUpgrade}>
                  <CusText
                    fontWeight="600"
                    color={colors.white}
                    content={R.strings().upgrade}
                  />
                  <Animated.View
                    style={[
                      styles.highlight,
                      {
                        transform: [{ translateX }, { rotate: "26deg" }],
                      },
                    ]}
                  />
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
          {/* )} */}
          {listData_.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.boxItem}
                onPress={() => item._onPress()}
              >
                <View style={styles.rowStyle}>
                  <Image style={styles.closeStyle} source={item._icon} />
                  <Text style={styles.textItem}>{item._title}</Text>
                </View>
                <Image
                  source={R.images.ic_arrow_right_new}
                  style={styles.closeStyle}
                />
              </TouchableOpacity>
            );
          })}
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <View style={{ ...styleView.rowItemCenter }}>
              <Text style={styles.body4Style}>{R.strings().device_id}:</Text>
              <Image
                style={[globalStyle.icon_20, { marginLeft: 4 }]}
                source={R.images.ic_copy_new}
              />
            </View>
            <Text style={styles.label4Style}>userStore.user.deviceId</Text>
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: dimensions.paddingTop, //  + 24
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 24,
    ...styleView.shadowStyle,
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textTitle: {
    alignSelf: "center",
  },
  boxClose: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
  },
  closeStyle: { width: 24, height: 24 },
  linearStyle: {
    marginBottom: 16,
    borderRadius: 16,
  },
  wrapperTwo: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icLeft: {
    width: 72,
    height: 137,
  },
  textOne: {},
  textTwo: {
    marginTop: 4,
  },
  textThree: {},
  boxUpgrade: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#1F1F29",
  },
  highlight: {
    position: "absolute",
    width: 10.2,
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.45)",
  },
  boxItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 8,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 14,
    borderColor: "rgba(113, 0, 212, 0.20)",
  },
  textItem: {
    marginLeft: 12,
  },
  textCoin: {},
  textGetMore: {},
  body4Style: {},
  label4Style: {
    marginTop: 4,
  },
});
