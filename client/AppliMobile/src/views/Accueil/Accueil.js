import React from 'react';
import { View, Button } from 'react-native';
import Carte from '../../components/Carte/Carte';
import HautAccueil from '../../components/HautAccueil/HautAccueil';
import BoutonSignalement from '../../components/BoutonSignalement/BoutonSignalement';
import BoutonRecherche from '../../components/BoutonRecherche/BoutonRecherche';
import styles from './stylesAccueil';

// eslint-disable-next-line react/prefer-stateless-function
export default class Accueil extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.carte}>
          <Carte />
          <BoutonRecherche />
        </View>

        <View style={styles.boutonSignalement}>
          <BoutonSignalement />
        </View>
        <Button
          title="Add some friends"
          onPress={() => this.props.navigation.navigate('FinTrajet')
          }
        />
      </View>
    );
  }
}
