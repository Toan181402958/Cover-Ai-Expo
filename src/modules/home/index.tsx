import BaseButton from "components/button";
import {
  ROUTER_APP,
  USE_APP_MAX,
  userIdDefault,
  youtubeRegex,
} from "constants/constants";
import { setAudioModeAsync } from "expo-audio";
import * as Clipboard from "expo-clipboard";
import React, { useEffect, useState } from "react";
import { Button, Image, Keyboard, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import R from "src/assets/R";
import { useUserStore } from "src/store/userStore";
import { colors, dimensions, globalStyle } from "src/theme";
import { requestTitleYtb } from "utils/funcHelper";
import navigationHelper from "utils/navigationHelper";
import HeaderHome from "./components/HeaderHome";
import ModalSuggestYoutube from "./components/ModalSuggestYoutube";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import { useHome } from "./hooks/useHome";
import { TypeCategory, TypeTheme } from "./model/index.props";
import { useCreateVoiceStore } from "./store/createVoiceStore";
import ScreenWrapper from "components/screen/ScreenWrapper";
import NumberTurnTries from "./components/NumberTurnTries";

type Props = {};
const HomeScreen = (props: Props) => {
  const {} = props;
  const { init, isShowSuggestYtb, changeShowSuggestYtb } = useHome();
  const userInfo = useUserStore((state) => state.user);

  const [linkYtb, setLinkYtb] = useState("");
  const [enterText, setEnterText] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<"song" | "text">("song");

  const [itemCategory, setItemCategory] = useState<TypeCategory | undefined>();
  const [itemModel, setItemModel] = useState<TypeTheme | undefined>();
  const [isLoadingGenerate, setLoadingGenerate] = useState<boolean>(false);

  const configAudio = async () => {
    try {
      await setAudioModeAsync({
        playsInSilentMode: true,
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: R.strings().err_try_again,
      });
    }
  };

  useEffect(() => {
    init();
    configAudio();
    return () => {
      Keyboard.dismiss();
    };
  }, []);

  const handlePaste = async () => {
    setLinkYtb("");
    const clipboardContent = await Clipboard.getStringAsync();
    setLinkYtb(clipboardContent);
  };

  const onGenerate = async () => {
    if (currentTab === "song") {
      if (!youtubeRegex.test(linkYtb)) {
        Toast.show({
          type: "error",
          text1: R.strings().this_not_valid_ytb_link,
        });
        setLinkYtb("");
        return;
      }
      try {
        setLoadingGenerate(true);
        const titleYoutube_ = await requestTitleYtb(linkYtb);
        const payload = {
          sourceUrl: linkYtb,
          dataSelect: itemModel,
          titleVideo: titleYoutube_,
          userId: userInfo?.id ?? userIdDefault,
          type: itemCategory?.id === "-1" ? "model_custom" : "model",
        };
        useCreateVoiceStore.getState().createVoice(payload);
        navigationHelper.navigate(ROUTER_APP.LOADING_VOICE);
      } catch (err) {
        Toast.show({ type: "error", text1: R.strings().toast_result_failed });
      } finally {
        setLoadingGenerate(false);
      }
    }
    if (currentTab == "text") {
      try {
        setLoadingGenerate(true);
        const payload = {
          enterText: enterText,
          dataSelect: itemModel,
          userId: userInfo?.id ?? userIdDefault,
          type: itemCategory?.id === "-1" ? "model_custom" : "model",
        };
        useCreateVoiceStore.getState().createTextToVoice(payload);
        navigationHelper.navigate(ROUTER_APP.LOADING_VOICE);
      } catch (err) {
        Toast.show({ type: "error", text1: R.strings().toast_result_failed });
      } finally {
        setLoadingGenerate(false);
      }
    }
  };
  const isShowGenerate = () => {
    if (!!linkYtb && currentTab === "song" && !!itemModel) return true;
    if (!!enterText && currentTab === "text" && !!itemModel) return true;
    return false;
  };
  return (
    <ScreenWrapper
      showHeader={false}
      containerStyle={{ paddingTop: 0 }}
      // isScroll
      children={
        <View style={styles.container}>
          {/* {!!__DEV__ && (
            <Button
              onPress={() => {
                navigationHelper.navigate(ROUTER_APP.TEST);
              }}
              title="test"
            />
          )} */}
          <HeaderHome userInfo={userInfo} />
          {!userInfo.isSubscribed && userInfo.useAppFree < USE_APP_MAX && (
            <NumberTurnTries numberTurn={USE_APP_MAX - userInfo.useAppFree} />
          )}
          <StepOne
            linkYtb={linkYtb}
            enterText={enterText}
            disable={false}
            setLinkYtb={setLinkYtb}
            setEnterText={setEnterText}
            handlePaste={handlePaste}
            onTabChange={setCurrentTab}
          />
          <StepTwo
            itemCategory={itemCategory}
            setItemCategory={setItemCategory}
            itemModel={itemModel}
            setItemModel={setItemModel}
          />
          <ModalSuggestYoutube
            visible={isShowSuggestYtb}
            onClose={() => changeShowSuggestYtb(false)}
          />
          {!!isShowGenerate() && (
            <BaseButton
              loading={isLoadingGenerate}
              textStyle={{
                color: "#000",
                fontWeight: "600",
                fontSize: 16,
              }}
              leftIcon={
                <Image
                  style={globalStyle.icon_20}
                  source={R.images.ic_three_star}
                />
              }
              title={R.strings().generate}
              onPress={onGenerate}
              buttonStyle={styles.btn_generate}
            />
          )}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: dimensions.paddingTop,
    paddingHorizontal: 16,
  },
  btn_generate: {
    position: "absolute",
    bottom: 120,
    width: dimensions.width * 0.9,
    borderRadius: 20,
    left: dimensions.width * 0.05,
    backgroundColor: colors.primary,
  },
});

export default HomeScreen;
