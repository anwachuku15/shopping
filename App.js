import React from 'react';
// REDUX
import { Provider } from 'react-redux'
import store from './redux/store';

// NAVIGATION
import ShopNavigator from './navigation/ShopNavigator'

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

