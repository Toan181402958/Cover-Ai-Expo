import CusText from "components/text/CusText";
import { ROUTER_APP } from "constants/constants";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import R from "src/assets/R";
import { colors, dimensions, globalStyle, styleView } from "src/theme";
import navigationHelper from "utils/navigationHelper";
import TabAudio from "./components/TabAudio";
import TabVideo from "./components/TabVideo";
import { useHistoryStore } from "./store/historyStore";
import { useFocusEffect } from "@react-navigation/native";
import BaseButton from "components/button";
import ModalConfirmDelete from "./components/ModalConfirmDelete";
import Toast from "react-native-toast-message";
import { colorBlur } from "utils/funcHelper";

type Props = {};
const HistoryScreen = (props: Props) => {
  const {} = props;
  const arrHistory = useHistoryStore((state) => state.arrHistory);
  const dataAudioResult = arrHistory.filter(
    (item) => item.typeResult === undefined
  );
  const [index, setIndex] = useState(0);
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [listAudio, setListAudio] = useState<Array<any>>(dataAudioResult);
  const [listSelect, setListSelect] = useState<Array<any>>(listAudio);
  const [listVideo, setListVideo] = useState<Array<any>>([1, 2]);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      console.log("focus tab history1", useHistoryStore.getState().arrHistory);
      return () => {};
    }, [])
  );

  //update select
  useEffect(() => {
    if (index == 0) {
      setListSelect(listAudio);
    } else {
      setListSelect(listVideo);
    }
  }, [listAudio, listVideo, index]);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ HistoryScreen:", arrHistory);
    const dataAudioResultInit = arrHistory.filter(
      (item) => item.typeResult === undefined
    );
    setListAudio(dataAudioResultInit);
  }, [arrHistory]);

  //delete item history
  const handleDelete = () => {
    setShowConfirmDelete(false);
    const listDelete =
      index == 0
        ? listAudio.filter((val) => !!val?.selected)
        : listVideo.filter((val) => !!val?.selected);
    // createStore.deleteItemsHistory(listDelete);
    useHistoryStore.getState().deleteItemsHistory(listDelete);
    Toast.show({
      text1: R.strings().delete_success,
      type: "cusToast",
    });
    setIsSelect(false);
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.txtTitle}>{R.strings().history}</Text>
        <View style={styles.boxOne}>
          {/* {!userStore.user.isSubscribed && ( */}
          <TouchableOpacity onPress={() => {}} style={styles.boxVip}>
            <Image style={globalStyle.icon_24} source={R.images.ic_crown} />
            <CusText
              style={{ marginLeft: 4 }}
              fontSize={12}
              fontWeight="500"
              lineHeight={18}
              letterSpacing={0.25}
              content={R.strings().get_pro}
            />
          </TouchableOpacity>
          {/* )} */}
          <TouchableOpacity
            onPress={() => navigationHelper.navigate(ROUTER_APP.SETTING)}
          >
            <Image source={R.images.ic_setting} style={styles.icHistory} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderHeaderNotification = () => {
    // if (!uiStore.showDeleted3DaySuggestion) return <></>;
    return (
      <View style={styles.box_header_notification}>
        <Image
          style={globalStyle.icon_24}
          source={R.images.ic_infomation_primary}
        />
        <CusText
          style={{ marginLeft: 8, flex: 1 }}
          color={"#353546"}
          fontSize={12}
          fontWeight="500"
          lineHeight={18}
          letterSpacing={0.25}
          content={R.strings().notification_warning_delete_after_3_days}
        />
        <TouchableOpacity style={styles.btn_dismiss} onPress={() => {}}>
          <CusText
            fontSize={12}
            fontWeight="600"
            lineHeight={18}
            letterSpacing={0.25}
            content={R.strings().dismiss}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderFilter = () => {
    return (
      <View style={styles.box_filter}>
        <TouchableOpacity
          style={[
            styles.btn_select,
            {
              backgroundColor: isSelect
                ? colorBlur(colors.primary, 0.2)
                : "#F4F4F6",
            },
          ]}
          onPress={() => {
            if (index == 0 && !listAudio?.length) return;
            if (index == 1 && !listVideo?.length) return;
            // if (!listAudio?.length) return;
            setIsSelect(!isSelect);
          }}
        >
          <CusText
            fontWeight="600"
            lineHeight={21}
            letterSpacing={0.25}
            content={!!isSelect ? R.strings().unselect : R.strings().select}
          />
        </TouchableOpacity>

        {!!isSelect && !!listSelect?.length && (
          <TouchableOpacity
            style={{ ...styleView.rowItemCenter }}
            onPress={() => {
              if (listSelect?.every((val) => !!val?.selected)) {
                if (index == 0) {
                  setListAudio((prev) =>
                    prev.map((i) => ({ ...i, selected: false }))
                  );
                } else {
                  setListVideo((prev) =>
                    prev.map((i) => ({ ...i, selected: false }))
                  );
                }

                setListSelect((prev) =>
                  prev.map((i) => ({ ...i, selected: false }))
                );
              } else {
                if (index == 0) {
                  setListAudio((prev) =>
                    prev.map((i) => ({ ...i, selected: true }))
                  );
                } else {
                  setListVideo((prev) =>
                    prev.map((i) => ({ ...i, selected: true }))
                  );
                }

                setListSelect((prev) =>
                  prev.map((i) => ({ ...i, selected: true }))
                );
              }

              // if (listSelectAudio?.length === listAudio.length) {
              //   setListSelectAudio([]);
              //   setListAudio(listAudio.map(i => ({...i, selected: false})));
              // } else {
              //   setListSelectAudio(
              //     listAudio.map(i => ({...i, selected: true})),
              //   );
              // setListAudio(listAudio.map(i => ({...i, selected: true})));
              // }
            }}
          >
            <Image
              style={globalStyle.icon_40}
              source={
                listSelect?.every((val) => !!val?.selected)
                  ? R.images.ic_checked_40_primary
                  : R.images.ic_uncheck_gray
              }
            />
            <CusText
              style={{ marginLeft: 4 }}
              fontWeight="600"
              lineHeight={21}
              letterSpacing={0.25}
              content={R.strings().select_all}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const routes = [
    { key: "audio", title: R.strings().audio },
    { key: "video", title: R.strings().video },
  ];
  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "audio":
        return (
          <TabAudio
            dataMain={listAudio}
            // createStore={createStore}
            isSelect={isSelect}
            setListAudio={setListAudio}
          />
        );
      case "video":
        return (
          <TabVideo
          // dataMain={listVideo}
          // isSelect={isSelect}
          // createStore={createStore}
          // setListVideo={setListVideo}
          />
        );
      // return index === 1 ? ( // chỉ render khi tab video đang active
      //   <VideoResult dataMain={dataMain} />
      // ) : null;
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderHeaderNotification()}
      {renderFilter()}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(index) => {
          console.log("🚀 ~ index:", index);
          setIndex(index);
        }}
        initialLayout={{ width: dimensions.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: colors.primary,
              borderRadius: 12,
            }}
            style={{
              width: dimensions.width * 0.6,
              alignSelf: "center",
              backgroundColor: "transparent",
            }}
            // labelStyle={{color: 'black', fontWeight: 'bold'}}
            inactiveColor="gray"
            activeColor="black"
          />
        )}
      />
      {listSelect?.some((val) => !!val?.selected) && !!isSelect && (
        <BaseButton
          buttonStyle={styles.btn_delete}
          title={R.strings().delete}
          leftIcon={R.images.ic_trash}
          textStyle={styles.txt_delete}
          onPress={() => {
            setShowConfirmDelete(true);
          }}
        />
      )}
      <ModalConfirmDelete
        visible={isShowConfirmDelete}
        onClose={() => {
          setShowConfirmDelete(false);
        }}
        onDelete={handleDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: dimensions.paddingTop,
    backgroundColor: colors.white,
  },
  header: {
    ...styleView.rowItemBetween,
    width: "100%",
  },
  txtTitle: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "600",
  },
  boxOne: {
    // width: '100%',
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  boxVip: {
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 28,
    overflow: "hidden",
    borderColor: colors.primary,
    padding: 4,
  },
  icHistory: {
    width: 22,
    height: 22,
    marginLeft: 9,
  },
  box_header_notification: {
    ...styleView.rowItemCenter,
    shadowColor: "rgba(113, 0, 212, 0.2)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 16,
    borderWidth: 0.5,
    borderColor: "#E5E5E5",
  },
  btn_dismiss: {
    ...styleView.centerItem,
    backgroundColor: "#F4F4F6",
    borderRadius: 28,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  box_filter: {
    ...styleView.rowItemCenterBetween,
    marginTop: 16,
  },
  btn_select: {
    ...styleView.centerItem,
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: "#F4F4F6",
    borderRadius: 100,
  },
  btn_delete: {
    position: "absolute",
    borderRadius: 16,
    backgroundColor: colors.primary,
    bottom: 120,
    width: "100%",
    paddingVertical: 12,
    left: 16,
  },
  txt_delete: {
    color: "#1F1F29",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0.5,
    marginLeft: 8,
  },
});

export default HistoryScreen;
