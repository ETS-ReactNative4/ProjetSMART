const markerReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MARKER':
      return [
        ...state,
        {
          lat: action.lat,
          lng: action.lng,
          markerType: action.markerType,
          markerid: action.id
        }
      ];
    default:
      return state;
  }
};

export default markerReducer;
