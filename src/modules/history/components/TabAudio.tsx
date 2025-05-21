import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { colors, dimensions, globalStyle, styleView } from "src/theme";
import navigationHelper from "utils/navigationHelper";
import EmptyResult from "./EmptyResult";
import R from "src/assets/R";
import CusText from "components/text/CusText";
import * as Progress from "react-native-progress";
import { Image as ImageFast } from "expo-image";
import { ROUTER_APP } from "constants/constants";
import { colorBlur } from "utils/funcHelper";

type Props = {
  dataMain: Array<any>;
  isSelect: boolean;
  setListAudio: React.Dispatch<React.SetStateAction<Array<any>>>;
};
const numColumns = 3;
const itemSize = dimensions.width / numColumns;
const TabAudio = (props: Props) => {
  const { dataMain, isSelect, setListAudio } = props;

  const handleItem = (item: any) => {
    if (item.status === "COMPLETED") {
      navigationHelper.navigate(ROUTER_APP.AUDIO_DETAIL, {
        fromDetail: true,
        data: item,
      });
    } else if (item.status === "PENDING") {
      navigationHelper.navigate(ROUTER_APP.LOADING_VOICE, {});
    }
  };

  const _renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            console.log("item", item);
            if (!!isSelect) {
              setListAudio((prev) =>
                prev.map((i) =>
                  i?.idCreate == item?.idCreate
                    ? { ...i, selected: !i?.selected }
                    : i
                )
              );

              return;
            }
            handleItem(item);
          }}
        >
          <BodyItem item={item} />
          <View
            style={{
              width: "100%",
              paddingHorizontal: 2,
            }}
          >
            <Text
              numberOfLines={2}
              style={styles.txt_name_audio}
              children={
                item?.model_name || item?.nameSong || R.strings().updating
              }
            />
            {/* <CusText
              style={{
                textAlign: 'center',
                width: '100%',
              }}
              fontSize={12}
              fontWeight="500"
              lineHeight={18}
              letterSpacing={0.25}
              color={'#7D7D7D'}
              numberOfLines={2}
              content={item?.nameSong || R.strings().updating}
            /> */}
          </View>
          {!!isSelect && (
            <View style={styles.btn_check}>
              <Image
                style={globalStyle.icon_32}
                source={
                  !!item?.selected
                    ? R.images.ic_checked_circle
                    : R.images.ic_uncheck_circle
                }
              />
            </View>
          )}
        </TouchableOpacity>
      );
    },
    [isSelect]
  );
  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        data={dataMain}
        renderItem={_renderItem}
        numColumns={numColumns}
        keyExtractor={(item, index) => item?.id?.toString()}
        columnWrapperStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              height: dimensions.width * 1.3,
            }}
          >
            <EmptyResult
              handleCreateNow={() => {
                // navigationHelper.reset('BottomTab', {
                //   routes: [{name: 'Home'}],
                // });
                // navigationTab(0);
                navigationHelper.navigate(ROUTER_APP.HOME);
              }}
            />
          </View>
        }
      />
    </View>
  );
};
const BodyItem = ({ item }: { item: any }) => {
  switch (item?.status) {
    case "PENDING":
      return (
        <>
          <View style={[styles.img_thumb, styles.img_pending]}>
            <Image
              style={{ ...globalStyle.icon_32 }}
              source={R.images.ic_music_circle}
            />
            <CusText
              style={{ marginTop: 12 }}
              fontSize={11}
              lineHeight={16.5}
              letterSpacing={0.5}
              color={"#353546"}
              content={R.strings().processing}
            />
            <Progress.Bar
              style={{ marginTop: 4 }}
              width={itemSize - 30}
              height={4}
              color={colors.primary}
              borderWidth={0}
              unfilledColor={colorBlur(colors.primary, 0.2)}
              animationType="timing"
              indeterminate={true}
            />
          </View>
        </>
      );
    case "FAILED":
      return (
        <>
          <View style={[styles.img_thumb, styles.img_failed]}>
            <Image
              style={globalStyle.icon_24}
              source={R.images.ic_x_circle_red}
            />
            <CusText
              style={{ marginTop: 12, textAlign: "center" }}
              fontSize={11}
              lineHeight={16.5}
              letterSpacing={0.5}
              color={"#353546"}
              content={R.strings().unable_to_process_project}
            />
          </View>
        </>
      );
    case "COMPLETED":
      return (
        <>
          <ImageFast
            style={styles.img_thumb}
            source={item?.thumbnail ? { uri: item.thumbnail } : R.images.ic_app}
          />
        </>
      );
    default:
      return (
        <>
          <ImageFast
            style={styles.img_thumb}
            source={
              item?.thumbnail_voice
                ? { uri: item.thumbnail_voice }
                : R.images.ic_app
            }
          />
        </>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 12,
  },
  item: {
    width: itemSize - 19,
    marginBottom: 12,
    alignItems: "center",
  },
  txt_name_audio: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
    // letterSpacing: 0.25,
    color: "#7D7D7D",
  },
  btn_check: {
    position: "absolute",
    top: 4,
    right: 4,
  },
  img_thumb: {
    width: itemSize - 19,
    height: itemSize - 19,
    borderRadius: 16,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#979797",
  },
  img_pending: {
    ...styleView.centerItem,
    borderColor: colors.primary,
    paddingTop: 16,
  },
  img_failed: {
    ...styleView.centerItem,
    borderColor: "#7D7D7D",
    paddingTop: 12,
    paddingHorizontal: 4,
  },
});

export default TabAudio;
