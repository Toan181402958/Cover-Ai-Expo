import CusText from "components/text/CusText";
import React from "react";
import { View, StyleSheet } from "react-native";
import { dimensions, styleView } from "src/theme";

type Props = {
  title: string;
};
const LoadingLanguage = (props: Props) => {
  const { title } = props;
  return (
    <View style={styles.container}>
      <CusText
        fontSize={14}
        fontWeight="600"
        color="#fff"
        content={`${title} ...`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...styleView.centerItem,
    height: dimensions.height,
    width: dimensions.width,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: "absolute",
  },
});

export default LoadingLanguage;
