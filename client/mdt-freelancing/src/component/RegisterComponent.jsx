import "./RegisterComponent.css";
import Navbar from "./NavbarComponent";

export default function Register() {
  return (
    <div className="register">
      <Navbar></Navbar>

      <form className="register-form" name="myForm" id="myForm">
        <h2>สมัครสมาชิก</h2>
        <div className="required-info">
          <span className="required-message">*จำเป็น </span>
          <span id="errormsg"></span>
        </div>

        <div className="form-group">
          <label htmlFor="firstname">ชื่อ * </label>
          <input type="text" id="firstname" name="firstname" required />

          <label htmlFor="lastname">นามสกุล *</label>
          <input type="text" id="lastname" name="lastname" required />
        </div>

        <div className="form-group">
          <label htmlFor="username">
            Username *<br />
          </label>
          <input type="text" id="username" name="username" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password *<br />
          </label>
          <input type="password" id="password" name="password" required />
        </div>

        <div className="form-group">
          <label htmlFor="repassword">
            Retype Password *<br />
          </label>
          <input type="password" id="repassword" name="repassword" required />
        </div>

        <div className="form-group">
          <label htmlFor="birthday">วันเกิด *<br/>
           </label>
          <input type="date" id="birthday" name="birthday" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email * <br />{" "}
          </label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="form-group">
          <label htmlFor="tel">
            หมายเลขโทรศัพท์ *<br />{" "}
          </label>
          <input type="tel" id="tel" name="tel" required />
        </div>

        <div className="form-button">
          <br /> <button type="submit">สมัครสมาชิก </button>
        </div>
      </form>
    </div>
  );
}
