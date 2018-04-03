import { database } from '../../config/firebase';

// Fetch room basic informations
// 1. Basic Info
// 2. Users
// 3. Users details (login)
export const fetchRoom = (roomID, dispatch) => {
  return (dispatch) => {
    // Initialize
    dispatch({
      type: 'FETCH_ROOM_PENDING',
    });

    // Fetch room's basic info
    database.collection('rooms')
      .doc(roomID)
      .get()
      .then(doc => {

        // Fetch room's users
        if (doc.exists) {
          database.collection('rooms')
          .doc(roomID)
          .collection('users')
          .onSnapshot(querySnapshot => {
            let users = [];
            let usersCount = querySnapshot.size;

            querySnapshot.forEach(user => {
              let userID = user.id;

              // Get user login / email
              database.collection('users')
              .doc(userID)
              .get()
              .then(res => {
                users.push({
                  ...user.data(),
                  userID,
                  userName: res.data().login,
                });

                if (usersCount === users.length) {
                  dispatch({
                    type: 'FETCH_ROOM_FULFILLED',
                    payload: Object.assign({}, { users: users }, doc.data()),
                  });
                }
              })
              .catch(err => {
                dispatch({
                  type: 'FETCH_ROOM_REJECTED',
                  payload: err,
                });
              });
            });
          }, err => {
            dispatch({
              type: 'FETCH_ROOM_REJECTED',
              payload: err,
            });
          })
        } else {
          dispatch({
            type: 'FETCH_ROOM_REJECTED',
            payload: 'There is no such room.',
          });
        }
      })
      .catch(err => {
        dispatch({
          type: 'FETCH_ROOM_REJCTED',
          payload: err,
        });
      });
  }
}

// Join room
export const joinRoom = (roomID, userID) => {
  return (dispatch) => {
    // Initialize
    dispatch({
      type: 'JOIN_ROOM_PENDING',
    });
    
    database.collection('users')
    .doc(userID)
    .collection('rooms')
    .doc(roomID)
    .get()
    .then(doc => {
      // IF user doesn't exist then add him to the room.
      if (!doc.exists) {
        // Create doc in rooms/users collection
        const roomCreate = database.collection('rooms')
        .doc(roomID)
        .collection('users')
        .doc(userID)
        .set({
          status: 'active',
          role: 'user',
          joined_at: new Date(),
        });

        // Create doc in users/rooms collection
        const userCreate = database.collection('users')
        .doc(userID)
        .collection('rooms')
        .doc(roomID)
        .set({
          active: true,
        });

        return Promise.all([roomCreate, userCreate]);
      } else {
        dispatch({
          type: 'JOIN_ROOM_REJECTED',
          payload: { message: 'User is already in the room.' },
        }); 
      }
    })
    .then(res => {
      dispatch({
        type: 'JOIN_ROOM_FULFILLED',
      }); 
    })
    .catch(err => {
      dispatch({
        type: 'JOIN_ROOM_REJECTED',
        payload: err,
      });
    });
  }
}