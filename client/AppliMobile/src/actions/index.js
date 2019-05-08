const markerId = 0;

export const updateDestination = (lat, lng, commune, route, formatedAdress) => ({
  type: 'UPDATE_DESTINATION',
  lat,
  lng,
  commune,
  route,
  formatedAdress
});

export const updateOrigine = (lat, lng, commune, route, formatedAdress) => ({
  type: 'UPDATE_ORIGINE',
  lat,
  lng,
  commune,
  route,
  formatedAdress
});

export const updateLocalisation = (lat, lng) => ({
  type: 'UPDATE_LOCALISATION',
  lat,
  lng
});

export const addMarker = (lat, lng, markerType) => ({
  type: 'ADD_MARKER',
  lat,
  lng,
  markerType,
  id: markerId + 1
});
