import React from 'react';
import { View } from 'react-native';
import Carte from '../../components/Carte/Carte';
import HautItineraire from '../../components/HautItineraire/HautItineraire';
import BoutonSignalement from '../../components/BoutonSignalement/BoutonSignalement';
import RechercheLieu from '../../components/RechercheLieu/RechercheLieu';
import styles from './stylesItineraire';
import ContainerRecherche from '../../components/ContainerRecherche/ContainerRecherche';
import BasItineraire from '../../components/BasItineraire/BasItineraire';
import BoutonLetsGo from '../../components/BoutonLetsGo/BoutonLetsGo';

export default class Itineraire extends React.Component {
  render() {
    return (
      /*<View style={styles.container}>
        <View style={styles.hautItineraire}>
          <HautItineraire/>
        </View>

        <View style={styles.carte}>
          <Carte />
          <View style={styles.rechercheLieu}>
            <RechercheLieu />
          </View>
          <View style={styles.rechercheLieu}>
            <RechercheLieu />
          </View>
        </View>

        <View style={styles.boutonSignalement}>
          <BoutonSignalement />
        </View>
      </View>*/
      <View style={styles.container}>

        <View style={styles.carte}>
          <Carte />
          <ContainerRecherche />
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
