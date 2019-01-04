import React from 'react';
import cn from 'classnames';
import connect from '../connect';

const mapStateToProps = state => ({
  channels: state.channels,
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  chooseChannel = channelId => (e) => {
    e.preventDefault();
    const { chooseChannel } = this.props;
    chooseChannel(channelId);
  }

  render() {
    const { channels, currentChannelId } = this.props;
    const renderedChannels = channels.map(({ name, id }) => {
      const linkClasses = cn({
        'text-white': currentChannelId === id,
        'text-dark': !(currentChannelId === id),
        'bg-dark': currentChannelId === id,
      });
      return (
        <a
          href={`#${name}`}
          key={id}
          className={linkClasses}
          onClick={this.chooseChannel(id)}
        >
          {`# ${name}`}
        </a>
      );
    });
    return (
      <>
        <h5>Channels</h5>
        <div className="nav flex-column nav-pills">
          {renderedChannels}
        </div>
      </>
    );
  }
}

export default ChannelsList;
