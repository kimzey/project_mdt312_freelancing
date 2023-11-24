import "./HomeComponent.css";
import Navbar from "./NavbarComponent";
import logo_img from "../assets/logo.png";
import { useState ,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [category,setCategory] = useState([])

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
  
  console.log(category);

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
        <p id="text2">งานที่แนะนำ</p>

        <div className="squarecontainer">

          {category.map((blog)=>(
            <div className="square" key={blog._id} onClick={()=>navigate(`/posts/${blog._id}`)}>
              <p>งาน : {blog._id}</p> 
              <p>จำนวน : {blog.total} ครั้ง</p></div>
          ))}

        </div>
      </div>

      <footer>
        <div className="thridcontainer">
          <h2 id="contact">ติดต่อพวกเรา</h2>
          <p>Email: info@example.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </footer>
    </div>
    </>
  );
}