import React from 'react';
import GoogleAutocomplete from '../googleAutocomplete/googleAutocomplete';
import styles from './stylesRechercheLieu';

// eslint-disable-next-line react/prefer-stateless-function
export default class RechercheLieu extends React.Component {
  render() {
    return (
      <GoogleAutocomplete style={styles.googleAutocomplete} type={this.props.type} />
    );
  }
}
