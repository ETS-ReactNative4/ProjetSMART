import API from './api';

const googleService = {
  async getDirections(coordinates, destinationLoc) {
    console.log("n'importe quoi");
    // eslint-disable-next-line prefer-template
    const res = await API.get('api/directions?origin=' + coordinates + '&destination=' + destinationLoc);
    console.log("n'importe quoi V2");
    return res.data;
  }
};

export default googleService;
