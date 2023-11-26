import "./BlogSaveComponent.css"
import { Parser } from 'html-to-react'
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {getUser,getToken} from "../services/auth"

export default function BlogSave(props){
    let {blog,fetch} = props
    const navigate = useNavigate();

    const [user,setUser] = useState({})
    const [blogsave,setblogsave] = useState({})

    useEffect(()=>{
        fetchblog()
    },[])


    const fetchblog = async () =>{
            await axios.get(`http://localhost:5050/api/save/post/${blog.id_post}`,{headers: {authorization:`Bearer ${getToken()}`}})
            .then(async (response) => {
                await setblogsave(response.data);
                await fetchuser(response.data.author)
            })
            .catch(err=>{
                console.log(err)
            })
    }
     
    const fetchuser = async (author) =>{
        await axios.get(`http://localhost:5050/api/user/${author}`)
        .then((response) => {
            // console.log(response.data);
            setUser(response.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }


    const submit_unsave = async (id_post)=>{
        console.log(id_post);
        await axios.delete(`http://localhost:5050/api/favourite/delete/${id_post}`,{headers: {authorization:`Bearer ${getToken()}`}})
        .then((response) => {
            console.log(response);
            Swal.fire({
                title: "แจ้งเตือน",
                text: "Unsave เรียบร้อย",
                icon: "success"
              });
            fetch()
            console.log(blog);
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
            {blog && (
                <div id="post_box" className="box" >
                    <div className="title_box">
                        <img src={`http://localhost:5050/img_user/${user.name_img||"avatar.png"}`} id="profile_img" onClick={()=>navigate(`/profile/${user.username}`)}></img>
                        <h1>{user.username}</h1>
                        <button className="save" onClick={()=>submit_unsave(blog._id)}>Unsave</button>
                    </div>
                    <div className="content">
                        {blogsave.img_post && <img src={`http://localhost:5050/post_img/${blogsave.img_post}`} className="contnet_img" ></img>}

                        <div className="text_content"> {Parser().parse(blogsave.content)}  </div>

                        <div className="By_content">
                                <p className=''> ผู้เขียน {blogsave.author} </p>
                                <p>เผยแพร่ : {new Date(blogsave.createdAt).toLocaleString()}</p>
                        </div>
                   </div>
                </div>
            )}
               
        </>
    )
}