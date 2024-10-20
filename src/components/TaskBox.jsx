/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import ToDo from "./ToDo";

export default function TaskBox(props) {
    const navigate = useNavigate();
  const [userTasks, setUserTasks] = useState([]);
  const usersTasksCollectionRef = collection(
    db,
    "users",
    props.userID,
    "tasks"
  );

  const logout = async() => {
    try{
        await signOut(auth);
        console.log('User has been logged out!');
        navigate('/');
    }catch(err){
        console.error('Error logging out!', err)
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(usersTasksCollectionRef);
        const parsedData = querySnapshot.docs.map((task) => ({
          ...task.data(),
          id: task.id,
        }));
        setUserTasks(parsedData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchTasks();
  }, [usersTasksCollectionRef]);

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10 h-1/4 overflow-y-auto overflow-x-auto">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Tasks</h2>
        <button>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border" onClick={logout}>Log out</h2>
        </button>
      </div>
      {userTasks.length > 0 ? (
        userTasks.map((task, key) => <ToDo key={key} task={task} />)
      ) : (
        <p className="text-gray-600">No tasks available.</p>
      )}
    </div>
  );
}
