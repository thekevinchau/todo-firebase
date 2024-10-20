/* eslint-disable react/prop-types */
import { db } from "../config/firebase";
import { addDoc, deleteDoc } from "firebase/firestore";

export default function ToDo(props) {
  return (
    <div className="flex justify-between items-center bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex flex-col">
        <p className="text-lg font-medium text-gray-800">
          {props.task.task_name}
        </p>
        <p
          className={`mt-1 text-sm ${
            props.task.completed ? "text-green-600" : "text-red-600"
          }`}
        >
          {props.task.completed ? "Completed" : "Not Completed"}
        </p>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={props.task.completed}
          className="form-checkbox h-5 w-5 text-green-600"
        />
      </div>
    </div>
  );
}
