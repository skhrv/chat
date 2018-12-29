import React from 'react';
import { connect } from 'react-redux';

const mapStateToDispatch = state => ({
  channels: state.channels,
});

@connect(mapStateToDispatch)
class ChannelsList extends React.Component {
  render() {
    const { channels } = this.props;
    const renderedChannels = channels.map(channel => (
      <li className="list-group-item" key={channel.id}>{channel.name}</li>
    ));
    return (
      <>
        <h5>Channels</h5>
        <ul className="list-group-flush">
          {renderedChannels}
        </ul>
      </>
    );
  }
}

export default ChannelsList;
