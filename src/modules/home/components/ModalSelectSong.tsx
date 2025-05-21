import CusText from "components/text/CusText";
import React, { useEffect } from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Image } from "react-native";
import R from "src/assets/R";
import { colors, dimensions, globalStyle, styleView } from "src/theme";
import { Image as ImageFast } from "expo-image";
import BaseButton from "components/button";
import { colorBlur } from "utils/funcHelper";
interface Props {
  visible: boolean;
  songSelect: any;
  onClose: () => void;
  handlePasteLink: () => void;
}
const ModalSelectSong = (props: Props) => {
  const { visible, songSelect, onClose, handlePasteLink } = props;
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
          <CusText
            fontSize={18}
            fontWeight="500"
            lineHeight={26}
            letterSpacing={0.15}
            content={R.strings().select_song}
          />
          <TouchableOpacity style={styles.box_close} onPress={onClose}>
            <Image
              style={[globalStyle.icon_24, { tintColor: "#353546" }]}
              source={R.images.ic_x_close}
            />
          </TouchableOpacity>
          <ImageFast
            style={styles.img_song}
            source={
              songSelect?.thumbnails
                ? { uri: songSelect.thumbnails }
                : R.images.ic_app
            }
          />

          <CusText
            numberOfLines={1}
            fontSize={16}
            fontWeight="500"
            lineHeight={24}
            letterSpacing={0.5}
            content={songSelect?.title || ""}
          />
          <CusText
            style={{ marginTop: 4 }}
            fontSize={12}
            lineHeight={18}
            letterSpacing={0.25}
            color="#7D7D7D"
            content={`${songSelect?.viewCount || "0tr"} | ${
              songSelect?.duration || "00:00"
            }`}
          />
          <BaseButton
            onPress={handlePasteLink}
            title={R.strings().paste_link}
            buttonStyle={styles.btn_paste_link}
            textStyle={styles.txt_btn}
          />
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
  box_close: {
    ...styleView.centerItem,
    backgroundColor: colorBlur(colors.primary, 0.15),
    height: 36,
    width: 36,
    borderRadius: 18,
    position: "absolute",
    top: 24,
    right: 24,
  },
  img_song: {
    borderRadius: 16,
    width: "100%",
    height: dimensions.width * 0.4,
    marginTop: 24,
    marginBottom: 12,
  },
  btn_paste_link: {
    backgroundColor: colors.primary,
    marginTop: 24,
    borderRadius: 16,
    paddingVertical: 12,
    width: "100%",
  },
  txt_btn: {
    color: "#1F1F29",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0.5,
  },
});

export default ModalSelectSong;
