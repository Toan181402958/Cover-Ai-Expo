import React from "react";
import { View, StyleSheet, Text } from "react-native";

type Props = {};
const AccountScreen = (props: Props) => {
  const {} = props;
  return (
    <View style={styles.container}>
      <Text children={"account"} />
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

export default AccountScreen;
