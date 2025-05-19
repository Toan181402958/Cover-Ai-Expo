import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";

interface Props {
  visible: boolean;
  onClose: () => void;
}
export default function MyModal({ visible, onClose }: Props) {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
        <Text>Hello from modal!</Text>
        <Button title="Đóng" onPress={onClose} />
      </View>
    </Modal>
  );
}
