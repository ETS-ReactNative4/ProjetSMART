import React, { Component } from 'react';
import GoogleAutocomplete from '../googleAutocomplete/googleAutocomplete';
import styles from './stylesRechercheLieu.js';

export default class RechercheLieu extends React.Component {
  render() {
    return (
        <GoogleAutocomplete style={ styles.googleAutocomplete}/>
    );
  }
}