/* eslint-disable prefer-template */
import API from './api';

const googleService = {
  async getDirections(coordinates, destinationLoc) {
    const res = await API.get('api/route/directions?latOrigine=' + coordinates.lat + '&longOrigine=' + coordinates.lng + '&latDestination=' + destinationLoc.lat + '&longDestination=' + destinationLoc.lng);
    // const res = await API.get('api/route/directions?latOrigine=45.77532950000001&longOrigine=4.883327899999999&latDestination=45.776376&longDestination=4.872453&commDestination=Villeurbanne&rueDestination=Avenue Roger Salengro');
    return res.data;
  }
};

export default googleService;
