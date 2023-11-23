import React, { useRef } from "react";
import "./ProfileComponent.css";
import Navbar from "./NavbarComponent";




export default function ProfileComponent() {
  const fileInputRef2 = useRef(null);

  const handleFileUpload2 = () => {
    console.log("File uploaded");
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="Profile">
        <div className="Profilecontainer">
          <h1 id="text">Profile</h1>

          <br />

          <div id="browsePic">
            <div id="displayPic">
              <img
                id="pic"
                src={`http://localhost:5050/img_user/${"avatar.png"}`}
              />
            </div>
          </div>

          <div className="about">
            <p id="Name"> ชื่อ : ธนพล </p>{" "}
            <p id="Surname"> นามสกุล : วณิชย์นำเจริญ </p>
            <p id="Email"> อีเมล : araa1365@gmail.com </p>
            <p id="Username"> Username : flukee </p>
            <p id="Birthday"> วันเกิด : 14 ตุลาคม 2545 </p>
            <p id="Age"> อายุ : 21 ปี</p>
            <p id="Tel"> เบอร์โทรศัพท์ : 0955711412 </p>
          </div>

          <div className="Exp">
            <h1 id="Exp1"> ประสบการณ์การทำงาน </h1>
            <p id="Exp2"> 2557-2558 โปรแกรมเมอร์ ที่ ********* </p>
            <p id="Exp3"> 2558-2562 ไอที ซัพพอร์ต ที่ ********* </p>
            <p id="Exp4"> 2563-2566 fullstack developer ที่ ********* </p>
          </div>
        </div>

        <div className="Profilecontainer2">
          <h1 id="text2">แก้ไข Profile</h1>

          <br />

          <div id="browsePic2">
            <div id="displayPic2" onClick={() => fileInputRef2.current.click()}>
              <img
                id="pic2"
                src={`http://localhost:5050/img_user/${"avatar.png"}`}
              />
            </div>

            <form action="/profilepic">
              <input
                type="file"
                ref={fileInputRef2}
                style={{ display: "none" }}
                onChange={handleFileUpload2}
              />
            </form>
          </div>

          <div className="about2">
            <label htmlFor="Name2">ชื่อ :</label>
            <input type="text" id="Name2" name="Name2" />

            <label htmlFor="Surname2">นามสกุล :</label>
            <input type="text" id="Surname2" name="Surname2" />

            <label htmlFor="Birthday2">วันเกิด :</label>
            <input type="date" id="Birthday2" name="Birthday2" />

            <label htmlFor="Password2">รหัสผ่านเดิม :</label>
            <input type="password" id="Password2" name="Password2" />

            <label htmlFor="Password2">เปลี่ยนรหัสผ่าน :</label>
            <input type="password" id="Password2" name="Password2" />

            <label htmlFor="Age2">อายุ :</label>
            <input type="text" id="Age2" name="Age2" />
          </div>

          <div className="Exp2">
            <h1 id="Exp2"> ประสบการณ์การทำงาน </h1>
            <label htmlFor="Expinput"> </label>
            <textarea id="Expinput" name="Expinput"></textarea>
          </div>

          <div className="form-button">
           <button type="submit" >แก้ไขข้อมูล </button>
          </div>
        </div>

       
        <div className="Portfoliocontainer">
          <h1 id="text2"> Portfolio </h1>
          <iframe id="showport"> </iframe>
        </div>
      </div>
    </>
  );
}
