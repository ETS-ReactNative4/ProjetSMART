import React from 'react';
import { View, Button, Text } from 'react-native';
import RechercheLieu from '../RechercheLieu/RechercheLieu';
import styles from './stylesBoutonRecherche';

export default class BontonRecherche extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.zone}>
          <View style={styles.sousZone}>
            <Text style={{ color: '#838383' }}>Départ</Text>
          </View>
        </View>
        <View style={styles.zone}>
          <View style={styles.sousZone}>
            <Text style={{ color: '#838383' }}>Arrivée</Text>
          </View>
        </View>
      </View>
    );
  }
}
