import { fire, database } from '../../config/firebase';

// Auth Refresh
// 1. User Info
// 2. User's rooms
// 3. Room Info
export const authRefresh = () => {
  return (dispatch) => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        let userID = user.uid;

        // User Info
        database.collection('users')
        .doc(userID)
        .get()
        .then(doc => {
          dispatch({
            type: 'SET_AUTH_USER',
            payload: { userID: userID, ...doc.data() },
          });

          // User's rooms
          database.collection('users')
          .doc(userID)
          .collection('rooms')
          .onSnapshot(querySnapshot => {
            // Room's info
            let rooms = [];
            let roomsCount = querySnapshot.size;

            if (roomsCount === 0) {
              dispatch({
                type: 'SET_AUTH_USER_ROOMS',
                payload: [],
              });
            } else {
              querySnapshot.forEach(room => {
                let roomID = room.id;

                database.collection('rooms')
                  .doc(roomID)
                  .get()
                  .then(roomInfo => {
                    rooms.push({
                      roomID: roomID,
                      ...roomInfo.data(),
                    });

                    if (rooms.length === roomsCount) {
                      dispatch({
                        type: 'SET_AUTH_USER_ROOMS',
                        payload: rooms,
                      });
                    }
                  })
                  .catch(err => {
                    // Handle errors
                    dispatch({
                      type: 'SET_AUTH_USER_REJECTED',
                      payload: err,
                    });
                  });
              });
            }
          })
        })
        .catch(err => {
          // Handle Errors
          dispatch({
            type: 'SET_AUTH_USER_REJECTED',
            payload: err,
          });
        });
      } else {
        // User is NOT signed in.
        dispatch({
          type: 'SET_AUTH_USER_REJECTED',
          payload: 'User is not signed in',
        });
      }
    });
  }
}

// Create new Account (Firebase Auth + Document in Users)
export const createAccount = (data) => {
  return (dispatch) => {
    // Initialize
    dispatch({
      type: 'CREATE_ACCOUNT_PENDING',
    });

    // Check if user with that username exists already
    database.collection('usernames')
    .doc(data.login)
    .get()
    .then(doc => {
      if (!doc.exists) {
        // Username is available
        return fire.auth().createUserWithEmailAndPassword(data.email, data.password);
      } else {
        dispatch({
          type: 'CREATE_ACCOUNT_REJECTED',
          payload: { 
            code: 'auth/username-taken', 
            message: 'This username is already taken.' 
          },
        });
      }
    })
    .then(res => {
      // Create username doc && user doc
      let userID = res.uid;

      // username
      const usernameCreate = database.collection('usernames')
      .doc(data.login)
      .set({
        uid: userID,
      });

      // user
      const userCreate = database.collection('users')
      .doc(userID)
      .set({
        login: data.login,
        email: data.email,
        firstName: '',
        lastName: '',
      });

      return Promise.all([usernameCreate, userCreate]);
    })
    .then(res => {
      dispatch({
        type: 'CREATE_ACCOUNT_FULFILLED',
      });
    })
    .catch(err => {
      dispatch({
        type: 'CREATE_ACCOUNT_REJECTED',
        payload: err,
      });
    })
  }
}