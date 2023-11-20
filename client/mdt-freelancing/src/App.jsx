import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import NotFound from "./component/NotFoundPage";
import Home from "./component/HomeComponent";
import Login from "./component/LoginComponent";
import Register from "./component/RegisterComponent";
import {logout,getRemember,getUser} from "../src/services/auth"
import { useEffect ,useState} from "react";
import Navbar from "./component/NavbarComponent";
import PostCompornent from "./component/PostCompornent";
import ProfileCompornent from "./component/ProfileComponent.jsx"

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
    <Navbar></Navbar>
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/posts/:tag" element={<PostCompornent/>}/>
        <Route path="/Profile/:tag" element={<ProfileCompornent/>}/>
    </Routes> 
  </BrowserRouter>
  )
}

export default App
