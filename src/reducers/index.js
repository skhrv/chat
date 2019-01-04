import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messages = handleActions({
  [actions.newMessageSuccess]:
    (state, { payload: { data } }) => ({ ...state, [data.id]: data.attributes }),
}, {});

const channels = (state = {}) => state;

const currentChannelId = handleActions({
  [actions.chooseChannel]:
    (state, { payload }) => payload,
}, 1);
export default combineReducers({
  messages,
  channels,
  currentChannelId,
  form: formReducer,
});
