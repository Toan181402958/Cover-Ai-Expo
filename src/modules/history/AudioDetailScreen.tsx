import BaseButton from "components/button";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  Text,
} from "react-native";
import R from "src/assets/R";
import { colors, dimensions, globalStyle, styleView } from "src/theme";
import Lottie from "lottie-react-native";
import loadingHand from "src/assets/jsons/loading_hand.json";
import GradientText from "components/text/GradientText";
import CusText from "components/text/CusText";
import { Image as ImageFast } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import navigationHelper from "utils/navigationHelper";
import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { useEvent } from "expo";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-media-library";
import Slider from "@react-native-community/slider";
import Toast from "react-native-toast-message";
import FooterResult from "./components/FooterResult";
import { colorBlur } from "utils/funcHelper";
import { ROUTER_APP } from "constants/constants";
import * as Sharing from "expo-sharing";

const formatTime = (ms: number) => {
  const time = ms / 1000;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};

type Props = {
  data: any;
  fromDetail?: boolean;
};
const AudioDetailScreen = (props: any) => {
  const { data, fromDetail } = props.route?.params;

  const playerAudio = useAudioPlayer(
    {
      uri: data?.output,
    },
    50
  );
  const statusAudio = useAudioPlayerStatus(playerAudio);

  //config audio
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
    configAudio();
    async function autoPlay() {
      if (!!data?.output) {
        try {
          playerAudio.play();
        } catch (err) {
          Toast.show({
            type: "error",
            text1: R.strings().err_try_again,
          });
        }
      }
    }
    autoPlay();
    console.log("🚀 ~ useEffect ~ props detail audio:", props);
    return () => {
      removeAudio();
    };
  }, [playerAudio, data?.output]);

  const removeAudio = async () => {
    if (!!playerAudio) {
      playerAudio.remove();
    }
  };

  const handleBack = () => {
    if (!!fromDetail) {
      navigationHelper.goBack();
    }
  };

  const onPlay = async () => {
    if (playerAudio.playing) {
      playerAudio.pause();
    } else {
      playerAudio.play();
    }
  };

  const downloadAndSaveVideo = async (videoUri: string) => {
    Toast.show({
      type: "progress",
      autoHide: false,
      position: "bottom",
    });
    try {
      // check permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "You need to grant media library permissions."
        );
        return;
      }
      // download video to local
      const fileUri = FileSystem.documentDirectory + "downloaded_video.mp4";
      const downloadResumable = FileSystem.createDownloadResumable(
        videoUri,
        fileUri
      );
      const { uri } = await downloadResumable.downloadAsync();

      // save to library
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);

      //remove local file
      await FileSystem.deleteAsync(uri, { idempotent: true });
      Toast.hide();
      Alert.alert("Success", "Video saved to gallery!");
    } catch (error) {
      Toast.hide();
      Alert.alert("Error", "Something went wrong while downloading the video.");
    }
  };

  const handleSliderChange = async (value: number) => {
    try {
      const newPosition = value * (statusAudio.duration || 0);
      await playerAudio.seekTo(newPosition);
    } catch (err) {}
  };

  const position = statusAudio.currentTime * 1000 || 0;
  const duration = statusAudio.duration * 1000 || 0;

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.btn_close} onPress={handleBack}>
          <Image style={globalStyle.icon_24} source={R.images.ic_x_close} />
        </TouchableOpacity>
        <BaseButton
          title={R.strings().save}
          buttonStyle={styles.btn_save}
          textStyle={styles.txt_save}
          onPress={() => {
            downloadAndSaveVideo(data?.output);
          }}
        />
      </View>
    );
  };
  const renderCountTurn = () => {
    return (
      <View style={styles.box_count_turn}>
        <Lottie
          source={loadingHand}
          autoPlay
          loop
          style={styles.loading_hand}
        />
        <GradientText
          text={R.strings().sounds_amazing}
          colors={[colors.primary, "#D05BFF"]}
          style={styles.txt_sound_amazing}
        />
        <View style={{ ...styleView.rowItemCenter }}>
          <CusText fontWeight="500" content={R.strings().you_have} />
          <GradientText
            text={
              //   uiStore.useAppFreeMax > userStore.user.useAppFree
              //     ? uiStore.useAppFreeMax - userStore.user.useAppFree
              //     : 0
              5
            }
            colors={[colors.primary, "#D05BFF"]}
            style={styles.txt_sound_amazing}
          />
          <CusText
            fontWeight="500"
            content={`${R.strings().tries_left_to_keep} ${
              R.strings().exploring_ai
            }`}
          />
        </View>
      </View>
    );
  };
  const renderInfoSong = () => {
    return (
      <View style={styles.info_song}>
        <CusText
          fontSize={16}
          fontWeight="500"
          lineHeight={24}
          letterSpacing={0.5}
          content={data?.nameSong || R.strings().updating}
        />
        <CusText
          fontSize={12}
          lineHeight={18}
          letterSpacing={0.25}
          content={data?.model_name || R.strings().updating}
        />
        <View
          style={{
            width: dimensions.width - 64,
            marginTop: Platform.OS === "android" ? 16 : 0,
          }}
        >
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={duration > 0 ? position / duration : 0}
            onValueChange={handleSliderChange}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor="#D3D3D3"
            thumbTintColor={colors.primary}
            thumbImage={require("../../assets/icons/ic_app.png")}
          />
        </View>
        <View style={styles.box_time}>
          <CusText
            fontSize={12}
            fontWeight="500"
            lineHeight={18}
            letterSpacing={0.2}
            content={formatTime(position)}
          />
          <CusText
            fontSize={12}
            fontWeight="500"
            lineHeight={18}
            letterSpacing={0.2}
            content={formatTime(duration)}
          />
        </View>
        <TouchableOpacity
          style={{
            height: 46,
            width: 46,
            alignSelf: "center",
          }}
          onPress={onPlay}
        >
          <Image
            style={{ height: 46, width: 46 }}
            source={
              playerAudio.playing ? R.images.ic_pause_new : R.images.ic_play_new
            }
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground
          style={styles.img_bg}
          source={R.images.img_bg_result}
        />
        <View style={styles.body}>
          {renderHeader()}
          {renderCountTurn()}
          <LinearGradient
            colors={[colors.primary, "#D05BFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.box_img_song}
          >
            <ImageFast
              style={styles.img_song}
              source={
                data?.thumbnail ? { uri: data?.thumbnail } : R.images.ic_app
              }
            />
          </LinearGradient>
          {renderInfoSong()}
          <FooterResult
            handleCreateNew={() => {
              // if (
              //   createStore.numberGenVoiceShowSuggest ==
              //     LIMIT_VOICE_SUGGEST &&
              //   !userStore.user.isSubscribed
              // ) {
              //   setVisibleTryVoice(true);
              playerAudio.remove();
              navigationHelper.reset(ROUTER_APP.MAIN_TAB, {
                routes: [{ name: ROUTER_APP.HOME }],
              });
            }}
            handleShare={() => {
              Sharing.shareAsync(data?.output, {});
            }}
            onPausePlay={() => {
              playerAudio.pause();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  img_bg: {
    width: dimensions.width,
    height: dimensions.height * 0.5,
    position: "absolute",
  },
  body: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: dimensions.paddingTop,
    zIndex: 10,
    flex: 1,
    height: dimensions.height,
    width: "100%",
  },
  header: {
    ...styleView.rowItemCenterBetween,
    width: "100%",
  },
  btn_close: {
    ...styleView.centerItem,
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
  },
  btn_save: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  txt_save: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0.5,
    color: "#1F1F29",
  },
  box_count_turn: {
    width: "100%",
    alignItems: "center",
    marginBottom: 18,
  },
  loading_hand: {
    height: dimensions.width * 0.2,
    width: dimensions.width * 0.2,
  },
  txt_sound_amazing: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 30,
    letterSpacing: 0.1,
    marginHorizontal: 4,
  },
  box_img_song: {
    ...styleView.centerItem,
    height: dimensions.width * 0.5,
    width: dimensions.width * 0.5,
    borderRadius: 16,
  },
  img_song: {
    borderRadius: 16,
    height: dimensions.width * 0.5 - 4,
    width: dimensions.width * 0.5 - 4,
  },
  info_song: {
    shadowColor: colorBlur(colors.primary, 0.5),
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: 16,
    marginTop: 16,
  },
  slider: {
    width: "100%",
    marginTop: 10,
  },
  box_time: {
    ...styleView.rowItemCenterBetween,
    marginTop: 2,
  },
});

export default AudioDetailScreen;
