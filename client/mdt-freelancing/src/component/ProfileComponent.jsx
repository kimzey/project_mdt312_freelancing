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

  console.log(selectUser);

  useEffect(()=>{
    try{
      fetchuser()
    }
    catch(err){
      console.log(err);
    }
  },[])

  const fetchuser = async () =>{
      if(selectUser !== false && User == ""){
          await axios.get(`http://localhost:5050/api/user/${selectUser}`)
          .then((response) => {
              setUser(response.data)
              getAge(response.data.birhday)
          })
          .catch(err=>{
              console.log(err)
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

  // console.log(age);
  // console.log(User);
  return (
    <>
      <Navbar></Navbar>
      <div className="Profile">

        <div className="Profilecontainer">
          
          {login_user == User.username && (
            <div id="Edit_profile">
                  <button id="btn_save" onClick={()=>navigate(`/profile/save/${selectUser}`)}>Job Save</button>
                  <button id="btn_edit" onClick={()=>navigate(`/profile/edit/${selectUser}`)}>Edit</button>
            </div>
          )}

          <h1 id="text">Profile</h1>

          <div id="browsePic">
            <div id="displayPic">
              <img src={`http://localhost:5050/img_user/${User.name_img||"avatar.png"}`} id="profile_img" ></img>
            </div>
          </div>

          <div className="about">
            <h1 className="subtext" id="Name"> ชื่อ : {User.name} </h1>{" "}
            <h1 className="subtext" id="Email"> อีเมล : {User.email} </h1>
            <h1 className="subtext" id="Username"> Username : {User.username} </h1>
            <h1 className="subtext" id="Birthday"> วันเกิด : {new Date(User.birhday).toLocaleDateString()} </h1>
            <h1 className="subtext" id="Age"> อายุ : {age} ปี</h1>
            <h1 className="subtext" id="Tel"> เบอร์โทรศัพท์ : {User.tel} </h1>
          </div>
          
        <div className="info">
            <h1>Ability</h1>
            <div className="Exp">
                {Parser().parse(User.ability)}
            </div>
            <h1>Experience</h1>
            <div className="Exp">
                {Parser().parse(User.experience)}
            </div>
            <h1>Education</h1>
            <div className="Exp">
                {Parser().parse(User.education)}
            </div>
        </div>
      
        </div>


       {User.link_html && (
          <div className="Profilecontainer">
            <h1 id="text"> My Web </h1>
            <iframe src={User.link_html} id="showport">  </iframe>
          </div>
       )}

       {User.name_pdf && (
          <div className="Profilecontainer">
            <h1 id="text"> Portfolio </h1>
            <iframe src={`http://localhost:5050/pdf_user/${User.name_pdf}`} id="showport">  </iframe>
          </div>
       )}



      </div>
    </>
  );
}