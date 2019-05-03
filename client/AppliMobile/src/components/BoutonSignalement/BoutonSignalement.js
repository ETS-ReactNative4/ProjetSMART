import React from 'react';
import { Button, Alert } from 'react-native';
// import styles from './stylesBoutonSignalement';

export default class BoutonSignalement extends React.Component {
  _onPress = () => {
    Alert.alert("Et non! Ca n'est pas encore codé :'(");
  }

  render() {
    return (
      <Button
        onPress={this._onPress}
        title="Signalement"
      />
    );
  }
}
