import React from 'react';
import { View, Button, Alert } from 'react-native';
import styles from './stylesBoutonSignalement';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import signalementService from '../../services/signalementServices';

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

function mapStateToProps(state) {
  return {
    localisation: state.localisation
  };
}

export default connect(
  mapStateToProps
)(BoutonSignalement);