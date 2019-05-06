import React from 'react';
import { View } from 'react-native';
import RechercheLieu from '../RechercheLieu/RechercheLieu';
import styles from './stylesContainerRecherche';

export default class containerRecherche extends React.Component {
  render() {
    return (
      <View style={styles.rechercheLieu}>
        <RechercheLieu />
      </View>
    );
  }
}
