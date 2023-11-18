import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import NotFound from "./component/NotFoundPage";
import Home from "./component/HomeComponent";
import Login from "./component/LoginComponent";
import Register from "./component/RegisterComponent";
import {logout,getRemember,getUser} from "../src/services/auth"
import { useEffect ,useState} from "react";

function App() {

  const [user,setUser] = useState(getUser())

  useEffect(()=>{
      if(getRemember() == false && user != false){
        console.log(user);
        logout(user);
      }
  },[])

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
