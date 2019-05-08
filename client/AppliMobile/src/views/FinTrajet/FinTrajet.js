import React from 'react';
import { View, Text, Image } from 'react-native';
import { Header } from 'react-native-elements';
import NoteTrajet from '../../components/NoteTrajet/NoteTrajet';
import BasItineraire from '../../components/BasItineraire/BasItineraire';
import ResumeSignalement from '../../components/ResumeSignalement/ResumeSignalement';
import styles from './stylesFinTrajet';

export default class FinTrajet extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={ <Image style={{ flex: 1, resizeMode: 'contain', marginBottom: 5 }} source={require('../../images/logo.png')} /> }
          containerStyle={{ backgroundColor: '#000000' }}
        />
        <Text style={styles.titre}>Vous êtes arrivé !</Text>
        <View style={styles.resume}>
          <BasItineraire data={{ temps: '15 min', distance: '2 km', calories: '53 kcal' }} />
          <ResumeSignalement data={{ eclairage: 0,
            chantier: 0,
            ferme: 3,
            abime: 4,
            securite: 0,
            interet: 4 }}
          />
        </View>
        <View style={styles.note}>
          <NoteTrajet />
        </View>
      </View>
    );
  }
}
