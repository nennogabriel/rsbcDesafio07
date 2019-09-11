import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './modules/rootReducer';
import rootSagas from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;


const sagaMiddleware = createSagaMiddleware({sagaMonitor});

const composer =
  process.env.NODE_ENV === 'development'
    ? compose(
        applyMiddleware(sagaMiddleware),
        console.tron.createEnhancer()
      )
    : compose(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducers, composer);

sagaMiddleware.run(rootSagas);

export default store;
