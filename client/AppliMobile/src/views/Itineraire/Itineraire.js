import React from 'react';
import { View, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import Carte from '../../components/Carte/Carte';
import BoutonSignalement from '../../components/BoutonSignalement/BoutonSignalement';
import styles from './stylesItineraire';
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
        <Header
          centerComponent={ <Image style={{ flex: 1, resizeMode: 'contain', marginBottom: 5 }} source={require('../../images/logo.png')} /> }
          containerStyle={{ backgroundColor: '#000000' }}
        />
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
