import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
// import {REACT_APP_GOOGLE_API_KEY} from '@env';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const SPACE = 0.01;
const LocationSearch = () => {
  const data = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  };

  return (
    <SafeAreaView>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={data.region}
        scrollEnabled={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        loadingEnabled
        loadingIndicatorColor="#666666"
        loadingBackgroundColor="#eeeeee"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default LocationSearch;
