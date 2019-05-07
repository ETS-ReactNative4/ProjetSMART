import React from 'react';
import { View, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import signalementService from '../../services/signalementServices';
import styles from './stylesBoutonSignalement';

class BoutonSignalement extends React.Component {

  state = {
    start: true
  }

  _envoyerSignalement = (problem, latitude, longitude) => {
    const signalement = {
      problem: problem,
      latitude: latitude,
      longitude: longitude
    }
    signalementService.postSignalement(signalement);
  }

  _signaler = (problem) => {
    const lat = this.props.localisation.lat
    const lng = this.props.localisation.lng
    this._envoyerSignalement(problem, lat, lng);
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

function mapStateToProps(state) {
  return {
    localisation: state.localisation
  };
}

export default connect(
  mapStateToProps
)(BoutonSignalement);