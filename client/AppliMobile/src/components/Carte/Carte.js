/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, Button,Marker,Animated} from 'react-native';
import { Location, Permissions } from 'expo';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import styles from './styleCarte';
import googleService from '../../services/googleService';
import flagBlueImg from '../../../assets/car.png';
import flagPinkImg from '../../../assets/flag-blue.png';

class Carte extends Component {
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
      console.log(this.props);
      const destinationLoc = this.props.destination;
      const coordinates = this.state.geolocalisation;
      console.log(coordinates);
      const respJson = await googleService.getDirections(coordinates, destinationLoc);
      console.log(respJson);
      const points = Polyline.decode(respJson.points);
      console.log("après points");
      const coords = points.map(point => ({
        latitude: point[0],
        longitude: point[1]
      }));
      console.log("après coords");
      this.setState({ tabPoints: coords });
      return this.state.tabPoints;
    } catch (error) {
      console.log("l'eerreur du cul");
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

          <MapView.Marker
          onPress={() => this.setState({ marker1: !this.state.marker1 })}
          //attention geolocalisation nécessite d'etre initialiser avec des valeurs par défauts
          coordinate={this.state.geolocalisation}
         
          ref={marker => { this.marker = marker }}
          // transforme le flagblue en flag pink
          image={this.state.marker1 ? flagBlueImg : flagPinkImg}
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
)(Carte);

/*
<Button title="Test Connection" onPress={() => this._getDirections(this.state.geolocalisation, '41.905499, 12.456262')} />
*/
