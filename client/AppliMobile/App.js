import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import googleService from './src/services/googleService';

export default class RnDirectionsApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: []
    }
  }

  componentDidMount() {
    // find your origin and destination point coordinates and pass it to our method.
     this._getDirections();
  }

async _getDirections() {
        try {
            let respJson = await googleService.getDirections();
            console.log("respJson");
            let points = Polyline.decode(respJson.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        } catch(error) {
            alert(error)
            return error
        }
    }

  render() {
    return (
      <View>
        <MapView style={styles.map} initialRegion={{
          latitude:-33.872659, 
          longitude: 151.206116, 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>

        <MapView.Polyline 
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>

        </MapView>
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
