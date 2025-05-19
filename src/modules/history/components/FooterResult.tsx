import CusText from "components/text/CusText";
import React from "react";
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
  Image,
} from "react-native";
import R from "src/assets/R";
import { colors, globalStyle, styleView } from "src/theme";
import navigationHelper from "utils/navigationHelper";
import { TypeCreate } from "../model/result.props";
import { LINK_BIO, ROUTER_APP } from "constants/constants";
import { colorBlur } from "utils/funcHelper";

type Props = {
  handleCreateNew: () => void;
  handleShare: () => void;
  onPausePlay: () => void;
};
const FooterResult = (props: Props) => {
  const { handleCreateNew, handleShare, onPausePlay } = props;
  return (
    <View style={styles.container}>
      <BoxIcon
        icon={R.images.ic_magic_primary}
        title={R.strings().create_new}
        onPress={() => {
          console.log("🚀 ~ FooterResult ~ onPress:");
          handleCreateNew();
          // navigationHelper.navigate(ROUTER_APP.MAIN_TAB);
          // navigationHelper.reset(ROUTER_APP.MAIN_TAB, {
          //   routes: [{ name: ROUTER_APP.HOME }],
          // });
        }}
      />
      <BoxIcon
        icon={R.images.ic_share_primary}
        title={R.strings().share}
        onPress={handleShare}
      />
      <BoxIcon
        icon={R.images.ic_menu_primary}
        title={R.strings().join_us}
        onPress={() => {
          onPausePlay();
          navigationHelper.navigate(ROUTER_APP.WEB_VIEW, { web_url: LINK_BIO });
        }}
      />
    </View>
  );
};

type BoxIconProps = {
  icon: ImageSourcePropType | undefined;
  title: string;
  onPress: () => void;
};
const BoxIcon = ({ icon, title, onPress }: BoxIconProps) => {
  return (
    <View style={styles.box}>
      <TouchableOpacity style={styles.box_ic} onPress={onPress}>
        <Image source={icon} style={styles.ic} />
      </TouchableOpacity>
      <CusText
        style={styles.txt}
        fontWeight="500"
        color="#79747E"
        content={title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...styleView.rowItem,
    width: "100%",
    marginTop: 36,
  },
  box: {
    flex: 1,
    alignItems: "center",
  },
  box_ic: {
    ...styleView.centerItem,
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: colorBlur(colors.primary, 0.15),
  },
  ic: {
    ...globalStyle.icon_20,
    tintColor: colors.primary,
  },
  txt: {
    marginTop: 8,
    textAlign: "center",
  },
});

export default FooterResult;
