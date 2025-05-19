import ScreenWrapper from "components/screen/ScreenWrapper";
import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import WebView from "react-native-webview";
import R from "src/assets/R";
import { colors, dimensions, globalStyle, styleView } from "src/theme";
import { colorBlur } from "utils/funcHelper";
import navigationHelper from "utils/navigationHelper";

const WebviewScreen = (props: any) => {
  let web_url = props.route.params?.web_url;
  const web_title = props.route.params?.web_title;
  useEffect(() => {
    console.log("🚀 ~ useEffect ~ WebviewScreen:", props);
  }, []);
  return (
    <ScreenWrapper
      title={web_title || ""}
      children={
        <View style={styles.container}>
          <WebView
            style={styles.body}
            startInLoadingState={true}
            showsHorizontalScrollIndicator={false}
            scalesPageToFit
            // renderLoading={() => {
            //   return (
            //     <View
            //       style={{
            //         flex: 1,
            //         backgroundColor: "red",
            //         width: dimensions.width,
            //         height: dimensions.height,
            //       }}
            //     ></View>
            //   );
            // }}
            source={{ uri: web_url }}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    ...styleView.rowItemCenter,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  btn_back: {
    ...styleView.centerItem,
    backgroundColor: colorBlur(colors.primary, 0.3),
    height: 30,
    width: 30,
    borderRadius: 18,
  },
  ic_back: {
    ...globalStyle.icon_20,
    tintColor: colors.white,
  },
  body: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});

export default WebviewScreen;
