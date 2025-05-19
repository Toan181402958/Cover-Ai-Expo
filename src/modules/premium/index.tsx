import ScreenWrapper from "components/screen/ScreenWrapper";
import React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import R from "src/assets/R";
import { useVideoPlayer, VideoView } from "expo-video";
import { dimensions } from "src/theme";
import { getStatusBarHeight } from "utils/iphonexHelper";
import { LinearGradient } from "expo-linear-gradient";

type Props = {};
const PremiumScreen = (props: Props) => {
  const {} = props;
  const getVideoSource = () => {
    return require("../../assets/videos/intro_celebrity_voice.mp4");
  };
  const player = useVideoPlayer(getVideoSource(), (player) => {
    player.loop = true;
    player.play();
  });
  return (
    <ScreenWrapper
      showHeader={false}
      containerStyle={styles.container}
      children={
        <View style={styles.body}>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
          <LinearGradient
            colors={[
              "rgba(256, 256,256, 0.00)",
              "rgba(256, 256, 256, 0.80)",
              "#ffffff",
              "#ffffff",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.backgroundGradient}
          />
          <View style={styles.box_center}></View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  body: {
    flex: 1,
  },
  video: {
    width: dimensions.width,
    height: dimensions.width / (1080 / 2020),
    marginTop: getStatusBarHeight(),
  },
  backgroundGradient: {
    position: "absolute",
    bottom: 0,
    width: dimensions.width,
    height: (dimensions.height / 5) * 3,
  },
  box_center: {
    width: dimensions.width,
    height:
      dimensions.height -
      (Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0),
    alignItems: "center",
    // position: "absolute",
    backgroundColor: "red",
  },
});

export default PremiumScreen;
