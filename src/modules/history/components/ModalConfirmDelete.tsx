import BaseButton from "components/button";
import CusText from "components/text/CusText";
import React, { useEffect } from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Image } from "react-native";
import R from "src/assets/R";
import { colors, dimensions, styleView } from "src/theme";

interface Props {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}
const ModalConfirmDelete = (props: Props) => {
  const { visible, onClose, onDelete } = props;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        // setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Image style={styles.img_trash} source={R.images.ic_trash_confirm} />
          <CusText
            fontSize={20}
            fontWeight="500"
            lineHeight={30}
            letterSpacing={0.15}
            content={R.strings().delete_confirmation}
          />
          <CusText
            style={{ textAlign: "center", marginTop: 8 }}
            color={"#7D7D7D"}
            content={R.strings().content_confirm_delete}
          />
          <View style={styles.box_btn}>
            <BaseButton
              onPress={onClose}
              title={R.strings().cancel}
              buttonStyle={styles.btn_cancel}
              textStyle={styles.txt_btn}
            />
            <BaseButton
              onPress={onDelete}
              title={R.strings().delete}
              buttonStyle={[
                styles.btn_cancel,
                {
                  borderColor: colors.primary,
                  backgroundColor: colors.primary,
                },
              ]}
              textStyle={styles.txt_btn}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: dimensions.width - 40,
    backgroundColor: "white",
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  img_trash: {
    height: 120,
    width: 114,
    marginBottom: 27,
  },
  box_btn: {
    ...styleView.rowItemCenterBetween,
    width: "100%",
    marginTop: 32,
  },
  btn_cancel: {
    ...styleView.centerItem,
    width: "40%",
    borderWidth: 1,
    borderColor: "#7D7D7D",
    borderRadius: 16,
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  txt_btn: {
    color: "#1F1F29",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0.5,
  },
});

export default ModalConfirmDelete;
