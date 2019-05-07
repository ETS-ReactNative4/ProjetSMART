export const updateDestination = (lat, lng, commune, route) => ({
  type: 'UPDATE_DESTINATION',
  lat,
  lng,
  commune,
  route
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
  markerType
});
