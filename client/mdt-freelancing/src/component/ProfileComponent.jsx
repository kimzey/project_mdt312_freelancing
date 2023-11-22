import React, { useRef } from "react";
import "./ProfileComponent.css";
import Navbar from "./NavbarComponent";

export default function ProfileComponent() {
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {    console.log("File uploaded");
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="Profile">

        <div className="Profilecontainer">
          <h1 id="text">Profile</h1>

          <br/>
          
          <div id="browsePic">
            <div id="displayPic" onClick={() => fileInputRef.current.click()}>
              <img id ="pic" src={`http://localhost:5050/img_user/${"avatar.png"}`}  
              />
            </div>

            <form
              action="/profilepic">
              <input type="file" ref={fileInputRef}
                style={{ display: "none" }}onChange={handleFileUpload}
              />
            </form>
          </div>

          <div className="about">
            <p id="Name"> ชื่อ : ธนพล </p>              <p id="Surname"> นามสกุล : วณิชย์นำเจริญ </p>   
            <p id="Email"> อีเมล : araa1365@gmail.com </p> 
            <p id="Username"> Username : flukee </p>
            <p id="Birthday"> วันเกิด : 14 ตุลาคม 2545 </p>
            <p id="Age"> อายุ : 21 ปี</p>   
            <p id="Tel"> เบอร์โทรศัพท์ :   0955711412    </p>
          </div>

          <div className="Exp">  
            <h1 id="Exp1"> ประสบการ์ณการทำงาน </h1>

            </div>
        </div>


        <div className="Profilecontainer2">
          <h1 id="text2">Profile</h1>

          <br/>
          
          <div id="browsePic2">
            <div id="displayPic2" onClick={() => fileInputRef.current.click()}>
              <img id ="pic2" src={`http://localhost:5050/img_user/${"avatar.png"}`}  
              />
            </div>

            <form
              action="/profilepic">
              <input type="file" ref={fileInputRef}
                style={{ display: "none" }}onChange={handleFileUpload}
              />
            </form>
          </div>

          <div className="about2">
            <p id="Name2"> ชื่อ : ธนพล </p>              <p id="Surname2"> นามสกุล : วณิชย์นำเจริญ </p>   
            <p id="Email2"> อีเมล : araa1365@gmail.com </p> 
            <p id="Username2"> Username : flukee </p>
            <p id="Birthday2"> วันเกิด : 14 ตุลาคม 2545 </p>
            <p id="Age2"> อายุ : 21 ปี</p>   
            <p id="Tel2"> เบอร์โทรศัพท์ :   0955711412    </p>
          </div>

          <div className="Exp2">  
            <h1 id="Exp2"> ประสบการ์ณการทำงาน </h1>

            </div>
        </div>












        <div className="Portfoliocontainer">
            <h1 id="text2"> Portfolio </h1>



        </div>











    
      </div>
    </>
  );
}