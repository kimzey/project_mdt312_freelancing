import "./RegisterComponent.css";
import { useState,useEffect } from "react";
import axios from "axios"
import Swal from "sweetalert2"
import Navbar from "./NavbarComponent";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [state_data,SetState_data] = useState({
    name:"",
    username:"",
    password:"",
    re_password:"",
    birhday:"",
    email:"",
    tel:""
  })
  const [state_error,Setstate_error] = useState("")
  const {name,username,password,re_password,birhday,email,tel} = state_data

  useEffect(()=>{
    if(password !== re_password){
      Setstate_error("* รหัสผ่านไม่ตรงกัน")
    }
    else if(tel.length != 10 && tel.length != 0){
      Setstate_error("* กรอกเบอร์โทรศัพท์ไม่ครบ")
    }
    else{
      Setstate_error("")
    }
  })

  const setValue =  (e,name)=>{
    SetState_data({...state_data,[name]:e.target.value})
  }

  const submit_regis = (e)=>{
    e.preventDefault();
    // console.table({name,username,password,re_password,birhday,email,tel});
    
    Swal.fire({
      title: "แจ้งเตือน",
      text: "ยืนยันการสมัครสมาชิก",
      icon: "question",
      showCancelButton: true,
    }).then(result=>{
      if (result.isConfirmed){
        axios.post(`http://localhost:5050/api/user/create`,{name,username,password,birhday,email,tel})
        .then(res=>{
          Swal.fire({
              title: "แจ้งเตือน",
              text: "บันทึกข้อมูลเรียบร้อย",
              icon: "success"
            });
            window.scrollTo({top: 0, left: 0});
            navigate("../Login")
            
          })
        .catch(err=>{
          Setstate_error("* "+err.response.data.error)
          Swal.fire({
              title: "แจ้งเตือน",
              text: err.response.data.error,
              icon: "error"
            })
          })
        }
      })
  }

  return (
    <>
        <Navbar></Navbar>
    <div className="register">
      <form className="register-form" name="myForm" id="myForm" onSubmit={submit_regis}>
        <h2>สมัครสมาชิก</h2>
        <div className="required-info">
          <span className="required-message">*จำเป็น </span>
        </div>

        <div className="form-group">
          <label htmlFor="firstname">ชื่อ - นามสกุล * </label>
          <input type="text" id="firstname" name="firstname" required value={name} onChange={(e)=>setValue(e,"name")}/>

        </div>

        <div className="form-group">
          <label htmlFor="username">
            Username *
          </label>
          <input type="text" id="username" name="username" value={username} required onChange={(e)=>setValue(e,"username")} />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password *
          </label>
          <input type="password" id="password" name="password" required value={password} onChange={(e)=>setValue(e,"password")} />
        </div>

        <div className="form-group">
          <label htmlFor="repassword">
            Retype Password *
          </label>
          <input type="password" id="repassword" name="repassword" required value={re_password} onChange={(e)=>setValue(e,"re_password")}/>
        </div>

        <div className="form-group">
          <label htmlFor="birthday">วันเกิด *
           </label>
          <input type="date" id="birthday" name="birthday" required value={birhday} onChange={(e)=>setValue(e,"birhday")}/>
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email * {" "}
          </label>
          <input type="email" id="email" name="email" required value={email} onChange={(e)=>setValue(e,"email")} />
        </div>

        <div className="form-group">
          <label htmlFor="tel">
            หมายเลขโทรศัพท์ *{" "}
          </label>
          <input type="tel" id="tel" name="tel" required maxLength="10" value={tel} onChange={(e)=>setValue(e,"tel")}/>
        </div>
        <div id="errormsg"><h3>{state_error}</h3></div>
        
        <div className="form-button">
           <button type="submit" >สมัครสมาชิก </button>
        </div>
        
      </form>
    </div>
    </>
  );
}