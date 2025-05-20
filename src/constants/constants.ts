const BASE_URL = "https://singai.apihub.today/api/v1/";
const API_KEY_YOUTUBE = "AIzaSyAC5hOn0_rHcmg5yYNfcRFgwPtHSiJf2e8";
const LINK_BIO = "https://bio.link/singai";

const USE_APP_MAX = 5;

const userIdDefault = "ebf48005-bca9-4675-86eb-26a9f00fd971";

const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

const ROUTER_APP = {
  TEST: "Test",
  MAIN_TAB: "MainTab",
  SPLASH: "Splash",
  HOME: "Home",
  ACCOUNT: "Account",
  TEMPLATE: "Template",
  MY_VOICE: "MyVoice",
  HISTORY: "History",
  PREMIUM: "Premium",
  SETTING: "Setting",
  LANGUAGE: "Language",
  SEARCH_YOUTUBE: "SearchYoutube",
  LOADING_VOICE: "LoadingVoice",
  AUDIO_DETAIL: "AudioDetail",
  WEB_VIEW: "Webview",
  ABOUT_US: "AboutUs",
};
const TYPE_LANGUAGE = {
  EN: "en",
  VI: "vi",
  JA: "ja",
  FR: "fr",
  ES: "es",
  IT: "it",
  DE: "de",
};
const dataLocale = [
  {
    value: TYPE_LANGUAGE.EN,
  },
  {
    value: TYPE_LANGUAGE.ES,
  },
  {
    value: TYPE_LANGUAGE.FR,
  },
  {
    value: TYPE_LANGUAGE.IT,
  },
  {
    value: TYPE_LANGUAGE.JA,
  },
  {
    value: TYPE_LANGUAGE.VI,
  },
  {
    value: TYPE_LANGUAGE.DE,
  },
];
export const APPLE_ID = "6740697362";
const email_support = "mail@gmail.com";
const terms_link = "https://singai.apihub.today/aicover/terms";
const privacy_policy_link = "https://singai.apihub.today/aicover/policy";
const itunes_store_url = `itms-apps://itunes.apple.com/app/id${APPLE_ID}?mt=8`;

const TYPE_STATUS_ALL = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
};
export {
  BASE_URL,
  API_KEY_YOUTUBE,
  LINK_BIO,
  USE_APP_MAX,
  ROUTER_APP,
  TYPE_LANGUAGE,
  email_support,
  terms_link,
  privacy_policy_link,
  itunes_store_url,
  dataLocale,
  youtubeRegex,
  userIdDefault,
  TYPE_STATUS_ALL,
};
