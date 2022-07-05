import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBlQ2XW2kIT-h5H3oEkeWGpjsTPHxMRDco',
  authDomain: 'crwn-clothing-db-f3fee.firebaseapp.com',
  projectId: 'crwn-clothing-db-f3fee',
  storageBucket: 'crwn-clothing-db-f3fee.appspot.com',
  messagingSenderId: '792955735918',
  appId: '1:792955735918:web:7cca056deb58775f4c7b7f',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating user', error);
    }
  }

  return userDocRef;
};
