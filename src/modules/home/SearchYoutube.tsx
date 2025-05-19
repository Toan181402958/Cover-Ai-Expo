import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  FlatList,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import R from "src/assets/R";
import { colors, dimensions, globalStyle, styleView } from "src/theme";
import SkeletonBox from "components/skeleton";
import { Image as ImageFast } from "expo-image";
import CusText from "components/text/CusText";
import ModalSelectSong from "./components/ModalSelectSong";
import { getDataYoutube } from "./HomeApi";

const LIMIT = 10;
const TYPE_BODY = {
  SUGGESTED: "suggested",
  SUGGEST_SEARCH: "suggest_search",
  RESULT_SEARCH: "result_search",
};

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: {
    key: string;
    name: string;
    path: string;
    params: any;
  };
}
const SearchYoutubeScreen = (props: Props) => {
  const { navigation } = props;

  const inputRef = useRef<TextInput>(null);

  const [keySearch, setKeySearch] = useState<string>("");
  const [typeBody, setTypeBody] = useState(TYPE_BODY.SUGGESTED);
  const [body, setBody] = useState({
    name: "",
    limit: LIMIT,
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [dataSuggested, setDataSuggested] = useState<Array<any>>(
    [1, 2, 3, 4].map((val) => ({ isLoading: true }))
  );
  const [pageToken, setPageToken] = useState<string>("");
  const [dataSuggestSearch, setDataSuggestSearch] = useState<Array<any>>([]);
  const [loadingMoreResult, setLoadingMoreResult] = useState(false);
  const [pageTokenResult, setPageTokenResult] = useState<string>("");
  const [hasNextPageResult, setHasNextPageResult] = useState(true);
  const [dataResultSearch, setDataResultSearch] = useState<Array<any>>([]);
  const [isLoadingResult, setLoadingResult] = useState<boolean>(false);

  const [isVisible, setVisible] = useState<boolean>(false);
  const [songSelect, setSongSelect] = useState<any>({});

  const getDataSuggested = async (page?: string) => {
    try {
      const response = await getDataYoutube({
        ...body,
        pageToken: page || "",
      });
      const data = response?.items;
      if (!!page) {
        setDataSuggested((prev) => [...prev, ...data]);
      } else {
        setDataSuggested(data);
      }
      setPageToken(response?.nextPageToken);
      setHasNextPage(!!response?.nextPageToken);
    } catch (err) {}
  };
  const getDataSuggestSearch = async () => {
    try {
      const response = await getDataYoutube({
        name: keySearch,
        limit: LIMIT,
      });
      const data = response?.items;
      setDataSuggestSearch(data);
    } catch (err) {}
  };
  const getDataResultSearch = async (key: string, page: string) => {
    try {
      const response = await getDataYoutube({
        name: key,
        limit: LIMIT,
        pageToken: page || "",
      });
      const data = response?.items;
      if (!!page) {
        setDataResultSearch((prev) => [...prev, ...data]);
      } else {
        setDataResultSearch(data);
      }
      setPageTokenResult(response?.nextPageToken);
      setHasNextPageResult(!!response?.nextPageToken);
      setLoadingResult(false);
    } catch (err) {}
  };
  const loadMore = async () => {
    if (loadingMore || !hasNextPage) return;
    setLoadingMore(true);
    getDataSuggested(pageToken);
    setLoadingMore(false);
  };
  const loadMoreResult = async () => {
    //check load more duplicate
    if (!!isLoadingResult) return;
    if (loadingMoreResult || !hasNextPageResult) return;
    setLoadingMoreResult(true);
    getDataResultSearch(keySearch, pageTokenResult);
    setLoadingMoreResult(false);
  };
  useEffect(() => {
    getDataSuggested();
    setTimeout(() => {
      inputRef.current.focus();
    }, 500);
  }, []);
  //useEffect search
  React.useEffect(() => {
    if (typeBody != TYPE_BODY.SUGGEST_SEARCH) return;
    const delayDebounceFn = setTimeout(() => {
      getDataSuggestSearch();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [keySearch]);
  const onChangeText = (text: string) => {
    if (!!text.trim()) {
      setTypeBody(TYPE_BODY.SUGGEST_SEARCH);
      setDataSuggestSearch([1, 2, 3, 4].map((val) => ({ isLoading: true })));
    } else {
      setTypeBody(TYPE_BODY.SUGGESTED);
    }
    setKeySearch(text);
  };
  const handleSearch = () => {
    setTypeBody(TYPE_BODY.RESULT_SEARCH);
    setDataResultSearch([1, 2, 3, 4].map((val) => ({ isLoading: true })));
    setLoadingResult(true);
    getDataResultSearch(keySearch, "");
  };

  const renderSearch = () => {
    return (
      <View style={styles.box_search}>
        <TouchableOpacity
          style={styles.box_back}
          onPress={() => navigation.goBack()}
        >
          <Image style={styles.ic_back} source={R.images.ic_arrow_left} />
        </TouchableOpacity>
        <View style={{ flex: 1, ...styleView.rowItemCenter }}>
          <TextInput
            ref={inputRef}
            // autoFocus
            style={styles.input}
            value={keySearch}
            onChangeText={onChangeText}
            placeholder={R.strings().search_or_paste_ytb_link}
            placeholderTextColor={"#7D7D7D"}
            returnKeyType={"search"}
            onSubmitEditing={handleSearch}
            blurOnSubmit={true}
          />
          {!!keySearch && (
            <TouchableOpacity
              style={styles.box_clear_input}
              onPress={() => {
                setKeySearch("");
                setTypeBody(TYPE_BODY.SUGGESTED);
              }}
            >
              <Image style={globalStyle.icon_24} source={R.images.ic_x_bold} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  const _renderItemSuggested = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    if (!!item?.isLoading) {
      return (
        <TouchableOpacity style={styles.item} activeOpacity={1}>
          <SkeletonBox style={styles.img_thumb} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <SkeletonBox
              style={{ width: "100%", height: 28, borderRadius: 4 }}
            />
            <SkeletonBox
              style={{
                width: "60%",
                height: 14,
                borderRadius: 4,
                marginTop: 8,
              }}
            />
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.item}
        key={index}
        onPress={() => {
          setSongSelect(item);
          setVisible(true);
        }}
      >
        {/* <FastImage style={styles.img_thumb} source={{uri: item?.thumbnails}} /> */}
        <ImageFast
          style={styles.img_thumb}
          source={{ uri: item?.thumbnails }}
        />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text
            style={styles.txt_name}
            numberOfLines={2}
            children={`${item?.title}`}
          />
          <Text
            style={styles.txt_des}
            children={`${item?.viewCount} | ${item?.duration}`}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator style={{ margin: 16 }} />;
  };
  const renderSuggested = () => {
    return (
      <View style={styles.box_suggested}>
        <Text style={styles.txt_suggested} children={R.strings().suggested} />
        <FlatList
          style={styles.list_suggested}
          data={dataSuggested}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItemSuggested}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={() => (
            <View style={[styles.line, { marginTop: 0, marginBottom: 0 }]} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  const _renderItemSuggestSearch = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    if (!!item?.isLoading) {
      return (
        <TouchableOpacity style={styles.item} activeOpacity={1}>
          <Image style={styles.ic_search} source={R.images.ic_search} />
          <SkeletonBox
            style={{
              height: 20,
              borderRadius: 4,
              marginLeft: 12,
              width: "90%",
            }}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.item}
        key={index}
        onPress={() => {
          setTypeBody(TYPE_BODY.RESULT_SEARCH);
          setKeySearch(item?.title);
          setDataResultSearch([1, 2, 3, 4].map((val) => ({ isLoading: true })));
          setLoadingResult(true);
          getDataResultSearch(item?.title, "");
        }}
      >
        <Image style={styles.ic_search} source={R.images.ic_search} />
        <Text
          style={styles.txt_suggest_search}
          numberOfLines={1}
          children={`${item?.title}`}
        />
      </TouchableOpacity>
    );
  };
  const renderSuggestSearch = () => {
    return (
      <View style={styles.box_suggested}>
        <FlatList
          style={[styles.list_suggested, { marginTop: 0 }]}
          data={dataSuggestSearch}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItemSuggestSearch}
          ItemSeparatorComponent={() => (
            <View style={[styles.line, { marginTop: 0, marginBottom: 0 }]} />
          )}
          ListEmptyComponent={
            <View
              style={[
                styles.box_empty_result,
                { marginTop: dimensions.width * 0.2 },
              ]}
            >
              <Image
                style={styles.ic_empty_result}
                source={R.images.ic_empty_list}
              />
              <CusText
                fontSize={20}
                fontWeight="500"
                lineHeight={30}
                letterSpacing={0.15}
                content={R.strings().oop_no_result}
              />
              <CusText
                color="#353546"
                lineHeight={21}
                letterSpacing={0.25}
                content={R.strings().let_try_new_search}
              />
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  const renderResultSearch = () => {
    return (
      <View style={styles.box_suggested}>
        <FlatList
          //   contentContainerStyle={{flex: 1}}
          style={[styles.list_suggested, { marginTop: 0 }]}
          data={dataResultSearch}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItemSuggested}
          ItemSeparatorComponent={() => (
            <View style={[styles.line, { marginTop: 16 }]} />
          )}
          onEndReached={loadMoreResult}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <View style={styles.box_empty_result}>
              <Image
                style={styles.ic_empty_result}
                source={R.images.ic_empty_list}
              />
              <CusText
                fontSize={20}
                fontWeight="500"
                lineHeight={30}
                letterSpacing={0.15}
                content={R.strings().oop_no_result}
              />
              <CusText
                color="#353546"
                lineHeight={21}
                letterSpacing={0.25}
                content={R.strings().let_try_new_search}
              />
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  const renderBody = () => {
    switch (typeBody) {
      case TYPE_BODY.SUGGESTED:
        return <>{renderSuggested()}</>;
      case TYPE_BODY.SUGGEST_SEARCH:
        return <>{renderSuggestSearch()}</>;
      case TYPE_BODY.RESULT_SEARCH:
        return <>{renderResultSearch()}</>;
      default:
        return <>{renderSuggested()}</>;
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: "transparent", flex: 1 }}
      behavior={(Platform.OS === "ios" && "padding") || "height"}
      enabled
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {renderSearch()}
          <View style={styles.line} />
          {renderBody()}
          <ModalSelectSong
            visible={isVisible}
            songSelect={songSelect}
            onClose={() => {
              setVisible(false);
            }}
            handlePasteLink={() => {
              setVisible(false);
              props.route.params?.handlePasteLink(songSelect);
              navigation.goBack();
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: dimensions.paddingTop,
  },
  box_search: {
    flexDirection: "row",
    alignItems: "center",
  },
  box_back: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#FFF0E0",
  },
  ic_back: {
    height: 24,
    width: 24,
  },
  input: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 12,
    marginLeft: 12,
    flex: 1,
    paddingLeft: 16,
    paddingRight: 40,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
  },
  box_clear_input: {
    position: "absolute",
    right: 12,
  },
  line: {
    height: 1,
    backgroundColor: "#D9D9D9",
    width: "100%",
    marginTop: 20,
    marginBottom: 16,
  },
  box_suggested: {
    width: "100%",
    flex: 1,
  },
  txt_suggested: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0.5,
    color: "#1F1F29",
  },
  list_suggested: {
    marginTop: 4,
    width: "100%",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 14,
  },
  img_thumb: {
    height: 50,
    width: 50,
    borderRadius: 8,
  },
  txt_name: {
    fontWeight: "500",
    lineHeight: 21,
    color: "#1F1F29",
    letterSpacing: 0.25,
  },
  txt_des: {
    fontSize: 12,
    lineHeight: 18,
    color: "#7D7D7D",
    letterSpacing: 0.25,
    marginTop: 4,
  },
  txt_suggest_search: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 24,
    color: "#353546",
    letterSpacing: 0.5,
    marginLeft: 8,
  },
  ic_search: {
    height: 20,
    width: 20,
  },
  box_empty_result: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ic_empty_result: {
    height: dimensions.width * 0.5,
    width: dimensions.width * 0.5,
    marginBottom: 32,
  },
});

export default SearchYoutubeScreen;
