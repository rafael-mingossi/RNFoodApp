import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Categories, Restaurants} from '@components';
import {Colors} from '@constants';
import {horizontalScale, scaleFontSize, verticalScale} from '@utils';

const Home = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Categories />
        <Text style={styles.header}>Top picks in your neighbourhood</Text>
        <Restaurants />
        <Text style={styles.header}>Offers near you</Text>
        <Restaurants />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    top: 120,
    paddingTop: verticalScale(15),
    paddingBottom: 150,
  },
  header: {
    fontSize: scaleFontSize(18),
    fontWeight: 'bold',
    marginTop: verticalScale(16),
    marginBottom: verticalScale(8),
    paddingHorizontal: horizontalScale(16),
  },
});
export default Home;
