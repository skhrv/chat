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
import { composeWithDevTools } from 'redux-devtools-extension';
import io from 'socket.io-client';
import App from './components/App';
import reducers from './reducers';
import '@babel/polyfill';
import { newMessageSuccess } from './actions';
import UserContext from './UserContext';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

if (cookies.get('name') === undefined) {
  const name = faker.name.findName();
  cookies.set('name', name);
}

const name = cookies.get('name');
const initStateFromGon = ({ channels, messages, currentChannelId }) => (
  { channels, messages, currentChannelId }
);
const store = createStore(
  reducers,
  { ...initStateFromGon(gon) },
  compose(
    composeWithDevTools(applyMiddleware(reduxThunk)),
  ),
);
const socket = io();
socket.on('newMessage', (payload) => {
  store.dispatch(newMessageSuccess(payload));
});
ReactDOM.render(
  <Provider store={store}>
    <UserContext.Provider value={name}>
      <App />
    </UserContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
