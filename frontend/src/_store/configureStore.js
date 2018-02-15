import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../_reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

function configureStoreDev(initialState) {
  const store = createStore(rootReducer, initialState, applyMiddleware(logger, thunk));

  return store;
}

const configureStore = configureStoreDev;

export default configureStore;
