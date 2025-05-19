import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";
import * as Progress from "react-native-progress";
import CusText from "components/text/CusText";
import R from "src/assets/R";
import { colors, dimensions, styleView } from "src/theme";
import { isIphoneX } from "./iphonexHelper";
import { colorBlur } from "./funcHelper";
/*
  1. Create the config
*/
export const toastConfig: ToastConfig | undefined | any = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: "400",
      }}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
  /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
  cusToast: ({ text1, props }: { text1: string; props: any }) => (
    <View style={styles.cusToast}>
      <CusText fontWeight="500" color="#fff" content={text1} />
    </View>
  ),
  progress: ({ text1, props }: { text1: string; props: any }) => (
    <View style={styles.progress}>
      <Text
        style={styles.txt_download}
        children={R.strings().downloading + "..."}
      />
      <Progress.Bar
        style={{ marginTop: 4 }}
        width={dimensions.width * 0.9 - 32}
        height={4}
        color={colors.primary}
        borderWidth={0}
        unfilledColor={colorBlur(colors.primary, 0.2)}
        animationType="timing"
        indeterminate={true}
      />
    </View>
  ),
};
const styles = StyleSheet.create({
  cusToast: {
    ...styleView.centerItem,
    backgroundColor: "#09BD4E",
    // width: '70%',
    alignSelf: "center",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: dimensions.paddingTop - 18,
    paddingHorizontal: 24,
  },
  progress: {
    ...styleView.centerItem,
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 12,
    paddingVertical: 18,
    marginBottom: isIphoneX() ? 40 : 50,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  txt_download: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1F2128",
    marginBottom: 8,
  },
});
