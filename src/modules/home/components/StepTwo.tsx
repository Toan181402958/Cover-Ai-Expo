import CusText from "components/text/CusText";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import R from "src/assets/R";
import { colors, dimensions, globalStyle, styleView } from "src/theme";
import { useHome } from "../hooks/useHome";
import SkeletonBox from "components/skeleton";
import { TypeCategory, TypeTheme } from "../model/index.props";
import { Image as ImageFast } from "expo-image";
import { useCategoryStore } from "../store/categoryStore";
import ItemModel from "./ItemModel";

type Props = {
  itemCategory: TypeCategory | undefined;
  setItemCategory: React.Dispatch<
    React.SetStateAction<TypeCategory | undefined>
  >;
  itemModel: TypeCategory | undefined;
  setItemModel: React.Dispatch<React.SetStateAction<TypeTheme | undefined>>;
};
const StepTwo = (props: Props) => {
  const { itemCategory, setItemCategory, itemModel, setItemModel } = props;
  const { stateCategory } = useHome();

  // const [itemCategory, setItemCategory] = useState<TypeCategory | undefined>();
  // const [itemModel, setItemModel] = useState<TypeTheme | undefined>();
  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    setItemCategory(stateCategory.data[1]);
  }, [stateCategory.data]);
  const renderTitle = () => {
    return (
      <View style={styles.box_title}>
        <Image source={R.images.ic_match} style={globalStyle.icon_20} />
        <CusText
          style={{ marginLeft: 6 }}
          fontSize={16}
          fontWeight="bold"
          lineHeight={24}
          letterSpacing={0.5}
          color="#000"
          content={R.strings().step_2_select_voice}
        />
      </View>
    );
  };
  const _renderItemCategory = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    if (!!stateCategory.isLoading) {
      return <SkeletonBox style={styles.item_loading} />;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          setItemCategory(item);
          // stopAudio();
        }}
        activeOpacity={1}
        style={[
          styles.item,
          {
            //   backgroundColor: backgroundColor,
            backgroundColor:
              itemCategory?.id === item?.id ? colors.primary : "#D9D9D9",
          },
        ]}
      >
        <CusText content={item?.name || R.strings().updating} />
      </TouchableOpacity>
    );
  };
  const renderCategory = () => {
    return (
      <View style={styles.box_list_category}>
        <FlatList
          data={stateCategory.isLoading ? [1, 2, 3, 4] : stateCategory.data}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={_renderItemCategory}
        />
      </View>
    );
  };
  const renderItemModel = ({ item }: { item: TypeTheme }) => {
    const uri = (item.thumbnail ?? "").replace(/ /g, "%20");
    const isSelected = itemModel?.id === item.id;
    const border = isSelected ? colors.primary : "#979797";
    const imageWidth = isSelected
      ? (dimensions.width - 40 - 16) / 3 - 10
      : (dimensions.width - 40 - 16) / 3;
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
          console.log("selectItem: ", item);
          setItemModel(item);
          //   setSelectItem(item);
          //   stopAudio();
          //   useCategoryStore.getState().selectModel(itemCategory?.id, item.id);
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
            <TouchableOpacity style={styles.boxPlay}>
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
  const renderModel = () => {
    return (
      <View style={styles.box_list_model}>
        <FlatList
          data={
            itemCategory?.isLoadingModel
              ? [1, 2, 3, 4]
              : itemCategory?.dataModel
          }
          numColumns={3}
          keyExtractor={(item) => item.id?.toString() || ""}
          showsVerticalScrollIndicator={false}
          // ListFooterComponent={<View style={styles.spaceList2} />}
          renderItem={({ item, index }) => (
            <ItemModel
              key={index}
              item={item}
              itemModel={itemModel}
              onPressItem={(item) => {
                setItemModel(item);
              }}
            />
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderTitle()}
      {renderCategory()}
      {renderModel()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 160,
    marginTop: 16,
  },
  box_title: {
    ...styleView.rowItem,
  },
  box_list_category: {
    width: "100%",
    marginTop: 4,
  },
  box_list_model: {
    width: "100%",
    marginTop: 12,
  },
  item: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    marginRight: 8,
  },
  item_loading: {
    height: 34,
    width: 80,
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    marginRight: 8,
  },
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

export default StepTwo;
