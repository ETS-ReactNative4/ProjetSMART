import React from 'react';
import { View,Button, Text } from 'react-native';
import RechercheLieu from '../RechercheLieu/RechercheLieu';
import styles from './stylesBoutonRecherche';

export default class BontonRecherche extends React.Component {
  render() {
    return (
      <Button
        title=""
        onPress={this._onPress}
        lowercase
        color="grey"
      >
        <Text>
          Départ
        </Text>
      </Button>
    );
  }
}
