import { combineReducers, createStore } from 'redux';
import DestinationReducer from './destinationReducer';
import LocalisationReducer from './localisationReducer';
import MarkerReducer from './markerReducer';

const rootReducer = combineReducers({
  destination: DestinationReducer,
  localisation: LocalisationReducer,
  markerList: MarkerReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
