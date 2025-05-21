import CusText from "components/text/CusText";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import R from "src/assets/R";
import { dimensions } from "src/theme";

type Props = {};
const SuggestRecord = (props: Props) => {
  const {} = props;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.wrapper}
      >
        <CusText
          fontSize={16}
          fontWeight="500"
          letterSpacing={0.5}
          content={R.strings().suggest_record_default}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
    marginTop: 12,
  },
  wrapper: {
    width: "100%",
    padding: 12,
  },
});

export default SuggestRecord;
