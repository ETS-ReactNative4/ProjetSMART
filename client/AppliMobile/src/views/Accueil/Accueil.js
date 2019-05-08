import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import Carte from '../../components/Carte/Carte';
import HautAccueil from '../../components/HautAccueil/HautAccueil';
import BoutonSignalement from '../../components/BoutonSignalement/BoutonSignalement';
import BoutonRecherche from '../../components/BoutonRecherche/BoutonRecherche';
import styles from './stylesAccueil';

// eslint-disable-next-line react/prefer-stateless-function
class Accueil extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.carte}>
          <Carte />
          <BoutonRecherche navigation={this.props.navigation} />
        </View>

        <View style={styles.boutonSignalement}>
          <BoutonSignalement />
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
)(Accueil);
