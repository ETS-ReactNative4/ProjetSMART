/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import GoogleAutocomplete from './src/components/googleAutocomplete/googleAutocomplete';
import Map from './src/components/map/map';


export default class RnDirectionsApp extends Component {

  render() {
    return (
      <View>
        <Map />
        <GoogleAutocomplete />
      </View>
    );
  }
}

AppRegistry.registerComponent('RnDirectionsApp', () => RnDirectionsApp);
