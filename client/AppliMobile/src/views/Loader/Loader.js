import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import googleService from '../../services/googleService';
import { updateInfoItineraire } from '../../actions/index';

class Loader extends React.Component {
  componentDidMount() {
    this._getDirections();
  }

  async _getDirections() {
    try {
      const destinationLoc = this.props.destination;
      const coordinates = this.props.origine;
      console.log("test");
      console.log(coordinates);
      console.log(destinationLoc);
      const respJson = await googleService.getDirections(coordinates, destinationLoc);
      console.log(respJson);
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
      <Text>Loading...</Text>
    );
  }
}

function mapStateToProps(state) {
  return { destination: state.destination, origine: state.origine, infoItineraire: state.infoItineraire };
}

const mapDispatchToProps = dispatch => ({
  updateInfoItineraire: (polyline, distance, temps, calories) => dispatch(updateInfoItineraire(polyline, distance, temps, calories)),
});

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader));
