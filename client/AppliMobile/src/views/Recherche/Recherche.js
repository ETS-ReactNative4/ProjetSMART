import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import RechercheLieu from '../../components/RechercheLieu/RechercheLieu';
import styles from './stylesRecherche.js';

// eslint-disable-next-line react/prefer-stateless-function
export default class Trajet extends React.Component {
  render() {
    return (
      <RechercheLieu type={this.props.navigation.getParam('type')} navigation={this.props.navigation} />
    );
  }
}
