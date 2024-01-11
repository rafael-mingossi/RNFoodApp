import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import {restaurant} from '@assets';
import {verticalScale} from '@utils';

const {width} = Dimensions.get('window');
const IMG_HEIGHT = verticalScale(200);

let scrollOfSet: SharedValue<number>;
const Details = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  scrollOfSet = useScrollViewOffset(scrollRef);

  ///USING INTERPOLATE HERE SO WE CAN MAP ONE VALUE TO SOME OTHER VALUE
  const imageAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOfSet.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOfSet.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [1.5, 1, 1],
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image
          source={restaurant.img}
          style={[styles.image, imageAnimatedStyles]}
        />
        <View
          style={{
            height: 1100,
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <Text>DETAILS</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width,
    height: IMG_HEIGHT,
  },
  header: {
    // backgroundColor: '#fff',
    height: verticalScale(50),
    marginTop: Platform.OS === 'ios' ? verticalScale(40) : verticalScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const HeaderBackground = () => {
  const headerAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOfSet.value, [0, IMG_HEIGHT / 2.5], [0, 1]),
    };
  });

  return (
    <Animated.View style={[styles.header, headerAnimatedStyles]}>
      <Text>Restaurant Details</Text>
    </Animated.View>
  );
};

export default Details;
