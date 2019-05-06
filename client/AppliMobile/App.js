import React from 'react';
import { AppRegistry } from 'react-native';
import Accueil from './src/views/Accueil/Accueil';
import FinTrajet from './src/views/FinTrajet/FinTrajet';
import Itineraire from './src/views/Itineraire/Itineraire';

export default class App extends React.Component {
  render() {
    return (
      <Itineraire />
    );
  }
}

AppRegistry.registerComponent('RnDirectionsApp', () => RnDirectionsApp);
