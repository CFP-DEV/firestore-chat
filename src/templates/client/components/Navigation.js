import React from 'react';
import  { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import Room from './Room';

const Navigation = ({data, roomsCount, signOut}) => {
  const rooms = data.length >= 0
  ? data.map(room =>
      <Room key={room.roomID} data={room} />
    )
  : 'No Rooms';

  const moreRooms = roomsCount > 4
    ? <Link className="room" to="/rooms/joined">+ {roomsCount - 4}</Link>
    : ''

  const handleClick = () => {
    signOut();
  }

  return (
    <div className="navigation">
      <div className="navigation-logo">
        MChat
      </div>

      <div className="navigation-menu">
        { rooms }
        { moreRooms }
        <Link className="room room--add-new" to="/rooms">
          <i className="fas fa-plus"></i>
        </Link>
      </div>

      <button className="navigation-profile btn btn--reset" onClick={() => {handleClick()}}>
        <i className="fas fa-sign-out-alt"></i>
      </button>

    </div>
  );
}

Navigation.propTypes = {
  data: PropTypes.array,
  roomsCount: PropTypes.number.isRequired,
  signOut: PropTypes.func.isRequired,
}

export default Navigation;