import API from './api.js';

const googleService = {

  getDirections : async function() {
  	console.log("n'importe quoi")
    const res = await API.get('api/directions');
    	console.log("n'importe quoi V2")
    return res.data;
  }
}

export default googleService;

