import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

const writeOut = () => {
  console.log(`state: ${JSON.stringify(store.getState())}`);
};

store.subscribe(writeOut);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
