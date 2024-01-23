import React, {FC} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Animated, {FadeIn, FadeInLeft} from 'react-native-reanimated';
import {DishProps} from '@config';
import {getDishById} from '@assets';
import {Colors} from '@constants';
import {scaleFontSize, verticalScale} from '@utils';
const Dish: FC<DishProps> = ({route}) => {
  const {id} = route.params;
  const item = getDishById(id);

  const addToCart = () => {};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Animated.Image
          entering={FadeIn.duration(400).delay(200)}
          source={item?.img}
          style={styles.image}
        />
        <View style={{padding: 20}}>
          <Animated.Text
            entering={FadeInLeft.duration(400).delay(200)}
            style={styles.dishName}>
            {item?.name}
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(400).delay(400)}
            style={styles.dishInfo}>
            {item?.info}
          </Animated.Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.fullButton} onPress={addToCart}>
            <Text style={styles.footerText}>Add for ${item?.price}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: verticalScale(250),
  },
  dishName: {
    fontSize: scaleFontSize(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
  },
  dishInfo: {
    fontSize: scaleFontSize(16),
    color: Colors.mediumDark,
  },
  footer: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -10},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scaleFontSize(16),
  },
});

export default Dish;
