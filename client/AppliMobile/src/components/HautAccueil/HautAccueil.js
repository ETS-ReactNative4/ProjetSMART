import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';
import styles from './stylesHautAccueil.js';
import RechercheLieu from '../RechercheLieu/RechercheLieu.js';
import BoutonProfil from '../BoutonProfil/BoutonProfil.js';

export default class HautAccueil extends React.Component {
  render() {
    return (
        <View style={ styles.container}>
            <RechercheLieu style={ styles.rechercheLieu}/>
            <BoutonProfil style={ styles.boutonProfil}/>
        </View>
    );
  }
}