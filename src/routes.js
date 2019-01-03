const host = '/api/v1';

export default {
  messages: channelId => [host, `channels/${channelId}/messages`].join('/'),
};
