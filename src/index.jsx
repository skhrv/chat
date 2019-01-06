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
import {
  newMessageSuccess, newChannelSuccess, editChannelSuccess, removeChannelSuccess,
} from './actions';
import UserContext from './UserContext';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

if (cookies.get('name') === undefined) {
  const name = faker.name.findName();
  cookies.set('name', name);
}
const name = cookies.get('name');

const initStateFromGon = ({ channels, messages, currentChannelId }) => {
  const normalize = (acc, item) => ({ ...acc, [item.id]: item });
  const normalizedChannels = channels.reduce(normalize, {});
  const normilizedMessages = messages.reduce(normalize, {});
  const defaultChannelId = channels.find(c => !c.removable).id;
  const channelUI = { currentChannelId, defaultChannelId };
  return { channels: normalizedChannels, messages: normilizedMessages, channelUI };
};
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
socket.on('newChannel', (payload) => {
  store.dispatch(newChannelSuccess(payload));
});
socket.on('renameChannel', (payload) => {
  store.dispatch(editChannelSuccess(payload));
});
socket.on('removeChannel', (payload) => {
  store.dispatch(removeChannelSuccess(payload));
});

ReactDOM.render(
  <Provider store={store}>
    <UserContext.Provider value={name}>
      <App />
    </UserContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
