import React from "react";
import { View, StyleSheet } from "react-native";

type Props = {};
const NotificationHelper = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationHelper;
