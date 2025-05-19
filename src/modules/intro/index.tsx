import React from "react";
import { View, StyleSheet, Text } from "react-native";

type Props = {};
const IntroScreen = (props: Props) => {
  const {} = props;
  return (
    <View style={styles.container}>
      <Text children={"home"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IntroScreen;
