import { Dimensions, Platform, StatusBar } from 'react-native';

type StyleType<T> = T | number | string | undefined;

function isIphone(): boolean {
  return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV;
}

function isIphoneX(): boolean {
  const dimen = Dimensions.get('window');
  const { height, width } = dimen;

  return (
    isIphone() &&
    (
      height === 780 || width === 780 || // iPhone 12 mini
      height === 812 || width === 812 || // iPhone X, XS, 11 Pro, 13 mini
      height === 844 || width === 844 || // iPhone 12, 12 Pro, 13, 13 Pro
      height === 852 || width === 852 || // iPhone 14 Pro
      height === 896 || width === 896 || // iPhone XR, XS Max, 11, 11 Pro Max
      height === 926 || width === 926 || // iPhone 12 Pro Max, 13 Pro Max
      height === 932 || width === 932    // iPhone 14 Pro Max
    )
  );
}

function hasIsland(): boolean {
  const dimen = Dimensions.get('window');
  const { height, width } = dimen;

  return (
    isIphone() &&
    (
      height === 852 || width === 852 || // iPhone 14 Pro
      height === 932 || width === 932    // iPhone 14 Pro Max
    )
  );
}

function ifIphoneX<T>(iphoneXStyle: StyleType<T>, regularStyle: StyleType<T>): StyleType<T> {
  return isIphoneX() ? iphoneXStyle : regularStyle;
}

function getStatusBarHeight(safe: boolean = false): number {
  function safeHeight(hasIsland: boolean): number {
    return hasIsland ? 59 : 44;
  }

  return Platform.select({
    ios: ifIphoneX(safe ? safeHeight(hasIsland()) : 30, 20),
    android: StatusBar.currentHeight ?? 0,
    default: 0,
  }) as number;
}

function getBottomSpace(): number {
  return isIphoneX() ? 34 : 0;
}

export {
  isIphone,
  isIphoneX,
  hasIsland,
  ifIphoneX,
  getStatusBarHeight,
  getBottomSpace,
};
