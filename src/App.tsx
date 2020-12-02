import React from 'react';
import {StatusBar, View} from 'react-native';
import Navigator from '~/Screens/Navigator';
import {UserContextProvider} from '~/Context/UserContext';
import {LocationContextProvider} from '~/Context/LocationContext';
import SplashScreen from 'react-native-splash-screen';

// rgba(15, 196, 159, 0.1);

const App = () => {
  return (
    <UserContextProvider>
      <LocationContextProvider>
        <StatusBar
          backgroundColor="rgba(255, 255, 255, 0)"
          barStyle="dark-content"
        />
        <Navigator />
      </LocationContextProvider>
    </UserContextProvider>
  );
};
export default App;
