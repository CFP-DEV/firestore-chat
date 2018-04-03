const initialState = {
  messages: [],
  isFetching: false,
  isFetched: false,
  error: null,
}

const messagesReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'FETCH_MESSAGES_PENDING': {
      return {
        ...state,
        isFetching: true,
      }
    }
    case 'FETCH_MESSAGES_FULFILLED': {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        messages: payload,
      }
    }
    case 'FETCH_MESSAGES_REJECTED': {
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

export default messagesReducer;