import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';

import connect from '../utils/connect';
import { modalAddUISelector } from '../selectors';

const mapStateToProps = state => ({
  currentChannelId: state.channelUI.currentChannelId,
  show: modalAddUISelector(state),
});

@connect(mapStateToProps)
@reduxForm({ form: 'addChannelModal' })
class AddChannelModal extends React.Component {
  handleClose = () => {
    const { closeChannelModal } = this.props;
    closeChannelModal();
  }

  handleSubmit = async ({ channelName }) => {
    const { newChannel } = this.props;
    await newChannel(channelName);
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
