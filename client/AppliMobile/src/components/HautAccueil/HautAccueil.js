import React from 'react';
import { View } from 'react-native';
import RechercheLieu from '../RechercheLieu/RechercheLieu';
import BoutonProfil from '../BoutonProfil/BoutonProfil';
import styles from './stylesHautAccueil';

export default class HautAccueil extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boutonProfil}>
          <BoutonProfil />
        </View>
      </View>
    );
  }
}
