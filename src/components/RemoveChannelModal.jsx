import React from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';

import connect from '../connect';
import { currentChannelSelector, modalRemoveUISelector } from '../selectors';

const mapStateToProps = state => ({
  channels: state.channels,
  currentChannelId: state.channelUI.currentChannelId,
  defaultChannelId: state.channelUI.defaultChannelId,
  show: modalRemoveUISelector(state),
  currentChannel: currentChannelSelector(state),
});

@connect(mapStateToProps)
@reduxForm({ form: 'removeChannelModal' })
class RemoveChannelModal extends React.Component {
  handleClose = () => {
    const { closeRemoveChannelModal } = this.props;
    closeRemoveChannelModal();
  }

  handleSubmit = async () => {
    const { closeRemoveChannelModal, removeChannel, currentChannelId } = this.props;
    try {
      await removeChannel(currentChannelId);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    closeRemoveChannelModal();
  }

  render() {
    const {
      show, submitting, handleSubmit, error, currentChannel,
    } = this.props;

    return (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete this channel</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <Modal.Body>
            {`Are you sure you want to delete #${currentChannel.name}? All of the channel’s messages will be removed immediately. This cannot be undone.`}
            {error && <span className="font-italic text-danger">{error}</span>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
export default RemoveChannelModal;
