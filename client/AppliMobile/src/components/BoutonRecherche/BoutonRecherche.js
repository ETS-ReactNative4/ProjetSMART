import React from 'react';
import { View, Button, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import styles from './stylesBoutonRecherche';

class BontonRecherche extends React.Component {
  _getTitleDepart = () => {
    if (this.props.origine.formatedAdress !== '') {
      return (this.props.origine.formatedAdress);
    }
    return ('Départ');
  }


  _getTitleArrivee = () => {
    if (this.props.destination.formatedAdress !== '') {
      return (this.props.destination.formatedAdress);
    }
    return ('Arrivée');
  }

  render() {
    return (
      <View style={styles.containerRecherche}>
        <View style={styles.zone}>
          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate('Recherche', {
                type: 'depart'
              });
            }}
          >
            <View style={styles.sousZone}>
              <Text style={{ color: '#FFFFFF' }}>
                {this._getTitleDepart()}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.zone}>
          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate('Recherche', {
                type: 'arrivee'
              });
            }}
          >
            <View style={styles.sousZone}>
              <Text style={{ color: '#FFFFFF' }}>
                {this._getTitleArrivee()}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { destination: state.destination, origine: state.origine };
}

export default withNavigation(connect(
  mapStateToProps
)(BontonRecherche));
