import { useLanguageStore } from "modules/setting/store/languageStore";
import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

type Props = {};
const TemplatesScreen = (props: Props) => {
  const {} = props;
  const locale = useLanguageStore((state) => state.locale);

  useEffect(() => {}, [locale]);
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
