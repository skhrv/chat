import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';

import connect from '../connect';
import { channelsNameSelector } from '../selectors';

const mapStateToProps = state => ({
  channelsNameList: channelsNameSelector(state),
  currentChannelId: state.channelUI.currentChannelId,
  show: state.editChannelModal.show,
  editedChannel: state.editChannelModal.editedChannel,
});

@connect(mapStateToProps)
@reduxForm({ form: 'editChannelModal' })
class EditChannelModal extends React.Component {
  componentDidUpdate(prevProps) {
    const { initialize, editedChannel, show } = this.props;
    if (prevProps.show !== show && show) {
      initialize({ channelName: editedChannel.name });
    }
  }

  handleClose = () => {
    const { closeEditChannelModal } = this.props;
    closeEditChannelModal();
  }

  handleSubmit = async ({ channelName }) => {
    const {
      closeEditChannelModal, editChannel, editedChannel, channelsNameList,
    } = this.props;
    try {
      if (channelsNameList.has(channelName) && channelName !== editChannel.name) {
        throw new Error(`Name "${channelName}" is already taken by a channel`);
      }
      await editChannel({ name: channelName, id: editedChannel.id });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    closeEditChannelModal();
  }

  render() {
    const {
      show, submitting, handleSubmit, error,
    } = this.props;

    return (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add channel</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <Modal.Body>
            <Field
              component="input"
              type="text"
              name="channelName"
              className="form-control"
              id="ChannelInput"
              placeholder="Channel Name"
              disabled={submitting}
              required
            />
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
export default EditChannelModal;
