import { database } from '../../config/firebase';

export const fetchMessages = (roomID) => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_MESSAGES_PENDING',
    });

    // TODO: Optimize it (Reload only documents that are changed.)
    database.collection('rooms')
      .doc(roomID)
      .collection('messages')
      .orderBy('created_at')
      .onSnapshot(querySnapshot => {
        let messages = [];

        querySnapshot.forEach(doc => {
          messages.push(Object.assign({}, { messageID: doc.id }, doc.data()));
        });

        dispatch({
          type: 'FETCH_MESSAGES_FULFILLED',
          payload: messages,
        });
      }, err => {
        dispatch({
          type: 'FETCH_MESSAGES_REJECTED',
          payload: err,
        });
      })
  }
}