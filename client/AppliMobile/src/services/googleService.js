import API from './api';

const googleService = {
  async getDirections(coordinates, destinationLoc) {
    console.log("n'importe quoi");
    const co = JSON.parse(coordinates); 
    const origin = co.coords.longitude + ", " + co.coords.latitude;
    // eslint-disable-next-line prefer-template
    const res = await API.get('api/directions?origin=' + origin + '&destination=' + destinationLoc);
    console.log("n'importe quoi V2");
    return res.data;
  }
};

export default googleService;
