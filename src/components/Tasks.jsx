import { auth } from "../config/firebase"
import { useLocation } from "react-router-dom"
import TaskBox from "./TaskBox";

export default function Tasks(){
    const location = useLocation();
    const userID = location.state.uid || {};
    return <div className="h-screen w-screen">
        {!auth.currentUser ? "You are not signed in!" : <TaskBox userID={userID}/>}
    </div>
}