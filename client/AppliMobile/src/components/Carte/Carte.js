import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button  } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import routeService from '../../services/routeService';
import styles from './stylesCarte.js';

export default class Carte extends React.Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}}
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location, });
  };

  _getRoute = async () => {
    const res = await routeService.getRoute();
    console.log(res);
  }

  render() {
    return (
      <View style={ styles.container}>
        <MapView
          style={{ marginTop: 30 , alignSelf: 'stretch', height: "90%" }}
          //initialRegion={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          region={this.state.region}
          ref={map => {this.map = map}}
          showsUserLocation = {true}
          userTrackingMode = {true}
          onRegionChange={this._handleMapRegionChange}      
        >
        <MapView.Marker
          coordinate={this.state.location.coords}
          title="My Marker"
          description="Some description"
        />
        </MapView>
        <Button title='Test Connection' onPress={() => this._getRoute()}/>   
        <Text>
          Location: {this.state.locationResult}
        </Text>
      </View>
    );
  }
}