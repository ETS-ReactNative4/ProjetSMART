const destinationReducer = (state = { lat: 0, lng: 0, commune: '', route: '' }, action) => {
  switch (action.type) {
    case 'UPDATE_DESTINATION':
      return {
        lat: action.lat,
        lng: action.lng,
        commune: action.commune,
        route: action.route
      };
    default:
      return state;
  }
};

export default destinationReducer;
