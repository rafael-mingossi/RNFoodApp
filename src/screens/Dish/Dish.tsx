import React, {FC} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {FadeIn, FadeInLeft} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {DishProps} from '@config';
import {getDishById} from '@assets';
import {useBasketStore} from '@store';
import styles from './dish.styles';
const Dish: FC<DishProps> = ({route}) => {
  const {id} = route.params;
  const item = getDishById(id)!;
  const {addProduct} = useBasketStore();
  const navigation = useNavigation();
  const addToCart = () => {
    addProduct(item);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} edges={['bottom']}>
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

export default Dish;
