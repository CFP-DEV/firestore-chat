import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Room = ({data, alreadyJoined}) => {
  const roomPicture = data.roomName.slice(0, 1);
  const roomDescription = data.roomDescription.length >= 64 ? data.roomDescription.slice(0, 64) + '...' : data.roomDescription.slice(0, 64);
  const roomJoin = alreadyJoined
  ? <Link to={`/room/${data.roomID}`} className="btn btn--reset btn--disabled">Already Joined</Link>
  : <Link to={`/room/${data.roomID}`} className="btn btn--reset btn--outline-primary">Join</Link>

  return (
    <div className="room">
      <div className="room__picture">
        { roomPicture }
      </div>
      <h1 className="room__name">
        { data.roomName }
      </h1>
      <p className="room__description">
        { roomDescription }
      </p>
      { roomJoin }
    </div>
  );
}

Room.propTypes = {
  data: PropTypes.shape({
    roomID: PropTypes.string.isRequired,
    roomName: PropTypes.string.isRequired,
    roomDescription: PropTypes.string.isRequired,
    authorID: PropTypes.string.isRequired,
  }),
  alreadyJoined: PropTypes.bool.isRequired,
}

export default Room;