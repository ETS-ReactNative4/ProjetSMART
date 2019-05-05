import React from 'react';
import { AppRegistry } from 'react-native';
import FinTrajet from './src/views/FinTrajet/FinTrajet';

export default class App extends React.Component {
  render() {
    return (
      <Accueil />
    );
  }
}

AppRegistry.registerComponent('RnDirectionsApp', () => RnDirectionsApp);
