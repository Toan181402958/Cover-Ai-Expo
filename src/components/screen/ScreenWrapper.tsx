import React from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import R from "src/assets/R";
import { colors, dimensions, globalStyle } from "src/theme";
import navigationHelper from "utils/navigationHelper";
import { ScreenWrapperProps } from "./ScreenWrapper.props";

const ScreenWrapper: React.FC<ScreenWrapperProps> = (props) => {
  const {
    title = "",
    showBackButton = true,
    showHeader = true,
    loading = false,
    children,
    containerStyle,
    headerStyle,
    titleStyle,
    contentStyle,
    customHeader,
    onBackPress,
  } = props;

  //action back
  const handleGoBack = () => {
    if (onBackPress) return onBackPress();
    if (navigationHelper.canGoBack()) {
      navigationHelper.goBack();
    }
  };
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Header */}
      {showHeader &&
        (customHeader ? (
          <>{customHeader}</>
        ) : (
          <View style={[styles.header, headerStyle]}>
            {showBackButton ? (
              <TouchableOpacity
                onPress={handleGoBack}
                style={styles.backButton}
              >
                <Image
                  style={globalStyle.icon_24}
                  source={R.images.ic_arrow_left}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.backButtonPlaceholder} />
            )}
            <Text style={[styles.title, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
            <View style={styles.backButtonPlaceholder} />
          </View>
        ))}
      <View style={[styles.body, contentStyle]}>{children}</View>
      <Modal transparent visible={loading} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>{R.strings().loading}...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingTop: dimensions.paddingTop,
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  backButton: {
    padding: 8,
  },
  backButtonPlaceholder: {
    width: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  body: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    backgroundColor: "#333",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 8,
    fontSize: 16,
  },
});

export default ScreenWrapper;
