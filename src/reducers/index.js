import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { omitBy } from 'lodash';
import * as actions from '../actions';

const messages = handleActions({
  [actions.newMessageSuccess]:
    (state, { payload: { data } }) => ({ ...state, [data.id]: data.attributes }),
  [actions.removeChannelSuccess]:
    (state, { payload: { data } }) => omitBy(state, value => value.channelId === data.id),
}, {});

const channels = handleActions({
  [actions.newChannelSuccess]:
    (state, { payload: { data } }) => ({ ...state, [data.id]: data.attributes }),
  [actions.editChannelSuccess]: (state, { payload: { data } }) => {
    const { id, attributes } = data;
    return { ...state, [id]: { ...state[id], ...attributes } };
  },
  [actions.removeChannelSuccess]:
    (state, { payload: { data } }) => omitBy(state, value => value.id === data.id),
}, {});

const channelUI = handleActions({
  [actions.chooseChannel]:
    (state, { payload }) => ({ ...state, currentChannelId: payload }),
  [actions.removeChannelSuccess]:
    state => ({ ...state, currentChannelId: state.defaultChannelId }),
}, {});

const addChannelModal = handleActions({
  [actions.closeAddChannelModal]:
    () => ({ show: false }),
  [actions.openAddChannelModal]:
    () => ({ show: true }),
}, {});

const editChannelModal = handleActions({
  [actions.closeEditChannelModal]:
    () => ({ show: false }),
  [actions.openEditChannelModal]:
    (state, { payload }) => ({ show: true, editedChannel: payload }),
}, {});

const removeChannelModal = handleActions({
  [actions.closeRemoveChannelModal]:
    () => ({ show: false }),
  [actions.openRemoveChannelModal]:
    () => ({ show: true }),
}, {});

export default combineReducers({
  messages,
  channels,
  channelUI,
  addChannelModal,
  editChannelModal,
  removeChannelModal,
  form: formReducer,
});
