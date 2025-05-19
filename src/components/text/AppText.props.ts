import { StyleProp, TextProps, TextStyle } from "react-native";

export type AppTextProps = TextProps & {
    children: React.ReactNode;
    size?: number;
    color?: string;
    weight?: TextStyle['fontWeight'];
    style?: StyleProp<TextStyle>;
  };