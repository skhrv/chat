import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { omit } from 'lodash';
import * as actions from '../actions';

const messages = handleActions({
  [actions.newMessageSuccess]:
    (state, { payload: { data } }) => ({ ...state, [data.id]: data.attributes }),
  [actions.removeChannelSuccess]:
    (state, { payload: { data } }) => omit(state, data.id),
}, {});

const channels = handleActions({
  [actions.newChannelSuccess]:
    (state, { payload: { data } }) => ({ ...state, [data.id]: data.attributes }),
  [actions.editChannelSuccess]: (state, { payload: { data } }) => {
    const { id, attributes } = data;
    return { ...state, [id]: { ...state[id], ...attributes } };
  },
  [actions.removeChannelSuccess]:
    (state, { payload: { data } }) => omit(state, data.id),
}, {});

const channelUI = handleActions({
  [actions.chooseChannel]:
    (state, { payload }) => ({ ...state, currentChannelId: payload }),
  [actions.removeChannelSuccess]:
    state => ({ ...state, currentChannelId: state.defaultChannelId }),
}, {});


const modal = handleActions({
  [actions.closeChannelModal]:
    () => ({ show: false }),
  [actions.openAddChannelModal]:
    () => ({ show: true, type: 'adding' }),
  [actions.openEditChannelModal]:
    (state, { payload }) => ({ show: true, type: 'editing', editedChannel: payload }),
  [actions.openRemoveChannelModal]:
    () => ({ show: true, type: 'removing' }),
}, {});

export default combineReducers({
  messages,
  channels,
  channelUI,
  modal,
  form: formReducer,
});
