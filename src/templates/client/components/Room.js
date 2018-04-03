import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Room = ({data}) => {
  return (
    <Link className="room" to={`/room/${data.roomID}`}>
      { data.roomName.slice(0, 1) }
    </Link>
  );
}

Room.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Room;