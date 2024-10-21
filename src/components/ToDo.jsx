/* eslint-disable react/prop-types */
import { useState } from "react";
import { db } from "../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import EditContainer from "./EditContainer";

export default function ToDo(props) {
  const [isEditingTask, setIsEditingTask] = useState(false);

  const docRef = doc(db, "users", props.userID, "tasks", props.task.id);

  const deleteTask = async () => {
    try {
      await deleteDoc(docRef);
      await props.fetchTasks();
      console.log("Successfully deleted doc!");
    } catch (e) {
      console.error(e);
    }
  };

  const changeCompletion = async (id) => {
    try {
      const docRef = doc(db, "users", props.userID, "tasks", id);
      await updateDoc(docRef, { completed: !props.task.completed });
      await props.fetchTasks();
    } catch (err) {
      console.error('Error updating tasks!', err);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow-lg transition-transform transform hover:scale-105 overflow-x-auto">
      <div className="flex flex-col">
        <p className="text-lg font-semibold text-gray-800">
          {props.task.task_name}
        </p>
        <p
          className={`mt-1 text-sm ${
            props.task.completed ? "text-green-500" : "text-red-500"
          }`}
        >
          {props.task.completed ? "Completed" : "Not Completed"}
        </p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => setIsEditingTask(!isEditingTask)}
          className="mr-2 bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg text-white transition duration-200"
        >
          Edit
        </button>
        <button
          className="border p-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition duration-200"
          onClick={deleteTask}
        >
          DELETE
        </button>
        <input
          type="checkbox"
          checked={props.task.completed}
          className="form-checkbox h-5 w-5 text-green-600 ml-2"
          onChange={() => changeCompletion(props.task.id)}
        />
      </div>
      {isEditingTask && <EditContainer userID={props.userID} taskID={props.task.id} taskName={props.task.task_name} refreshData={props.fetchTasks}  />}
    </div>
  );
}
