import ScreenWrapper from "components/screen/ScreenWrapper";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import R from "src/assets/R";

type Props = {};
const CustomizeVoiceScreen = (props: Props) => {
  const {} = props;
  useEffect(() => {
    console.log("🚀 ~ useEffect ~ CustomizeVoiceScreen:", props);
  }, []);
  return (
    <ScreenWrapper
      title={R.strings().customize_voice}
      children={<View style={styles.container}></View>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomizeVoiceScreen;
