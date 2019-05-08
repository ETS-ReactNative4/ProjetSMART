import React from 'react';
import { View } from 'react-native';
import RechercheLieu from '../../components/RechercheLieu/RechercheLieu';
import BoutonRetour from '../../components/BoutonRetour/BoutonRetour';

// eslint-disable-next-line react/prefer-stateless-function
export default class Trajet extends React.Component {
  render() {
    return (
      <View flex={12}>
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
