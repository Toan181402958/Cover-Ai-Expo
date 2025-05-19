import CusText from "components/text/CusText";
import { ROUTER_APP } from "constants/constants";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import R from "src/assets/R";
import { UserType } from "src/models/user.props";
import { colors, globalStyle, styleView } from "src/theme";
import navigationHelper from "utils/navigationHelper";

type Props = {
  userInfo: UserType;
};
const HeaderHome = (props: Props) => {
  const { userInfo } = props;
  return (
    <View style={styles.container}>
      <CusText
        style={{ flex: 1 }}
        color={"#000"}
        fontSize={22}
        fontWeight="bold"
        lineHeight={30}
        content={`${R.strings().create} ${R.strings().app_name}`}
      />
      <View style={styles.box_right}>
        {!userInfo.isSubscribed && (
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
          <Image
            source={R.images.ic_setting}
            style={[globalStyle.icon_24, styles.ic_setting]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...styleView.rowItemCenter,
  },
  box_right: {
    ...styleView.rowItemCenter,
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
  ic_vip: {
    ...styleView.icon24,
  },
  ic_setting: {
    marginLeft: 10,
  },
});

export default HeaderHome;
