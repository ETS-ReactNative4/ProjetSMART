import React from 'react';
import { View, Button, Alert } from 'react-native';
import styles from './stylesBoutonSignalement';

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
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
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
          <Button
            style={styles.bouton}
            onPress={this._onPressSignalement}
            title="Signalement"
          />
        </View>
      );
    }
    else
    {
      return (
        <View style={styles.container} >
          <Button
            style={styles.bouton}
            onPress={() => {this._signaler("Eclairage")} }
            title="Eclairage"
          />
          <Button
            style={styles.bouton}
            onPress={() => {this._signaler("Travaux")} }
            title="Travaux"
          />
          <Button
            style={styles.bouton}
            onPress={this._onPressRetour}
            title="Retour"
          />
        </View>
      );
    }
  }
}
