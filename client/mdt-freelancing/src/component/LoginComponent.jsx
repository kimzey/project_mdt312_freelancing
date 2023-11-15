import "./LoginComponent.css";
import Navbar from "./NavbarComponent";

export default function Login() {

  return (
    <div className ="login">
    <Navbar></Navbar>
    
    <form name="Login" id="Login">
        <h2>เข้าสู่ระบบ</h2><br/><br/> 
        

        Username<br/>
        <input type="text" name="username" id="username" placeholder="กรอกไอดี" required />
        <br />

        Password<br/>
        <input type="password" name="password" placeholder="กรอกรหัสผ่าน" required />
        <br />
        
       <br/> <input type="checkbox"   value="remember"  />    จดจำฉัน   <br/>

       <br/> <input type="submit" value="เข้าสู่ระบบ" /> <br/>

       <br/>  หรือยังไม่เคย <a href="/Register">ลงทะเบียน</a> ?  <br/> 
    

    </form>
    </div>

  );
}
