import { combineReducers, createStore } from 'redux';
import DestinationReducer from './destinationReducer';
import LocalisationReducer from './localisationReducer';
import MarkerReducer from './markerReducer';
import OrigineReducer from './origineReducer';
import infoItineraireReducer from './infoItineraireReducer';

const rootReducer = combineReducers({
  destination: DestinationReducer,
  origine: OrigineReducer,
  localisation: LocalisationReducer,
  markerList: MarkerReducer,
  infoItineraire: infoItineraireReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
