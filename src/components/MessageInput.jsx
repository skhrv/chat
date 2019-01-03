import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import connect from '../connect';
import UserContext from '../UserContext';

const mapStateToProps = state => ({
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps)
@reduxForm({ form: 'message' })
class MessageInput extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }


  sendMessage = async ({ text }) => {
    const name = this.context;
    const { newMessage, currentChannelId, reset } = this.props;
    const data = { currentChannelId, attributes: { text, name } };
    try {
      await newMessage(data);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
    this.textInput.current.getRenderedComponent().focus();
  }

  render() {
    const { handleSubmit, submitting, error } = this.props;
    return (
      <form name="messageForm" className="mt-auto" onSubmit={handleSubmit(this.sendMessage)}>
        <div className="input-group mb-1">
          <Field
            component="input"
            type="text"
            className="form-control"
            disabled={submitting}
            placeholder="Message"
            name="text"
            aria-label="Message"
            aria-describedby="button-addon2"
            autoFocus={!submitting}
            autoComplete="off"
            ref={this.textInput}
            forwardRef
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" disabled={submitting} type="submit" id="button-addon2">Send</button>
          </div>
        </div>
        <div className="mb-3" style={{ height: '16px' }}>
          {error && <span className="font-italic text-danger">{error}</span>}
        </div>
      </form>
    );
  }
}
export default MessageInput;
