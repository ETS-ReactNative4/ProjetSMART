import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import styles from './stylesRechercheLieu.js';

export default class RechercheLieu extends React.Component {
  render() {
    return (
        <View>
            <TextInput placeholder='Où va-t-on ?'/>
        </View>
    );
  }
}