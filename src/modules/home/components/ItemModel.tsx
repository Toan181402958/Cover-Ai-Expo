import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TypeTheme } from "../model/index.props";
import R from "src/assets/R";
import CusText from "components/text/CusText";
import { Image as ImageFast } from "expo-image";
import SkeletonBox from "components/skeleton";
import { colors, dimensions } from "src/theme";
import { useAudioPlayer } from "expo-audio";

type Props = {
  item: TypeTheme;
  itemModel: TypeTheme | undefined;
  onPressItem: (item: TypeTheme) => void;
};
const ItemModel = (props: Props) => {
  const { item, itemModel, onPressItem } = props;
  const [isPlay, setIsPlay] = useState(false);

  const uri = (item.thumbnail ?? "").replace(/ /g, "%20");
  const isSelected = itemModel?.id === item.id;
  const border = isSelected ? colors.primary : "#979797";
  const imageWidth = isSelected
    ? (dimensions.width - 40 - 16) / 3 - 10
    : (dimensions.width - 40 - 16) / 3;
  const player = useAudioPlayer(item.demoUrl);
  const onPlay = () => {
    player.play();
    setIsPlay(true);
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
      // disabled={isSelected}
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
            {isPlay ? (
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
        {/* {isSelected ? (
          <>
            {isLoading ? (
              <View style={styles.wrapperProgress}>
                <View style={styles.boxProgress} />
                <Progress.Circle
                  endAngle={0.8}
                  indeterminate={true}
                  color={"#FFF"}
                  size={21}
                  borderWidth={3}
                />
              </View>
            ) : (
              <>
                {isPlay ? (
                  <View style={styles.boxLottie}>
                    <LottieView
                      source={require("../../../assets/json/wave_white.json")}
                      autoPlay={true}
                      loop={true}
                      style={{ width: 80, height: 50 }}
                    />
                  </View>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        ) : (
          <></>
        )} */}
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
});

export default ItemModel;
