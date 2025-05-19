import React from "react";
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors } from "src/theme";

type BaseButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  textColor?: string;
};

const BaseButton: React.FC<BaseButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  buttonStyle,
  textStyle,
  backgroundColor = colors.primary,
  textColor = colors.text.primary,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isDisabled ? "#cccccc" : backgroundColor },
        buttonStyle,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          <Text style={[styles.text, { color: textColor }, textStyle]}>
            {title}
          </Text>
          {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 4,
  },
});

export default BaseButton;
