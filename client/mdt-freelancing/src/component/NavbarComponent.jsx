import "./NavbarComponent.css";
import {Link} from "react-router-dom"
export default function Navbar() {

    const add_show = ()=>{
        document.body.classList.toggle("show");
    }

  return (
    <nav>
        <div className="menu">
            <div className="list">
                <Link to="/" >Home</Link>
                <Link to="#Profile">Profile</Link>
                <Link to="#About">About</Link>
                <Link to="/Login">Login</Link>
            </div>
            <Link to="#" id="btn-menu" onClick={add_show}>=</Link>
        </div>
    </nav>
  );
}
