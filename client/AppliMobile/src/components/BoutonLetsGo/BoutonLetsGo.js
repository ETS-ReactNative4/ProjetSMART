import React from 'react';
import { Button, Alert } from 'react-native';
// import styles from './stylesBoutonSignalement';

export default class BoutonLetsGo extends React.Component {
  _onPress = () => {
    Alert.alert("Et non! Ca n'est pas encore codé :'(");
  }

  render() {
    return (
      <Button
        onPress={this._onPress}
        title="LET'S GO !"
        color="#C840E9"
      />
    );
  }
}
