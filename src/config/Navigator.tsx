import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Home, Filter, LocationSearch, Details} from '@screens';
import {CustomHeader} from '@components';
import {horizontalScale} from '@utils';
import {Colors} from '@constants';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faXmark,
  faArrowLeft,
  faArrowUpFromBracket,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import {HeaderBackground} from '../screens/Details';

export type StackNavigatorParams = {
  Home: undefined;
  Filter: undefined;
  LocationSearch: undefined;
  Details: undefined;
};

/////SWITCHED STACKS HERE FROM NATIVE TO STACK SO THE MODAL WOULD WORK
// const Stack = createNativeStackNavigator<StackNavigatorParams>();
const RootStack = createStackNavigator<StackNavigatorParams>();

///// SCREEN TYPE PROPS
export type FilterProps = NativeStackScreenProps<
  StackNavigatorParams,
  'Filter'
>;

///// CUSTOM NAVIGATION PROPS, USE NAVIGATION IN NON-SCREENS
export type FilterPropsNavigation = NativeStackNavigationProp<
  StackNavigatorParams,
  'Filter'
>;

export type BottomSheetPropsNavigation = NativeStackNavigationProp<
  StackNavigatorParams,
  'LocationSearch'
>;

export type DetailsPropsNavigation = NativeStackNavigationProp<
  StackNavigatorParams,
  'Details'
>;

////// SMALL HEADER COMPONENTS
const HeaderLeft = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{marginLeft: horizontalScale(13)}}
      onPress={() => navigation.goBack()}>
      <FontAwesomeIcon
        icon={faXmark}
        size={horizontalScale(18)}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );
};

const HeaderLeftDetails = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.roundBtn, styles.buttonWrapper]}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        size={horizontalScale(18)}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );
};

const HeaderRightDetails = () => {
  return (
    <View style={styles.rightButtons}>
      <TouchableOpacity style={[styles.roundBtnRight, styles.buttonWrapper]}>
        <FontAwesomeIcon
          icon={faArrowUpFromBracket}
          size={horizontalScale(18)}
          color={Colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.roundBtnRight, styles.buttonWrapper]}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size={horizontalScale(18)}
          color={Colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen
            name="Home"
            component={Home}
            options={{header: () => CustomHeader()}}
          />
          <RootStack.Screen
            name="LocationSearch"
            component={LocationSearch}
            options={{
              headerTitle: 'Select Location',
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              headerLeft: () => HeaderLeft(),
              ...TransitionPresets.RevealFromBottomAndroid,
            }}
          />
          <RootStack.Screen
            name={'Details'}
            component={Details}
            options={{
              // headerShown: false,
              title: '',
              headerTransparent: true,
              headerTintColor: Colors.primary,
              headerLeft: () => HeaderLeftDetails(),
              headerRight: () => HeaderRightDetails(),
              headerBackground: () => HeaderBackground(),
            }}
          />
        </RootStack.Group>
        <RootStack.Group screenOptions={{presentation: 'modal'}}>
          <RootStack.Screen
            name="Filter"
            component={Filter}
            options={{
              headerTitle: 'Filter',
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              headerLeft: () => HeaderLeft(),
            }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundBtn: {
    marginLeft: horizontalScale(15),
  },
  rightButtons: {
    flexDirection: 'row',
  },
  roundBtnRight: {
    marginRight: horizontalScale(15),
  },
});

export default Navigator;
