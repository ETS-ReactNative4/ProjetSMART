import React from 'react';
import { View, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import Carte from '../../components/Carte/Carte';
import BoutonSignalement from '../../components/BoutonSignalement/BoutonSignalement';
import styles from './stylesItineraire';
import BasItineraire from '../../components/BasItineraire/BasItineraire';
import BoutonLetsGo from '../../components/BoutonLetsGo/BoutonLetsGo';
import BoutonRetour from '../../components/BoutonRetour/BoutonRetour';

// eslint-disable-next-line react/prefer-stateless-function
class Itineraire extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={ <Image style={{ flex: 1, resizeMode: 'contain', marginBottom: 5 }} source={require('../../../assets/logo.png')} />}
          containerStyle={{ backgroundColor: '#000000' }}
        />
        <View style={styles.carte}>
          <Carte />
        </View>
        <BoutonSignalement />
        <View style={styles.basItineraire}>
          <BasItineraire data={{ temps: '15 min', distance: '2 km', calories: '53 kcal' }} />
          <View style={styles.boutons}>
            <View style={styles.boutonRetour}>
              <BoutonRetour />
            </View>
            <View style={styles.boutonLetsGo}>
              <BoutonLetsGo />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { destination: state.destination, origine: state.origine };
}

export default connect(
  mapStateToProps
)(Itineraire);
