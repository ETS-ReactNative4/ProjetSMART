import React from 'react';
import { View, Button, Alert } from 'react-native';
import styles from './stylesBoutonSignalement';
import { Icon } from 'react-native-elements';
import MarkersTypes from '../MarkerTypes/MarkerTypes';

export default class BoutonSignalement extends React.Component {

  state = {
    start: true
  }

  _envoyerSignalement = (signalement, latitude, longitude, error) => {
    const message = {
      signalement: signalement,
      latitude: latitude,
      longitude: longitude,
      error: error
    }

    Alert.alert( "" , JSON.stringify(message) );
  }

  _signaler = (signalement) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this._envoyerSignalement(signalement, position.coords.latitude, position.coords.longitude, null);
      },
      (error) => {
        this._envoyerSignalement(signalement, null, null, error.message);
      },
      { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 },
    );
    this._onPressRetour();
  }

  _onPressSignalement = () => {
    this.setState({start: false});
  }

  _onPressRetour = () => {
    this.setState({start: true});
  }

  render() {
    if(this.state.start)
    {
      return (
        <View style={styles.container} >
          <Icon
            raised
            style={styles.bouton}
            name='exclamation'
            type='font-awesome'
            color='#f50'
            onPress={this._onPressSignalement}
          />
        </View>
      );
    }
    else
    {
      return (
        <View style={styles.container} >
          <Icon
            raised
            style={styles.bouton}
            name='lightbulb-o'
            type='font-awesome'
            color='#f50'
            onPress={() => {this._signaler("Eclairage")} }
          />
          <Icon
            raised
            style={styles.bouton}
            name='exclamation-triangle'
            type='font-awesome'
            color='#f50'
            onPress={() => {this._signaler("Travaux")} }
          />
          <Icon
            raised
            style={styles.bouton}
            name='close'
            type='font-awesome'
            color='#f50'
            onPress={() => {this._signaler("Ferme")} }
          />
          <Icon
            raised
            style={styles.bouton}
            name='road'
            type='font-awesome'
            color='#f50'
            onPress={() => {this._signaler("EtatRoute")} }
          />
          <Icon
            raised
            style={styles.bouton}
            name='security'
            type='material-icons'
            color='#f50'
            onPress={() => {this._signaler("Securite")} }
          />
          <Icon
            raised
            style={styles.bouton}
            name='heart'
            type='font-awesome'
            color='#f50'
            onPress={() => {this._signaler("Interet")} }
          />
          <Icon
            raised
            style={styles.bouton}
            name='back'
            type='antdesign'
            color='#f50'
            onPress={this._onPressRetour}
          />
        </View>
      );
    }
  }
}
