import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

// Actions
import { fetchRooms } from '../../store/actions/rooms';

// Components
import Room from './components/Room';
import Loading from '../../components/Loading';

class Rooms extends Component {
  componentDidMount() {
    const { fetchRooms } = this.props;

    // Fetch rooms (page = 1, limit = 5)
    fetchRooms(1, 10);
  }

  isInRoom(roomID) {
    const { authRooms } = this.props;

    for (let i = 0; i < authRooms.length; i++) {
      if (authRooms[i].roomID === roomID) {
        return true;
      }
    }

    return false;
  }

  render () {
    const { isLoaded, rooms } = this.props;

    // TODO: Loading animation.
    if (!isLoaded) {
      return <Loading />
    }

    if (this.props.location.pathname === '/rooms/joined') {
      return (
        <section className="rooms">

          <header className="section-header">
            <div>
              <h1>
                Your Rooms
            </h1>
              <p>
                Manage rooms that you've joined.
            </p>
            </div>
            <div>
              <Link to="/room/create" className="btn btn--reset btn--primary">
                Create Room
              </Link>
            </div>
          </header>

          <div className="room-list">
            {
              rooms.map(room =>
                this.isInRoom(room.roomID) 
                ? <Room key={room.roomID} data={room} alreadyJoined={true} />
                : ''
              )
            }
          </div>

        </section>
      );
    }

    return (
      <section className="rooms">

        <header className="section-header">
          <div>
            <h1>
              Rooms
            </h1>
              <p>
                Find new rooms.
            </p> 
            </div>
          <div>
            <Link to="/room/create" className="btn btn--reset btn--primary">
              Create Room
            </Link>
          </div>
        </header>

        <div className="room-list">
          {
            rooms.map(room =>
              <Room key={room.roomID} data={room} alreadyJoined={this.isInRoom(room.roomID)} />
            )
          }
        </div>

      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { rooms, auth } = state;
  const isLoaded = rooms.isFetched && rooms.isFetching;

  return {
    isLoaded: isLoaded,
    rooms: rooms.rooms,
    authRooms: auth.rooms,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchRooms,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);