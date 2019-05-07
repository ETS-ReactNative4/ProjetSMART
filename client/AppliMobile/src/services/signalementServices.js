import API from './api';

const signalementService = {
  async postSignalement(signalement) {
    const body = {
        signalement: {
            lat: signalement.latitude,
            problem: signalement.problem,
            lng: signalement.longitude,
        }
    }
    const res = await API.post('api/route/signalement', body ,{});
    return res.data;
  }
};

export default signalementService;
