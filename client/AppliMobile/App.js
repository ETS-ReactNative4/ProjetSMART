import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import { Location, Permissions } from 'expo';
import MapView,  { Marker, ProviderPropType,AnimatedRegion, Animated}from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import googleService from './src/services/googleService';
import flagBlueImg from './assets/icon.png';
import flagPinkImg from './assets/flag-blue.png';
export default class RnDirectionsApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: { latitude: -33.872659, longitude: 151.206116, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
       //pour les tests markers
      geolocalisation:null ,
      locationActuel: {coords: { latitude: 37.78825, longitude: -122.4324}},
      tabPoints:  []
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
    let locationActuel = await Location.getCurrentPositionAsync({});
    this.setState({ geolocalisation: JSON.stringify(locationActuel) , locationActuel,});
    
  };

  async _getDirections(coordinates, destinationLoc) {
    try {
     // const respJson = await googleService.getDirections(coordinates, destinationLoc);
      console.log('respJson');
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
          <MapView.Marker
          onPress={() => this.setState({ marker1: !this.state.marker1 })}
          coordinate={this.state.locationActuel.coords}
         
          ref={marker => { this.marker = marker }}
          // transforme le flagblue en flag pink
          image={this.state.marker1 ? flagBlueImg : flagPinkImg}
        />
        </MapView>
         
        <Text>
          Location: {this.state.geolocalisation} 
        </Text>
       {/* <Button title="Test Connection" onPress={() => this._getDirections(this.state.geolocalisation, '41.905499, 12.456262')} />*/} 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});

AppRegistry.registerComponent('RnDirectionsApp', () => RnDirectionsApp);
