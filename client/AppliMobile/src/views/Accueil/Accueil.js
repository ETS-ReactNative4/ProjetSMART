import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import Carte from '../../components/Carte/Carte';
import BoutonSignalement from '../../components/BoutonSignalement/BoutonSignalement';
import BoutonGo from '../../components/BoutonGo/BoutonGo';
import BoutonRecherche from '../../components/BoutonRecherche/BoutonRecherche';
import styles from './stylesAccueil';

// eslint-disable-next-line react/prefer-stateless-function
class Accueil extends React.Component {
  _displayBoutonGo = () => {
    if (!!this.props.origine.lat && !!this.props.destination.lat) {
      return (<BoutonGo />);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={ <Image style={{ flex: 1, resizeMode: 'contain', marginBottom: 5 }} source={require('../../../assets/logo.png')} /> }
          containerStyle={{ backgroundColor: '#000000' }}
        />
        <View style={styles.carte}>
          <Carte />
          <BoutonRecherche />
          {this._displayBoutonGo()}
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
