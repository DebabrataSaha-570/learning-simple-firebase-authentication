import logo from './logo.svg';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';

initializeAuthentication()
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({})
  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedInUser)
        console.log(result.user)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google SignIn</button>
      <br />
      {
        user.email && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address:  {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
