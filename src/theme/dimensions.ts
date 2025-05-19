import { Dimensions, Platform, StatusBar } from "react-native"
import { getStatusBarHeight, hasIsland } from "utils/iphonexHelper"

const { height, width } = Dimensions.get('window')
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const ratio = (width / 414 / height) * 1000

const OS = Platform.OS

const widthRatio = width / 500
const heightRatio = height / 500
const heightStatusBar =
  Platform.OS === 'android'
    ? StatusBar.currentHeight
      ? StatusBar.currentHeight + 16
      : 16
    : getStatusBarHeight() + 0;
const paddingTop = hasIsland()
  ? heightStatusBar + 12
  : Platform.OS === 'ios'
  ? heightStatusBar + 12
  : 16;


export { HEIGHT, OS, WIDTH }

export const dimensions = {
  height,
  width,
  ratio,
  widthRatio,
  heightRatio,
  heightStatusBar,
  paddingTop,
}
