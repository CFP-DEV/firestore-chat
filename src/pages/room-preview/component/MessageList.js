import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Message from './Message';

class MessageList extends Component {
  componentDidMount() {
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  componentDidUpdate() {
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  render() {
    const { messages, users, userID, editMessage, removeMessage } = this.props;
    
    if (messages) {
      return (
        <div className="message-list" ref={ (node) => { this.messageList = node; } }>
          {
            messages.map(message =>
              <Message
                key={message.messageID}
                data={message}
                user={users.filter(user => user.userID === message.authorID)[0]}
                isAuthor={message.authorID === userID ? true : false}
                editMessage={editMessage}
                removeMessage={removeMessage}
              />
            )
          }
        </div>
      );
    }

    return (
      <div>
        Loading
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.array,
  users: PropTypes.array,
  userID: PropTypes.string.isRequired,
  editMessage: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired,
}

export default MessageList;