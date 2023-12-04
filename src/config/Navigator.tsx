import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Home, Filter} from '@screens';
import {CustomHeader} from '@components';
import {horizontalScale} from '@utils';
import {Colors} from '@constants';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

export type StackNavigatorParams = {
  Home: undefined;
  Filter: undefined;
};

/////SWITCHED STACKS HERE FROM NATIVE TO STACK SO THE MODAL WOULD WORK
// const Stack = createNativeStackNavigator<StackNavigatorParams>();
const Stack = createStackNavigator<StackNavigatorParams>();

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
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{header: () => CustomHeader()}}
        />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
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
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
