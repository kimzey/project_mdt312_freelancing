import "./SaveComponent.css"
import { useParams ,useNavigate } from "react-router-dom";
import {getUser} from "../services/auth"
import Navbar from "./NavbarComponent";
import axios from "axios";
import { useState,useEffect} from "react";
import Swal from "sweetalert2"
import BlogSave from "./BlogSaveComponent";

export default function SaveCompornent() {
    const navigate = useNavigate();
    const param = useParams()
    const [login_user,Setlogin_user] = useState(getUser())

    const [user,setUser] = useState()
    const [page_number,setPage_number] = useState(0)
    const [blogs,setblogs] = useState([])

    const fetchuser = async () =>{
        if(login_user !== false && user == undefined){
            await axios.get(`http://localhost:5050/api/user/${login_user}`)
            .then((response) => {
                setUser(response.data)
            })
            .catch(err=>{
                alert(err)
            })
        }
    }

    const fetchblogs = async () =>{
            await axios.get(`http://localhost:5050/api/favourite/get/${login_user}`)
            .then((response) => {
                setblogs(response.data)
            })
            .catch(err=>{
                console.log(err);
            })
    }
    
    useEffect(()=>{
        fetchuser()
        fetchblogs()
        window.scrollTo({top: 0, left: 0});
        console.log(login_user);
    },[page_number])
    
    // const reduce_pagenumber  = ()=>{
    //     if(page_number > 0){
    //         setPage_number(page_number-1)
    //     }
    // }
    // const add_pagenumber  = ()=>{
    //     if(blogs.length > 0){
    //         setPage_number(page_number+1)
    //     }
    // }
    console.log(blogs);
  return (<>
        <Navbar></Navbar>
        <div className="save_com">

            <div className="save_container">


                <div className="box" id="title">
                    {/* <i id="btn_back" onClick={()=>navigate(`../profile/${login_user}`)}>&larr;</i> */}
                    <h1>SAVE BY : {JSON.stringify(login_user)}</h1>
                </div>

                {/* <div className="btn_page">
                    <button className="btn_pages" onClick={reduce_pagenumber}>Back</button>
                    <h1>{page_number+1}</h1>
                    <button className="btn_pages" onClick={add_pagenumber} >Next</button>
                </div> */}

                {blogs.length > 0 
                ? (
                    blogs.map((blog)=>(
                        <BlogSave key={blog._id} blog={blog} fetch={fetchblogs}></BlogSave>
                    ))
                ) 
                : <h1>ไม่พบบทความ</h1> }

            </div>

        </div>
  </>)
}