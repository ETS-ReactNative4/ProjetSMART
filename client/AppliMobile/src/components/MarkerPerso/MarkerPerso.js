/* eslint-disable no-useless-constructor */
import React from 'react';
import MapView from 'react-native-maps';

export default class MarkerPerso extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MapView.Marker
          // attention geolocalisation nécessite d'etre initialiser avec des valeurs par défauts
        coordinate={this.props.localisation}
        ref={(marker) => { this.marker = marker; }}
      />
    );
  }
}
