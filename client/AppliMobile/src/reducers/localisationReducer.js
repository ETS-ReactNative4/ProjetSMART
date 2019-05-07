const destinationReducer = (state = { lat: 0, lng: 0 }, action) => {
    switch (action.type) {
      case 'UPDATE_LOCALISATION':
        return {
          lat: action.lat,
          lng: action.lng
        };
      default:
        return state;
    }
  };
  
  export default destinationReducer;
  