import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Accueil from './src/views/Accueil/Accueil';

export default class App extends React.Component {
  render() {
    return (
      <Accueil/>
    );
  }
}

AppRegistry.registerComponent('RnDirectionsApp', () => RnDirectionsApp);
