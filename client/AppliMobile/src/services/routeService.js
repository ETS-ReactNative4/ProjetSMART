import API from './api';

const routeService = {
  async getRoute() {
    const res = await API.get('api/route');
    return res.data;
  }
};

export default routeService;
