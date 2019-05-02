/* eslint-disable prefer-template */
import API from './api';

const googleService = {
  async getDirections(coordinates, destinationLoc) {
    const co = JSON.parse(coordinates);
    const origin = co.coords.latitude + ',' + co.coords.longitude;
    const res = await API.get('api/directions?origin=' + origin + '&destination=' + destinationLoc);
    return res.data;
  }
};

export default googleService;
