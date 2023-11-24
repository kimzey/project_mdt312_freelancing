import React, { useRef } from "react";
import "./ProfileComponent.css";
import Navbar from "./NavbarComponent";
import { useState ,useEffect} from "react";
import axios from "axios";
import { Parser } from 'html-to-react'
import { useNavigate,useParams } from "react-router-dom";
import {getUser} from "../services/auth"

export default function ProfileComponent() {
  const navigate = useNavigate();

  const [User,setUser] = useState("")
  const [selectUser,setselectUser] = useState(useParams().tag)
  const [login_user,Setlogin_user] = useState(getUser())
  const [age,setAge] = useState(0)

  useEffect(()=>{
      fetchuser()
      getAge()
  },[])

  const fetchuser = async () =>{
      if(selectUser !== false && User == ""){
          await axios.get(`http://localhost:5050/api/user/${selectUser}`)
          .then((response) => {
              setUser(response.data)
              getAge(response.data.birhday)
          })
          .catch(err=>{
              alert(err)
          })
      }
  }

  const getAge = async (birhday) =>{
    const time = await new Date(birhday)
    const timex = await new Date()
    const cal_age = timex - time
  
    const millisecondsPerYear = 31536000000; // 1 ปีมีประมาณ 31536000000 มิลลิวินาที
    const ageYears = await Math.floor(cal_age / millisecondsPerYear);
    await setAge(ageYears)
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="Profile">

        <div className="Profilecontainer">

          {login_user == User.username && (
            <div id="Edit_profile">
                  <button id="btn_edit" onClick={()=>navigate("/profile/edit/kimzey1")}>Edit</button>
            </div>
          )}

          <h1 id="text">Profile</h1>

          <br />

          <div id="browsePic">
            <div id="displayPic">
              <img src={`http://localhost:5050/img_user/${User.name_img||"avatar.png"}`} id="profile_img" ></img>
            </div>
          </div>

          <div className="about">
            <p id="Name"> ชื่อ : {User.name} </p>{" "}
            <p id="Email"> อีเมล : {User.email} </p>
            <p id="Username"> Username : {User.username} </p>
            <p id="Birthday"> วันเกิด : {new Date(User.birhday).toLocaleDateString()} </p>
            <p id="Age"> อายุ : {age} ปี</p>
            <p id="Tel"> เบอร์โทรศัพท์ : {User.tel} </p>
          </div>
          
        <div className="info">
            <div className="Exp1">
                <h1>ability</h1>
                {Parser().parse(User.ability)}
            </div>
            
            <div className="Exp2">
                <h1>education</h1>
                {Parser().parse(User.education)}
            </div>

            <div className="Exp3">
                <h1>experience</h1>
                {Parser().parse(User.experience)}
            </div>
        </div>
      
        </div>


       {User.link_html && (
          <div className="Portfoliocontainer">
            <h1 id="text2"> MY WEB </h1>
            <iframe src={User.link_html} id="showport">  </iframe>
          </div>
       )}

       {User.name_pdf && (
          <div className="Portfoliocontainer">
            <h1 id="text2"> Portfolio </h1>
            <iframe src={`http://localhost:5050/pdf_user/${User.name_pdf}`} id="showport">  </iframe>
          </div>
       )}



      </div>
    </>
  );
}