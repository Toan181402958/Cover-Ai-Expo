import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "modules/splash";
import { ROUTER_APP } from "src/constants/constants";
import navigationHelper from "utils/navigationHelper";
import TabNavigator from "./TabNavigator";
import TestScreen from "modules/test";
import PremiumScreen from "modules/premium";
import SettingScreen from "modules/setting";
import LanguageScreen from "modules/setting/LanguageScreen";
import SearchYoutubeScreen from "modules/home/SearchYoutube";
import LoadingVoiceScreen from "modules/home/LoadingVoiceScreen";
import AudioDetailScreen from "modules/history/AudioDetailScreen";
import WebviewScreen from "modules/setting/WebviewScreen";
import AboutUsScreen from "modules/setting/AboutUsScreen";

const APP_STACK = {
  [ROUTER_APP.SPLASH]: {
    component: SplashScreen,
    options: {},
  },
  [ROUTER_APP.TEST]: {
    component: TestScreen,
    options: {},
  },
  [ROUTER_APP.PREMIUM]: {
    component: PremiumScreen,
    options: { gestureDirection: "vertical" },
  },
  [ROUTER_APP.SETTING]: {
    component: SettingScreen,
    options: { gestureDirection: "vertical" },
  },
  [ROUTER_APP.LANGUAGE]: {
    component: LanguageScreen,
    options: {},
  },
  [ROUTER_APP.SEARCH_YOUTUBE]: {
    component: SearchYoutubeScreen,
    options: {},
  },
  [ROUTER_APP.LOADING_VOICE]: {
    component: LoadingVoiceScreen,
    options: {},
  },
  [ROUTER_APP.AUDIO_DETAIL]: {
    component: AudioDetailScreen,
    options: {},
  },
  [ROUTER_APP.WEB_VIEW]: {
    component: WebviewScreen,
    options: { gestureDirection: "vertical" },
  },
  [ROUTER_APP.ABOUT_US]: {
    component: AboutUsScreen,
    options: {},
  },
};
const StackApp = (Stack: any) => {
  return Object.keys(APP_STACK).map((key: string) => {
    const { component: Component, options } = APP_STACK[key];
    return (
      <Stack.Screen key={key} name={key} options={options}>
        {(props: any) => <Component {...props} />}
      </Stack.Screen>
    );
  });
};

const Stack = createNativeStackNavigator();
const AppNavigator = (props: any) => {
  const {} = props;

  return (
    <NavigationContainer
      ref={(ref) => {
        navigationHelper.setTopLevelNavigator(ref);
      }}
    >
      <Stack.Navigator
        initialRouteName={ROUTER_APP.SPLASH}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        {StackApp(Stack)}
        <Stack.Screen
          name={ROUTER_APP.MAIN_TAB}
          children={(props) => <TabNavigator {...props} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
