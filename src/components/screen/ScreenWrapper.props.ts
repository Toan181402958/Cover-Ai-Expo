import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type ScreenWrapperProps = {
    title?: string;
    showBackButton?: boolean;
    showHeader?: boolean;
    loading?: boolean;
    children: React.ReactNode;
  
    // Style overrides
    containerStyle?: StyleProp<ViewStyle>;
    headerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    contentStyle?: StyleProp<ViewStyle>;
  
    // Custom header
    customHeader?: React.ReactNode;
  
    onBackPress?: () => void;
  };