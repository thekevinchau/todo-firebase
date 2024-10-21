/* eslint-disable react/prop-types */
import { db } from "../config/firebase";
import { updateDoc, doc } from "firebase/firestore";

import { useState } from "react";

export default function EditContainer(props) {
  const [newName, setNewName] = useState("");

  const saveEditedTask = async (userID, taskID) => {
    const docRef = doc(db, "users", userID, "tasks", taskID);

    try {
      if (!newName.trim()) {
        console.log("Task must have a name!");
      } else {
        await updateDoc(docRef, { task_name: newName });
        console.log('Task saved successfully!');
        props.refreshData();
      }
    } catch (e) {
      console.error("Error saving task", e);
    }
  };

  return (
    <div className="flex flex-col ml-2 w-1/3">
      <input
        placeholder={props.taskName}
        className="overflow-x-auto pl-1"
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={() => saveEditedTask(props.userID, props.taskID)}>Save</button>
    </div>
  );
}
