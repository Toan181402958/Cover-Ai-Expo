import { isIphoneX } from "utils/iphonexHelper";
import { StyleSheet, ViewStyle } from "react-native";
import { colors } from "./colors";

type styleViewKey =
  | "centerItem"
  | "rowItem"
  | "rowItemBetween"
  | "rowItemCenterBetween"
  | "rowItemAround"
  | "rowItemEvenly"
  | "sharedStyle"
  | "shadowStyle"
  | "paddingBottomMain"
  | "paddingBottomScreen"
  | "rowItemCenter"
  | "icon24";

export const globalStyle = {
  block: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
  },
  icon_18: {
    height: 18,
    width: 18,
  },
  icon_20: {
    height: 20,
    width: 20,
  },
  icon_24: {
    height: 24,
    width: 24,
  },
  icon_26: {
    height: 26,
    width: 26,
  },
  icon_30: {
    height: 30,
    width: 30,
  },
  icon_32: {
    height: 32,
    width: 32,
  },
  icon_40: {
    height: 40,
    width: 40,
  },
  icon_48: {
    height: 48,
    width: 48,
  },
};

export const styleView: Record<styleViewKey, ViewStyle> = {
  centerItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  rowItem: {
    flexDirection: "row",
  },
  rowItemCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowItemBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowItemCenterBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowItemAround: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  rowItemEvenly: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  sharedStyle: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  paddingBottomMain: {
    paddingBottom: "20%",
  },
  paddingBottomScreen: {
    paddingBottom: isIphoneX() ? 20 : 0,
  },
  icon24: {
    height: 24,
    width: 24,
  },
};
