// Import the functions you need from the SDKs you need
import {initializeApp, getApp, getApps} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'studio-2091628515-21c0b',
  appId: '1:817127996547:web:af61665c08ffbab309afb6',
  apiKey: 'AIzaSyCicb9gT1wgiGOlkJgjCrpfcxoJTG0Rryw',
  authDomain: 'studio-2091628515-21c0b.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '817127996547',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
