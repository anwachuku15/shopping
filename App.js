import React from 'react';
import { StatusBar } from 'react-native'
import Colors from './constants/Colors'

import { Provider } from 'react-redux'
import store from './redux/store';

import { useFonts } from '@use-expo/font'
import { AppLoading } from 'expo'
import { enableScreens } from 'react-native-screens'

// NAVIGATION
import ShopNavigator from './navigation/ShopNavigator'

enableScreens()


StatusBar.setBarStyle('dark-content')

export default function App() {
  let [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if(!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <ShopNavigator />
      </Provider>
    )
  }
}

