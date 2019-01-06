import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const newMessageRequest = createAction('NEW_MESSAGE_REQUEST');
export const newMessageSuccess = createAction('NEW_MESSAGE_SUCCESS');
export const newMessageFailure = createAction('NEW_MESSAGE_FAILURE');

export const newMessage = message => async (dispatch) => {
  dispatch(newMessageRequest());
  try {
    const res = await axios.post(routes.messages(message.currentChannelId), { data: message });
    dispatch(newMessageSuccess(res.data));
  } catch (e) {
    dispatch(newMessageFailure(e));
    throw e;
  }
};

export const chooseChannel = createAction('CHOOSE_CHANNEL');

export const newChannelRequest = createAction('NEW_CHANNEL_REQUEST');
export const newChannelSuccess = createAction('NEW_CHANNEL_SUCCESS');
export const newChannelFailure = createAction('NEW_CHANNEL_FAILURE');


export const newChannel = channelName => async (dispatch) => {
  dispatch(newChannelRequest());
  try {
    const res = await axios
      .post(routes.channels(), { data: { attributes: { name: channelName } } });
    dispatch(newChannelSuccess(res.data));
  } catch (e) {
    dispatch(newChannelFailure(e));
    throw e;
  }
};

export const removeChannelRequest = createAction('REMOVE_CHANNEL_REQUEST');
export const removeChannelSuccess = createAction('REMOVE_CHANNEL_SUCCESS');
export const removeChannelFailure = createAction('REMOVE_CHANNEL_FAILURE');

export const removeChannel = id => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    await axios
      .delete(routes.channel(id));
    dispatch(removeChannelSuccess({ data: { attributes: { id } } }));
  } catch (e) {
    dispatch(removeChannelFailure(e));
    throw e;
  }
};

export const editChannelRequest = createAction('EDIT_CHANNEL_REQUEST');
export const editChannelSuccess = createAction('EDIT_CHANNEL_SUCCESS');
export const editChannelFailure = createAction('EDIT_CHANNEL_FAILURE');

export const editChannel = ({ id, name }) => async (dispatch) => {
  dispatch(editChannelRequest());
  try {
    await axios
      .patch(routes.channel(id), { data: { attributes: { name } } });
    const data = { data: { id, attributes: { id, name } } };
    dispatch(editChannelSuccess(data));
  } catch (e) {
    dispatch(editChannelFailure(e));
    throw e;
  }
};

export const closeEditChannelModal = createAction('CLOSE_EDIT_CHANNEL_MODAL');
export const openEditChannelModal = createAction('OPEN_EDIT_CHANNEL_MODAL');
export const closeAddChannelModal = createAction('CLOSE_ADD_CHANNEL_MODAL');
export const openAddChannelModal = createAction('OPEN_ADD_CHANNEL_MODAL');
export const closeRemoveChannelModal = createAction('CLOSE_REMOVE_CHANNEL_MODAL');
export const openRemoveChannelModal = createAction('OPEN_REMOVE_CHANNEL_MODAL');
