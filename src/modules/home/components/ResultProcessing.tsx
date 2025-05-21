import { TypeCreate } from "modules/history/model/result.props";
import { View, StyleSheet, Text } from "react-native";
import * as Progress from "react-native-progress";
import { Image as ImageFast } from "expo-image";
import R from "src/assets/R";
import CusText from "components/text/CusText";
import ProcessingCircle from "components/processing/ProcessingCircle";
import { colors, styleView } from "src/theme";

interface Props {
  result?: TypeCreate;
}
const ResultProcessing = (props: Props) => {
  const { result } = props;
  return (
    <View style={styles.container}>
      <ImageFast
        style={styles.img_result}
        source={
          result?.thumbnail_voice
            ? { uri: result?.thumbnail_voice }
            : R.images.ic_app
        }
      />
      <View style={styles.body}>
        <CusText
          numberOfLines={1}
          fontSize={11}
          letterSpacing={0.5}
          color="#353546"
          content={`${R.strings().we_are_generating}...`}
        />
        <Text
          numberOfLines={1}
          style={styles.txt_name_song}
          children={result?.nameSong || R.strings().updating}
        />
        <CusText
          style={{ marginTop: 4 }}
          numberOfLines={1}
          fontSize={11}
          letterSpacing={0.5}
          color="#353546"
          content={result?.model_name || R.strings().updating}
        />
      </View>
      <ProcessingCircle size={28} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...styleView.rowItemCenter,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.primary,
    marginTop: 16,
    paddingVertical: 4,
    paddingLeft: 4,
    paddingRight: 16,
  },
  img_result: {
    height: 80,
    width: 80,
    borderRadius: 12,
  },
  body: {
    flex: 1,
    marginLeft: 16,
    marginRight: 12,
  },
  txt_name_song: {
    marginTop: 8,
    color: "#1F1F29",
    fontWeight: "500",
    letterSpacing: 0.25,
  },
});

export default ResultProcessing;
