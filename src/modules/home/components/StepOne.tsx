import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import Toast from "react-native-toast-message";
import TabSwitcher from "./TabSwitcher";
import R from "src/assets/R";
import navigationHelper from "utils/navigationHelper";
import { colors, dimensions, globalStyle, styleView } from "src/theme";
import CusText from "components/text/CusText";
import { useHome } from "../hooks/useHome";
import { useHomeStore } from "../store/homeStore";
import { ROUTER_APP } from "constants/constants";

interface Props {
  linkYtb: string;
  enterText: string;
  disable: boolean;
  setLinkYtb: React.Dispatch<React.SetStateAction<string>>;
  setEnterText: React.Dispatch<React.SetStateAction<string>>;
  handlePaste: () => void;
  onTabChange?: (tab: "song" | "text") => void;
}
const StepOne = (props: Props) => {
  const {
    linkYtb,
    enterText,
    disable = false,
    setLinkYtb,
    setEnterText,
    handlePaste,
    onTabChange,
  } = props;

  const inputRef = useRef<any>(null);
  const [tab, setTab] = useState<"song" | "text">("song");
  useEffect(() => {
    if (tab == "text" && !disable) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
    onTabChange?.(tab);
  }, [tab]);

  const renderTabPickSong = () => {
    return (
      <View style={styles.box_song}>
        <TouchableOpacity
          style={styles.box_question}
          onPress={() => {
            // setShowSuggestYtb(true);
            useHomeStore.getState().changeShowSuggestYtb(true);
          }}
        >
          <Image
            style={globalStyle.icon_26}
            source={R.images.ic_question_new}
          />
        </TouchableOpacity>
        <View style={[styles.box_link]}>
          <TouchableOpacity
            disabled={disable}
            style={styles.boxSearch}
            onPress={() => {
              navigationHelper.navigate(ROUTER_APP.SEARCH_YOUTUBE, {
                handlePasteLink: (resultValue: any) => {
                  if (!!resultValue?.videoUrl) {
                    setLinkYtb(resultValue?.videoUrl);
                  } else {
                    setTimeout(
                      () => {
                        Toast.show({
                          text1: R.strings().paste_err,
                          type: "error",
                        });
                      },
                      Platform.OS === "ios" ? 1000 : 300
                    );
                    return;
                  }
                },
              });
            }}
          >
            <CusText
              letterSpacing={0.25}
              lineHeight={21}
              color={!!linkYtb ? "#1F2128" : "#7D7D7D"}
              numberOfLines={1}
              content={linkYtb || R.strings().search_or_paste_ytb_link}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePaste} style={styles.boxButton}>
            <CusText fontWeight="600" content={R.strings().paste} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderTabPickText = () => {
    return (
      <View style={styles.box_text}>
        <View style={styles.box_input}>
          <TextInput
            ref={inputRef}
            editable={!disable}
            style={styles.input}
            value={enterText}
            onChangeText={setEnterText}
            multiline={true}
            underlineColorAndroid="transparent"
            placeholder={R.strings().type_your_text}
            placeholderTextColor={"#7D7D7D"}
          />
          {!!enterText && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CusText
                fontSize={12}
                fontWeight="500"
                lineHeight={18}
                color="#353546"
                letterSpacing={0.25}
                content={`${enterText?.length}`}
              />
              <TouchableOpacity
                onPress={() => {
                  setEnterText("");
                }}
              >
                <Image
                  style={globalStyle.icon_24}
                  source={R.images.ic_x_bold}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ ...styleView.rowItem }}>
        <Image source={R.images.ic_match} style={styles.icMatch} />
        <CusText
          fontSize={16}
          fontWeight="bold"
          lineHeight={24}
          letterSpacing={0.5}
          color="#000"
          content={R.strings().step_1_pick_song}
        />
      </View>
      <TabSwitcher
        changeTab={(tab) => {
          setTab(tab);
        }}
      />
      {tab == "song" && <>{renderTabPickSong()}</>}
      {tab == "text" && <>{renderTabPickText()}</>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 12,
  },
  icMatch: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  box_song: {
    width: "100%",
  },
  box_text: {
    width: "100%",
  },
  box_question: {
    alignSelf: "flex-end",
  },
  box_link: {
    ...styleView.rowItemCenter,
    marginTop: 2,
  },
  boxSearch: {
    flex: 1,
    paddingLeft: 11,
    borderRadius: 10,
    height: 46,
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
  },
  boxButton: {
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 17,
    justifyContent: "center",
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  box_input: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 12,
    paddingBottom: 16,
    paddingTop: 12,
    marginTop: 24,
    borderRadius: 12,
  },
  input: {
    width: "100%",
    textAlignVertical: "top",
    minHeight: dimensions.width * 0.2,
    maxHeight: dimensions.width * 0.4,
  },
});

export default StepOne;
