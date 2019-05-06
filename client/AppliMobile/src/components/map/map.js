/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { Location, Permissions } from 'expo';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import styles from './mapStyle';
import googleService from '../../services/googleService';


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: { latitude: -33.872659, longitude: 151.206116, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      geolocalisation: null,
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
      this.setState({
        geolocalisation: 'Permission to access location was denied',
      });
    }
    const locationActuel = await Location.getCurrentPositionAsync({});
    this.setState({ geolocalisation: JSON.stringify(locationActuel) });
  };

  async _getDirections() {
    try {
      const destinationLoc = this.props.destination;
      const coordinates = this.state.geolocalisation;
      const respJson = await googleService.getDirections(coordinates, destinationLoc);
      const points = Polyline.decode(respJson.points);
      const coords = points.map((point, index) => ({
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
        </MapView>
        <Button title="Test Connection" onPress={() => this._getDirections()} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { destination: state.destination };
}

export default connect(
  mapStateToProps
)(Map);

/*
<Button title="Test Connection" onPress={() => this._getDirections(this.state.geolocalisation, '41.905499, 12.456262')} />
*/
