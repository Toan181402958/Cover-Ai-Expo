import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import AppNavigator from "src/navigation";
import CheckUpdateOTA from "utils/checkUpdateOTA";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { toastConfig } from "utils/ToastConfig";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const notificationListener = useRef<Notifications.Subscription>(null);
  const responseListener = useRef<Notifications.Subscription>(null);

  //register
  const registerForPushNotificationAsync = async () => {
    if (!Device.isDevice) {
      console.log("Must use physical device for Push Notifications");
      return null;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token");
      return null;
    }
    const tokenData = await Notifications.getExpoPushTokenAsync();
    console.log("Expo Push Token:", tokenData.data);
    return tokenData.data;
  };

  //request permission notification
  useEffect(() => {
    registerForPushNotificationAsync().then((token) => {
      // console.log("🚀 ~ registerForPushNotificationAsync ~ token:", token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification Received:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("User tapped notification:", response);
      });
  }, []);
  return (
    <SafeAreaProvider>
      <CheckUpdateOTA />
      <AppNavigator />
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
