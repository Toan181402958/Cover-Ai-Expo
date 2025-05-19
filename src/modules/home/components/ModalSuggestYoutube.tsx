import BaseButton from "components/button";
import CusText from "components/text/CusText";
import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import R from "src/assets/R";
import { colors, dimensions, styleView } from "src/theme";
import { isIphoneX } from "utils/iphonexHelper";

interface Props {
  visible: boolean;
  onClose: () => void;
}
const ModalSuggestYoutube = (props: Props) => {
  const { visible, onClose } = props;
  return (
    <Modal
      isVisible={visible}
      //   onBackdropPress={onClose}
      style={{
        width: "100%",
        margin: 0,
        justifyContent: "flex-end",
      }}
      animationOutTiming={200}
      animationInTiming={300}
      animationOut="slideOutDown"
      animationIn="slideInUp"
    >
      <View style={[styles.container]}>
        {/* <View
          style={{
            ...styleView.rowItemCenter,
            width: '100%',
            paddingHorizontal: 16,
          }}>
          <CusText
            style={{flex: 1}}
            fontSize={18}
            fontWeight="600"
            lineHeight={26}
            letterSpacing={0.15}
            content={R.strings().how_to_copy_a}
          />
          <CusText
            style={{marginLeft: 6}}
            fontSize={18}
            fontWeight="600"
            lineHeight={26}
            letterSpacing={0.15}
            color={colors.primary}
            content={R.strings().link_from_ytb}
          />
        </View> */}
        <Text style={styles.txt_title}>
          {R.strings().how_to_copy_a}{" "}
          <Text style={{ color: colors.primary }}>
            {R.strings().link_from_ytb}
          </Text>
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <BoxStep
            step={1}
            title={R.strings().tab_share_ytb_video}
            image={
              <Image
                style={{ height: 91.5, width: "100%" }}
                source={R.images.img_suggest_youtube1}
              />
            }
          />
          <BoxStep
            step={2}
            title={R.strings().then_tab_copy}
            image={
              <Image
                style={{ height: 91.5, width: "100%" }}
                source={R.images.img_suggest_youtube2}
              />
            }
          />
          <BoxStep
            step={3}
            title={R.strings().paste_ytb_link}
            image={
              <Image
                style={{ height: 91.5, width: "100%" }}
                source={R.images.img_suggest_youtube3}
              />
            }
          />
        </ScrollView>
        <BaseButton
          onPress={onClose}
          title={R.strings().got_it}
          buttonStyle={styles.btn_paste_link}
          textStyle={styles.txt_btn}
        />
      </View>
    </Modal>
  );
};

interface BoxStepProps {
  step: number;
  title: string;
  image: React.ReactNode;
}
const BoxStep = (props: BoxStepProps) => {
  const { step, title, image } = props;
  return (
    <View style={styles.box_step}>
      <View style={{ ...styleView.rowItemCenter, marginBottom: 24 }}>
        <View style={styles.box_number}>
          <CusText
            fontSize={14}
            fontWeight="600"
            // lineHeight={24}
            letterSpacing={0.5}
            content={step.toString()}
          />
        </View>
        <CusText
          style={{ flex: 1 }}
          fontWeight="500"
          lineHeight={21}
          letterSpacing={0.25}
          content={title}
        />
      </View>
      {!!image && image}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: isIphoneX() ? 40 : 30,
    alignItems: "center",
    paddingTop: 24,
    maxHeight: dimensions.height * 0.9,
  },
  btn_paste_link: {
    backgroundColor: colors.primary,
    marginTop: 24,
    borderRadius: 16,
    paddingVertical: 12,
    width: dimensions.width - 32,
    marginHorizontal: 16,
  },
  txt_btn: {
    color: "#1F1F29",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  box_step: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3, // Combines both shadows' opacity
    shadowRadius: 2, // Approximates the blur radius
    // Android elevation
    elevation: 3, // Adjust based on desired intensity
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  box_number: {
    ...styleView.centerItem,
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    marginRight: 10,
  },
  txt_title: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
  },
});

export default ModalSuggestYoutube;
