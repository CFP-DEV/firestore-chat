import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateMessage extends Component {
  onChange = (e) => {
    const { onChange } = this.props;

    onChange(e.currentTarget.value);
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.saveMessage();
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      this.saveMessage();
    }
  }

  saveMessage = () => {
    const { onSubmit } = this.props;

    // Save
    onSubmit();
  }

  render () {
    return (
      <form className="form new-message" onSubmit={this.onSubmit}>
        <textarea className="new-message__content" onChange={this.onChange} value={this.props.message} onKeyDown={this.onKeyDown}></textarea>
        <button type="submit" className="new-message__submit btn btn--reset btn--primary">
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    );
  }
}

CreateMessage.propTypes = {
  message: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default CreateMessage;