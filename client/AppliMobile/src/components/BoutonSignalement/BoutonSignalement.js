import React, { Component } from 'react';
import { View, Button } from 'react-native';
import styles from './stylesBoutonSignalement.js';

export default class BoutonSignalement extends React.Component {
  render() {
    return (
        <View>
            <Button title='Faire un signalement' onPress={() => {}}/>
        </View>
    );
  }
}