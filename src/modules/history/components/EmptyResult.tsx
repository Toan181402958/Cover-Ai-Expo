import BaseButton from "components/button";
import CusText from "components/text/CusText";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import R from "src/assets/R";
import { colors, dimensions, styleView } from "src/theme";

const EmptyResult = ({ handleCreateNow }: { handleCreateNow: () => void }) => {
  return (
    <View style={styles.box_empty}>
      <Image style={styles.img_music_angle} source={R.images.ic_music_angle} />
      <CusText
        style={{ marginTop: 12 }}
        fontSize={16}
        fontWeight="500"
        lineHeight={24}
        letterSpacing={0.5}
        color={"#353546"}
        content={R.strings().no_project_yet}
      />
      <CusText
        style={{ marginTop: 0 }}
        fontSize={12}
        lineHeight={18}
        letterSpacing={0.25}
        color={"#353546"}
        content={R.strings().start_ai_song_now}
      />
      <BaseButton
        onPress={handleCreateNow}
        textStyle={styles.title_create_now}
        buttonStyle={styles.btn_create_now}
        title={R.strings().create_now}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  box_empty: {
    ...styleView.centerItem,
    flex: 1,
  },
  img_music_angle: {
    height: 100,
    width: 100,
  },
  title_create_now: {
    fontWeight: "600",
    color: "#1F1F29",
    letterSpacing: 0.5,
  },
  btn_create_now: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: dimensions.width * 0.2,
  },
});
export default EmptyResult;
