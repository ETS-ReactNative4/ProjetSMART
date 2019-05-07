import React from 'react';
import { View, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './stylesBoutonSignalement';

export default class BoutonSignalement extends React.Component {
  state = {
    start: true
  }

  _envoyerSignalement = (signalement, latitude, longitude, error) => {
    const message = {
      signalement,
      latitude,
      longitude,
      error
    };
    Alert.alert('', JSON.stringify(message));
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
    this.setState({ start: false });
  }

  _onPressRetour = () => {
    this.setState({ start: true });
  }

  render() {
    if (this.state.start) {
      return (
        <View style={styles.container}>
          <Icon
            reverse
            raised
            style={styles.bouton}
            name="exclamation"
            type="font-awesome"
            color="#C840E9"
            underlayColor="#000000"
            onPress={this._onPressSignalement}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.containerBas}>
          <Icon
            reverse
            raised
            style={styles.bouton}
            name="lightbulb-o"
            type="font-awesome"
            color="#E9BC40"
            onPress={() => { this._signaler('Eclairage'); }}
          />
          <Icon
            reverse
            raised
            style={styles.bouton}
            name="exclamation-triangle"
            type="font-awesome"
            color="#E97740"
            onPress={() => { this._signaler('Travaux'); }}
          />
          <Icon
            reverse
            raised
            style={styles.bouton}
            name="close"
            type="font-awesome"
            color="#E94040"
            onPress={() => { this._signaler('Ferme'); }}
          />
        </View>
        <View style={styles.containerBas}>
          <Icon
            reverse
            raised
            style={styles.bouton}
            name="road"
            type="font-awesome"
            color="#3497FD"
            onPress={() => { this._signaler('EtatRoute'); }}
          />
          <Icon
            reverse
            raised
            style={styles.bouton}
            name="security"
            type="material-icons"
            color="#5773FF"
            onPress={() => { this._signaler('Securite'); }}
          />
          <Icon
            reverse
            raised
            style={styles.bouton}
            name="heart"
            type="font-awesome"
            color="#C840E9"
            background-color="#000000"
            onPress={() => { this._signaler('Interet'); }}
          />
          <Icon
            raised
            style={styles.bouton}
            name="back"
            type="antdesign"
            color="#C840E9"
            onPress={this._onPressRetour}
          />
        </View>
      </View>
    );
  }
}
