import API from './api.js';

const routeService = {
  getRoute : async function() {
    const res = await API.get('api/route');
    return res.data;
  }
}

export default routeService;

