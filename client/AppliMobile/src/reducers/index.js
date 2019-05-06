import { combineReducers, createStore } from 'redux';
import DestinationReducer from './destinationReducer';

const rootReducer = combineReducers({
  destination: DestinationReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
