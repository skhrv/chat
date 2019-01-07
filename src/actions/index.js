import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const newMessageRequest = createAction('MESSAGE_NEW_REQUEST');
export const newMessageSuccess = createAction('MESSAGE_NEW_SUCCESS');
export const newMessageFailure = createAction('MESSAGE_NEW_FAILURE');

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

export const chooseChannel = createAction('CHANNEL_CHOOSE');

export const newChannelRequest = createAction('CHANNEL_NEW_REQUEST');
export const newChannelSuccess = createAction('CHANNEL_NEW_SUCCESS');
export const newChannelFailure = createAction('CHANNEL_NEW_FAILURE');


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

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

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

export const editChannelRequest = createAction('CHANNEL_EDIT_REQUEST');
export const editChannelSuccess = createAction('CHANNEL_EDIT_SUCCESS');
export const editChannelFailure = createAction('CHANNEL_EDIT_FAILURE');

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

export const closeEditChannelModal = createAction('MODAL_EDIT_CHANNEL_CLOSE');
export const openEditChannelModal = createAction('MODAL_EDIT_CHANNEL_OPEN');
export const closeAddChannelModal = createAction('MODAL_ADD_CHANNEL_CLOSE');
export const openAddChannelModal = createAction('MODAL_ADD_CHANNEL_OPEN');
export const closeRemoveChannelModal = createAction('MODAL_REMOVE_CHANNEL_CLOSE');
export const openRemoveChannelModal = createAction('MODAL_REMOVE_CHANNEL_OPEN');
