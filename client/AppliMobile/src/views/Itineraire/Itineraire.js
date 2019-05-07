import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import Carte from '../../components/Carte/Carte';
import HautItineraire from '../../components/HautItineraire/HautItineraire';
import BoutonSignalement from '../../components/BoutonSignalement/BoutonSignalement';
import RechercheLieu from '../../components/RechercheLieu/RechercheLieu';
import styles from './stylesItineraire';
import ChampsRecherche from '../../components/ChampsRecherche/ChampsRecherche';
import BoutonRecherche from '../../components/BoutonRecherche/BoutonRecherche';
import BasItineraire from '../../components/BasItineraire/BasItineraire';
import BoutonLetsGo from '../../components/BoutonLetsGo/BoutonLetsGo';

// eslint-disable-next-line react/prefer-stateless-function
class Itineraire extends React.Component {
  render() {
    console.log('origin :');
    console.log(this.props.origine);
    console.log('destination :');
    console.log(this.props.destination);
    return (
      <View style={styles.container}>
        <View style={styles.carte}>
          <Carte />
          {/* <BoutonRecherche /> */}
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

function mapStateToProps(state) {
  return { destination: state.destination, origine: state.origine };
}

export default connect(
  mapStateToProps
)(Itineraire);
