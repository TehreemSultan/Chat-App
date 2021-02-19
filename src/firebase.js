
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp=firebase.initializeApp({
  apiKey: "AIzaSyAgEd2ITWt-F27rnG3Fz1-BUqPpuCErYZ8",
  authDomain: "tehreem-chatapp.firebaseapp.com",
  projectId: "tehreem-chatapp",
  storageBucket: "tehreem-chatapp.appspot.com",
  messagingSenderId: "894099127860",
  appId: "1:894099127860:web:d89313e99d2b22a0991461",
  measurementId: "G-GXHLW79PCM"
});
const db=firebaseApp.firestore();
export default db;
