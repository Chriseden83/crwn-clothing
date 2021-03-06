import React from 'react';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utilities/firebase/firebase.utilities';

function SignIn() {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>
    </div>
  );
}

export default SignIn;
