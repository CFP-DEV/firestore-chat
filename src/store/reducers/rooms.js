const initialState = {
  rooms: [],
  isFetching: false,
  isFetched: false,
  error: null,
}

const roomsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'FETCH_ROOMS_PENDING': {
      return {
        ...state,
        isFetching: true,
      }
    }
    case 'FETCH_ROOMS_FULFILLED': {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        rooms: payload,
      }
    }
    case 'FETCH_ROOMS_REJECTED': {
      return {
        ...state,
        isFetching: false,
        error: payload,
      }
    }
    default: {
      return state;
    }
  }
}

// Select Rooms
export const selectRooms = (rooms, limit) => {
    let selectedRooms = [];

    for (let i = 0; i < limit; i++) {
      if (!rooms[i]) {
        break;
      }

      selectedRooms.push(rooms[i]);
    }

    return selectedRooms;
}

export default roomsReducer;