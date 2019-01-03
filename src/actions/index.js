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
