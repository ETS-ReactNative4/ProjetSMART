import React from 'react';
import { View, Text } from 'react-native';
import BoutonProfil from '../BoutonProfil/BoutonProfil';
import styles from './stylesBasItineraire';

export default class BasItineraire extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.recapContainer}>
          <Text style={styles.temps_text}>{this.props.data.temps}</Text>
          <Text style={styles.km_text}>{this.props.data.distance}</Text>
          <Text style={styles.kcal_text}>{this.props.data.calories}</Text>
        </View>
      </View>
    );
  }
}
