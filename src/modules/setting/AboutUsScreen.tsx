import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import R from "src/assets/R";
import * as Device from "expo-device";
import { dimensions, styleView } from "src/theme";
import ScreenWrapper from "components/screen/ScreenWrapper";

interface AboutUsScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const AboutUsScreen = ({ navigation }: AboutUsScreenProps) => {
  return (
    <ScreenWrapper
      title={R.strings().about_us}
      children={
        <View style={styles.container}>
          <Image style={styles.icStyle} source={R.images.ic_app} />
          <Text style={styles.textMain}>{R.strings().ai_cover}</Text>
          <Text style={styles.textTwo}>
            {R.strings().version}: {Device.osVersion}{" "}
          </Text>
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...styleView.centerItem,
  },
  icStyle: {
    width: 80,
    height: 80,
  },
  textMain: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: 700,
  },
  textTwo: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    marginBottom: 42,
  },
});

export default AboutUsScreen;
