import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Colors} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {horizontalScale, scaleFontSize, verticalScale} from '@utils';
// import {REACT_APP_GOOGLE_API_KEY} from '@env';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LocationSearch = () => {
  const navigation = useNavigation();
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
      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
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
  absoluteBox: {
    position: 'absolute',
    bottom: verticalScale(20),
    width: '100%',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(14),
    margin: horizontalScale(15),
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scaleFontSize(16),
  },
});
export default LocationSearch;
