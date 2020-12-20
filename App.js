import React, {useState} from 'react';
import Navigation from './src/Config/Navigation.js'
import {Provider} from 'react-redux'
import store from './src/Store'
export default function App() {
  

  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
    
  );
}


