import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { useTranslation } from "react-i18next";
import R from "src/assets/R";
import { dataLocale, TYPE_LANGUAGE } from "constants/constants";
import EN from "src/assets/locales/en.json";
import DE from "src/assets/locales/de.json";
import ES from "src/assets/locales/es.json";
import FR from "src/assets/locales/fr.json";
import IT from "src/assets/locales/it.json";
import VI from "src/assets/locales/vi.json";
import JA from "src/assets/locales/ja.json";
import CusText from "components/text/CusText";
import { colors, dimensions, globalStyle, styleView } from "src/theme";
import HeaderLanguage from "./components/HeaderLanguage";
import LoadingLanguage from "./components/LoadingLanguage";
import { getLocales, getCalendars } from "expo-localization";
import { useLanguageStore } from "./store/languageStore";

type Props = {};

const LanguageScreen = () => {
  const { locale, updateLocale } = useLanguageStore();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [titleLoading, setTitleLoading] = useState<string>("");
  const languages = [
    {
      title: R.strings().german,
      icon: R.images.ic_german,
      isSelected: false,
      value: TYPE_LANGUAGE.DE,
    },
    {
      title: `${R.strings().english} (${R.strings().default})`,
      icon: R.images.ic_english,
      isSelected: false,
      value: TYPE_LANGUAGE.EN,
    },
    {
      title: R.strings().spanish,
      icon: R.images.ic_spanish,
      isSelected: false,
      value: TYPE_LANGUAGE.ES,
    },
    {
      title: R.strings().french,
      icon: R.images.ic_french,
      isSelected: false,
      value: TYPE_LANGUAGE.FR,
    },
    {
      title: R.strings().italian,
      icon: R.images.ic_italian,
      isSelected: false,
      value: TYPE_LANGUAGE.IT,
    },
    {
      title: R.strings().vietnamese,
      icon: R.images.ic_vietnamese,
      isSelected: false,
      value: TYPE_LANGUAGE.VI,
    },
    {
      title: R.strings().japanese,
      icon: R.images.ic_japanese,
      isSelected: false,
      value: TYPE_LANGUAGE.JA,
    },
  ];
  const [dataLanguage, setDataLanguage] = useState(languages);
  const updateDataLanguage = (locale: string) => {
    const titleGerma = R.strings().german;
    const titleEnglish = `${R.strings().english} (${R.strings().default})`;
    const titleSpanish = R.strings().spanish;
    const titleFrench = R.strings().french;
    const titleItalian = R.strings().italian;
    const titleVietnamese = R.strings().vietnamese;
    const titleJapanese = R.strings().japanese;
    const languagesUpdate = [
      {
        title: titleGerma,
        icon: R.images.ic_german,
        isSelected: false,
        value: TYPE_LANGUAGE.DE,
      },
      {
        title: titleEnglish,
        icon: R.images.ic_english,
        isSelected: false,
        value: TYPE_LANGUAGE.EN,
      },
      {
        title: titleSpanish,
        icon: R.images.ic_spanish,
        isSelected: false,
        value: TYPE_LANGUAGE.ES,
      },
      {
        title: titleFrench,
        icon: R.images.ic_french,
        isSelected: false,
        value: TYPE_LANGUAGE.FR,
      },
      {
        title: titleItalian,
        icon: R.images.ic_italian,
        isSelected: false,
        value: TYPE_LANGUAGE.IT,
      },
      {
        title: titleVietnamese,
        icon: R.images.ic_vietnamese,
        isSelected: false,
        value: TYPE_LANGUAGE.VI,
      },
      {
        title: titleJapanese,
        icon: R.images.ic_japanese,
        isSelected: false,
        value: TYPE_LANGUAGE.JA,
      },
    ];
    const listLocales = getLocales();
    const localeDevice = listLocales[0].languageCode?.toLocaleLowerCase();
    if (!!dataLocale.find((item) => item.value === localeDevice)) {
      const newList = languagesUpdate.map((val) => ({
        ...val,
        isSelected: val?.value == locale,
        title:
          val.value == TYPE_LANGUAGE.EN ? `${R.strings().english}` : val.title,
      }));
      setDataLanguage(newList);
      return;
    }
    const newList = languagesUpdate.map((val) => ({
      ...val,
      isSelected: val?.value == locale,
    }));
    setDataLanguage(newList);
  };
  useEffect(() => {
    updateDataLanguage(locale);
  }, [locale]);
  const handleSave = () => {
    const itemFind = dataLanguage.find((val) => val.isSelected);
    upLoading(itemFind?.value);
    setLoading(true);
    setTimeout(() => {
      if (!!itemFind) {
        updateLocale(itemFind.value);
        setLoading(false);
      }
    }, 1500);
  };

  const upLoading = (value?: string) => {
    console.log(EN.resetting_language);
    var title = "";
    switch (value) {
      case TYPE_LANGUAGE.DE:
        title = DE.resetting_language;
        break;
      case TYPE_LANGUAGE.EN:
        title = EN.resetting_language;
        break;
      case TYPE_LANGUAGE.ES:
        title = ES.resetting_language;
        break;
      case TYPE_LANGUAGE.FR:
        title = FR.resetting_language;
        break;
      case TYPE_LANGUAGE.IT:
        title = IT.resetting_language;
        break;
      case TYPE_LANGUAGE.VI:
        title = VI.resetting_language;
        break;
      case TYPE_LANGUAGE.JA:
        title = JA.resetting_language;
        break;
      default:
        break;
    }
    setTitleLoading(title);
  };

  const disableSave = false;
  // dataLanguage.find(val => val.isSelected)?.value == uiStore.locale;
  const _renderItem = ({
    item,
    index,
  }: {
    item: {
      icon: ImageSourcePropType;
      title: string;
      isSelected: boolean;
      value: string;
    };
    index: number;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setDataLanguage((prev) =>
            prev.map((val) => ({
              ...val,
              isSelected: val.value === item.value,
            }))
          );
        }}
        key={index}
        style={[styles.item, item.isSelected && styles.item_selected]}
      >
        <Image style={styles.img_national_flag} source={item.icon} />
        <CusText
          style={{ flex: 1 }}
          fontSize={16}
          fontWeight="500"
          lineHeight={24}
          letterSpacing={0.5}
          color="#363845"
          content={item.title}
        />
        <Image
          style={[globalStyle.icon_48]}
          source={
            item.isSelected
              ? R.images.ic_radio_checked
              : R.images.ic_radio_check
          }
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderLanguage handleSave={handleSave} disableSave={disableSave} />
      <FlatList
        scrollEnabled={false}
        data={dataLanguage}
        keyExtractor={(item, index) => index.toString()}
        renderItem={_renderItem}
        removeClippedSubviews={false}
      />
      {!!isLoading && <LoadingLanguage title={titleLoading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    height: dimensions.height,
    width: dimensions.width,
  },
  list: {
    width: "100%",
  },
  item: {
    ...styleView.rowItemCenter,
    marginTop: 16,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#B5B7C5",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 8,
  },
  item_selected: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  img_national_flag: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 12,
  },
});

export default LanguageScreen;
