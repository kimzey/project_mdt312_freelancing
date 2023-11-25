import "./HomeComponent.css";
import Navbar from "./NavbarComponent";
import logo_img from "../assets/logo.png";
import { useState ,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {getUser} from "../services/auth"

export default function Home() {
  const navigate = useNavigate();

  const [category,setCategory] = useState([])
  const [username,setusername] = useState(getUser()||"guset")

  useEffect(()=>{
    fetchcategory()
  },[])

  const fetchcategory = async () =>{
    await axios.get(`http://localhost:5050/api/search/gettop5`)
    .then((response) => {
        setCategory(response.data)
    })
    .catch(err=>{
        console.log(err)
    })
  }
  
  const submit_search = (category) =>{
      // console.log(category);
      axios.post(`http://localhost:5050/api/search`,{category,username})
      .then((res)=>{
        navigate(`/posts/${category}`)
      })
      .catch(err=>{
          console.log(err)
      })
  }

  return (
  <>
   <Navbar></Navbar>
    <div className="Home">
      <div className="Firstcontainer">
        <h1 id="text1">
          <br />
          ค้นหางานที่ใช่สำหรับคุณ
        </h1>
        <br />
        <div id="logocontainer">

          <img src={logo_img} id="logo_webb" alt="logoweb"></img>
        </div>
      </div>

      <div className="Secondcontainer">
        <p id="text2">งานยอดนิยมจากการค้นหา</p>

        <div className="squarecontainer">

          {category.map((blog)=>(
            <div className="square" key={blog._id} onClick={()=>submit_search(blog._id)}>
              <p className="text_job">งาน : {blog._id}</p> 
              <p className="text_job">จำนวน : {blog.total} ครั้ง</p> 
            </div>
          ))}

        </div>
      </div>

      <footer>
        <div className="thridcontainer">
          <h2 id="contact">ติดต่อพวกเรา</h2>
          <p>Email: kimkung0914@gmail.com </p>
          <p>Phone: 0954821811 </p>
        </div>
      </footer>
    </div>
    </>
  );
}