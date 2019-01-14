import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';

import connect from '../utils/connect';
import { modalEditUISelector } from '../selectors';

const mapStateToProps = state => ({
  currentChannelId: state.channelUI.currentChannelId,
  show: modalEditUISelector(state),
  editedChannel: state.modal.editedChannel,
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
    const { closeChannelModal } = this.props;
    closeChannelModal();
  }

  handleSubmit = async ({ channelName }) => {
    const { editChannel } = this.props;
    await editChannel(channelName);
  }

  render() {
    const {
      show, submitting, handleSubmit, error,
    } = this.props;

    return (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit this channel</Modal.Title>
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
