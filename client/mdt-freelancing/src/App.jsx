import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import NotFound from "./component/NotFoundPage";
import Home from "./component/HomeComponent";
import Login from "./component/LoginComponent";
import Register from "./component/RegisterComponent";
function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Register" element={<Register/>}/>
    </Routes> 
  </BrowserRouter>
  )
}

export default App
