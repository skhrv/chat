import { createSelector } from 'reselect';

export const messagesSelector = createSelector(
  state => Object.values(state.messages),
  state => state.channelUI.currentChannelId,
  (messages, currentChannelId) => messages.filter(m => m.channelId === currentChannelId),
);

export const currentChannelSelector = createSelector(
  state => state.channels,
  state => state.channelUI.currentChannelId,
  (channels, currentChannelId) => channels[currentChannelId],
);

export const channelsNameSelector = createSelector(
  state => Object.values(state.channels).map(c => c.name),
  channelsName => new Set(channelsName),
);
