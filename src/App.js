import logo from './logo.svg';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';

initializeAuthentication()
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState([])
  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user)
        console.log(user)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google SignIn</button>
      <h3>Name: {user.displayName}</h3>
      {/* <p>Photo url : {user.photoURL}</p> */}
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
