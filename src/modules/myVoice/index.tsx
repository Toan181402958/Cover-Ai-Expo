import CusText from "components/text/CusText";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import R from "src/assets/R";
import { colors, dimensions, globalStyle, styleView } from "src/theme";
import HeaderMyVoice from "./components/HeaderMyVoice";
import { useMyVoiceStore } from "./store/myVoiceStore";
import { TypeVoice } from "modules/history/model/result.props";
import { Image as ImageFast } from "expo-image";
import { colorBlur } from "utils/funcHelper";
import BaseButton from "components/button";
import ModalConfirmDelete from "components/modal/ModalConfirmDelete";
import navigationHelper from "utils/navigationHelper";
import { ROUTER_APP } from "constants/constants";
import { useLanguageStore } from "modules/setting/store/languageStore";

const MyVoiceScreen = () => {
  const locale = useLanguageStore((state) => state.locale);
  const arrMyVoice = useMyVoiceStore((state) => state.arrMyVoice);
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [listSelect, setListSelect] = useState<Array<any>>([]);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const itemCreate = {
    id: "isCreate",
    isCreate: true,
    name: R.strings().create_your_voice,
    thumbnail: R.images.ic_plus,
    source_url: "",
    model_name: "",
    status: "",
    url: null,
  };
  useEffect(() => {}, [locale]);

  const handleDeleteItems = () => {};
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

        {!!isSelect && !!arrMyVoice?.length && (
          <TouchableOpacity
            style={{ ...styleView.rowItemCenter }}
            onPress={() => {
              setListSelect((prev) => {
                if (prev?.length == arrMyVoice?.length) {
                  return [];
                }
                return arrMyVoice;
              });
            }}
          >
            <Image
              style={globalStyle.icon_40}
              source={
                listSelect?.length == arrMyVoice.length
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
  const _renderItem = ({ item, index }: { item: TypeVoice; index: number }) => {
    if (!!item.isCreate) {
      return (
        <View style={styles.item}>
          <TouchableOpacity
            style={styles.box_create}
            onPress={() => {
              navigationHelper.navigate(ROUTER_APP.CHOOSE_SOURCE);
            }}
          >
            <Image source={item.thumbnail} style={globalStyle.icon_20} />
          </TouchableOpacity>
          <CusText
            style={{ marginTop: 4, textAlign: "center" }}
            fontSize={12}
            fontWeight="500"
            color={colors.text.gray}
            content={item.name}
          />
        </View>
      );
    }
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.box_create}
          onPress={() => {
            if (!!isSelect) {
              setListSelect((prev) => {
                const isCheck = prev.find((i) => i?.id == item?.id);
                if (!!isCheck) {
                  return prev.filter((i) => i?.id != item?.id);
                }
                return [...prev, item];
              });
              return;
            }
          }}
        >
          {item?.isCreate ? (
            <Image source={item.thumbnail} style={globalStyle.icon_20} />
          ) : (
            <ImageFast
              style={styles.img}
              source={
                item?.thumbnail ? { uri: item.thumbnail } : R.images.ic_app
              }
            />
          )}
          {!!isSelect && (
            <View style={styles.btn_check}>
              <Image
                style={globalStyle.icon_32}
                source={
                  !!listSelect.find((i) => i?.id == item?.id)
                    ? R.images.ic_checked_circle
                    : R.images.ic_uncheck_circle
                }
              />
            </View>
          )}
        </TouchableOpacity>
        <CusText
          style={{ marginTop: 4, textAlign: "center" }}
          fontSize={12}
          fontWeight="500"
          color={colors.text.gray}
          content={item.name}
        />
      </View>
    );
  };
  const renderBody = () => {
    return (
      <View style={styles.body}>
        <FlatList
          style={styles.list}
          numColumns={3}
          data={[itemCreate, ...arrMyVoice]}
          keyExtractor={(item) => item.id?.toString() || ""}
          showsVerticalScrollIndicator={false}
          renderItem={_renderItem}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderMyVoice />
      {renderFilter()}
      {renderBody()}
      {!!listSelect.length && (
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
        onDelete={handleDeleteItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: dimensions.paddingTop,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  body: {
    flex: 1,
    paddingTop: 12,
  },
  list: {},
  item: {
    width: (dimensions.width - 32 - 20) / 3,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 12,
  },
  box_create: {
    height: (dimensions.width - 32 - 20) / 3,
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderWidth: 1,
    borderColor: "#B1B1B1",
    ...styleView.centerItem,
    borderRadius: 12,
  },
  img: {
    height: "100%",
    width: "100%",
    borderRadius: 12,
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
  btn_check: {
    position: "absolute",
    top: 4,
    right: 4,
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

export default MyVoiceScreen;
