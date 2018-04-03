const initialState = {
  room: {},
  isFetching: false,
  isFetched: false,
  error: null,
}

const roomReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'FETCH_ROOM_PENDING': {
      return {
        ...state,
        isFetching: true,
      }
    }
    case 'FETCH_ROOM_FULFILLED': {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        room: payload,
      }
    }
    case 'FETCH_ROOM_REJECTED': {
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

export default roomReducer;