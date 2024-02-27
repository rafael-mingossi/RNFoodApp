import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import {BottomSheet} from '@components';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronDown,
  faUser,
  faMagnifyingGlass,
  faArrowUpAZ,
} from '@fortawesome/free-solid-svg-icons';
import {useLocationStore, useCategoryStore} from '@store';
import {Colors} from '@constants';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {FilterPropsNavigation} from '@config';
import {verticalScale} from '@utils';
import {categories as allCategories} from '@assets';

const SearchBar = () => {
  const navigation: FilterPropsNavigation = useNavigation();
  const {categories, setFilteredData} = useCategoryStore();
  const [searchedWord, setSearchedWord] = useState('');

  useEffect(() => {
    const filter = categories.filter(val => {
      return val.text.toLowerCase().includes(searchedWord.toLowerCase());
    });

    if (searchedWord === '') {
      setFilteredData(allCategories);
    } else {
      setFilteredData(filter);
    }
  }, [searchedWord]);

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchSection}>
        <View style={styles.searchField}>
          <View style={styles.searchIcon}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size={18}
              color={Colors.medium}
            />
          </View>
          <TextInput
            defaultValue={searchedWord}
            onChangeText={event => {
              setSearchedWord(event);
            }}
            style={styles.input}
            placeholder="Restaurants, groceries, dishes"
          />
        </View>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('Filter')}>
          <FontAwesomeIcon
            icon={faArrowUpAZ}
            size={20}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CustomHeader = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const {country} = useLocationStore();
  const openModal = () => {
    bottomSheetRef.current?.present();
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <BottomSheet ref={bottomSheetRef} />
      <View style={styles.container}>
        <TouchableOpacity onPress={openModal}>
          <Image
            style={styles.bike}
            source={require('../../assets/images/bike.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.titleContainer} onPress={openModal}>
          <Text style={styles.title}>Delivery · Now</Text>
          <View style={styles.locationName}>
            <Text style={styles.subtitle}>{country}</Text>
            <View style={styles.iconWrapper}>
              <FontAwesomeIcon
                icon={faChevronDown}
                size={16}
                color={Colors.primary}
              />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => console.log('Home')}>
          <FontAwesomeIcon icon={faUser} size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    // THIS IS REPLACING STATUSBAR SPACE
    paddingTop: verticalScale(20),
  },
  container: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  bike: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: Colors.medium,
  },
  locationName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconWrapper: {
    marginLeft: 5,
  },
  profileButton: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 50,
  },
  searchContainer: {
    height: 60,
    backgroundColor: '#fff',
  },
  searchSection: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  searchField: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    color: Colors.mediumDark,
  },
  searchIcon: {
    paddingLeft: 15,
  },
  optionButton: {
    padding: 10,
    borderRadius: 50,
  },
});

export default CustomHeader;
