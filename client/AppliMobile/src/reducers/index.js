import { combineReducers, createStore } from 'redux';
import DestinationReducer from './destinationReducer';
import LocalisationReducer from './localisationReducer';
import MarkerReducer from './markerReducer';
import OrigineReducer from './origineReducer';

const rootReducer = combineReducers({
  destination: DestinationReducer,
  origine: OrigineReducer,
  localisation: LocalisationReducer,
  markerList: MarkerReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
