import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Home, Filter, LocationSearch} from '@screens';
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
import {faXmark} from '@fortawesome/free-solid-svg-icons';

export type StackNavigatorParams = {
  Home: undefined;
  Filter: undefined;
  LocationSearch: undefined;
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
              headerTitle: 'Search Location',
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              headerLeft: () => HeaderLeft(),
              ...TransitionPresets.RevealFromBottomAndroid,
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

export default Navigator;
