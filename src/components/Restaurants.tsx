import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {restaurants} from '@assets';
import {Colors} from '@constants';
import {horizontalScale, scaleFontSize} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {DetailsPropsNavigation} from '@config';

const Restaurants = () => {
  const navigation: DetailsPropsNavigation = useNavigation();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: horizontalScale(20),
      }}>
      {restaurants.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('Details')}>
          <View style={styles.categoryCard}>
            <Image source={restaurant.img} style={styles.image} />
            <View style={styles.categoryBox}>
              <Text style={styles.categoryText}>{restaurant.name}</Text>
              <Text style={{color: Colors.green}}>
                {restaurant.rating} {restaurant.ratings}
              </Text>
              <Text style={{color: Colors.medium}}>{restaurant.distance}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  categoryCard: {
    width: horizontalScale(300),
    height: 250,
    backgroundColor: '#fff',
    marginEnd: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  categoryText: {
    paddingVertical: 5,
    fontSize: scaleFontSize(14),
    fontWeight: 'bold',
  },
  image: {
    flex: 5,
    width: undefined,
    height: undefined,
  },
  categoryBox: {
    flex: 2,
    padding: 10,
  },
});

export default Restaurants;
