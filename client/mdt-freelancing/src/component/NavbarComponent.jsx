import "./NavbarComponent.css";
import {Link} from "react-router-dom"
import logo_img from "../assets/logo.png"
import serach_img from "../assets/serach.png"
import { useState,useEffect } from "react";
import {logout,getUser} from "../services/auth"
import axios from "axios";
export default function Navbar() {

    const [input,Setinput] = useState("")
    const [login_user,Setlogin_user] = useState(getUser())
    const [user,Setuser] = useState()

    useEffect(()=>{
        if(login_user != false && user == undefined){
            axios.get(`http://localhost:5050/api/user/${login_user}`)
            .then(res =>  {
                // console.log(res);
                Setuser(res.data)
                // console.log(user);
            })
        }
    },[])

    const add_show = ()=>{
        document.body.classList.toggle("show");
    }
    
    const submit_search = () =>{
        console.log(user.name_img);
    }
  return (
    <nav>
        <div className="menu">
            <Link to="/" id="box_logo"><img src={logo_img} id="logo_web"></img></Link>
            <div id="box_search">
                <input type="search" id="search_input" value={input} onChange={(e)=>Setinput(e.target.value)}></input>
                <img src={serach_img} id="logo_serach" onClick={submit_search}></img>
            </div>
            <div className="list">
                <Link to="/Profile">Profile</Link>
                <Link to="/About">About</Link>

                {!getUser() && <>
                    <Link to="/Login">Login</Link>
                    <Link to="/Register">Register</Link>
                </>}
                
                {getUser() && <>
                    <Link to="/Login" onClick={()=>logout(user)}>Logout</Link>   
                </>}

            </div>
            <Link to="#" id="btn-menu" onClick={add_show}>=</Link>
        </div>
    </nav>
  );
}
