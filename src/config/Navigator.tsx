import React from 'react';
import {Home} from '../screens';
import {CustomHeader} from '../components';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type StackNavigatorParams = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{header: () => CustomHeader()}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
