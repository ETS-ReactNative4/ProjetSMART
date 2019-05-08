const infoItineraireReducer = (state = { polyline: 0, distance: 0, temps: 0, calories: 0 }, action) => {
  switch (action.type) {
    case 'UPDATE_INFO_ITINERAIRE':
      return {
        polyline: action.polyline,
        distance: action.distance,
        temps: action.temps,
        calories: action.calories,
      };
    default:
      return state;
  }
};

export default infoItineraireReducer;
