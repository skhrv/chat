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

export const modalAddUISelector = createSelector(
  state => state.modal.show,
  state => state.modal.action,
  (show, action) => show && action === 'adding',
);

export const modalEditUISelector = createSelector(
  state => state.modal.show,
  state => state.modal.action,
  (show, action) => show && action === 'editing',
);

export const modalRemoveUISelector = createSelector(
  state => state.modal.show,
  state => state.modal.action,
  (show, action) => show && action === 'removing',
);
