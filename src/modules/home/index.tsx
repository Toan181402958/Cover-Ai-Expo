import { ROUTER_APP } from "constants/constants";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, Keyboard, Image } from "react-native";
import Toast from "react-native-toast-message";
import { colors, dimensions, globalStyle } from "src/theme";
import navigationHelper from "utils/navigationHelper";
import HeaderHome from "./components/HeaderHome";
import StepOne from "./components/StepOne";
import ModalSuggestYoutube from "./components/ModalSuggestYoutube";
import { useHomeStore } from "./store/homeStore";
import { useUiStore } from "src/store/uiStore";
import { useHome } from "./hooks/useHome";
import * as Clipboard from "expo-clipboard";
import StepTwo from "./components/StepTwo";
import { useCategoryStore } from "./store/categoryStore";
import BaseButton from "components/button";
import R from "src/assets/R";
import { useCreateVoiceStore } from "./store/createVoiceStore";
import { requestTitleYtb } from "utils/funcHelper";
import { TypeCategory, TypeTheme } from "./model/index.props";
import { useUserStore } from "src/store/userStore";

type Props = {};
const HomeScreen = (props: Props) => {
  const {} = props;
  const { init, isShowSuggestYtb, changeShowSuggestYtb } = useHome();
  const userInfo = useUserStore((state) => state.user);

  const [linkYtb, setLinkYtb] = useState("");
  const [enterText, setEnterText] = useState<string>("");
  const [_currentTab, setCurrentTab] = useState<"song" | "text">("song");

  const [itemCategory, setItemCategory] = useState<TypeCategory | undefined>();
  const [itemModel, setItemModel] = useState<TypeTheme | undefined>();
  const [isLoadingGenerate, setLoadingGenerate] = useState<boolean>(false);

  const test = async () => {
    useCategoryStore.getState().getDataCategory();
  };

  useEffect(() => {
    //check init focus home
    init();
    // test();
    return () => {
      Keyboard.dismiss();
    };
  }, []);

  const handlePaste = async () => {
    console.log("🚀 ~ handlePaste ~ handlePaste:");
    setLinkYtb("");
    const clipboardContent = await Clipboard.getStringAsync();
    console.log("🚀 ~ handlePaste ~ clipboardContent:", clipboardContent);
    setLinkYtb(clipboardContent);
  };

  const onGenerate = async () => {
    setLoadingGenerate(true);
    const titleYoutube_ = await requestTitleYtb(linkYtb);
    const payload = {
      sourceUrl: linkYtb,
      dataSelect: itemModel,
      titleVideo: titleYoutube_,
      userId: "ebf48005-bca9-4675-86eb-26a9f00fd971",
      type: itemCategory?.id === "-1" ? "model_custom" : "model",
    };
    setLoadingGenerate(false);
    navigationHelper.navigate(ROUTER_APP.LOADING_VOICE);
    useCreateVoiceStore.getState().createVoice(payload);
  };
  return (
    <View style={styles.container}>
      {!!__DEV__ && (
        <Button
          onPress={() => {
            navigationHelper.navigate(ROUTER_APP.TEST);
          }}
          title="test"
        />
      )}
      <HeaderHome userInfo={userInfo} />
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
      <BaseButton
        loading={isLoadingGenerate}
        textStyle={{
          color: "#000",
          fontWeight: "600",
          fontSize: 16,
        }}
        leftIcon={
          <Image style={globalStyle.icon_20} source={R.images.ic_three_star} />
        }
        title={R.strings().generate}
        onPress={onGenerate}
        buttonStyle={styles.btn_generate}
      />
    </View>
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
