import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';

import connect from '../connect';
import { channelsNameSelector } from '../selectors';

const mapStateToProps = state => ({
  channelsNameList: channelsNameSelector(state),
  currentChannelId: state.channelUI.currentChannelId,
  show: state.addChannelModal.show,
});

@connect(mapStateToProps)
@reduxForm({ form: 'addChannelModal' })
class AddChannelModal extends React.Component {
  handleClose = () => {
    const { closeAddChannelModal } = this.props;
    closeAddChannelModal();
  }

  handleSubmit = async ({ channelName }) => {
    const { closeAddChannelModal, newChannel, channelsNameList } = this.props;

    try {
      if (channelsNameList.has(channelName)) {
        throw new Error(`Name "${channelName}" is already taken by a channel`);
      }
      await newChannel(channelName);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    closeAddChannelModal();
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
export default AddChannelModal;
