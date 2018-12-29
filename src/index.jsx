import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import App from './App';

// import { composeWithDevTools } from 'redux-devtools-extension';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const { channels } = gon;

if (cookies.get('name') === undefined) {
  const name = faker.name.findName();
  cookies.set('name', name);
}

const store = createStore(
  state => state,
  { channels },
  compose(
    applyMiddleware(reduxThunk),
  ),
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
