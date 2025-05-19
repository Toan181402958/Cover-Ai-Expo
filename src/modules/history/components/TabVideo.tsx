import React from "react";
import { View, StyleSheet } from "react-native";

type Props = {};
const TabVideo = (props: Props) => {
  const {} = props;
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
});

export default TabVideo;
