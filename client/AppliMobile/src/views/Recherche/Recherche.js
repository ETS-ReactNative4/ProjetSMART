import React from 'react';
import { View, Image } from 'react-native';
import { Header } from 'react-native-elements';
import RechercheLieu from '../../components/RechercheLieu/RechercheLieu';
import BoutonRetour from '../../components/BoutonRetour/BoutonRetour';

// eslint-disable-next-line react/prefer-stateless-function
export default class Trajet extends React.Component {
  render() {
    return (
      <View flex={12}>
        <Header
          centerComponent={ <Image style={{ flex: 1, resizeMode: 'contain', marginBottom: 5 }} source={require('../../../assets/logo.png')} /> }
          containerStyle={{ backgroundColor: '#000000' }}
        />
        <View flex={11}>
          <RechercheLieu type={this.props.navigation.getParam('type')} />
        </View>
        <View flex={1}>
          <BoutonRetour />
        </View>
      </View>
    );
  }
}
