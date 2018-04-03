import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fire } from '../../config/firebase';

// Selectors
import { selectRooms } from '../../store/reducers/rooms';

// Pages - Home
import Home from '../../pages/home/index';

// Pages - Rooms
import RoomCreate from '../../pages/room-create';
import Rooms from '../../pages/rooms/index';
import RoomPreview from '../../pages/room-preview';

// Pages - Profile
import Profile from '../../pages/profile/index';

// Templates

// Components
import Navigation from './components/Navigation';

class Client extends Component {
  signOut = () => {
    fire.auth().signOut();
  }

  render () {
    const { shouldRedirect } = this.props;

    if (shouldRedirect) {
      return <Redirect to="/auth/login" />;
    }

    const { user, rooms, roomsCount } = this.props;

    return (
      <div className="client">
        <Navigation data={rooms} roomsCount={roomsCount} signOut={this.signOut} />

        <div className="client__content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/room/create" component={RoomCreate} />
            <Route exact path="/room/:roomID" render={(props) => (
              <RoomPreview key={props.match.params.roomID} {...props} />
            )} />
            <Route path="/rooms" component={Rooms} />
            <Route exact path="/profile" component={Profile} />
            <Redirect to="/404" />
          </Switch>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    shouldRedirect: auth.user ? false : true,
    user: auth.user,
    roomsCount: auth.rooms.length,
    rooms: selectRooms(auth.rooms, 4),
  }
}

export default connect(mapStateToProps)(Client);