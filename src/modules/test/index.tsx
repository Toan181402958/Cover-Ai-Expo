import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { useUserStore } from "src/store/userStore";
import { getUniqueId } from "utils/funcHelper";
import navigationHelper from "utils/navigationHelper";

type Props = {};
const TestScreen = (props: Props) => {
  const {} = props;
  const navigation = useNavigation();
  useEffect(() => {}, []);

  const onPlayAudio = async () => {
    console.log("check ", navigation.canGoBack());
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => navigationHelper.goBack()} title="goBack" />
      <Button onPress={onPlayAudio} title="Play audio" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});

export default TestScreen;
