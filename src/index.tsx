import React from 'react';
import Navigator from './config/Navigator';
import {StatusBar} from 'react-native';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faSquareCheck} from '@fortawesome/free-solid-svg-icons/faSquareCheck';

library.add(fab, faSquareCheck);

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={'#fff'} />
      <Navigator />
    </>
  );
};

export default App;
