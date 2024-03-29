import React from 'react';
import Navigator from './config/Navigator';
import {StatusBar} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <StatusBar
          translucent={false}
          backgroundColor={'white'}
          barStyle={'dark-content'}
          showHideTransition={'slide'}
        />
        <Navigator />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
