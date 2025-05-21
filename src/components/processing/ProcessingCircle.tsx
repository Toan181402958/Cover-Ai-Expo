import React, { useRef, useEffect } from "react";
import { Animated, Easing, View } from "react-native";
import * as Progress from "react-native-progress";
import { colors } from "src/theme";
import { colorBlur } from "utils/funcHelper";

interface Props {
  size?: number;
}
const ProcessingCircle = (props: Props) => {
  const { size = 40 } = props;
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={{}}>
      <View
        style={{
          position: "absolute",
        }}
      >
        <Progress.Circle
          size={size}
          progress={1}
          color={colorBlur(colors.primary, 0.2)}
          borderWidth={0}
          thickness={3.5}
        />
      </View>

      <Animated.View
        style={{
          transform: [{ rotate: rotateInterpolate }],
        }}
      >
        <Progress.Circle
          size={size}
          progress={0.25}
          color={colors.primary}
          borderWidth={0}
          thickness={3.5}
          strokeCap="round"
        />
      </Animated.View>
    </View>
  );
};

export default ProcessingCircle;
