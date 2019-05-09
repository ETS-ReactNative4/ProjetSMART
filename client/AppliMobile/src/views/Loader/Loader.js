import React from 'react';
import { Image, View } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import googleService from '../../services/googleService';
import { updateInfoItineraire, addMarker } from '../../actions/index';
import Spinner from '../../components/LoadingSpinner/loadingSpinner';

class Loader extends React.Component {
  componentDidMount() {
    this._getDirections();
  }

  async _getDirections() {
    try {
      const destinationLoc = this.props.destination;
      const coordinates = this.props.origine;
      const respJson = await googleService.getDirections(coordinates, destinationLoc);
      respJson.marqueurs.forEach((marker) => {
        this.props.addMarker(marker.latitude, marker.longitude, marker.Categorie);
      });
      this.props.updateInfoItineraire(respJson.polyline, respJson.distance / 1000, respJson.temps, respJson.calories);
      this.props.navigation.navigate('Itineraire');
      return 'fini';
    } catch (error) {
      alert(error);
      return error;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={<Image style={{ flex: 1, resizeMode: 'contain', marginBottom: 5 }} source={require('../../../assets/logo.png')} />}
          containerStyle={{ backgroundColor: '#000000' }}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    destination: state.destination,
    origine: state.origine,
    infoItineraire: state.infoItineraire,
    markerList: state.markerList
  };
}

const mapDispatchToProps = dispatch => ({
  updateInfoItineraire: (polyline, distance, temps, calories) => dispatch(updateInfoItineraire(polyline, distance, temps, calories)),
  addMarker: (lat, lng, markerType) => dispatch(addMarker(lat, lng, markerType))
});

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader));
