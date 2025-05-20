import CusText from "components/text/CusText";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import R from "src/assets/R";
import { colors, globalStyle, styleView } from "src/theme";

type Props = {
  numberTurn: number;
};
const NumberTurnTries = (props: Props) => {
  const { numberTurn } = props;
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, "#FF8A13"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.box_gradient}
      >
        <View style={styles.box}>
          <Image style={globalStyle.icon_24} source={R.images.ic_hand_wave} />
          <CusText
            style={{ marginLeft: 12, flex: 1 }}
            fontWeight="600"
            color={"#fff"}
            content={`${R.strings().use} ${numberTurn || 0} ${
              R.strings().free_tries_to_test
            }`}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 14,
  },
  box_gradient: {
    ...styleView.rowItemCenter,
    // padding: 16,
    borderRadius: 8,
    height: 56,
    width: "100%",
  },
  box: {
    ...styleView.rowItemCenter,
    paddingHorizontal: 16,
    width: "100%",
  },
});

export default NumberTurnTries;
