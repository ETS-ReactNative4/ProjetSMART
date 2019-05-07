import React from 'react';
import { View, Text } from 'react-native';
import NoteTrajet from '../../components/NoteTrajet/NoteTrajet';
import BasItineraire from '../../components/BasItineraire/BasItineraire';
import styles from './stylesFinTrajet';

export default class FinTrajet extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.titre}>Vous êtes arrivé !</Text>
        <View style={styles.resume}>
          <BasItineraire data={{ temps: '15 min', distance: '2 km', calories: '53 kcal' }} />
        </View>
        <View style={styles.note}>
          <NoteTrajet />
        </View>
      </View>
    );
  }
}
