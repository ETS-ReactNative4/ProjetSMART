const markerReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MARKER':
      return [
        ...state,
        {
          lat: action.lat,
          lng: action.lng,
          markerType: action.markerType
        }
      ];
    default:
      return state;
  }
};

export default markerReducer;
