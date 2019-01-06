import React from 'react';
import ChannelsList from './ChannelsList';
import MessageInput from './MessageInput';
import Messages from './Messages';
import AddChannelModal from './AddChannelModal';
import EditChannelModal from './EditChannelModal';
import RemoveChannelModal from './RemoveChannelModal';


const App = () => (
  <>
    <div className="row" style={{ height: 'calc(100vh - 56px)' }}>
      <div className="col-4 col-md-3 col-lg-2 border-right">
        <ChannelsList />
      </div>
      <div className="col-8 col-md-9 col-lg-10 d-flex flex-column h-100">
        <Messages />
        <MessageInput />
      </div>
    </div>
    <AddChannelModal />
    <EditChannelModal />
    <RemoveChannelModal />
  </>
);

export default App;
