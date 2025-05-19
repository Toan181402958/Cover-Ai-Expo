import React from "react";
import { AppTextProps } from "./AppText.props";
import { StyleSheet, Text } from "react-native";
const AppText: React.FC<AppTextProps> = ({
  children,
  size = 16,
  color = "#000",
  weight = "normal",
  style,
  ...props
}) => {
  return (
    <Text
      style={[
        styles.text,
        { fontSize: size, color, fontWeight: weight },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "System", // bạn có thể đổi sang font custom nếu dùng
  },
});
