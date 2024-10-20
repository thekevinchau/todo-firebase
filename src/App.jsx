import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/tasks" element={<Tasks/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
