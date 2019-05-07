import React from 'react';
import { View } from 'react-native';
import RechercheLieu from '../RechercheLieu/RechercheLieu';
import BoutonProfil from '../BoutonProfil/BoutonProfil';
import styles from './stylesHautItineraire';

export default class HautItineraire extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerRecherche}>
          <View style={styles.rechercheLieu}>
            <RechercheLieu />
          </View>
          <View style={styles.rechercheLieu}>
            <RechercheLieu />
          </View>
        </View>
        <View style={styles.boutonProfil}>
          <BoutonProfil />
        </View>
      </View>
    );
  }
}
