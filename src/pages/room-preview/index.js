import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { database } from '../../config/firebase';

// Actions
import { fetchRoom, joinRoom } from '../../store/actions/room';
import { fetchMessages } from '../../store/actions/messages';

// Components
import MessageList from './component/MessageList';
import CreateMessage from './component/CreateMessage';

class RoomPreview extends Component {
  state = { edited: {}, messageContent: '', }

  componentDidMount() {
    const { roomID } = this.props.match.params;
    const { fetchRoom, fetchMessages, joinRoom, user } = this.props;

    // Join Room
    joinRoom(roomID, user.userID);

    // Fetch room
    fetchRoom(roomID);

    // Fetch messages
    fetchMessages(roomID);
  }

  onChange = (data) => {
    this.setState({
      messageContent: data,
    });
  }

  onSubmit = () => {
    const { roomID } = this.props.match.params;
    const { userID } = this.props.user;

    // Verify
    if (!roomID) {
      return;
    }

    if (!userID) {
      return;
    }

    if (!this.state.messageContent) {
      return;
    }

    if (!this.state.edited.messageID) {
      console.log('this is should be edited now.');
      // Save
      database.collection('rooms')
      .doc(roomID)
      .collection('messages')
      .doc()
      .set({
        messageContent: this.state.messageContent,
        authorID: userID,
        created_at: new Date(),
      })
      .then(res => {
        console.log('Message sent.');
      })
      .catch(err => {
        console.log(err);
      });  
    } else {
      console.log('this should be added now!');
      // Update
      database.collection('rooms')
      .doc(roomID)
      .collection('messages')
      .doc(this.state.edited.messageID)
      .update({
        messageContent: this.state.messageContent,
      })
      .then(res => {
        console.log('Message updated.');
      })
      .catch(err => {
        console.log(err);
      });  
    }

    this.setState({
      edited: {},
      messageContent: '',
    });
  }

  editMessage = (data) => {
    this.setState({
      edited: data,
      messageContent: data.messageContent,
    });
  }

  removeMessage = (messageID) => {
    const { roomID } = this.props.match.params;

    database.collection('rooms')
    .doc(roomID)
    .collection('messages')
    .doc(messageID)
    .delete()
  }

  leaveRoom = () => {
    const { roomID } = this.props.match.params;
    const { userID } = this.props.user;
    
    database.collection('users')
    .doc(userID)
    .collection('rooms')
    .doc(roomID)
    .delete()
    .then(() => {
      // Redirect 
      this.props.history.push('/rooms');
    })
    .catch(err => {
      console.log(err);
    })
  }

  render () {
    const { isLoaded } = this.props;

    if (!isLoaded) {
      return (
        <div>
          Loading
        </div>
      );
    }

    const { room, messages, user } = this.props;

    return (
      <section className="room-preview">

        <header className="section-header">
          <div>
            <h1>
              {room.roomName}
            </h1>
            <p>
              {room.roomDescription}
            </p>
          </div>
          <div>
            <button className="btn btn--reset btn--primary" onClick={this.leaveRoom}>
              Leave Room
            </button>
          </div>
        </header>

        <MessageList messages={messages} users={room.users} userID={user.userID} editMessage={this.editMessage} removeMessage={this.removeMessage} />

        <CreateMessage message={this.state.messageContent} onChange={this.onChange} onSubmit={this.onSubmit} />
        

      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { room, auth, messages } = state;
  const isLoaded = room.isFetched && !room.isFetching && messages.isFetched && !messages.isFetching;
  const isInRoom = room.isJoined && !room.isJoining;

  return {
    isLoaded: isLoaded,
    room: room.room,
    user: auth.user,
    messages: messages.messages,
    isInRoom: isInRoom,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchRoom,
    fetchMessages,
    joinRoom,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomPreview);