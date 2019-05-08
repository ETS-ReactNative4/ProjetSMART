import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Header } from 'react-native-elements';
import Carte from '../../components/Carte/Carte';
import HautAccueil from '../../components/HautAccueil/HautAccueil';
import BoutonSignalement from '../../components/BoutonSignalement/BoutonSignalement';
import styles from './stylesTrajet.js';

export default class Trajet extends React.Component {
  render() {
    return (
      <View style={ styles.container}>
        <Header
          centerComponent={ <Image style={{ flex: 1, resizeMode: 'contain', marginBottom: 5 }} source={require('../../images/logo.png')} /> }
          containerStyle={{ backgroundColor: '#000000' }}
        />

        <View style={ styles.hautAccueil}>
          <HautAccueil/>
        </View>

        <View style={ styles.carte}>
          <Carte/>
        </View>

        <View style={ styles.boutonSignalement}>
          <BoutonSignalement/>
        </View>

      </View>
    );
  }
}