import "./BlogComponent.css"
import { Parser } from 'html-to-react'
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Blog(props){
    const {blog} = props
    const navigate = useNavigate();

    const [author,setAuthor] = useState(blog.author)
    const [user,setUser] = useState({})

    const fetchuser = async () =>{
            await axios.get(`http://localhost:5050/api/user/${author}`)
            .then((response) => {
                console.log(response.data);
                setUser(response.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    useEffect(()=>{
        fetchuser()
    },[])

    // console.log(blog);
    return(
        <>
                <div id="post_box" className="box" >
                    <div className="title_box">
                        <img src={`http://localhost:5050/img_user/${user.name_img||"avatar.png"}`} id="profile_img" onClick={()=>navigate(`/profile/${user.username}`)}></img>
                        <h1>{user.username}</h1>
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