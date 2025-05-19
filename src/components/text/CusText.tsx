import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

/**
 * Props interface for CusText component
 * @interface Props
 */
type Props = {
  /** Text content to be displayed */
  content: string;
  /** Additional custom styles to be applied to the text */
  style?: StyleProp<TextStyle>;
  /** Font size of the text */
  fontSize?: number;
  /** Font weight of the text. Available options: 400, 500, 600, 700, 800 */
  fontWeight?: "400" | "500" | "600" | "700" | "800" | "bold";
  /** Line height of the text */
  lineHeight?: number;
  /** Font family to be used. Default is 'BeVietnamPro-Regular' */
  fontFamily?:
    | "BeVietnamPro-Regular"
    | "BeVietnamPro-Medium"
    | "BeVietnamPro-SemiBold";
  /** Spacing between letters. Default is 0.25 */
  letterSpacing?: number;
  /** Maximum number of lines to display. Text will be truncated if it exceeds this number */
  numberOfLines?: number;
  /** Color of the text. Default is '#1F2128' */
  color?: string;
  /** If true, displays a loading skeleton instead of the text */
  isLoading?: boolean;

  ref?: React.LegacyRef<Text> | undefined;
  /** Callback function to be called when the text is pressed */
  onpress?: () => void;
};

/**
 * Custom Text component that extends React Native's Text component with additional features
 * @component
 * @example
 * <CusText
 *   content="Hello World"
 *   fontSize={16}
 *   fontWeight="600"
 *   color="#000000"
 * />
 */
const CusText = (props: Props) => {
  const {
    content,
    style,
    fontSize,
    fontWeight,
    lineHeight,
    fontFamily = "BeVietnamPro-Regular",
    letterSpacing = 0.25,
    numberOfLines = undefined,
    color = "#1F2128",
    isLoading,
    ref,
    onpress,
  } = props;
  return (
    <Text
      ref={ref}
      onPress={onpress}
      numberOfLines={numberOfLines}
      style={[
        styles.txt,
        style,
        {
          fontSize: fontSize,
          fontWeight: fontWeight,
          lineHeight,
          color,
          fontFamily,
          letterSpacing,
        },
      ]}
      children={content}
    />
  );
};

const styles = StyleSheet.create({
  txt: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
    color: "#000",
  },
});

export default CusText;
