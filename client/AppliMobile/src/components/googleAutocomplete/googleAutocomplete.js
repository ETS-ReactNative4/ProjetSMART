/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { updateDestination } from '../../actions/index';
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
          const commune = data.terms[2].value;
          const route = data.terms[1].value;
          this.props.updateDestination(lat, lng, commune, route);
          // console.log(this.props);
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
  return { destination: state.destination };
}


const mapDispatchToProps = dispatch => ({
  updateDestination: (lat, lng, commune, route) => dispatch(updateDestination(lat, lng, commune, route))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleAutocomplete);
