import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCE7A2X1s0gLZckEy3orMNgWmiza_ezMeA',
  authDomain: 'vue3chat.firebaseapp.com',
  databaseURL: 'https://vue3chat.firebaseio.com',
  projectId: 'vue3chat',
  storageBucket: 'vue3chat.appspot.com',
  messagingSenderId: '657708943736',
  appId: '1:657708943736:web:4bfa2afda21e1d5c27a08d',
  measurementId: 'G-ZFCE4LFH6E',
};

if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig);
}

const firebase = Firebase;
const firestore = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export {
  firebase,
  firestore,
  auth,
  storage,
};
