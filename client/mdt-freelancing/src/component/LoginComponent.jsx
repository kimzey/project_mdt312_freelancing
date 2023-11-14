import "./LoginComponent.css";
import Navbar from "./NavbarComponent";

export default function Login() {
  return (
    <div className="login">
      <Navbar></Navbar>

      <form name="Login" id="Login">
        เข้าสู่ระบบ
        <br />
        <br />
        Username
        <br />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="กรอกไอดี"
          required
        />
        <br />
        Password
        <br />
        <input
          type="password"
          name="password"
          placeholder="กรอกรหัสผ่าน"
          required
        />
        <br />
        <br /> <input type="checkbox" value="remember" /> จดจำฉัน <br />
        <br /> <input type="submit" value="เข้าสู่ระบบ" /> <br />
        <br /> หรือยังไม่เคย <a href="#">ลงทะเบียน</a> ? <br />
      </form>
    </div>
  );
}
