import ScreenWrapper from "components/screen/ScreenWrapper";
import CusText from "components/text/CusText";
import { ROUTER_APP } from "constants/constants";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import R from "src/assets/R";
import { colors, globalStyle, styleView } from "src/theme";
import navigationHelper from "utils/navigationHelper";

type TypeItemData = {
  id: number;
  name: string;
  iconLeft: ImageSourcePropType | undefined;
  img_background: ImageSourcePropType | undefined;
  action: () => void;
};

type Props = {};
const ChooseSourceScreen = (props: Props) => {
  const {} = props;
  const listData = [
    {
      id: 1,
      name: R.strings().record_voice,
      iconLeft: R.images.ic_record_mini,
      img_background: R.images.img_bg_record,
      action: () => navigationHelper.navigate(ROUTER_APP.RECORD_VOICE),
    },
    {
      id: 2,
      name: R.strings().upload_audio_file,
      iconLeft: R.images.ic_cloud,
      img_background: R.images.img_bg_upload,
      action: () => {},
    },
    {
      id: 3,
      name: R.strings().ytb_link,
      iconLeft: R.images.ic_share,
      img_background: R.images.img_bg_link,
      action: () => {},
    },
  ];
  const _renderItem = ({
    item,
    index,
  }: {
    item: TypeItemData;
    index: number;
  }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={item.action}>
        <Image
          source={item.img_background}
          style={{ width: "100%", height: "100%" }}
        />
        <View style={styles.body_item}>
          <Image style={styles.ic_left} source={item.iconLeft} />
          <CusText
            style={{ flex: 1 }}
            fontSize={18}
            fontWeight="500"
            color={colors.white}
            content={item.name}
          />
          <Image style={globalStyle.icon_30} source={item.iconLeft} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScreenWrapper
      title={R.strings().choose_source}
      children={
        <View style={styles.container}>
          <CusText fontWeight="500" content={R.strings().record_or_upload} />
          <FlatList
            style={styles.list}
            data={listData}
            renderItem={_renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 0,
  },
  list: {
    width: "100%",
    marginTop: 16,
  },
  item: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: 15,
    height: 84,
    marginBottom: 16,
  },
  body_item: {
    position: "absolute",
    width: "100%",
    ...styleView.rowItemCenter,
    height: "100%",
    paddingHorizontal: 16,
  },
  ic_left: {
    ...globalStyle.icon_30,
    marginRight: 24,
    tintColor: colors.white,
  },
});

export default ChooseSourceScreen;
