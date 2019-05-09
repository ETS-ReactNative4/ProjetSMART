/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import MarkerPerso from '../MarkerPerso/MarkerPerso';

class MarkersList extends Component {
  constructor(props) {
    super(props);
  }

  displayMarkers() {
    if (this.props.markerList.length > 0) {
      return (
        this.props.markerList.map((marker) => {
          return (
            <MarkerPerso
              coordinates={{ latitude: marker.lat, longitude: marker.lng }}
              markertype={marker.markerType}
              key={marker.id}
            />
          );
        })
      );
    }
  }

  render() {
    return (
      <View>
        {this.displayMarkers()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    markerList: state.markerList
  };
}

export default connect(
  mapStateToProps
)(MarkersList);

/*
<Button title="Test Connection" onPress={() => this._getDirections(this.state.geolocalisation, '41.905499, 12.456262')} />
*/
