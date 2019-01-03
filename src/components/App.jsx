import React from 'react';
import ChannelsList from './ChannelsList';
import MessageInput from './MessageInput';
import Messages from './Messages';


const App = () => (
  <>
    <div className="row" style={{ height: 'calc(100vh - 56px)' }}>
      <div className="col-2">
        <ChannelsList />
      </div>
      <div className="col d-flex flex-column">
        <Messages />
        <MessageInput />
      </div>
    </div>
  </>
);

export default App;
