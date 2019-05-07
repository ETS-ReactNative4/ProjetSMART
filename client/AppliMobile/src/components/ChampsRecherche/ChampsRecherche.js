import React from 'react';
import { View, Button, Text } from 'react-native';
import { GooglePlacesAutocompletePerso } from '../../../node_modules/react-native-google-places-autocomplete/GooglePlacesAutocompletePerso';

export default class ChampsRecherche extends React.Component {
  render() {
    return (
      <View flex={8}>
        <View flex={1} paddingTop={10}>
          <GooglePlacesAutocompletePerso
            placeholder="Départ"
          />
        </View>
        <View flex={5}>
          <GooglePlacesAutocompletePerso
            placeholder="Arrivée"
          />
        </View>
      </View>
    );
  }
}
