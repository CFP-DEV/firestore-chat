import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Message = ({data, user, isAuthor, editMessage, removeMessage}) => {
  const renderMenu = () => {
    if (isAuthor) {
      return (
        <div className="message__footer__menu">
          <button className="btn btn--reset" onClick={() => { editMessage(data); }}>
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button className="btn btn--reset" onClick={() => { removeMessage(data.messageID); }}>
            <i className="fas fa-ban"></i>
          </button>
        </div>
      );
    }
  }

  if (user && data) {
    return (
      <div className={classNames({ 'message': true, 'message--reverse': isAuthor })}>
        <div className="message__avatar">
          {user.userName.slice(0, 1)}
        </div>
        <div className="message__content">
          <div>
            {data.messageContent}
          </div>
        </div>
        <div className="message__footer">
          <div className="message__footer__author">
            {user.userName}
          </div>
          { renderMenu() }
        </div>
      </div>
    );
  }
  
  return (
    <div>
      Loading
    </div>
  );
}

Message.propTypes = {
  data: PropTypes.shape({
    messageID: PropTypes.string.isRequired,
    messageContent: PropTypes.string.isRequired,
    authorID: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }),
  isAuthor: PropTypes.bool.isRequired,
  editMessage: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired,
}

export default Message;