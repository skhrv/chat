import React from 'react';
import StayScrolled from 'react-stay-scrolled';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { messagesSelector, currentChannelSelector } from '../selectors';
import connect from '../connect';

const mapStateToProps = state => ({
  messages: messagesSelector(state),
  currentChannel: currentChannelSelector(state),
});

@connect(mapStateToProps)
class Messages extends React.Component {
  componentDidUpdate(prevProps) {
    const { messages } = this.props;
    if (prevProps.messages.length < messages.length) {
      this.stayScrolled();
    }
  }

  storeScrolledControllers = ({ stayScrolled, scrollBottom }) => {
    this.stayScrolled = stayScrolled;
    this.scrollBottom = scrollBottom;
  }

  handleEditChannelModal = () => {
    const { openEditChannelModal, currentChannel } = this.props;
    openEditChannelModal(currentChannel);
  }

  handleRemoveChannelModal = () => {
    const { openRemoveChannelModal } = this.props;
    openRemoveChannelModal();
  }

  renderMessages() {
    const { messages } = this.props;
    return messages.map(({ name, text, id }) => (
      <div key={id}>
        <strong>{`${name}: `}</strong>
        {text}
      </div>
    ));
  }

  render() {
    const { currentChannel: { name, removable } } = this.props;
    return (
      <>
        <div className="d-flex align-items-baseline mb-2">
          <span className="h5 mr-auto mb-0"><strong>{`#${name}`}</strong></span>
          <DropdownButton title="Channel Settings" id="bg-nested-dropdown" variant="light" size="sm">
            <Dropdown.Item as="button" onClick={this.handleEditChannelModal}>Edit Channel</Dropdown.Item>
            {removable && <Dropdown.Item as="button" onClick={this.handleRemoveChannelModal}>Delete Channel</Dropdown.Item>}
          </DropdownButton>
        </div>
        <div className="border-bottom ml-n3 " />
        <StayScrolled className="overflow-auto pb-2" provideControllers={this.storeScrolledControllers}>
          {this.renderMessages()}
        </StayScrolled>
      </>
    );
  }
}

export default Messages;
