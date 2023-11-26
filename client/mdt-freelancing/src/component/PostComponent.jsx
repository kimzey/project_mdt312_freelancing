import "./PostComponent.css"
import { useParams ,useNavigate } from "react-router-dom";
import {getUser,getToken} from "../services/auth"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import Navbar from "./NavbarComponent";
import axios from "axios";
import { useState,useEffect} from "react";
import Swal from "sweetalert2"
import Blog from "./BlogComponent";

export default function PostCompornent() {
    const navigate = useNavigate();
    const param = useParams()

    const [login_user,Setlogin_user] = useState(getUser())

    const [user,setUser] = useState()
    const [category,setCategory] = useState('')
    const [author,setAuthor] = useState('')
    const [content,setContent] = useState()
    const [content_img,setContent_img] = useState({})
    const [page_number,setPage_number] = useState(0)
    const [blogs,setblogs] = useState([])

    const fetchuser = async () =>{
        if(login_user !== false && user == undefined){
            await axios.get(`http://localhost:5050/api/user/${login_user}`)
            .then((response) => {
                setUser(response.data)
                setCategory(param.category)
            })
            .catch(err=>{
                alert(err)
            })
        }
    }
    const fetchblogs = async () =>{
            await axios.get(`http://localhost:5050/api/posts/${param.category}/${page_number}`)
            .then((response) => {
                setblogs(response.data)
            })
            .catch(err=>{
                console.log(err);
            })
    }
    
    useEffect(()=>{
        fetchuser()
        setContent(null)
        fetchblogs()
        window.scrollTo({top: 0, left: 0});
    },[page_number])

    useEffect(()=>{
        fetchuser()
        setContent(null)
        fetchblogs()
        setPage_number(0)
        setCategory(param.category)
    },[param])

    const setWrite = (e)=>{
        setContent(e)
        setAuthor(user.username)
    }

    const set_img = (e)=>{
        setContent_img(e.target.files[0])
    }   

    const submmit_form = async (e)=>{
        e.preventDefault();
        await axios.post(`http://localhost:5050/api/post/create`,{content,author,category},{headers: {authorization:`Bearer ${getToken()}`}})
        .then(async (response) => {
            const res_slut = response.data.slug
            await axios.put(`http://localhost:5050/api/post/updatimg/${res_slut}`,{content_img}, {headers: {'Content-Type': 'multipart/form-data',authorization:`Bearer ${getToken()}`}})
            .then((res) => {
                Swal.fire({
                    title: "แจ้งเตือน",
                    text: "บันทึกข้อมูลเรียบร้อย",
                    icon: "success"
                  });
                setContent(null);
                setContent_img(null);
            })
            .catch(err=>{
                Swal.fire({
                    title: "แจ้งเตือน",
                    text: err.response.data.error,
                    icon: "error"
                  });
            })
        })
        .catch(err=>{
            Swal.fire({
                title: "แจ้งเตือน",
                text: err.response.data.error,
                icon: "error"
              })
        })
        fetchblogs()
    }
    
    const reduce_pagenumber  = ()=>{
        if(page_number > 0){
            setPage_number(page_number-1)
        }
    }
    const add_pagenumber  = ()=>{
        if(blogs.length > 0){
            setPage_number(page_number+1)
        }
    }
    
  return (<>
        <Navbar></Navbar>
        <div className="post">

            <div className="post_container">

                <div className="box" id="title">
                    <h1>Category : {JSON.stringify(param.category)}</h1>
                </div>

                {login_user && (
                    <div id="write_box" className="box">

                    <div className="title_box">
                    {user && 
                    <> 
                        <img src={`http://localhost:5050/img_user/${user.name_img||"avatar.png"}`} id="profile_img" onClick={()=>navigate(`/profile/${user.username}`)}></img>
                        <h1>{user.username}</h1>
                    </>}
                    </div>
                    
                    <form id="write" onSubmit={submmit_form} >  
                        <ReactQuill them="snow"  
                            placeholder="เขียนรายละเอียดบทความ"
                            style={{border: '1px solid #6666'}} 
                            onChange={setWrite}
                            value={content}
                            />
                            <div className="btn_write_box">
                                <input type="file" id="post_img" name="content_img" accept="image/*" className="btn btn_img" onChange={set_img} />
                                <input type="submit" value="submit" className="btn btn_submit"  ></input>
                            </div>
                    </form>
                </div>
                )}

                <div className="btn_page">
                    <button className="btn_pages" onClick={reduce_pagenumber}>Back</button>
                    <h1>{page_number+1}</h1>
                    <button className="btn_pages" onClick={add_pagenumber} >Next</button>
                </div>

                {blogs.length > 0 
                ? (
                    blogs.map((blog)=>(
                        <Blog key={blog._id} blog={blog}></Blog>
                    ))
                ) 
                : <h1>ไม่พบบทความ</h1> }

                {blogs.length >3
                ?(<div className="btn_page">
                    <button className="btn_pages" onClick={reduce_pagenumber}>Back</button>
                    <h1>{page_number+1}</h1>
                    <button className="btn_pages" onClick={add_pagenumber}>Next</button>
                </div>)
                :<></>}

                {/* {
                    blogs.map((blog)=>(
                        <Blog key={blog._id} blog={blog}></Blog>
                    ))
                } */}
            </div>

        </div>
  </>)
}