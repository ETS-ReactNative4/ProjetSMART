import React from 'react';
import { View } from 'react-native';
import Carte from '../../components/Carte/Carte';
import HautItineraire from '../../components/HautItineraire/HautItineraire';
import BoutonSignalement from '../../components/BoutonSignalement/BoutonSignalement';
import RechercheLieu from '../../components/RechercheLieu/RechercheLieu';
import styles from './stylesItineraire';
import ChampsRecherche from '../../components/ChampsRecherche/ChampsRecherche';
import BoutonRecherche from '../../components/BoutonRecherche/BoutonRecherche';
import BasItineraire from '../../components/BasItineraire/BasItineraire';
import BoutonLetsGo from '../../components/BoutonLetsGo/BoutonLetsGo';

export default class Itineraire extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.carte} flex={9}>
          <Carte flex={8} />
          <BoutonRecherche />
        </View>
        <BoutonSignalement />
        <View style={styles.basItineraire}>
          <BasItineraire data={{ temps: '15 min', distance: '2 km', calories: '53 kcal' }} />
          <View style={styles.boutonLetsGo}>
            <BoutonLetsGo />
          </View>
        </View>
      </View>
    );
  }
}
