import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";

type SkeletonBoxProps = {
  style?: ViewStyle;
};

const SkeletonBox = ({ style }: SkeletonBoxProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return <Animated.View style={[styles.skeleton, style, { opacity }]} />;
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
  },
});

export default SkeletonBox;
