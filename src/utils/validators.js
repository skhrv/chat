export const checkMaxLengthChannelName = (name) => {
  const maxLength = 13;
  if (name.length > maxLength) {
    throw new Error(`Max length Channel Name is ${maxLength} charactrers. Your length is ${name.length}`);
  }
  return true;
};

export const checkMaxLengthMessage = (msg) => {
  const maxLength = 99;
  if (msg.length > maxLength) {
    throw new Error(`Max length message is ${maxLength} charactrers. Your length is ${msg.length}`);
  }
  return true;
};
