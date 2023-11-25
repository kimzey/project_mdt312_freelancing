import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
// import NotFound from "./component/NotFoundPage";
import Home from "./component/HomeComponent";
import Login from "./component/LoginComponent";
import Register from "./component/RegisterComponent";
import {logout,getRemember,getUser} from "../src/services/auth"
import { useEffect ,useState} from "react";
import PostComponent from "./component/PostComponent";
import ProfileComponent from "./component/ProfileComponent.jsx"
import EditProfileComponent from "./component/EditProfileComponent.jsx"
import AboutComponent from "./component/AboutComponent.jsx"
import SaveComponent from "./component/SaveComponent.jsx"
function App() {

  const [user,setUser] = useState(getUser())

  useEffect(()=>{
      if(getRemember() == false && user != false){
        console.log(user);
        logout(user);
      }
  })

  return (
    <BrowserRouter >
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/About" element={<AboutComponent/>}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/posts/:category" element={<PostComponent/>}/>
        <Route path="/Profile/:tag" element={<ProfileComponent/>}/>
        <Route path="/Profile/edit/:tag" element={<EditProfileComponent/>}/>
        <Route path="/Profile/save/:tag" element={<SaveComponent/>}/>
    </Routes> 
  </BrowserRouter>
  )
}

export default App