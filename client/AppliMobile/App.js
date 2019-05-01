import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import routeService from './src/services/routeService';

export default class App extends React.Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: { coords: { latitude: 37.78825, longitude: -122.4324 } }
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = (mapRegion) => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
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
      <View style={styles.container}>
        <MapView
          style={{ marginTop: 30, alignSelf: 'stretch', height: '90%' }}
          // initialRegion={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          region={this.state.region}
          ref={(map) => { this.map = map; }}
          showsUserLocation
          userTrackingMode
          onRegionChange={this._handleMapRegionChange}
        >
          <MapView.Marker
            coordinate={this.state.location.coords}
            title="My Marker"
            description="Some description"
          />
        </MapView>
        <TextInput style={{ marginLeft: 5, marginRight: 5, height: 50, borderColor: '#000000', borderWidth: 1, paddingLeft: 5 }} placeholder="Où va-t-on ?" />
        <Button title="Rechercher" onPress={() => {}} />
        <Button title="Test Connection" onPress={() => this._getRoute()} />
        <Text>
          Location: {this.state.locationResult}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
