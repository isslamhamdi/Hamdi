import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Import the Firebase configuration
// @ts-ignore
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();

// Sign in anonymously
export const signIn = async () => {
  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.error("Error signing in anonymously", error);
  }
};
