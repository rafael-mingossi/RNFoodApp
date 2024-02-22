import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import {categories} from '@assets';
import {horizontalScale, scaleFontSize} from '@utils';

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: horizontalScale(20),
      }}>
      {categories.map((category, index) => (
        <View style={styles.categoryCard} key={index}>
          <Image source={category.img} style={styles.img} />
          <Text style={styles.categoryText}>{category.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  categoryCard: {
    width: horizontalScale(100),
    backgroundColor: 'white',
    marginRight: horizontalScale(10),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  img: {
    width: '100%',
  },
  categoryText: {
    padding: 6,
    fontSize: scaleFontSize(14),
    fontWeight: 'bold',
  },
});

export default Categories;
