import React from 'react';
import cn from 'classnames';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import connect from '../utils/connect';

const mapStateToProps = state => ({
  channels: state.channels,
  currentChannelId: state.channelUI.currentChannelId,
});

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  chooseChannel = channelId => (e) => {
    e.preventDefault();
    const { chooseChannel } = this.props;
    chooseChannel(channelId);
  }

  handleAddChannelModal = () => {
    const { openAddChannelModal } = this.props;
    openAddChannelModal();
  }

  render() {
    const { channels, currentChannelId } = this.props;
    const renderedChannels = Object.values(channels).map(({ name, id }) => {
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
      <div className="">
        <div className="d-flex flex-sm-row flex-column align-items-center mb-1">
          <span className="h5 mr-auto mb-0">Channels</span>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Add Channel</Tooltip>}
          >
            <button
              className="btn btn-sm rounded-circle btn-light"
              type="button"
              onClick={this.handleAddChannelModal}
            >
            +
            </button>
          </OverlayTrigger>
        </div>
        <div className="nav flex-column nav-pills">
          {renderedChannels}
        </div>
      </div>
    );
  }
}

export default ChannelsList;
