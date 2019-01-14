import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';

import connect from '../utils/connect';
import { modalEditUISelector, modalAddUISelector } from '../selectors';

const mapStateToProps = state => ({
  currentChannelId: state.channelUI.currentChannelId,
  showEditing: modalEditUISelector(state),
  showAdding: modalAddUISelector(state),
  editedChannel: state.modal.editedChannel,
});

@connect(mapStateToProps)
@reduxForm({ form: 'channelModal' })
class ChannelModal extends React.Component {
  constructor(props) {
    super(props);
    const { editChannel, addChannel } = this.props;
    this.map = {
      editing: {
        action: editChannel,
        title: 'Edit this channel',
      },
      adding: {
        action: addChannel,
        title: 'Add channel',
      },
    };
  }

  componentDidUpdate(prevProps) {
    const {
      initialize, editedChannel, showEditing, showAdding,
    } = this.props;
    if (prevProps.showEditing !== showEditing && showEditing) {
      initialize({ channelName: editedChannel.name });
    } else if (prevProps.showAdding !== showAdding && showAdding) {
      initialize({ channelName: '' });
    }
  }

  handleClose = () => {
    const { closeChannelModal } = this.props;
    closeChannelModal();
  }

  handleSubmit = async ({ channelName }) => {
    const { type } = this.props;
    await this.map[type](channelName);
  }

  renderForm() {
    const { submitting, handleSubmit, error } = this.props;
    return (
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
    );
  }

  render() {
    const { showEditing, showAdding } = this.props;
    return (
      <Modal show={showAdding || showEditing} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        {this.renderForm()}
      </Modal>
    );
  }
}
export default ChannelModal;
