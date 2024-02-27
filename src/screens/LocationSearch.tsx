import React, {useState} from 'react';
import {
  // Dimensions,
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
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {REACT_APP_GOOGLE_API_KEY} from '@env';
import {useLocationStore} from '@store';

// const {width, height} = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LocationSearch = () => {
  const {setCountry} = useLocationStore();
  const navigation = useNavigation();
  // const data = {
  //   region: {
  //     latitude: LATITUDE,
  //     longitude: LONGITUDE,
  //     latitudeDelta: LATITUDE_DELTA,
  //     longitudeDelta: LONGITUDE_DELTA,
  //   },
  // };
  const [location, setLocation] = useState({
    latitude: 51.5078788,
    longitude: -0.0877321,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  return (
    <SafeAreaView>
      <GooglePlacesAutocomplete
        placeholder="Search or move the map"
        fetchDetails={true}
        onPress={(data, detail) => {
          // console.log('OP =>>', data);
          setCountry(data.structured_formatting.main_text);
          const point = detail?.geometry?.location;
          if (!point) {
            return;
          }
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        query={{
          key: REACT_APP_GOOGLE_API_KEY,
          language: 'en',
        }}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size={horizontalScale(16)}
              color={Colors.medium}
            />
          </View>
        )}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: Colors.grey,
            paddingLeft: 35,
            borderRadius: 10,
          },
          textInputContainer: {
            padding: 8,
            backgroundColor: '#fff',
          },
        }}
      />
      <MapView
        region={location}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        // initialRegion={data.region}
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
    bottom: verticalScale(70),
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
  boxIcon: {
    position: 'absolute',
    left: horizontalScale(15),
    top: '45%',
    zIndex: 1,
  },
});
export default LocationSearch;
