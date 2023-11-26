import "./BlogComponent.css"
import { Parser } from 'html-to-react'
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {getUser,getToken} from "../services/auth"

export default function Blog(props){
    const {blog} = props
    const navigate = useNavigate();

    const [author,setAuthor] = useState("")
    const [user,setUser] = useState({})
    const [login_user,Setlogin_user] = useState(getUser())
    // console.log(user);
    // console.log(blog);
    
    const fetchuser = async () =>{
            // console.log(blog.author);
            await axios.get(`http://localhost:5050/api/user/${blog.author}`)
            .then((response) => {
                // console.log(response.data);
                setUser(response.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }
    useEffect(()=>{
        fetchuser()
    },[])

    const submit_save = async (id_post,username)=>{
        // console.log(id_post);
        // console.log(login_user);
        await axios.post(`http://localhost:5050/api/favourite/`,{id_post,username},{headers: {authorization:`Bearer ${getToken()}`}})
        .then((response) => {
            console.log(response);
            Swal.fire({
                title: "แจ้งเตือน",
                text: "Save เรียบร้อย",
                icon: "success"
              });
        })
        .catch(err=>{
            console.log(err)
            Swal.fire({
                title: "แจ้งเตือน",
                text: err.response.data.error,
                icon: "error"
              });
        })
    }
    return(
        <>
                <div id="post_box" className="box" >
                    <div className="title_box">
                        <img src={`http://localhost:5050/img_user/${user.name_img||"avatar.png"}`} id="profile_img" onClick={()=>navigate(`/profile/${user.username}`)}></img>
                        <h1>{user.username}</h1>
                        {login_user && 
                        <button className="save" onClick={()=>submit_save(blog._id,login_user)}>Save</button>}
                    </div>
                    <div className="content">
                        {blog.img_post && <img src={`http://localhost:5050/post_img/${blog.img_post}`} className="contnet_img" ></img>}

                        <div className="text_content"> {Parser().parse(blog.content)}  </div>

                        <div className="By_content">
                                <p className=''> ผู้เขียน {blog.author} </p>
                                <p>เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
                        </div>
                   </div>
                </div>
        </>
    )
}