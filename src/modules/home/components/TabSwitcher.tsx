import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import R from "src/assets/R";
import { colors } from "src/theme";

const screenWidth = Dimensions.get("window").width;
const TAB_WIDTH = screenWidth * 0.3;

interface Props {
  changeTab: (tab: "song" | "text") => void;
}
const TabSwitcher = (props: Props) => {
  const { changeTab } = props;
  const [activeTab, setActiveTab] = useState<"song" | "text">("song");
  const translateX = useSharedValue(0);

  const onPressTab = (tab: "song" | "text") => {
    setActiveTab(tab);
    translateX.value = withTiming(tab === "song" ? 0 : TAB_WIDTH, {
      duration: 250,
    });
    changeTab(tab);
  };

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Animated.View style={[styles.slider, sliderStyle]} />
        <TouchableOpacity style={styles.tab} onPress={() => onPressTab("song")}>
          <Text
            style={[
              styles.text,
              activeTab === "song" ? styles.activeText : styles.inactiveText,
            ]}
          >
            {R.strings().pick_song}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => onPressTab("text")}>
          <Text
            style={[
              styles.text,
              activeTab === "text" ? styles.activeText : styles.inactiveText,
            ]}
          >
            {R.strings().enter_text}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    // marginVertical: 20,
    marginTop: 12,
  },
  container: {
    flexDirection: "row",
    width: TAB_WIDTH * 2,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    overflow: "hidden",
    position: "relative",
  },
  slider: {
    position: "absolute",
    width: TAB_WIDTH,
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 10,
    zIndex: 0,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    fontWeight: "500",
    fontSize: 14,
  },
  activeText: {
    color: "#1F1F29",
  },
  inactiveText: {
    color: "#7D7D7D",
  },
});

export default TabSwitcher;
