import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Carte from '../../components/Carte/Carte';
import HautAccueil from '../../components/HautAccueil/HautAccueil';
import BoutonSignalement from '../../components/BoutonSignalement/BoutonSignalement';

export default class Accueil extends React.Component {
  render() {
    return (
      <View style={ styles.container}>

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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  hautAccueil: {
    flex: 1,
    backgroundColor: '#FF5733'
  },
  carte: {
    flex: 8
  },
  boutonSignalement: {
    flex: 1,
    backgroundColor: '#333EFF'
  }
});