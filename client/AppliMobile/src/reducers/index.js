import { combineReducers, createStore } from 'redux';
import DestinationReducer from './destinationReducer';
import LocalisationReducer from './localisationReducer';

const rootReducer = combineReducers({
  destination: DestinationReducer,
  localisation: LocalisationReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
