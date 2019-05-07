/* eslint-disable prefer-template */
import API from './api';

const googleService = {
  async getDirections(coordinates, destinationLoc) {
    const co = JSON.parse(coordinates);
    const res = await API.get('api/directions?latOrigine=' + co.coords.latitude + '&longOrigine=' + co.coords.longitude + '&latDestination=' + destinationLoc.lat + '&longDestination=' + destinationLoc.lng + '&commDestionation=' + destinationLoc.commune + '&rueDestination=' + destinationLoc.route);
    return res.data;
  }
};

export default googleService;
