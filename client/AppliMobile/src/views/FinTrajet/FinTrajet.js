import React from 'react';
import { View, Text } from 'react-native';
import NoteTrajet from '../../components/NoteTrajet/NoteTrajet';
import styles from './stylesFinTrajet';

export default class FinTrajet extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titre}>Vous êtes arrivé !</Text>
        <View style={styles.resume}>
        </View>
        <View style={styles.note}>
          <NoteTrajet />
        </View>
      </View>
    );
  }
}
