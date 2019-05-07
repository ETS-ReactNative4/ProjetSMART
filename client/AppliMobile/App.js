import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Accueil from './src/views/Accueil/Accueil';
import FinTrajet from './src/views/FinTrajet/FinTrajet';
import configureStore from './src/reducers/index';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={configureStore()}>
        <Accueil />
      </Provider>
    );
  }
}


