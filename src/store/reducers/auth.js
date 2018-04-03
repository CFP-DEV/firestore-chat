const initialState = {
  user: null,
  rooms: [],
  isLoading: true,
  error: null,
}

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'SET_AUTH_USER': {
      return {
        ...state,
        user: payload,
      }
    }
    case 'SET_AUTH_USER_ROOMS': {
      return {
        ...state,
        rooms: payload,
        isLoading: false,
      }
    }
    case 'SET_AUTH_USER_REJECTED': {
      return {
        ...state,
        user: null,
        error: payload,
        isLoading: false,
      }
    }
    default: {
      return state;
    }
  }
}

export default authReducer;