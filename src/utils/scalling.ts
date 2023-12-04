import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

// USING 375 HERE, BECAUSE IT IS A SMALL SCREEN,
// IPHONE 6,7,8 HAS 375 SO ANYTHING LESS THAN THIS WOULD BE VERY SMALL
// NOTCH IS FOR NEW DEVICES WITH CAMERA THAT USES SCREEN SPACE
const isSmall = width <= 375 && !DeviceInfo.hasNotch();

const guidelineBaseWidth = () => {
  if (isSmall) {
    return 330;
  }
  return 350;
};

const guidelineBaseHeight = () => {
  if (isSmall) {
    return 550;
  } else if (width > 410) {
    return 620;
  }
  return 680;
};

const guidelineBaseFonts = () => {
  if (width > 410) {
    return 430;
  }
  return 400;
};

const horizontalScale = (size: number) => (width / guidelineBaseWidth()) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight()) * size;

const scaleFontSize = (size: number) =>
  Math.round((size * width) / guidelineBaseFonts());

export {horizontalScale, verticalScale, scaleFontSize};
