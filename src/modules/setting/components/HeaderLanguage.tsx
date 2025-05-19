import CusText from "components/text/CusText";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import R from "src/assets/R";
import { colors, dimensions, globalStyle, styleView } from "src/theme";
import navigationHelper from "utils/navigationHelper";

type Props = {
  disableSave: boolean;
  handleSave: () => void;
};
const HeaderLanguage = (props: Props) => {
  const { disableSave, handleSave } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigationHelper.goBack()}
        style={styles.btn_back}
      >
        <Image
          style={[globalStyle.icon_20, styles.ic_back]}
          source={R.images.ic_arrow_right_new}
        />
      </TouchableOpacity>
      <CusText
        style={{ flex: 1 }}
        fontSize={18}
        fontWeight="600"
        lineHeight={30}
        letterSpacing={0.15}
        content={R.strings().language}
      />
      <TouchableOpacity
        style={[
          styles.btn_save,
          {
            backgroundColor: !!disableSave ? "#EEEEF2" : colors.primary,
          },
        ]}
        onPress={() => {
          if (!!disableSave) return;
          handleSave();
        }}
      >
        <CusText
          fontWeight="600"
          letterSpacing={0.5}
          color={!!disableSave ? "#989CAE" : "#fff"}
          content={R.strings().save}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...styleView.rowItemCenter,
    paddingTop: dimensions.paddingTop,
  },
  btn_back: {
    ...styleView.centerItem,
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: "#F2F0FF",
    marginRight: 12,
  },
  ic_back: {
    transform: [{ rotate: "180deg" }],
  },
  btn_save: {
    ...styleView.centerItem,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 100,
    backgroundColor: colors.primary,
  },
});

export default HeaderLanguage;
