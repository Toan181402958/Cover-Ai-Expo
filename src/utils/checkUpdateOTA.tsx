import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as Updates from "expo-updates";

const CheckUpdateOTA = () => {
  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          Alert.alert(
            "Cập nhật mới",
            "Một bản cập nhật mới đã sẵn sàng. Bạn có muốn cập nhật ngay không?",
            [
              {
                text: "Không",
                style: "cancel",
                onPress: () => {},
              },
              {
                text: "Cập nhật",
                onPress: async () => {
                  try {
                    await Updates.fetchUpdateAsync();
                    Alert.alert(
                      "Đang khởi động lại...",
                      "Ứng dụng sẽ tự khởi động lại để áp dụng cập nhật."
                    );
                    await Updates.reloadAsync();
                  } catch (e) {
                    Alert.alert(
                      "Lỗi khi cập nhật",
                      "Không thể tải bản cập nhật."
                    );
                  }
                },
              },
            ]
          );
        } else {
        }
      } catch (e) {
        console.log("Lỗi khi kiểm tra cập nhật:", e);
      }
    };

    checkForUpdate();
  }, []);
  return <></>;
};

const styles = StyleSheet.create({
  container: {},
});

export default CheckUpdateOTA;
