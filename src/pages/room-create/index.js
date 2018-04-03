import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../config/firebase';

class RoomCreate extends Component {
  state = {
    roomName: '',
    roomDescription: '',
  }

  onChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    // Verify
    if (!this.state.roomName || !this.state.roomDescription) {
      return;
    }

    const { userID } = this.props.user;

    if (!userID) {
      return;
    }

    // Save
    database.collection('rooms')
    .doc()
    .set({
      roomName: this.state.roomName,
      roomDescription: this.state.roomDescription,
      authorID: userID,
    })
    .then(res => {
      // Redirect to the room
      this.props.history.push('/rooms');
    })
    .catch(err => {
      // Display error
    })

    // Reset Form
    this.setState({
      roomName: '',
      roomDescription: '',
    });
  }

  render () {
    return (
      <section className="room-create">

        <header className="section-header">
          <h1>Create Room</h1>
          <p>Create new room.</p>
        </header>

        <form className="form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="roomName">
              Name
            </label>
            <input type="text" id="roomName" name="roomName" onChange={this.onChange} value={this.state.roomName} />
          </div>
          <div className="form-group">
            <label htmlFor="roomName">
              Description
            </label>
            <input type="text" id="roomName" name="roomDescription" onChange={this.onChange} value={this.state.roomDescription} />
          </div>
          <div className="form-group">
            <button className="btn btn--reset btn--primary">
              Create
            </button>
          </div>
        </form>

      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  
  return {
    user: user,
  }
}

export default connect(mapStateToProps)(RoomCreate);