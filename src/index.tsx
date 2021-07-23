import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './navigations';
import {StatusBar} from 'react-native';
import palette from './theme/palette';
import {AuthProvider} from './contexts/auth';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={palette.white} barStyle="dark-content" />
      <NavigationContainer>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
