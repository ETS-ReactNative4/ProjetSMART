import React from 'react';
import { View, Marker } from 'react-native';
import MapView from 'react-native-maps';

export default class MarkerPerso extends React.Component {
  constructor(props){
      super(props);
      console.log(this.props);
  }

  render() {
    return (
      <MapView.Marker
          //onPress={() => this.setState({ marker1: !this.state.marker1 })}
          //attention geolocalisation nécessite d'etre initialiser avec des valeurs par défauts
          coordinate={this.props.localisation}
          ref={marker => { this.marker = marker }}
          // transforme le flagblue en flag pink
          //image={this.state.marker1 ? flagBlueImg : flagPinkImg}
      />
    );
  }
}
