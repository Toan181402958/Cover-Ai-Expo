import ScreenWrapper from "components/screen/ScreenWrapper";
import CusText from "components/text/CusText";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import R from "src/assets/R";
import SuggestRecord from "./components/SuggestRecord";
import { styleView } from "src/theme";
import LottieView from "lottie-react-native";
import {
  AudioModule,
  RecordingPresets,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import navigationHelper from "utils/navigationHelper";
import { ROUTER_APP } from "constants/constants";

const TIME_MIN_RECORD = 10;

type Props = {};
const RecordVoiceScreen = (props: Props) => {
  const {} = props;
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const audioRecorderState = useAudioRecorderState(audioRecorder);

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert(R.strings().micro_required);
      }
    })();
  }, []);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (isRecording) {
      intervalId = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRecording]);

  const checkPermissionsAndStartRecording = async () => {
    const status = await AudioModule.requestRecordingPermissionsAsync();
    if (!!status.granted) {
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      setIsRecording(true);
      setRecordingTime(0);
    }
    console.log("🚀 ~ checkPermissionsAndStartRecording ~ status:", status);
  };

  const stopRecording = () => {
    audioRecorder.pause();
    setIsRecording(false);
  };
  const pauseRecord = () => {
    audioRecorder.pause();
  };

  const handleRecordPress = async () => {
    console.log("🚀 ~ handleRecordPress ~ audioRecorder:", audioRecorder);
    console.log("🚀 ~ handleRecordPress ~ isRecording:", isRecording);

    if (recordingTime === 0) {
      await checkPermissionsAndStartRecording();
    } else {
      if (isRecording) {
        stopRecording();
        if (recordingTime >= TIME_MIN_RECORD) {
          const file = {
            uri: audioRecorder.uri,
            id: audioRecorder.id,
          };
          navigationHelper.navigate(ROUTER_APP.CUSTOMIZE_VOICE, { file });
        }
      } else {
        await audioRecorder.prepareToRecordAsync();
        audioRecorder.record();
      }
    }
  };
  const renderRecord = () => {
    return (
      <View style={styles.box_record}>
        <CusText
          fontSize={18}
          fontWeight="600"
          content={`${R.strings().recording_time}: ${recordingTime}s`}
        />
        <View style={styles.circleAnimationContainer}>
          {isRecording && (
            <LottieView
              source={R.images.ic_processing}
              autoPlay
              loop
              style={styles.circleAnimation}
            />
          )}
          <TouchableOpacity
            onPress={handleRecordPress}
            style={styles.boxRecord}
          >
            <Image source={R.images.ic_record} style={styles.icMain} />
          </TouchableOpacity>
        </View>
        <CusText
          fontSize={18}
          fontWeight="600"
          content={
            recordingTime === 0
              ? R.strings().press_to_start_record
              : recordingTime >= TIME_MIN_RECORD
              ? isRecording
                ? R.strings().press_to_stop_record
                : R.strings().done
              : isRecording
              ? R.strings().press_to_pause_record
              : `${R.strings().the_recording_duration_than_30s} \n ${
                  R.strings().press_to_resume_record
                }`
          }
        />
      </View>
    );
  };
  return (
    <ScreenWrapper
      title={R.strings().record_your_voice}
      children={
        <View style={styles.container}>
          <CusText
            fontSize={16}
            fontWeight="500"
            content={R.strings().please_record_lease_30_s}
          />
          <SuggestRecord />
          {renderRecord()}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  box_record: {
    width: "100%",
    flex: 1,
    ...styleView.centerItem,
  },
  circleAnimationContainer: {
    width: 180,
    height: 180,
    ...styleView.centerItem,
  },
  circleAnimation: {
    width: 180,
    height: 180,
    ...styleView.centerItem,
  },
  boxRecord: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 180,
    height: 180,
    ...styleView.centerItem,
  },
  icMain: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});

export default RecordVoiceScreen;
