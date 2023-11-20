import "./NavbarComponent.css";
import {Link} from "react-router-dom"
import logo_img from "../assets/logo.png"
import serach_img from "../assets/serach.png"
import { useState,useEffect } from "react";
import {logout,getUser} from "../services/auth"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const [input,Setinput] = useState("")
    const [login_user,Setlogin_user] = useState(getUser())
    const [User,setUser] = useState()

    useEffect(()=>{
        console.log(login_user);
        if(login_user !== false && User == undefined)
        axios.get(`http://localhost:5050/api/user/${login_user}`)
        .then((response) => {
            setUser(response.data)
        })
        .catch(err=>{
            alert(err)
        })
    },[])

    const add_show = ()=>{
        document.body.classList.toggle("show");
    }
    
    const submit_search = () =>{
        console.log(User);
        navigate(`/posts/${input}`)
    }

  return (
    <nav>
        <div className="menu">
            <Link to="/" id="box_logo"><img src={logo_img} id="logo_web"></img></Link>
            <div id="box_search">
                <input type="search" id="search_input" value={input} onChange={(e)=>Setinput(e.target.value)} ></input>
                <img src={serach_img} id="logo_serach" onClick={submit_search} ></img>
            </div>
            <div className="list">
            
                {User && <>
                    <img src={`http://localhost:5050/img_user/${User.name_img||"avatar.png"}`} id="profile_img" onClick={()=>navigate(`/profile/${User.username}`)}></img>
                </>}

                <Link to="/About">About</Link>

                {!getUser() && <>
                    <Link to="/Login">Login</Link>
                    <Link to="/Register">Register</Link>
                </>}
                
                {getUser() && <>
                    <Link to="/Login" onClick={()=>logout(login_user)}>Logout</Link>   
                </>}

            </div>
            <Link to="#" id="btn-menu" onClick={add_show}>=</Link>
        </div>
    </nav>
  );
}