/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import ToDo from "./ToDo";

export default function TaskBox(props) {
  const navigate = useNavigate();
  const [userTasks, setUserTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const usersTasksCollectionRef = collection(
    db,
    "users",
    props.userID,
    "tasks"
  );

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User has been logged out!");
      navigate("/");
    } catch (err) {
      console.error("Error logging out!", err);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return; // Prevent adding empty tasks
    const taskData = {
      task_name: newTask,
      completed: false,
      time_created: new Date(),
      time_complete: null,
    };

    try {
      const docRef = await addDoc(usersTasksCollectionRef, taskData);
      console.log(`Task with ID ${docRef.id} has been added!`);
      setUserTasks((prevTasks) => [
        ...prevTasks,
        { ...taskData, id: docRef.id }, // Optimistically update the UI
      ]);
      setNewTask(""); // Clear the input after adding the task
    } catch (e) {
      console.error("Error adding task", e);
    }
  };

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

  useEffect(() => {
    console.log('fetching tasks')
    fetchTasks();
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Your Tasks</h2>
        <button
          className="text-lg text-red-500 hover:text-red-700"
          onClick={logout}
        >
          Log out
        </button>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Task name"
          className="border border-gray-300 rounded-md p-2 w-full mr-2"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="border p-2 bg-green-500 rounded-md text-white hover:bg-green-600 transition duration-200"
          disabled={newTask === ""}
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div className="overflow-y-auto max-h-72">
        {userTasks.length > 0 ? (
          userTasks.map((task, key) => <ToDo key={key} task={task} userID={props.userID} fetchTasks={fetchTasks}/>)
        ) : (
          <p className="text-gray-600 text-center">No tasks available.</p>
        )}
      </div>
    </div>
  );
}
