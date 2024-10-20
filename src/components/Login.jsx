import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Login() {
  //need a state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (auth?.currentUser) {
        console.log(auth?.currentUser);
      }
    } catch (err) {
    console.log('You are not a user!')
      console.error(err);
    }
  };

  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button onClick={login}>Login</button>
    </div>
  );
}
