# Firestore Chat

## Installation
To make it work you have to enable email/password auth in your firestore application and create configuration file with the example I've showed you below.

```

import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase
var config = {
  apiKey: "XXX",
  authDomain: "XXX",
  databaseURL: "XXX",
  projectId: "XXX",
  storageBucket: "XXX",
  messagingSenderId: "XXX"
};

export const fire = firebase.initializeApp(config);
export const database = firebase.firestore();


```