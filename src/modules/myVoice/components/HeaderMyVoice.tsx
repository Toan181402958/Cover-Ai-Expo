import CusText from "components/text/CusText";
import { ROUTER_APP } from "constants/constants";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import R from "src/assets/R";
import { useUserStore } from "src/store/userStore";
import { colors, globalStyle, styleView } from "src/theme";
import navigationHelper from "utils/navigationHelper";

type Props = {};
const HeaderMyVoice = (props: Props) => {
  const {} = props;
  return (
    <View style={styles.container}>
      <CusText fontSize={22} fontWeight="bold" content={R.strings().my_voice} />
      <View style={styles.boxOne}>
        {!useUserStore.getState().user.isSubscribed && (
          <TouchableOpacity
            onPress={() => {
              navigationHelper.navigate(ROUTER_APP.PREMIUM);
            }}
            style={styles.boxVip}
          >
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
        )}
        <TouchableOpacity
          onPress={() => navigationHelper.navigate(ROUTER_APP.SETTING)}
        >
          <Image source={R.images.ic_setting} style={styles.icHistory} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...styleView.rowItemBetween,
    width: "100%",
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
});

export default HeaderMyVoice;
