/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import GoogleAutocomplete from './src/components/googleAutocomplete/googleAutocomplete';
import Map from './src/components/map/map';

import configureStore from './src/reducers/index';

const store = configureStore();

export default class RnDirectionsApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Map />
          <GoogleAutocomplete />
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('RnDirectionsApp', () => RnDirectionsApp);
