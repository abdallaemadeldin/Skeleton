import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');
const isIPHONEX = Platform.OS == "ios" && (height > 800 || width > 800);
const isANDROID = Platform.OS == "android";

const ToolbarHeight = () => {
    const toolbarHeight = isIPHONEX ? 100 : isANDROID ? 56 : 74;
    return toolbarHeight;
}

const RScaler = (precent) => {
    const deviceHeight = isIPHONEX ? height - 78 : isANDROID ? height - StatusBar.currentHeight: height;
    const fontSize = (precent * deviceHeight) / 100;
    return Math.round(fontSize);
}

export { ToolbarHeight, RScaler };