import { createAction } from 'redux-actions';
import axios from 'axios';
import { SubmissionError } from 'redux-form';
import routes from '../utils/routes';
import { channelsNameSelector } from '../selectors';
import { checkMaxLengthChannelName, checkMaxLengthMessage } from '../utils/validators';

export const newMessageRequest = createAction('MESSAGE_NEW_REQUEST');
export const newMessageSuccess = createAction('MESSAGE_NEW_SUCCESS');
export const newMessageFailure = createAction('MESSAGE_NEW_FAILURE');

export const chooseChannel = createAction('CHANNEL_CHOOSE');

export const newChannelRequest = createAction('CHANNEL_NEW_REQUEST');
export const newChannelSuccess = createAction('CHANNEL_NEW_SUCCESS');
export const newChannelFailure = createAction('CHANNEL_NEW_FAILURE');

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const editChannelRequest = createAction('CHANNEL_EDIT_REQUEST');
export const editChannelSuccess = createAction('CHANNEL_EDIT_SUCCESS');
export const editChannelFailure = createAction('CHANNEL_EDIT_FAILURE');

export const closeChannelModal = createAction('MODAL_CHANNEL_CLOSE');
export const openEditChannelModal = createAction('MODAL_EDIT_CHANNEL_OPEN');
export const openAddChannelModal = createAction('MODAL_ADD_CHANNEL_OPEN');
export const openRemoveChannelModal = createAction('MODAL_REMOVE_CHANNEL_OPEN');

export const newMessage = message => async (dispatch) => {
  dispatch(newMessageRequest());
  const { attributes: { text } } = message;
  try {
    checkMaxLengthMessage(text);
    const res = await axios.post(routes.messages(message.currentChannelId), { data: message });
    dispatch(newMessageSuccess(res.data));
  } catch (e) {
    dispatch(newMessageFailure(e));
    throw e;
  }
};

export const newChannel = channelName => async (dispatch, getState) => {
  dispatch(newChannelRequest());
  const state = getState();
  const channelsNameList = channelsNameSelector(state);
  try {
    checkMaxLengthChannelName(channelName);
    if (channelsNameList.has(channelName)) {
      throw new Error(`Name "${channelName}" is already taken by a channel`);
    }

    const res = await axios
      .post(routes.channels(), { data: { attributes: { name: channelName } } });

    dispatch(newChannelSuccess(res.data));
    dispatch(closeChannelModal());
  } catch (e) {
    dispatch(newChannelFailure(e));
    throw new SubmissionError({ _error: e.message });
  }
};

export const removeChannel = id => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    await axios
      .delete(routes.channel(id));
    dispatch(removeChannelSuccess({ data: { attributes: { id } } }));
    dispatch(closeChannelModal());
  } catch (e) {
    dispatch(removeChannelFailure(e));
    throw new SubmissionError({ _error: e.message });
  }
};

export const editChannel = newName => async (dispatch, getState) => {
  dispatch(editChannelRequest());
  const state = getState();
  const channelsNameList = channelsNameSelector(state);
  const { name: prevName, id } = state.modal.editedChannel;
  try {
    checkMaxLengthChannelName(newName);
    if (channelsNameList.has(newName) && newName !== prevName) {
      throw new Error(`Name "${newName}" is already taken by a channel`);
    }

    await axios
      .patch(routes.channel(id), { data: { attributes: { name: newName } } });
    const data = { data: { id, attributes: { id, name: newName } } };

    dispatch(editChannelSuccess(data));
    dispatch(closeChannelModal());
  } catch (e) {
    dispatch(editChannelFailure(e));
    throw new SubmissionError({ _error: e.message });
  }
};
