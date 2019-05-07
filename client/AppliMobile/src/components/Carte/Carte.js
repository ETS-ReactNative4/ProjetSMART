/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
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
      mapRegion: { latitude: -33.872659, longitude: 151.206116, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      tabPoints: []
    };
  }

  componentDidMount() {
    // find your origin and destination point coordinates and pass it to our method.
    this._getLocationAsync();
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
    console.log(this.props);
  };

  async _getDirections() {
    try {
      const destinationLoc = this.props.destination;
      const coordinates = this.props.origine;
      console.log(coordinates);
      console.log(destinationLoc);
      const respJson = await googleService.getDirections(coordinates, destinationLoc);
      console.log(respJson);
      const points = Polyline.decode(respJson);
      console.log(points);
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

  render() {
    return (

      <View>
        <MapView
          style={styles.map}
          region={this.state.region}
          ref={(map) => { this.map = map; }}
          showsUserLocation
          userTrackingMode
          onRegionChange={this._handleMapRegionChange}
        >
          <MapView.Polyline
            coordinates={this.state.tabPoints}
            strokeWidth={2}
            strokeColor="red"
          />
          {this.props.markerList.map(marker => (
            <MarkerPerso
              localisation={marker.localisation}
            />
          ))}
        </MapView>
        <Button title="Test Connection" onPress={() => this._getDirections()} />

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    destination: state.destination,
    localisation: state.localisation,
    markerList: state.markerList,
    origine: state.origine
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
