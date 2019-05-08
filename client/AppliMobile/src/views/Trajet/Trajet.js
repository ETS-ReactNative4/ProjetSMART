import React from 'react';
import { View, Image } from 'react-native';
import { Header } from 'react-native-elements';
import Carte from '../../components/Carte/Carte';
import BoutonSignalement from '../../components/BoutonSignalement/BoutonSignalement';
import BoutonEnd from '../../components/BoutonEnd/BoutonEnd';
import styles from './stylesTrajet';

// eslint-disable-next-line react/prefer-stateless-function
export default class Trajet extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={<Image style={{ flex: 1, resizeMode: 'contain', marginBottom: 5 }} source={require('../../../assets/logo.png')} />}
          containerStyle={{ backgroundColor: '#000000' }}
        />
        <View style={styles.carte}>
          <Carte />
        </View>
        <View style={styles.boutonSignalement}>
          <BoutonSignalement />
        </View>
        <View style={styles.basItineraire}>
          <View style={styles.boutonLetsGo}>
            <BoutonEnd />
          </View>
        </View>
      </View>
    );
  }
}
