import React from 'react';
import {View} from 'react-native';
import Navigator from '~/Screens/Navigator';
import {UserContextProvider} from '~/Context/UserContext';
import {LocationContextProvider} from '~/Context/LocationContext';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  return (
    <LocationContextProvider>
      <UserContextProvider>
        <Navigator />
      </UserContextProvider>
    </LocationContextProvider>
  );
};
export default App;
