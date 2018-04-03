import { database } from '../../config/firebase';

// Fetch Rooms
export const fetchRooms = (page, limit) => {
  return (dispatch) => {
    // Initialize fetching
    dispatch({
      type: 'FETCH_ROOMS_PENDING',
    });

    database.collection('rooms')
    .limit(limit)
    //.startAt((page - 1) * limit)
    .get()
    .then(querySnapshot => {
      let docs = [];

      querySnapshot.forEach(doc => {
        docs.push(Object.assign({}, {roomID: doc.id}, doc.data()));
      });

      dispatch({
        type: 'FETCH_ROOMS_FULFILLED',
        payload: docs,
      });
    })
    .catch(err => {
      // Error
      dispatch({
        type: 'FETCH_ROOMS_REJECTED',
        payload: err,
      });
    });
  }
}