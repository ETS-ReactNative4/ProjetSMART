/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { updateDestination, updateOrigine } from '../../actions/index';
import { API_KEY_GOOGLE_DIRECTIONS } from '../../../secret/api_keys';

const LYON = { lat: 45.7725141, lng: 4.884116 };

class GoogleAutocomplete extends React.Component {
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder="Rechercher"
        minLength={2}
        autoFocus={false}
        returnKeyType="default"
        fetchDetails
        onPress={(data, details = null) => {
          const { lat } = details.geometry.location;
          const { lng } = details.geometry.location;
          const formatedAdress = details.formatted_address;
          console.log(formatedAdress);
          const commune = data.terms[2].value;
          const route = data.terms[1].value;
          if (this.props.type === 'depart') {
            this.props.updateOrigine(lat, lng, commune, route, formatedAdress);
          } else {
            this.props.updateDestination(lat, lng, commune, route, formatedAdress);
          }
          if (this.props.origine.lat !== 0 && this.props.destination.lat !== 0) {
            this.props.navigation.navigate('Itineraire');
          } else {
            this.props.navigation.goBack();
          }
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: API_KEY_GOOGLE_DIRECTIONS,
          language: 'fr', // language of the results
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          location: LYON,
          rankby: 'distance',
        }}
        styles={{
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 16
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          },
          listView: {
            position: 'absolute',
            backgroundColor: 'white',
            marginTop: 50
          }
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return { destination: state.destination, origine: state.origine };
}


const mapDispatchToProps = dispatch => ({
  updateDestination: (lat, lng, commune, route, formatedAdress) => dispatch(updateDestination(lat, lng, commune, route, formatedAdress)),
  updateOrigine: (lat, lng, commune, route, formatedAdress) => dispatch(updateOrigine(lat, lng, commune, route, formatedAdress))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleAutocomplete);
