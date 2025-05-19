import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "src/theme/colors";
import AccountScreen from "modules/account";
import HomeScreen from "modules/home";
import React, { JSX } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import R from "src/assets/R";
import { ROUTER_APP } from "src/constants/constants";
import { getBottomSpace } from "utils/iphonexHelper";
import { globalStyle, styleView } from "src/theme";
import TemplatesScreen from "modules/templates";
import MyVoiceScreen from "modules/myVoice";
import HistoryScreen from "modules/history";

type TabBarOption = {
  name: string;
  icon: any;
  route: (props?: any) => JSX.Element;
  title: string;
};
const Tab = createBottomTabNavigator();

export const TAB_BAR: Record<string, TabBarOption> = {
  [ROUTER_APP.HOME]: {
    name: ROUTER_APP.HOME,
    icon: R.images.ic_tab_home_inactive,
    title: R.strings().home,
    route: HomeScreen,
  },
  [ROUTER_APP.TEMPLATE]: {
    name: ROUTER_APP.TEMPLATE,
    icon: R.images.ic_tab_template_inactive,
    title: R.strings().templates,
    route: TemplatesScreen,
  },
  [ROUTER_APP.MY_VOICE]: {
    name: ROUTER_APP.MY_VOICE,
    icon: R.images.ic_tab_my_voice_inactive,
    title: R.strings().my_voice,
    route: MyVoiceScreen,
  },
  [ROUTER_APP.HISTORY]: {
    name: ROUTER_APP.HISTORY,
    icon: R.images.ic_tab_history_inactive,
    title: R.strings().history,
    route: HistoryScreen,
  },
};

const TabNavigator = (props: any) => {
  const { uiStore, createStore, userStore } = props;
  return (
    <Tab.Navigator
      initialRouteName={ROUTER_APP.HOME}
      screenOptions={({ navigation, route }) => ({
        tabBarIcon: ({ focused }) => {
          return (
            <View style={{}}>
              <Image
                style={[
                  globalStyle.icon_24,
                  {
                    tintColor: focused ? colors.primary : undefined,
                  },
                ]}
                source={TAB_BAR[route.name].icon}
              />
            </View>
          );
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Text
              style={{ color: focused ? colors.primary : undefined }}
              children={TAB_BAR[route.name].name}
            />
          );
        },
        headerShown: false,
        tabBarStyle: {
          ...styles.tabbarContainer,
          display: "flex",
        },
        tabBarButton: (props: any) => {
          return (
            <TouchableOpacity
              {...props}
              onPress={async (e) => {
                //something action onPress tab
                if (props.onPress) props.onPress(e);
              }}
            />
          );
        },
      })}
    >
      {Object.keys(TAB_BAR).map((key: string, index: number) => {
        const Component = TAB_BAR[key].route;
        return (
          <Tab.Screen
            key={index}
            name={TAB_BAR[key].name}
            children={(props) => <Component uiStore={uiStore} />}
          />
        );
      })}
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabbarContainer: {
    height: getBottomSpace() > 0 ? getBottomSpace() + 40 + 24 : 54 + 24,
    paddingBottom: getBottomSpace(),
    paddingTop: getBottomSpace() > 0 ? 8 : 0,
    backgroundColor: "white",
    position: "absolute",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#9680FF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
  },
});
export default TabNavigator;
