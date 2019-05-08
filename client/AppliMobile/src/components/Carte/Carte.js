/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Location, Permissions } from 'expo';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import { updateLocalisation } from '../../actions/index';
import styles from './styleCarte';
import googleService from '../../services/googleService';
import MarkerPerso from '../MarkerPerso/MarkerPerso';

class Carte extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: { latitude: 45.758060, longitude: 4.833740, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      tabPoints: [],
      testMarker: [
        {
          lat: 45.77,
          lng: 4.88,
          markerType: 'fermee',
          id: 1
        },
        {
          lat: 45.77,
          lng: 4.86,
          markerType: 'etat',
          id: 2
        },
        {
          lat: 45.758,
          lng: 4.833,
          markerType: 'interet',
          id: 3
        }
      ]
    };
  }

  componentDidMount() {
    // find your origin and destination point coordinates and pass it to our method.
    this._getLocationAsync();
    this._getDirections();
  }

  _handleMapRegionChange = (mapRegion) => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('acces denied for geolocalisation');
    }
    const locationActuel = await Location.getCurrentPositionAsync({});
    this.props.updateLocalisation(locationActuel.coords.latitude, locationActuel.coords.longitude);
    this.setState({
      mapRegion: { latitude: this.props.localisation.lat, longitude: this.props.localisation.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
    });
    console.log(this.props);
  };

  _getDirections() {
    try {
      console.log('Carte :');
      console.log(this.props.infoItineraire);
      const points = Polyline.decode(this.props.infoItineraire.polyline);
      const coords = points.map(point => ({
        latitude: point[0],
        longitude: point[1]
      }));
      this.setState({ tabPoints: coords });
      return this.state.tabPoints;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  displayMarkers() {
    if (this.props.markerList.length > 0) {
      return (
        this.state.testMarker.map(marker => (
          <MarkerPerso
            coordinates={{ latitude: marker.lat, longitude: marker.lng }}
            markertype={marker.markerType}
            key={marker.id}
          />
        ))
      );
    }
  }

  render() {
    return (

      <View>
        <MapView
          style={styles.map}
          region={this.state.mapRegion}
          ref={(map) => { this.map = map; }}
          showsUserLocation
          userTrackingMode
          // onRegionChange={this._handleMapRegionChange}
        >
          <MapView.Polyline
            coordinates={this.state.tabPoints}
            strokeWidth={2}
            strokeColor="red"
          />
          {this.displayMarkers()}
        </MapView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    destination: state.destination,
    localisation: state.localisation,
    markerList: state.markerList,
    origine: state.origine,
    infoItineraire: state.infoItineraire
  };
}

const mapDispatchToProps = dispatch => ({
  updateLocalisation: (lat, lng) => dispatch(updateLocalisation(lat, lng))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carte);

/*
<Button title="Test Connection" onPress={() => this._getDirections(this.state.geolocalisation, '41.905499, 12.456262')} />
*/
