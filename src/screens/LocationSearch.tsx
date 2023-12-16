import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {REACT_APP_GOOGLE_API_KEY} from '@env';

const LocationSearch = () => {
  return (
    <SafeAreaView>
      <Text>OI</Text>
      <Text>{REACT_APP_GOOGLE_API_KEY}</Text>
    </SafeAreaView>
  );
};

export default LocationSearch;
