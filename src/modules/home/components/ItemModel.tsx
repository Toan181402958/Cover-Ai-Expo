import SkeletonBox from "components/skeleton";
import CusText from "components/text/CusText";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Image as ImageFast } from "expo-image";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import lottieWaveWhite from "src/assets/jsons/wave_white.json";
import R from "src/assets/R";
import { colors, dimensions } from "src/theme";
import { TypeTheme } from "../model/index.props";

type Props = {
  item: TypeTheme;
  itemModel: TypeTheme | undefined;
  onPressItem: (item: TypeTheme) => void;
};
const ItemModel = (props: Props) => {
  const { item, itemModel, onPressItem } = props;

  const uri = (item.thumbnail ?? "").replace(/ /g, "%20");
  const isSelected = itemModel?.id === item.id;
  const border = isSelected ? colors.primary : "#979797";
  const player = useAudioPlayer({ uri: item.demoUrl });
  const statusPlayer = useAudioPlayerStatus(player);
  useEffect(() => {
    if (!isSelected) {
      player.pause();
    }
  }, [isSelected]);
  const onPlay = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.seekTo(0);
      player.play();
    }
  };
  if (typeof item === "number") {
    return (
      <View style={styles.item_model}>
        <SkeletonBox
          style={{ width: "100%", aspectRatio: 1, borderRadius: 12 }}
        />
      </View>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => {
        onPressItem(item);
      }}
      style={styles.item_model}
    >
      <View
        style={{
          width: "100%",
          aspectRatio: 1,
          borderColor: border,
          borderWidth: isSelected ? 1.5 : 1,
          borderRadius: 12,
        }}
      >
        <ImageFast
          style={{
            width: isSelected ? "94%" : "100%",
            aspectRatio: 1,
            backgroundColor: "gray",
            borderRadius: isSelected ? 10 : 12,
            marginLeft: isSelected ? "3%" : 0,
            marginTop: isSelected ? "3%" : 0,
          }}
          source={{ uri: uri }}
        />
        {isSelected ? (
          <TouchableOpacity
            onPress={() => itemModel && onPlay()}
            style={styles.boxPlay}
          >
            {player.playing ? (
              <Image
                source={R.images.ic_pause}
                style={{ width: 12, height: 12, tintColor: "white" }}
              />
            ) : (
              <Image
                source={R.images.ic_play}
                style={{ width: 12, height: 12, tintColor: "white" }}
              />
            )}
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {player.playing && isSelected ? (
          <View style={styles.boxLottie}>
            <LottieView
              source={lottieWaveWhite}
              autoPlay={true}
              loop={true}
              style={{ width: 80, height: 50 }}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
      <CusText
        fontSize={12}
        fontWeight="500"
        lineHeight={18}
        content={item?.name || R.strings().updating}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item_model: {
    marginRight: 10,
    alignItems: "center",
    marginBottom: 8,
    width: (dimensions.width - 40 - 16) / 3,
  },
  boxPlay: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 10,
  },
  boxLottie: {
    position: "absolute",
    bottom: 8,
    width: "100%",
    alignItems: "center",
  },
});

export default ItemModel;
