import { auth } from "../config/firebase";
import { useLocation } from "react-router-dom";
import TaskBox from "./TaskBox";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Tasks() {
  const location = useLocation();
  const userID = location.state?.uid || {};
  const [user, setUser] = useState();
    
  useEffect(() => {
    const checkAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      checkAuth();
    });
  }, []);

  return <div className="h-screen w-screen">
      {user ? <TaskBox userID={userID} /> : <p>You are not signed in!</p>}
  </div>;
}
