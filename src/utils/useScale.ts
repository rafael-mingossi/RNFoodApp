import {Dimensions, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

{
  Platform.OS === 'android'
    ? console.log('Width android =>>', width)
    : console.log('Width IOS =>>', width);
}
{
  Platform.OS === 'android'
    ? console.log('Height android =>>', height)
    : console.log('Height IOS =>>', height);
}
{
  Platform.OS === 'android'
    ? console.log('NOTCH android =>>', DeviceInfo.hasNotch())
    : console.log('NOTCH IOS =>>', DeviceInfo.hasNotch());
}
export function useScale() {
  const {top} = useSafeAreaInsets();
  const getResponsive = (
    valueInPixels: number,
    deviceDimension: 'width' | 'height',
  ) => {
    const dimension: number = Dimensions.get('window')[deviceDimension];
    const valuePercentage = (valueInPixels + top) / dimension;
    console.log('NOTCH VALUE =>>', valuePercentage);

    return dimension * valuePercentage;
  };
  const guidelineBaseFonts = () => {
    if (width > 410) {
      return 430;
    }
    return 400;
  };

  const scaleFontSize = (size: number) =>
    Math.round((size * width) / guidelineBaseFonts());

  return {scaleFontSize, getResponsive};
}
export default useScale;
