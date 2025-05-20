import CusText from "components/text/CusText";
import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import R from "src/assets/R";
import { colors, dimensions, globalStyle, styleView } from "src/theme";
import navigationHelper from "utils/navigationHelper";
import Lottie from "lottie-react-native";
import loadingDot from "src/assets/jsons/loading_dot.json";
import { LinearGradient } from "expo-linear-gradient";
import { useHistoryStore } from "modules/history/store/historyStore";
import { colorBlur } from "utils/funcHelper";
import { useCreateVoiceStore } from "./store/createVoiceStore";
import { useIsFocused } from "@react-navigation/native";
import { ROUTER_APP, TYPE_STATUS_ALL } from "constants/constants";

type Props = {};
const LoadingVoiceScreen = (props: Props) => {
  const {} = props;
  const arrHistory = useHistoryStore((state) => state.arrHistory);
  const dataCreating = useCreateVoiceStore((state) => state.dataCreating);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (
      !!isFocused &&
      dataCreating?.id &&
      dataCreating?.status === TYPE_STATUS_ALL.COMPLETED
    ) {
      const itemFind = arrHistory.find((val) => val.id == dataCreating.id);
      navigationHelper.navigate(ROUTER_APP.AUDIO_DETAIL, {
        data: itemFind,
      });
    }
  }, [arrHistory, dataCreating]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigationHelper.goBack()}
        style={styles.box_hide}
      >
        <CusText fontWeight="600" content={R.strings().hide} />
        <Image
          style={{ ...globalStyle.icon_18, marginLeft: 8 }}
          source={R.images.ic_arrow_bottom}
        />
      </TouchableOpacity>
      <View style={styles.box_loading}>
        <Lottie source={loadingDot} autoPlay loop style={styles.loading_dot} />
        <CusText
          style={{ marginTop: 24 }}
          content={R.strings().we_are_generating}
        />
      </View>
      {/* {!!userStore.user.isSubscribed ? ( */}
      <View style={styles.box_loading}>
        <View style={styles.box_upgrade}>
          <LinearGradient
            colors={[
              colorBlur(colors.primary, 0.15),
              colorBlur(colors.primary, 0.2),
              "#7AFFD9",
            ]}
            locations={[0.4011, 0.5447, 0.9978]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.box_upgrade}
          >
            <View style={styles.box1}>
              <CusText
                fontWeight={"500"}
                content={R.strings().create_songs_faster}
              />
              {/* <BaseButton
                      containerStyle={styles.btn_upgrade}
                      titleStyle={styles.txt_upgrade}
                      title={'Upgrade'}
                      action={() => {}}
                    /> */}

              <TouchableOpacity
                style={styles.btn_upgrade}
                onPress={() => {
                  // uiStore.onShowModalSubscription(true);
                }}
              >
                <CusText fontWeight="600" content={R.strings().upgrade} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <Image style={styles.ic_rocket} source={R.images.ic_rocket_star} />
        </View>
      </View>
      {/* ) : (
              <View
                style={{width: '100%', height: dimensions.width * 0.4}}
              />
            )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box_hide: {
    position: "absolute",
    top: dimensions.paddingTop + 24,
    right: 16,
    backgroundColor: colorBlur(colors.primary, 0.2),
    borderRadius: 16,
    ...styleView.rowItemCenter,
    paddingLeft: 15,
    paddingRight: 12,
    paddingVertical: 10,
  },
  box_loading: {
    ...styleView.centerItem,
    flex: 1,
    width: "100%",
  },
  loading_dot: {
    height: dimensions.width * 0.6,
    width: dimensions.width * 0.6,
    marginTop: dimensions.width * 0.2,
  },
  box_upgrade: {
    width: dimensions.width * 0.8,
    height: dimensions.width * 0.4,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  btn_upgrade: {
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: 10,
    borderRadius: 16,
    ...styleView.centerItem,
    marginTop: 12,
  },
  txt_upgrade: {
    fontWeight: "600",
    color: "#1F1F29",
  },
  box1: {
    flex: 1,
    ...styleView.centerItem,
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  ic_rocket: {
    height: dimensions.width * 0.3,
    width: dimensions.width * 0.3,
    position: "absolute",
    top: -dimensions.width * 0.2,
    zIndex: 10,
  },
});

export default LoadingVoiceScreen;
