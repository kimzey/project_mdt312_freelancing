import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import NotFound from "./component/NotFoundPage";
import Home from "./component/HomeComponent";
import Login from "./component/LoginComponent"
function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes> 
  </BrowserRouter>
  )
}

export default App
