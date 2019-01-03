import { createSelector } from 'reselect';

const messagesSelector = createSelector(
  state => Object.values(state.messages),
  state => state.currentChannelId,
  (messages, currentChannelId) => messages.filter(m => m.channelId === currentChannelId),
);
export default messagesSelector;
