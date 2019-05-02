import React, { Component } from 'react';
import { Button, Alert } from 'react-native';
import styles from './stylesBoutonProfil.js';

export default class BoutonProfil extends React.Component {

    _onPress = () => {
        Alert.alert("Et non! Ca n'est pas encore codé :'(");
    }

    render() {
        return (
            <Button
              onPress={ this._onPress }
              title="Profil"
            />
        );
    }
}