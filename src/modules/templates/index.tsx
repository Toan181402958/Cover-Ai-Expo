import React from "react";
import { View, StyleSheet, Text } from "react-native";

type Props = {};
const TemplatesScreen = (props: Props) => {
  const {} = props;
  return (
    <View style={styles.container}>
      <Text>Templates</Text>
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

export default TemplatesScreen;
