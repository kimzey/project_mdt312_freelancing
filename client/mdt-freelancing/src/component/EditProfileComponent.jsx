import React, { useRef } from "react";
import "./ProfileComponent.css";
import Navbar from "./NavbarComponent";
import axios from "axios";
import { useState ,useEffect} from "react";
import {getUser} from "../services/auth"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2"

export default function ProfileComponent() {

  const ImageRef = useRef(null);

  const [User,setUser] = useState("")
  const [login_user,Setlogin_user] = useState(getUser())

  const [name,setname] = useState("")
  const [password,setpassword] = useState("")
  const [experience,setexperience] = useState("")
  const [education,seteducation] = useState("")
  const [ability,setability] = useState("")
  const [name_pdf,setname_pdf] = useState("")
  const [link_html,setlink_html] = useState("")
  const [profileimg,setProfileimg] = useState("")
  const [imgchage,setimgchage] = useState(0)
    
    useEffect(()=>{
        if(login_user !== false && User == ""){
            fetchuser()
        }
    },[])

    const fetchuser = async () =>{
            await axios.get(`http://localhost:5050/api/user/${login_user}`)
            .then((response) => {
                console.log(response.data);
                setUser(response.data)
                setname(response.data.name)
                setexperience(response.data.experience)
                seteducation(response.data.education)
                setProfileimg(response.data.name_img)
                setability(response.data.ability)
                setlink_html(response.data.link_html)
            })
            .catch(err=>{
                alert(err)
            })
    }

  const imageupload = async (e) => {
    // await setProfile_img(e.target.files[0])
    // console.log(setProfile_img);
    const profile_img = e.target.files[0];
    console.log(profile_img);
    await axios.put(`http://localhost:5050/api/user/updatimg/${login_user}`,{profile_img}, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                Swal.fire({
                    title: "แจ้งเตือน",
                    text: "บันทึกข้อมูลเรียบร้อย",
                    icon: "success"
                  });
                fetchuser()
                setimgchage(imgchage+1)
            })
            .catch(err=>{
                Swal.fire({
                    title: "แจ้งเตือน",
                    text: err,
                    icon: "error"
                  });
            })
    };

    const set_pdf = (e)=>{
        setname_pdf(e.target.files[0])
    }   
    const submit_edit = async () =>{
            await axios.put(`http://localhost:5050/api/user/${login_user}`,{name,password,ability,education,experience,link_html,name_pdf})
            .then(async (res)=>{
                console.log(res);
                console.log(name_pdf);
                await axios.put(`http://localhost:5050/api/user/updatpdf/${login_user}`,{name_pdf}, {headers: {'Content-Type': 'multipart/form-data'}})
                .then((res) => {
                    console.log(res);
                    Swal.fire({
                        title: "แจ้งเตือน",
                        text: "แก้ไขข้อมูลเรียบร้อย",
                        icon: "success"
                      });
                })
                .catch(err=>{
                    console.log(err);
                    Swal.fire({
                        title: "แจ้งเตือน",
                        text: err.response,
                        icon: "error"
                      });
                })
            })
            .catch((err)=>{
                console.log(err.response.data.error);
            })
    }

  return (
    <>
      <Navbar imgchage={imgchage} ></Navbar>
      <div className="Profile">
      

        <div className="Profilecontainer2">
          <h1 id="text2">แก้ไข Profile</h1>

          <br />

          <div id="browsePic2">
            <div id="displayPic2" onClick={() => ImageRef.current.click()}>
            <img src={`http://localhost:5050/img_user/${profileimg||"avatar.png"}`} id="pic2" ></img>
            </div>

            <form action="/profilepic">
              <input
                type="file"
                ref={ImageRef}
                style={{ display: "none" }}
                onChange={imageupload}
              />
            </form>
          </div>

          <div className="about2">

            <label >ชื่อ :</label>
            <input type="text" id="Name2" name="Name" value={name} onChange={(e)=>setname(e.target.value)}/>

            <label >เปลี่ยนรหัสผ่าน :</label>
            <input type="password" id="Password_new" name="Password_new" value={password} onChange={(e)=>setpassword(e.target.value)} />


          </div>

          <div className="Exp2">
            <h1 id="Exp2"> ความสามารถ </h1>
            <ReactQuill them="snow"  
                placeholder="เขียนความสามารถ"
                value={ability}
                onChange={setability}
                />
          </div>

          <div className="Exp2">
            <h1 id="Exp2"> ประสบการณ์การทำงาน </h1>
            <ReactQuill them="snow"  
                placeholder="เขียนประสบการณ์การทำงาน"
                value={experience}
                onChange={setexperience}
                />
          </div>

          <div className="Exp2">
            <h1 id="Exp2"> ประวัติการศึกษา </h1>
            <ReactQuill them="snow"  
                placeholder="เขียนรายประวัติการศึกษา"
                value={education}
                onChange={seteducation}
                />
          </div>

          <div className="Exp2">
            <h1 id="Exp2"> Link Portfolio </h1>
            <input type="text" value={link_html}
            onChange={(e)=>setlink_html(e.target.value)}>
            </input>
            
          </div>

          <div className="form-button" >
            <input type="file" onChange={set_pdf}></input>
          </div>

          <div className="form-button">
           <button type="submit" onClick={submit_edit} >แก้ไขข้อมูล </button>
          </div>

        </div>


      </div>
    </>
  );
}