import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers/'
import sagas from './sagas';

const logger = createLogger({collapsed: true});
const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(
  sagaMiddleware, 
  logger
)(createStore);
const store = createStoreWithMiddleware(reducers);

sagaMiddleware.run(sagas);


export default store;
