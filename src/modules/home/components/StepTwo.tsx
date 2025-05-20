import SkeletonBox from "components/skeleton";
import CusText from "components/text/CusText";
import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import R from "src/assets/R";
import { colors, dimensions, globalStyle, styleView } from "src/theme";
import { useHome } from "../hooks/useHome";
import { TypeCategory, TypeTheme } from "../model/index.props";
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
        }}
        activeOpacity={1}
        style={[
          styles.item,
          {
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
