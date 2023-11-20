import "./LoginComponent.css";
import Navbar from "./NavbarComponent";
import { useState} from "react";
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import {authenticate} from "../services/auth"
export default function Login() {
  const navigate = useNavigate();

  const [state,setstate] = useState({
      username:"",
      password:"",
      remember:true
    })

  const {username,password,remember} = state
  
  const setValue =  (e,name)=>{
    if(name == "remember"){
      setstate({...state,[name]:e.target.checked})
    }else{
      setstate({...state,[name]:e.target.value})
    }
  }

  const submitlogin = (e) =>{
    e.preventDefault();
    console.table({username,password,remember});
    axios.post(`http://localhost:5050/api/login`,{username,password,remember})
    .then(res=>{
        authenticate(res,()=>navigate("/"))
    })
    .catch(err=>{
      console.log(err);
        Swal.fire({
            title: "แจ้งเตือน",
            text: err.response.data.error,
            icon: "error"
          });
    })
  }

  return (
    <>
    <Navbar></Navbar>
    <div className ="login">
      <form name="Login" id="Login" onSubmit={submitlogin}>
        เข้าสู่ระบบ
        <br />
        <br />
        Username
        <br />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="กรอกไอดี"
          value={username}
          onChange={(e)=>setValue(e,"username")}
          required
        />
        <br />
        Password
        <br />
        <input
          type="password"
          name="password"
          placeholder="กรอกรหัสผ่าน"
          value={password}
          onChange={(e)=>setValue(e,"password")}
          required
        />
        <br />
        <br /> <input type="checkbox" checked={remember} onChange={(e)=>setValue(e,"remember")} /> จดจำฉัน <br />
        <br /> <input type="submit" value="เข้าสู่ระบบ" /> <br />
        <br /> หรือยังไม่เคย <a href="/register">ลงทะเบียน</a> ? <br />
      </form>
    </div>
    </>
  );
}