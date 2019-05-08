/* eslint-disable no-useless-constructor */
import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { Icon } from 'react-native-elements';

export default class MarkerPerso extends React.Component {
  constructor(props) {
    super(props);
  }

  selectImage() {
    if (this.props.markertype !== undefined) {
      switch (this.props.markertype) {
        case 'securite':
          return (
            <Icon
              reverse
              raised
              style={{ flex: 1 }}
              size="13"
              name="exclamation-triangle"
              type="font-awesome"
              color="#E97740"
            />
          );
        case 'etat':
          return (
            <Icon
              reverse
              raised
              style={{ flex: 1 }}
              size="13"
              name="road"
              type="font-awesome"
              color="#3497FD"
            />
          );
        case 'eclairage':
          return (
            <Icon
              reverse
              raised
              style={{ flex: 1 }}
              size="13"
              name="lightbulb-o"
              type="font-awesome"
              color="#E9BC40"
            />
          );
        case 'interet':
          return (
            <Icon
              reverse
              raised
              style={{ flex: 1 }}
              size="13"
              name="heart"
              type="font-awesome"
              color="#C840E9"
              background-color="#000000"
            />
          );
        case 'travaux':
          return (
            <Icon
              reverse
              raised
              style={{ flex: 1 }}
              size="13"
              name="security"
              type="material-icons"
              color="#5773FF"
            />
          );
        case 'fermee':
          return (
            <Icon
              reverse
              raised
              style={{ flex: 1 }}
              size="13"
              name="close"
              type="font-awesome"
              color="#E94040"
            />
          );
        default:
          console.log('default');
          return null;
      }
    }
  }

  render() {
    return (
      <Marker
          // attention geolocalisation nécessite d'etre initialiser avec des valeurs par défauts
        coordinate={this.props.coordinates}
        ref={(marker) => { this.marker = marker; }}
        key={this.props.key}
        markertype={this.props.markertype}

      >
        { this.selectImage() }
      </Marker>

    );
  }
}
