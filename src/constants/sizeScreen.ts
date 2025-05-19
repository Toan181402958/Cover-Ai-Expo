import { Dimensions } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const heightFull = Dimensions.get('screen').height;

export const sizeScreen = {width, height, heightFull}