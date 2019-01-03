import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  channels: state.channels,
});

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  render() {
    const { channels } = this.props;
    const renderedChannels = channels.map(channel => (
      <li className="nav-item" key={channel.id}>{`# ${channel.name}`}</li>
    ));
    return (
      <>
        <h5>Channels</h5>
        <ul className="nav flex-column">
          {renderedChannels}
        </ul>
      </>
    );
  }
}

export default ChannelsList;
