import React from 'react';
import { connect } from 'react-redux';
import StayScrolled from 'react-stay-scrolled';
import messagesSelector from '../selectors';

const mapStateToProps = state => ({
  messages: messagesSelector(state),
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
    return (
      <StayScrolled className="overflow-auto pb-2" provideControllers={this.storeScrolledControllers}>
        {this.renderMessages()}
      </StayScrolled>

    );
  }
}

export default Messages;
