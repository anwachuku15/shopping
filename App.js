import React from 'react';
import { StatusBar } from 'react-native'
import Colors from './constants/Colors'
// REDUX
import { Provider } from 'react-redux'
import store from './redux/store';

// NAVIGATION
import ShopNavigator from './navigation/ShopNavigator'


StatusBar.setBarStyle('dark-content')

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

