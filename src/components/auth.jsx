/*

SETTING UP THE AUTH COMPONENT:

- We first import auth from the firecase config. We also need to createWithEmailAndPassword from the firebase sdk.
    - When this happens, we know that we're now authenticated and we should redirect to the users' page with their tasks.
        - Authentication is true once we click "login" and false if it has not been clicked.
        - There should be a button for logging out which is in the Firebase SDK and this theoretically logs the user out and sets auth to false.
*/
import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Auth() {
  //need a state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(auth);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={register}>Register</button>
    </div>
  );
}
