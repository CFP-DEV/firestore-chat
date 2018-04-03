import { combineReducers } from 'redux';

// Reducers
import authReducer from './auth';
import roomsReducer from './rooms';
import roomReducer from './room';
import messagesReducer from './messages';

export default combineReducers({
  auth: authReducer,
  rooms: roomsReducer,
  room: roomReducer,
  messages: messagesReducer,
});
